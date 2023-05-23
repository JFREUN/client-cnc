import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';




function UserGallery({posts}) {

  return (
    <div>
         <div className="user-container">

         {posts.map((post) => {
          return(
            <div className="user-post" key={post._id}>
            <a href={`/posts/${post._id}`}>
              <img src={post.imageUrl} className="profile-img" alt="alt-text" />
              <div className="overlay">
                <p>{post.title}</p>
                <p>by {post.artist}</p>
              </div>
            </a>
          </div>
          )
         })}
         
        </div>
    </div>
  )
}

export default UserGallery