document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorURL = 'http://localhost:3000/authors'
  const blogURL = 'http://localhost:3000/blogPosts'
  const commentURL = 'http://localhost:3000/comments/'

  let blogName = document.getElementById('blog-name')
  let authorName = document.getElementById('author-name')
  let blogContainer = document.getElementById('blog-container')
  let authorContainer = document.getElementById('author-container')
  let commentContainer = document.getElementById('comment-container')

  let allAuthors = ""
  let allBlogs = ""

  function getAuthors() {
    fetch(authorURL)
    .then(response => response.json())
    .then(data => {
      allAuthors = data
    })
  }

  function getBlogs() {
    fetch(blogURL)
    .then(response => response.json())
    .then(data => {
      allBlogs = data
    })
  }

  function getComments() {
    fetch(commentURL)
    .then(response => response.json())
    .then(data => {
      allComments = data
    })
  }

  getAuthors()
  getBlogs()
  getComments()

  document.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT') {
      let the_author = allAuthors.find(author => author.id == e.target.value)

      blogContainer.innerHTML = ""
      commentContainer.innerHTML = ""

      fetch(blogURL)
      .then(response => response.json())
      .then(data => {
        let blogs = data.filter(blog => { return blog.authorId == the_author.id})
        blogs.forEach(blog => {
          blogContainer.innerHTML += `
            <li id="${blog.id}">${blog.title}</li>
          `
        })
      })

      blogName.innerText = the_author.blogName
      authorName.innerText = the_author.name
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target.tagName === "LI" && e.target.parentElement.id === 'blog-container') {
      console.log(e.target.id)
      commentContainer.innerHTML = ""

      fetch(commentURL)
      .then(response => response.json())
      .then(data => {
        let comments = data.filter(comment => comment.blogPostId == e.target.id)
        comments.forEach(comment => {
          commentContainer.innerHTML += `
          <div id="${comment.id}">
            <li>${comment.content}</li>
            <button data-action="delete" id="${comment.id}">Delete</button>
          </div>
          `
        })
      })
    }
    else if (e.target.innerText === 'Delete') {
        console.log(e.target.id)
        e.target.parentElement.remove()

        fetch(commentURL + e.target.id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
    }
  })
})
