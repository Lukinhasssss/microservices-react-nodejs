import { useEffect, useState } from "react"
import axios from "axios"
import CommentCreate from "./CommentCreate"

const PostList = () => {
  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:8080/posts")

    setPosts(response.data)
  }

  useEffect(() => { fetchPosts() }, [])

  const renderedPosts = Object.values(posts).map(post => { // Object.values returns an array with all objects inside posts variable
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={ post.id }
      >
        <div className="card-body">
          <h3>{ post.title }</h3>

          <CommentCreate postId={ post.id } />
        </div>
      </div>
    )
  })

  return <div className="d-flex flex-row flex-wrap justify-content-between">
    { renderedPosts }
  </div>
}

export default PostList
