import React from "react";
import { useState, useEffect } from "react";
import service from "../api/service";


export default function Gallery() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    service
      .getPosts()
      .then((response) => {
        console.log(response);
        setPosts(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <section className="gallery-container">
        <h1>Gallery</h1>
        <div className="all-posts">
          {posts.map((post) => {
            return (
              <div className="gallery-post" key={post.id}>
                <a href={`/posts/${post._id}`}>
                  <img
                    src={post.imageUrl}
                    className="gallery-img"
                    alt="alt-text"
                  />
                  <div className="overlay">
                    <p>{post.title}</p>
                    <p>{post.artist}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
