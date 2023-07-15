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
            const {data} = await axios.get("http://127.0.0.1:8000/api/posts/");
            setPosts(data);
        }
        getPosts();
    }, []);


  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/posts/create/', formData);
          console.log(response.data); // Handle the response as needed
          setFormData({
              user_id: '',
              username: '',
              text: '',
              count_likes: '',
              count_comments: '',
          });
          alert('Success!');
      } catch (error) {
          console.error(error);
          alert('Error!');
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

               <Post className={"section-feed__post"} data={post} key={index} />

            ))}
        </div>
    </div>
  )
}

export default App
