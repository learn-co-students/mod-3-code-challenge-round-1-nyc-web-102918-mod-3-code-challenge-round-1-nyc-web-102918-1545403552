document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorContainer = document.querySelector('#author-container')
  const blogName = document.querySelector('#blog-name')
  const authorName = document.querySelector('#author-name')
  const blogContainer = document.querySelector('#blog-container')
  const commentContainer = document.querySelector('#comment-container')



  const select = document.querySelector('#author-select')
  console.log(select.children[0].children[0].value);

  select.addEventListener('change', function (event) {
    console.log(event.target.value);
    commentContainer.innerHTML = ""

    let selectedOption = event.target.value

    fetch(`http://localhost:3000/authors/${selectedOption}?_embed=blogPosts`)
    .then(res => res.json()).then(res => addBlogToPage(res))



} )//// END SELECT LISTENER

  function addBlogToPage(obj) {
    console.log(obj);
    blogName.innerHTML = obj.blogName
    authorName.innerHTML = obj.name

    blogContainer.innerHTML = ""

    obj.blogPosts.forEach(function (blog) {
      blogContainer.innerHTML += `
      <li id="blog-${blog.id}">${blog.title}</li>
      `
    })

  }

  blogContainer.addEventListener('click', function (event) {
    if(event.target.tagName==="LI"){
      console.log(event.target);
      let blogId = event.target.id.split('-')[1]
      console.log(blogId);

      fetch(`http://localhost:3000/blogPosts/${blogId}?_embed=comments`)
      .then(res => res.json())
      .then(res => addComment(res.comments))

    }/// END IF STAT
  }) //// END BLOG CONTAINER EVENT

  function addComment(comments) {
    commentContainer.innerHTML = ""
    comments.forEach(function (comment) {
      commentContainer.innerHTML += `
        <li id="comment-${comment.id}">${comment.content}</li>
        <button id="btn-${comment.id}" class="delete-button">Delete</button>
      `
    })
  }

  commentContainer.addEventListener('click', function (event) {
    if(event.target.className === "delete-button"){

      let deleteId = event.target.id.split('-')[1]

      fetch(`http://localhost:3000/comments/${deleteId}`, {
        method: 'DELETE',
        headers: {'Accept': 'application/json',
                  'Content-Type': 'application/json'}
      }).then(console.log("DELETED!!!!"))///// END FETCH

      let deletedLI = document.querySelector(`#comment-${deleteId}`)
      let deletedBtn = document.querySelector(`#btn-${deleteId}`)
      deletedLI.remove();
      deletedBtn.remove();

    }//// END IF STAT


  })//// END COMMENT EVENT LISTENER




})///// END DOM CONTENT
