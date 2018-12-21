document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const select = document.getElementsByTagName('select')[0]
  const authorContainer = document.querySelector('#author-container')
  const commentContainer = document.querySelector('#comment-container')

  select.addEventListener('change', event => {
    commentContainer.innerHTML = ''
    const authorId = event.target.value

    fetch(`http://localhost:3000/authors/${authorId}?_embed=blogPosts`)
    .then( response => response.json() )
    .then( parsedResponse => {
      authorContainer.innerHTML = `
        <h3 id="blog-name">${parsedResponse.blogName}</h3>
        <h4 id="author-name">${parsedResponse.name}</h4>
        <ul id="blog-container">
        </ul>
      `
      const blogContainer = document.querySelector('#blog-container')

      parsedResponse.blogPosts.forEach( post => {
        blogContainer.innerHTML += `
          <li data-id='${post.id}' class='blog-title'> ${post.title} </li>
        `
      })
    })
  })

  document.addEventListener('click', event => {
    if (event.target.className === 'blog-title') {
      commentContainer.innerHTML = ''
      const blogId = event.target.dataset.id

      fetch(`http://localhost:3000/blogPosts/${blogId}?_embed=comments`)
      .then( response => response.json() )
      .then( parsedResponse => {
        parsedResponse.comments.forEach( comment => {
          commentContainer.innerHTML += `
            <li id='comment-${comment.id}'> ${comment.content} <button data-action='delete' data-id='${comment.id}'> Delete </button>
          `
        })
      })
    }
    else if (event.target.dataset.action === 'delete') {
      const commentId = event.target.dataset.id

      fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then( response => response.json() )
      .then( () => {
        document.querySelector(`#comment-${commentId}`).remove()
      })
    }
  })
})
