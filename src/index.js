document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorSelect = document.querySelector('#author-select')
  const authorContainer = document.querySelector('#author-container')
  const commentContainer = document.querySelector('#comment-container')
  let authorID = ''
  let blogInfo = []

  authorSelect.addEventListener('input', (e) => {
    if (e.target.tagName == 'SELECT') {
      authorID = parseInt(e.target.value)
    }
    fetch(`http://localhost:3000/authors/${authorID}?_embed=blogPosts`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      showAuthorInfo(data)
    })
  })

  function showAuthorInfo(author) {
    postID = author.blogPosts.map((post) => {
      return post.id
    })
    post = author.blogPosts.map((post) => {
      return post.title
    })

    authorContainer.innerHTML = `
    <div id="author-container">
      <h3 id="blog-name">${author.blogName}</h3>
      <h4 id=${author.id}>${author.name} </h4>
      <ul id="blog-container">
        <li data-id=${postID[0]}>${post[0]}</li>
        <li data-id=${postID[1]}>${post[1]}</li>
      </ul>
    </div>
    `
  }

  authorContainer.addEventListener('click', (e) => {
    let blogID = ' '
    if (e.target.tagName == 'LI') {
      blogID = parseInt(e.target.dataset.id)
    }
    fetch(`http://localhost:3000/blogPosts/${blogID}?_embed=comments`)
    .then((r) => r.json())
    .then((data) => {
      blogInfo = data
      showComments(data)
    })
  })

  function showComments(data) {
    let blogComments =  data.comments.map((comment) => {
      return comment
    })

    commentContainer.innerHTML =
    `
        <ul id='comment-container'>
          <li>${blogComments[0].content}</li>
          <button data-id=${blogComments[0].id}>Delete</button>
          <li data-id=${blogComments[1].id}>${blogComments[1].content}</li>
          <button data-id=${blogComments[0].id}>Delete</button>
        </ul>
    `
  }

  //commented out, ran out of time to complete the DELETE
  //and did not want it to intefere with the rest of functions

  // commentContainer.addEventListener('click', (e) => {
  //   if (e.target.tagName === 'BUTTON') {
  //     fetch(`http://localhost:3000/comments/${e.target.dataset.id}`,
  //       {
  //       Method: 'DELETE'
  //       {
  //       Headers: 'Accept' : 'application/json',
  //           'Content-Type' : 'application/json '
  //       }
  //       .then((r) => r.json())
  //       .then((data) => {
  //         console.log(data)
  //       })
  //     })
  //   }
  // })



})
