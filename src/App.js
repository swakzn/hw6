import React, { useState, useEffect } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/post";

function App() {
  const [posts, setPosts] = useState([]);
  const [catImages, setCatImages] = useState([]);
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  const catImageUrl = "https://cataas.com/api/cats?limit=10&skip=0";

  const fetchPosts = async () => {
    try {
      const response = await fetch(apiUrl + "?_limit=4");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    }
  };

  const fetchCatImages = async () => {
    try {
      const response = await fetch(catImageUrl);
      const data = await response.json();
      setCatImages(data);
    } catch (error) {
      console.error("Ошибка при загрузке изображений котиков:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCatImages();
  }, []);

  const addPost = async (title, body) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: Math.random().toString(36).slice(2),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      setPosts((prevPosts) => [data, ...prevPosts]);
    } catch (error) {
      console.error("Ошибка при добавлении поста:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        console.error("Ошибка при удалении поста:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  return (
      <main>
        <h1>Consuming REST API Tutorial</h1>
        <AddPost addPost={addPost} />
        <section className="posts-container">
          <h2>Posts</h2>
          {posts.map((post) => (
              <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  imagesUrl={catImages.length > 0 ? catImages[0].url : ""}
                  deletePost={deletePost}
              />
          ))}
        </section>
      </main>
  );
}

export default App;