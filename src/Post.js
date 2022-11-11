import { useState, useEffect } from "react";
import { supabase } from "./client";

export default function Post(props) {
	const post = props.post;
	const reloadPosts = props.reloadPosts;

	const [reply, setReply] = useState("");
	const [replies, setReplies] = useState([]);

	async function createComment() {
    await supabase
      .from("replies")
      .insert([{ content: reply, target: post.id }])
			.single();
		
		setReply("");
		fetchComments();
  }

	async function fetchComments() {
    const { data } = await supabase
      .from("replies")
      .select()
			.eq("target", post.id);
    setReplies(data);
  }
  useEffect(() => { fetchComments() }, []);

	async function deletePost() {
		const { data } = await supabase
			.from("posts")
			.delete()
			.match({ id: post.id });
		reloadPosts();
	}

	return (
		<div className="post">
			<div className="x-icon delete-post" onClick={deletePost}></div>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
			<div className="post-actions">
				<input
					type="text"
					placeholder="Reply"
					value={reply}
					onChange={e => setReply(e.target.value)}
				/>
				<button onClick={createComment}>Reply</button>
			</div>
			<h4>Replies</h4>
			<ul>
			{replies.map(reply => (
				<li key={"reply" + reply.id}>{reply.content}</li>
			))}
			</ul>
			{replies.length === 0 && (
        <p>There are no comments.</p>
      )}
		</div>
	);
}