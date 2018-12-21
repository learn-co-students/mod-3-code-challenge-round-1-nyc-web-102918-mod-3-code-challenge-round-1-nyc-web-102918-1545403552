document.addEventListener('DOMContentLoaded', () => {
  //console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorSelect = document.getElementById("author-select")
  const authorContainer = document.getElementById("author-container")
  const blogContainer = document.getElementById("blog-container")
  const blogName = document.getElementById("blog-name")
  const authorName = document.getElementById("author-name")
  const commentContainer = document.getElementById("comment-container")

  // Get author's posts
  authorSelect.addEventListener("change", e => {
    let authorId

    switch (e.target.value) {
      case "1":
        authorId = e.target.value
        break
      case "2":
        authorId = e.target.value
        break
      case "3":
        authorId = e.target.value
        break
      case "4":
        authorId = e.target.value
        break
    }

    blogContainer.innerHTML = ""
    commentContainer.innerHTML = ""

    getPosts(authorId)
    .then(data => {
      blogName.innerText = data.blogName
      authorName.innerText = data.name
      const blogPosts = data.blogPosts
      blogPosts.forEach(post => {
        blogContainer.innerHTML += renderPost(post)
      })
    })
  })

  // Get post's comments
  blogContainer.addEventListener("click", e => {
    if (e.target.hasAttribute("data-post_id")) {
      const postId = e.target.dataset.post_id
      commentContainer.innerHTML = ""
      getComments(postId)
      .then(data => {
        const comments = data.comments
        if (comments.length === 0) {
          commentContainer.innerHTML += "<li>No Comments</li>"
        } else {
          comments.forEach(comment => {
            commentContainer.innerHTML += renderComment(comment)
          })
        }
      })
    }
  })

  // Delete comment
  commentContainer.addEventListener("click", e => {
    const targetLi = commentContainer.querySelector(`li[data-id="${e.target.dataset.id}"]`)
    if (e.target.dataset.action === "delete") {
      deleteComment(e.target.dataset.id)
      .then( targetLi.remove() )
    }
  })


  function Adapter(action, baseURL, query = "") {
    if (action === "get") {
      return function(id) {
        return fetch(baseURL+"/"+id+query).then(r => r.json())
      }
    } else if (action === "delete") {
      return function(id) {
        return fetch(baseURL+"/"+id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
      }
    }
  }

  function renderPost(post) {
    return `<li data-post_id="${post.id}">${post.title}</li>`
  }

  function renderComment(comment) {
    return `<li data-id="${comment.id}">${comment.content} <button data-action="delete" data-id="${comment.id}">Delete</button></li>`
  }


  const getPosts = Adapter("get","http://localhost:3000/authors/","?_embed=blogPosts")
  const getComments = Adapter("get","http://localhost:3000/blogPosts/", "?_embed=comments")
  const deleteComment = Adapter("delete","http://localhost:3000/comments/")


})
