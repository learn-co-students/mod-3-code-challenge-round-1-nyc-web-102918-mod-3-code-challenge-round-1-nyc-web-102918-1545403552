/////// i feel like shit and i got stuck feeling like i forgot how to use dropdowns and basically spent an hour and a half just like frozen, i will pass next time tho if i try to control my test anxiety


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: yellow')
  
  const id = 1
  const endPoint = `http://localhost:3000`
  const authorDiv = document.getElementById('author-container')
  const blogUl = document.getElementById('blog-container')
  const commentUl = document.getElementById('comment-container')
  const selectBox = document.querySelector('#author-select')
  // let allData = { blogName, name, id, blogPosts: [ comments:[] ] }
  let authorData = []
  function fetchAuthors(id) {
    fetch(`${endPoint}/authors/${id}`)
    .then(res => res.json())
    .then(authorJSON => {
      authorData = authorJSON
     authorDiv.innerHTML  authorJSON.forEach(a => renderAuthor(a))
    })
  }
  
function fetchPosts(id) {
  fetch(`${endPoint}/authors/${id}?_embed=blogPosts`)
    .then(res => res.json())
    .then(postsJSON => console.log(postsJSON))
}
function fetchComments(id) {
  fetch(`${endPoint}/blogPosts/${id}?_embed=comments`)
    .then(res => res.json())
    .then(commentsJSON => console.log(commentsJSON))
  }

const renderCommentLis = () => {

}


  const renderAuthor = (author) => {
    let html = 
    `
    <div id="author-container" data-id='${author.id}'>
    <h3 id="blog-name">${author.blogName}</h3>
    <h4 id="author-name">${author.Name}</h4>

    <ul id="blog-container" data-id=''>
    </ul>
  </div>
    `
    selectBox.insertAdjacentHTML('afterend', html)
  }


  const renderBlogs = blog => {
    return `
    <ul id="blog-container" data-id='${blog.id}'>
    <li data-id="IDFORTHISPOST">May's Mind Your Manners</li>
    <li data-id="IDFORTHISPOST">May's Tips on How to Listen Well</li>
  </ul>
    
    `
  }




}) //end domCL




//////////
