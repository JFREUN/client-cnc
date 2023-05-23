import React from "react";
import { useState, useContext } from "react";
import service from "../api/service";
import { AuthContext } from "../context/auth.context";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import check from "../images/download.png";


export default function AddPost({setGallery, setAddForm}) {
  // title, artist, artistLink, imageUrl
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [artistLink, setArtistLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  

  const notify = () => {
    toast.success('You added a new post!', {
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

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    setIsUploading(true);

    const uploadData = new FormData();

    
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
       
        setImageUrl(response.fileUrl);
        setIsUploading(false);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err)
        setIsUploading(false);
      });
      
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUploading) {
      return;
    }

    service
      .createPost({ title, artist, artistLink, imageUrl, user: user._id })
      .then((res) => {
        console.log("added new post: ", res);
        notify();
        setGallery(true)
        setAddForm(false)
        setTitle("");
        setArtist("");
        setArtistLink("");
        setImageUrl("");

      })
      .catch((err) => console.log("Error while adding the new post: ", err));
  };

  return (
    <div className="addPost">
      <h2>Add Post: </h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <label>Artist: </label>
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
        />
        <label>Link to artist: </label>
        <input
          type="text"
          name="artistLink"
          value={artistLink}
          onChange={(e) => setArtistLink(e.target.value)}
          placeholder="Link to Artist"
        />
        <label>Image: </label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
       
        <button type="submit" className="button button-add" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Create a Post"}
        </button>
      </form>
    </div>
  );
}
