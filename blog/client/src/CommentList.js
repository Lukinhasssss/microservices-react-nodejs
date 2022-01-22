const CommentList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content

    if (comment.status === 'APPROVED')
      content = comment.content

    if (comment.status === 'PENDING')
      content = 'This comment is awaiting moderation'

    if (comment.status === 'REJECTED')
      content = 'This comment has been rejected'

    return <li key={ comment.id }>{ content }</li>
  })

  return <ul>{ renderedComments }</ul>
}

export default CommentList
