import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EditPost from "../components/EditPost";
import { AuthContext } from "../context/auth.context";
import DeleteModal from "../components/DeleteModal";
import bin from "../images/bin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import check from "../images/download.png";


const API_URL = "http://localhost:5005";
const storedToken = localStorage.getItem("authToken");

export default function PostDetails() {
  const [post, setPost] = useState("");
  const { postId } = useParams();
  const [edit, setEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useContext(AuthContext);
  const [ownerId, setOwnerId] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [postUpdate, setPostUpdate] = useState(0);
  const [commentUpdate, setCommentUpdate] = useState(0);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  

  const notify = () => {
    toast.success("Post deleted!", {
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

  useEffect(() => {
    if (user && user._id === ownerId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, ownerId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${API_URL}/api/posts/${postId}/comment`,
        { message, author: user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMessage("");
        setCommentUpdate(commentUpdate + 1);
      })
      .catch((err) => console.log("This is a comment error: ", err));
  };

  const deleteComment = (id) => {
    axios
      .delete(`${API_URL}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        console.log("Item was deleted!");
        setCommentUpdate(commentUpdate + 1);
      })
      .catch((err) => console.log("This is a delete error: ", err));
  };

  const deletePost = () => {
    axios
      .delete(`${API_URL}/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/profile/${user._id}`);
        notify();
      })
      .catch((err) => console.log(err));
  };

  const getPost = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPost(response.data);
        setOwnerId(response.data.user._id);
        setComments(response.data.comments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentUpdate, postUpdate]);

  return (
    <section className="postDetails-container">
      {modal && <DeleteModal deletePost={deletePost} setModal={setModal} />}
      <div className="postImage-div">
        <img
          src={post.imageUrl}
          alt="alt-text"
          className="signUp-img"
          id="postDetails-img"
        />
      </div>

      <div className="info-div">
        {edit && (
          <EditPost
            post={post}
            setModal={setModal}
            setEdit={setEdit}
            setPostUpdate={setPostUpdate}
            postUpdate={postUpdate}
          />
        )}
        {!edit && (
          <div>
            <div className="titleAndUser">
              <h3> {post.title}</h3>
              <div className="user-wrapper">
                {post.user && (
                  <p>
                    posted by:
                    <img
                      src="https://www.pngitem.com/pimgs/m/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png"
                      alt="user"
                      className="user-img"
                    />
                    <a href={`/profile/${post.user._id}`}>{post.user.name}</a>
                  </p>
                )}
              </div>
            </div>

            <p>
              Artist: <a href="{{artistLink}}">{post.artist}</a>
            </p>

            {isOwner && (
              <button className="button" onClick={() => setEdit(true)}>
                Edit Post
              </button>
            )}

            <div className="new-comment">
              <h3>Add a comment:</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  name="message"
                  cols="30"
                  rows="2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <br />
                <button className="button" type="submit">
                  Comment
                </button>
              </form>
            </div>

            <div className="all-comments">
              {comments.map((comment) => {
                return (
                  <div className="comment-box" key={comment._id}>
                    <div>
                      <h4> {comment.author.name} says:</h4>
                      <p>{comment.message}</p>
                    </div>
                    {isOwner && (
                      <button onClick={() => deleteComment(comment._id)}>
                        <img className="delete-icon" src={bin} alt="" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
