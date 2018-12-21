document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const author = document.getElementById('author-select')

  author.addEventListener('change', (event) => {
    let author_id = event.target.value

    fetch(`http://localhost:3000/authors/${author_id}?_embed=blogPosts`)
    .then(r => r.json())
    .then(info => {
      const authorContainer = document.getElementById('author-container')
      console.log(info)
    })
  })
})
