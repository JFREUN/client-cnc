import React from "react";

function DeleteModal({ deletePost, setModal }) {
  return (
    <div className="deleteContainer">
      <div className="deleteModal">
        <p>Are you sure you want to delete this post?</p>
        <div className="modalButtons">
          <button onClick={deletePost}> Yes!</button>
          <button onClick={() => setModal(false)}>Oh no!</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
