import axios from 'axios'
import './App.css'
import React, { useEffect, useState } from 'react'

function App() {
  const [state, setState] = useState(true)
  const [posts, setPosts] = useState([])
  const [all, setAll] = useState([])
  const [updatedPost, setUpdatedPost] = useState({})
  const apiUrl = "http://localhost:2000/posts/"

  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setAll(response.data || [])
    })
  }, [])

  const inputHandler = (e) => {
    const { name, value } = e.target
    setPosts({ ...posts, [name]: value })
    console.log(posts, "heelo");
  }
  const handleEdit = index => {
    const selectedPost = all[index]
    setUpdatedPost(selectedPost)
    setState(false)
  }
  const PostDataAxios = () => {
    axios.post(apiUrl, posts).then((res) => {
      const data = res.data
      console.log(data);
      setAll([...all, data])

    })
  }
  const remove = (id) => {
    axios.delete(`${apiUrl}${id}`).then((res)=>{
      const removeFilter = all.filter(data => data.id !== id)
      setAll(removeFilter)
    })
  }

  const handleUpdate = (id) => {
    axios.put(`${apiUrl}${id}`, updatedPost).then(() => {
      setAll(calldata => calldata.map((item) => item.id === id ? updatedPost : item))
      setState(true)
    })
  }

  return (
    <>
      {state ? (
        <>
          <input
            name="name"
            type='text'
            placeholder='Name'
            onChange={(e) => inputHandler(e)}
          />
          <input
            name="last"
            type='text'
            placeholder='Last'
            onChange={(e) => inputHandler(e)}
          />
          <button onClick={PostDataAxios}>Post</button>
        </>
      ) : (
        <>
          <input
            name="name"
            type='text'
            placeholder='Name'
            value={updatedPost.name || ''}
            onChange={(e) => setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })}
          />
          <input
            name="last"
            type='text'
            placeholder='Last'
            value={updatedPost.last || ''}
            onChange={(e) => setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })}
          />
          <button onClick={() => handleUpdate(updatedPost.id)}>Update</button>
        </>
      )}
      {
        all.map((data, index) => (
          <div key={index}>
            <h1>{data.id}</h1>
            <h1>{data.name}</h1>
            <h1>{data.last}</h1>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => remove(data.id)}>Remove</button>
          </div>
        ))
      }
    </>
  )
}

export default App;