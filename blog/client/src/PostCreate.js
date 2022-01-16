import { useState } from "react"
import axios from 'axios'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    await axios.post('http://localhost:8080/posts', {
      title
    })

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <div className="form-group">
          <label>Title</label>
          <input
            value={ title }
            onChange={ event => setTitle(event.target.value) }
            className="form-control mt-1"
          />
        </div>

        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate