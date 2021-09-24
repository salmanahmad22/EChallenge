import Header from "./Header";
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import generateKey from "./KeyGenerator";

const UserPosts = () => {

    const location = useLocation();
    const {id, email} = location.state;

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetch(`https://dummyapi.io/data/v1/user/${id}/post`, {
          method: 'get',
          headers: {
            'app-id': '614b7e089d6e894d78cc0a8a'
          },
        })
        .then(result => {
          return result.json();
        }).then(data => {
          setBlogList(data.data);
        }
        )
        .catch(error => {
          console.log(error);
        })
      }, [])

    return(
        <div>
        
        <Link to='/'>Go back home...</Link>

        <Header headerText={"Blog Posts"}></Header>

        <div className = "user-blog-container">

        {blogList.map((individualBlog) => (
            <div key={ generateKey(individualBlog.id) } className="blogbox">
                <img className="photo" src={individualBlog.image}></img>
                <p>Title: {individualBlog.text}</p>
                <p>Tags: {individualBlog.tags[0]}, {individualBlog.tags[1]}, {individualBlog.tags[2]}</p>
                <p>Email: {email}</p>
                <p>Likes: {individualBlog.likes}</p>
                <p>Pubslished: {individualBlog.publishDate}</p>
            </div>))}
        </div>

        </div>
    )
}

export default UserPosts;