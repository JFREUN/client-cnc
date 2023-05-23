import React from "react";
import { AuthContext } from "../context/auth.context";

import { useState, useEffect, useContext } from "react";

function UserCard({ addForm, setAddForm, gallery, setGallery, userId, member}) {
   const[isCurrentUser, setIsCurrentUser]= useState(false);
   const { user } = useContext(AuthContext);

   useEffect(() => {
    if (user && user._id === userId) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [user, userId]);
   

  
  const showForm = () => {
        setGallery(false);
        setAddForm(true);
    }

    const showPosts = () => {
        setAddForm(false);
        setGallery(true);
    }

  

  return (
    <div className="user-information">
      <div className="user-details">
        <img
          src="https://www.pngitem.com/pimgs/m/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png"
          alt="user"
          className="user-img"
        />
        {<h3>Hello {member.name}!</h3>}
      </div>
      {member && <h5>It is {member.name}'s profile</h5>}
      {isCurrentUser && (<div className="buttonsDiv">
      {addForm && (
        <button className="button profile-button" onClick={() => showPosts()}>
          View Posts
        </button>
      )}
      {!addForm && (
        <button className="button profile-button" onClick={() => showForm()}>
          Add Post
        </button>
      )}
      </div>)}
    </div>
  );
}

export default UserCard;
