document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorsURL = `http://localhost:3000/authors/`
  const postsURL = `http://localhost:3000/blogPosts/`
  const commentsURL = `http://localhost:3000/comments/`
  const authorSelect = document.getElementById('author-select')
  const blogName = document.getElementById('blog-name')
  const authorName = document.getElementById('author-name')
  const blogContainer = document.getElementById('blog-container')
  const commentContainer = document.getElementById('comment-container')

  const getAuthorsPosts = (authorID) => {
    fetch(authorsURL + authorID + '?_embed=blogPosts')
      .then(response => response.json())
      .then(data => {
        showAuthorPosts(data)
    })
  }

  const showAuthorPosts = (data) => {
    blogContainer.innerHTML = ''
    commentContainer.innerHTML = ''
    blogName.innerText = `${data.blogName}`
    authorName.innerText = `By ${data.name}`
    data.blogPosts.forEach(post => {
      blogContainer.innerHTML += `
        <li data-postid='${post.id}'>${post.title}</li>
      `
    })
  }

  const getPostComments = (postID) => {
    fetch(postsURL + postID + '?_embed=comments')
      .then(response => response.json())
      .then(data => {
        showPostComments(data)
      })
  }

  const showPostComments = (data) => {
    commentContainer.innerHTML = ''
    data.comments.forEach(comment => {
      commentContainer.innerHTML += `
        <li data-commentid='${comment.id}'>
          ${comment.content}
          <button data-commentid='${comment.id}'>✘</button>
        </li>
      `
    })
  }

  const deleteComment = (commentID) => {
    fetch((commentsURL + commentID), {
      method: 'DELETE'
    })
  }

  authorSelect.addEventListener('change', (event) => {
    const authorID = event.target.value
    getAuthorsPosts(authorID)
  })

  blogContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      getPostComments(event.target.dataset.postid)
    }

  })

  commentContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.target.parentNode.remove()
      deleteComment(event.target.dataset.commentid)
    }
  })

})
