document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

let allBlogPost = []
let allAuthors = []
const authorSelect = document.querySelector("#author-select")
const authorContainer = document.querySelector('#author-container')

function getData(){
  fetch('http://localhost:3000/blogPosts')
  .then(response => response.json())
  .then((data) => {
    allBlogPost = data

    showAllBlogs(data)
    })

  fetch('http://localhost:3000/authors')
  .then(response => response.json())
  .then((data) => {
    allAuthors = data

    showAllAuthors(data)
    })
}

function showAllBlogs(blogs){
  blogs.forEach(function(blog){
    authorContainer.innerHTML += `<div>
                                  <h1>${blog.title}</h1>
                                  </div>`
  })
}

function showAllAuthors(authors){
  authors.forEach(function(author){
    authorContainer.innerHTML += `<div>
                                  <h2>${author.blogName}</h2>
                                  <h2>${author.name}</h2>`
  })
}

authorSelect.addEventListener('change', function(event){
  const data = [
  fetch('http://localhost:3000/blogPosts')
  .then(response => response.json())
  .then((data) => {
    data.forEach(function(blog){
      authorContainer.innerHTML += `<div data-id="${blog.authorId}">
                                    <h1>${blog.title}</h1>
                                    </div>`
    })
    })
    fetch('http://localhost:3000/authors')
    .then(response => response.json())
    .then((data) => {
      data.forEach(function(author){
        authorContainer.innerHTML += `<div data-id=${author.id}>
                                      <h2>${author.blogName}</h2>
                                      <h2>${author.name}</h2>`
      })
      })
]
  })

  console.log(data)
})
