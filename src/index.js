document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

const authorBlogUrl = "http://localhost:3000/authors/1?_embed=blogPosts"
const authorContainer = document.querySelector('#author-container')
const blogContainer = document.querySelector('#blog-container')
const authorSearch = document.querySelector('#author-select')

  authorSearch.addEventListener('change', function(event){
    // console.log(event.target.value)
    let authorId = parseInt(event.target.value)
    if (authorId){
      fetch(`http://localhost:3000/authors/${authorId}?_embed=blogPosts`)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        // console.log(data.blogPosts[0].title)
        blogTitles = data.blogPosts.forEach(function(post){
          // console.log(post)
          console.log(post.title)
          let title = (post.title)
          console.log(post.id)
          let postId = post.id
          console.log(post.authorId)
          blogContainer.innerHTML += `<li data-id="IDFORTHISPOST">${post.title}</li>
                                      <li data-id="IDFORTHISPOST">${post.title}</li>
          `
        })


        authorContainer.innerHTML = `<div id="author-container" id=${data.id}>
                                    <h3 id="blog-name">${data.blogName}</h3>
                                    <h4 id="author-name">${data.name}</h4>



                                    <ul id="blog-container">
                                    <li data-id="${postId}">${post.title}</li>
                                    <li data-id="${postId}">${post.title}</li>
                                    </ul>
                                  </div>`


      })
    }

  })
  //













}) //END  OF DOM CONTENT LOADED
