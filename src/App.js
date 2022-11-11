import { supabase } from "./client";
import { useState, useEffect } from "react";

import Post from "./Post.js";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select();
    setPosts(data);
  }
  useEffect(() => { fetchPosts() }, []);

  async function createPost() {
    await supabase
      .from("posts")
      .insert([{ title: post.title, content: post.content }])
      .single();
    setPost({ title: "", content: "" });
    fetchPosts();
  }

  return (
    <>
      <div className="help-container">
        <h2>Help</h2>

        <h3>What is this?</h3>
        <p>
          Blog posts is a community moderated, anonymous blog posting site where users can create, delete, and respond to posts. There are no accounts,
          and this is a feature. The site is built on trust that users will not delete other posts for no reason.
        </p>

        <h3>How to use?</h3>
        <p>
          To create a post, first navigate to the top of the page and type in a relavent title to the post you are about to make. Then, click on the
          content text area and type your post content. When you are done, click 'Create post' to send it online.
        </p>

        <h3>What technologies were used?</h3>
        <p>
          I made this project to learn about Supabase and it's features. The stack includes: Supabase, PostgresSQL, and React.JS.
        </p>
      </div>
      <div className="column">
        <div className="form-wrapper">
          <h2>Create a post</h2>

          <input
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={post.content}
            onChange={e => setPost({ ...post, content: e.target.value })}
            style={{ resize: "vertical" }}
          />
          <button className="post-btn" onClick={createPost}>Create post</button>
        </div>

        {posts.map(post => (
          <div key={post.id}>
            {console.log(post.id)}
            <Post post={post} reloadPosts={fetchPosts} />
          </div>
        ))}
        {posts.length === 0 && (
          <p>There are no posts.</p>
        )}
      </div>
    </>
  );
}

export default App;
