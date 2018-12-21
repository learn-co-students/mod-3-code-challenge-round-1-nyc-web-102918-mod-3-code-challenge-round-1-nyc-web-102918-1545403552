document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorContainer = document.querySelector('#author-container')
  const blogContainer = document.querySelector('#blog-container')
  const commentContainer = document.querySelector('#comment-container')

  let allAuthors
  let allBlogPosts
  let allComments

  let foundAuthor
  let foundPost
  let foundComment

  const fetchAuthors = () => {
    fetch(`http://localhost:3000/authors`)
    .then(response => response.json())
    .then(data => {
      allAuthors = data
    })
  }

  const fetchBlogPosts = () => {
    fetch(`http://localhost:3000/blogPosts`)
    .then(response => response.json())
    .then(data => {
      allBlogPosts = data
    })
  }
  const fetchComments = () => {
    fetch(`http://localhost:3000/comments`)
    .then(response => response.json())
    .then(data => {
      allComments = data
    })
  }

  document.addEventListener('change', event => {
    if (event.target.parentNode.id === "author-select") {
      foundAuthor = allAuthors.find(author => author.id == event.target.value)

      fetch(`http://localhost:3000/authors/${foundAuthor.id}?_embed=blogPosts`)
      .then(response => response.json())
      .then(data => {
        data.blogPosts.forEach(post => {
          blogContainer.innerHTML += `<li id="blog-post" data-id="${post.id}">${post.title}</li>`
        })
        authorContainer.innerHTML = `<h2>${data.blogName}</h2>
                                      <h3>By ${data.name}</h3>

                                      ${blogContainer.innerHTML}`

      })
    }
  })

  document.addEventListener('click', event => {
    if (event.target.id === "blog-post") {
      foundPost = allBlogPosts.find(post => post.id == event.target.dataset.id)
      fetch(`http://localhost:3000/blogPosts/${foundPost.id}?_embed=comments`)
      .then(response => response.json())
      .then(data => {
        data.comments.forEach(comment => {
          commentContainer.innerHTML += `<li>
                                          ${comment.content}
                                          <button id="delete-button" data-id="${comment.id}">Delete</button>
                                          </li>`
        })
      })
    }
    else if (event.target.id === "delete-button") {
      foundComment = allComments.find(comment => comment.id == event.target.dataset.id)
      fetch(`http://localhost:3000/comments/${foundComment.id}`, {
        method: 'DELETE'
      })
    }
  })

  fetchAuthors()
  fetchBlogPosts()
  fetchComments()

})
