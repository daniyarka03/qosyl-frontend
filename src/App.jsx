import {useEffect, useState} from 'react'
import './App.css'
import TextArea from "./components/TextArea.jsx";
import ButtonComponent from "./components/ButtonComponent.jsx";
import axios from "axios";
import Post from "./components/Post.jsx";

function App() {

  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]); // [{id: 1, text: "Hello"}, {id: 2, text: "Hello"}]
    const [formData, setFormData] = useState({
        user_id: '321321',
        username: 'Alex',
        text: '',
        count_likes: '24',
        count_comments: '12',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/posts/');
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        }
        getPosts();
    }, []);


  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/posts/create/', formData);
          console.log(response.data); // Handle the response as needed
          setFormData({
              user_id: '321321',
              username: 'Alex',
              text: '',
              count_likes: '24',
              count_comments: '12',
          });
          const { data } = await axios.get('http://127.0.0.1:8000/api/posts/');
          setPosts(data);
          const textarea = document.querySelector("#root > div > form > textarea")
          textarea.value = "";
      } catch (error) {
          console.error(error);
          alert('Error!');
      }
  }

  const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}`);
            console.log(response.data); // Handle the response as needed
            const { data } = await axios.get('http://127.0.0.1:8000/api/posts/');
            setPosts(data);


        } catch (error) {
            console.error(error);
            alert('Error!');
        }
  }

  const likePost = async (id, likes, post) => {
      console.log(post)
        const newLikes = +likes + 1;
        const newPost = {...post, count_likes: newLikes}
        console.log(newPost)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/posts/update/${id}`, newPost);
            console.log(response.data); // Handle the response as needed

            const {data} = await axios.get('http://127.0.0.1:8000/api/posts/');
            setPosts(data);
        } catch (error) {
            console.error(error);
            alert('Error!')
        }

  }



  return (
    <div className="section-feed">
        <form onSubmit={handleSubmit}>
            <TextArea name="text" className={"section-feed__textarea"} onChange={handleInputChange} value={value} />
            <ButtonComponent className={"section-feed__button"} value={"Add post"}  type="submit" />
        </form>

        <div className="section-feed__posts">
            {posts.map((post, index) => (

               <Post
                   className={"section-feed__post"}
                   data={post}
                   key={index}
                   deletePost={() => deletePost(post.post_id)}
                   likePost={() => likePost(post.post_id, post.count_likes, post)}
               />

            ))}
        </div>
    </div>
  )
}

export default App
