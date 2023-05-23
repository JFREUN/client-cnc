import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";
import axios from "axios";
import { Link } from "react-router-dom";
import backIcon from "../images/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import PopUp from "./PopUp";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import check from "../images/download.png";


const API_URL = "http://localhost:5005";

function EditPost({ post, setModal, setEdit, setPostUpdate, postUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [artist, setArtist] = useState(post.artist);
  const [artistLink, setArtistLink] = useState(post.artistLink);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [showPopup, setShowPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const notify = () => {
    toast.success("Post saved!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      icon: ({theme, type}) =>  <img className="check" src={check} alt="check"/>,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      artist,
      artistLink,
      imageUrl,
    };

    axios
      .put(`${API_URL}/api/posts/${post._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response)
        notify();
        setPostUpdate(postUpdate +1);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setEdit(false);
      });
  };

  const handleFileUpload = (e) => {
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setPostUpdate(postUpdate +1)
        const uniqueId = Date.now().toString(36);
        setImageUrl(response.fileUrl + `?v=${uniqueId}`); 
        setIsUploading(false);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err)
        setIsUploading(false);
    });
  };

  return (
    <div>
        <h3>
          Edit the post: <span>{post.title}</span>
        </h3>
        <form onSubmit={handleSubmit} className="editForm">
          <label>
            <input
              type="text"
              name="title"
              placeholder={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            <input
              type="text"
              name="artist"
              placeholder={post.artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </label>

          <label>
            <input
              name="artistLink"
              placeholder={post.artistLink}
              onChange={(e) => setArtistLink(e.target.value)}
            ></input>
          </label>
          <label>
            Image:
            <input
              type="file"
              name="animal-art-img"
              onChange={(e) => handleFileUpload(e)}
              id="editImg"
            />
          </label>
          {showPopup && <PopUp/>}
          <div id="editPost-buttons">
            <button type="submit" className="button" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Save changes"}
            </button>
            <button
              className="button button-delete"
              type="button"
              onClick={() => setModal(true)}
            >
              Delete Post
            </button>
          </div>
        </form>

        <Link className="backLink" onClick={() => setEdit(false)}>
          <img src={backIcon} alt="back" />
          Back
        </Link>
    </div>
  );
}

export default EditPost;
