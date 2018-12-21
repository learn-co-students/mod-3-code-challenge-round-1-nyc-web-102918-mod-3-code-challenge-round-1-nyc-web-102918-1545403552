document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const author = document.getElementById('author-select')

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
})
