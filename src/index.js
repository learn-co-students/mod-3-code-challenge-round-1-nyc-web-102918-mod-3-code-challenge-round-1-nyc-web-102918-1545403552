document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const author = document.getElementById('author-select')
  const authorContainer = document.getElementById('author-container')
  const commentContainer = document.getElementById('comment-container')

  author.addEventListener('change', (event) => {
    let author_id = event.target.value

    fetch(`http://localhost:3000/authors/${author_id}?_embed=blogPosts`)
    .then(r => r.json())
    .then(info => {
      const authorContainer = document.getElementById('author-container')
      
      authorContainer.innerHTML = `<h3 id=${info.blogName}> ${info.blogName}</h3>
      <h4 id=${info.name}> ${info.name}</h4>
      <ul id="blog-container">
      </ul>`

      const blogContainer = document.getElementById("blog-container")

      for(let blog of info.blogPosts){
        blogContainer.innerHTML += `<li data-id = ${blog.id}> ${blog.title}</li>`
      }

    })
  })

  authorContainer.addEventListener('click', (event) => {
    if (event.target.dataset.id){
      const blogId = event.target.dataset.id 
      fetch(`http://localhost:3000/blogPosts/${blogId}?_embed=comments`)
      .then(r => r.json())
      .then(blog_info => {
        const commentContainer = document.getElementById('comment-container')
        commentContainer.innerHTML = ''
        for(let comment of blog_info.comments){
          commentContainer.innerHTML += `<li> ${comment.content}
                              <button data-id="${comment.id}">Delete</button>
                              </li>`
        }
      })
    }
  })

  commentContainer.addEventListener('click', (event) => {
    if(event.target.innerHTML === 'Delete'){
      const commentId = event.target.dataset.id

      fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then (comment => {
        event.target.parentNode.remove()
      })

    }
  })


})
