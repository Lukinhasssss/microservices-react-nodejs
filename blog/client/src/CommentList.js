import axios from "axios"
import { useEffect, useState } from "react"

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8081/posts/${postId}/comments`)

    setComments(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderedComments = comments.map((comment) => {
    return <li key={ comment.id }>{ comment.content }</li>
  })

  return <ul>{ renderedComments }</ul>
}

export default CommentList
