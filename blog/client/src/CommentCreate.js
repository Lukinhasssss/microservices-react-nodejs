import axios from "axios"
import { useState } from "react"

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async event => {
    event.preventDefault()

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content
    })

    setContent('')
  }

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={ content }
            onChange={ event => setContent(event.target.value) }
            className="form-control mt-1"
          />
        </div>

        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate