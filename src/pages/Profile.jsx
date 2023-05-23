import React from "react";
import UserGallery from "../components/UserGallery";
import { useState, useContext, useEffect} from "react";
import AddPost from "../components/AddPost";
import { AuthContext } from "../context/auth.context";
import UserCard from "../components/UserCard";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005";
const storedToken = localStorage.getItem("authToken");

export default function Profile() {
  
    const[gallery, setGallery] = useState(true);
    const[addForm, setAddForm] = useState(false);
    const { user } = useContext(AuthContext);
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [member, setMember] = useState("");

   
    const getPosts = () => {
      axios
      .get(`${API_URL}/api/profile/${userId}`,{headers: {Authorization: `Bearer ${storedToken}`}} )
      .then(response => {
       
        setPosts(response.data);
        if(response.data.length){
          setMember(response.data[0].user)
        } else {
          setMember(user)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(user){
      getPosts()
    }
  }, [user, posts])
 

  return (
    <div>
      <section className="userProfile">
      <div className="component-container">
      {gallery && <UserGallery posts={posts} />}
      {addForm && <AddPost setGallery={setGallery} setAddForm={setAddForm}/>}
      </div>
      <UserCard member={member} userId={userId} addForm={addForm} setAddForm={setAddForm} gallery={gallery} setGallery={setGallery}/>
      </section>
    </div>
  );
}
