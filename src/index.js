document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')


// STEP 1: author selected from dropdown, make Fetch request to retrieve all their blog posts.This request returns all blog posts for an author with ID 1. You must dynamically make this GET request to the correct author id:
// API W/ URL PARAM http://localhost:3000/authors/1?_embed=blogPosts

  const authorDropdown = document.getElementById('selection');
  const authorContainer = document.getElementById('author-container')
  let commentList = document.querySelector('#comment-container')


function selectAuthor() {
  authorDropdown.onchange = function() {
     const author = document.getElementById("selection").value;
     fetch(`http://localhost:3000/authors/${author}?_embed=blogPosts`)
      .then(response => response.json())
      .then(data => {
        const blogs = data.blogPosts
        authorContainer.innerHTML = `
        <div id="author-container">
          <h3 id="blog-name">${data.blogName}</h3>
          <h4 id="author-name">By ${data.name}</h4>
          <ul id="blog-container">
          </ul>
        </div>
        `
        const blogList = document.querySelector('#blog-container')
        blogs.forEach(blog => {
          let li = document.createElement('li')
          li.textContent = blog.title
          li.dataset.id = blog.id
          blogList.appendChild(li)
        })
        blogList.addEventListener('click', (event) => {
          fetch(`http://localhost:3000/blogPosts/${event.target.dataset.id}?_embed=comments`)
          .then(response => response.json())
          .then(data => {
            const comments = data.comments
            console.log(comments)
            comments.forEach(comment => {
              commentList.innerHTML += `
                <li>${comment.content}<button data-id="${comment.id}">Delete</button></li>
                `
              // let li = document.createElement('li')
              // li.textContent = comment.content
              // li.dataset.id = comment.id
              // commentList.appendChild(li)
            })
            // commentList.addEventListener('click', (event) => {
            //   clickedComment = event.target.dataset.id
            //   foundComment = comments.find((comment) => comment.id === parseInt(clickedComment))
            //   console.log(foundComment)
            //   fetch(`http://localhost:3000/comments/${foundComment.id}`, {
            //     method: 'DELETE',
            //     headers: {
            //       'Accept': 'application/json',
            //       'Content-Type': 'application/json'
            //     },
            //     body: {}
            //   })
            //   .then()
          })
        })
      })
    }
  }
  // DELETE 'http://localhost:3000/comments/1'
  //
  // Required Headers:
  // {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
  //
  // Example Response:
  // {}

  // STEP 2: When a user clicks on a blog post, make a fetch request to retrieve all comments for that blog post. You must dynamically make this request to the correct blogPost id whenever a blog post title is clicked on.
  // Use the data from the API response to append the information to the DOM. You will need to add the comment content to the comment-container.
//   var mySelect = document.getElementById('mySelect');
//   mySelect.onchange = function() {
//      var x = document.getElementById("mySelect").value;
//   document.getElementById("demo").innerHTML = "You selected: " + x;
// }
  // <div id="author-select">
  //   <select>
  //     <!-- you don't need to change the dropdown options -->
  //     <option value="1">May Cheung</option>
  //     <option value="2">Natalie Perpepaj</option>
  //     <option value="3">Laura Kim</option>
  //     <option value="4">Brooke Yalof</option>
  //   </select>
  // </div>
  selectAuthor()
})
