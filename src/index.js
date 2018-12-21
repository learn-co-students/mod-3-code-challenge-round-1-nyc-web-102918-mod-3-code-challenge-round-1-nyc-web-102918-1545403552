document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  function get(url){
    return fetch(url).then((resp)=> resp.json())
  }
  function deleteReq(url){
    return fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((resp)=> resp.json())
  }
  const blogName=document.querySelector('#blog-name')
  const authorName=document.querySelector('#author-name')
  const blogContainer=document.querySelector('#blog-container')
  const commentContainer=document.querySelector('#comment-container')
  const authorSelect=document.querySelector('#author-select')

  function getBlog(authorId){
    get(`http://localhost:3000/authors/${authorId}`).then(author =>{
      blogName.textContent= author.blogName
      authorName.textContent="By "+author.name
    })
  }
  function getPosts(authorId){
    get(`http://localhost:3000/authors/${authorId}/?_embed=blogPosts`)
    .then((author)=>{
      function postReducer(postsHTML,post){
        return postsHTML+ `<li data-id="${post.id}" data-author= "${post.authorId}" data-action="view_comments"> ${post.title} </li>`
      }
      blogContainer.innerHTML=author.blogPosts.reduce(postReducer, '')
    })
  }

  function getComments(postId){
    get(`http://localhost:3000/blogPosts/${postId}?_embed=comments`)
    .then(post =>{
      function commentsReducer(commentsHTML,comment){
        return commentsHTML+ `<li data-id="${comment.id}" data-post= "${comment.postId}"> ${comment.content} <button data-id="${comment.id}" data-action="delete_comment"> Delete</button>  </li>`
      }
      commentContainer.innerHTML=post.comments.reduce(commentsReducer, '')
    })
  }
  function deleteComment(commentId,postId){
    deleteReq(`http://localhost:3000/comments/${commentId}`)
    //.then(()=> getComments(postId)) postId out of scope after.then!
    // using optimistic rendering instead
  }

  function handleChange(event){
    getBlog(event.target.value);
    getPosts(event.target.value);
  }
  function handleClick(event){
    if(event.target.dataset.action==="view_comments"){
      getComments(event.target.dataset.id)
    }
    if(event.target.dataset.action==="delete_comment"){
      deleteComment(event.target.dataset.id, event.target.dataset.post)
      event.target.parentElement.remove()
    }
  }
  document.addEventListener('click',handleClick)
  authorSelect.addEventListener('change',handleChange)
})
