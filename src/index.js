document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')


  const authorsDropdown = document.getElementById("author-dropdown")
  const authorContainer= document.getElementById("author-container")
  const blogName= document.getElementById("blog-name")
  const authorName = document.getElementById("author-name")
  const commentcontainer = document.getElementById("comment-container")
  let authorsData = []


  authorsDropdown.addEventListener('change', (e) => {
                const optionValue = e.target.value
              //  console.log(optionValue)

              fetch(`http://localhost:3000/authors/${optionValue}`, { method: 'get'})
                  .then(res => res.json())
                  .then(data => {
                      authorsData = data
                      console.log(data)
                          authorContainer.innerHTML = `Blog name: <h1 data-id="${data.id}">${data.blogName}</h1>
                                                      <br></br>
                                                       Name :<h1 id="${data.id}">${data.name}</h1>
                                                       <br></br>
                                                       blogPosts:<p>${data.title}</p>`

                })


}) // find event change


  authorContainer.addEventListener('click', (e) =>{
      console.log("Hello")
       console.log(e.target)


      let foundBlog = authorsData.find(author => {
         author.id == e.target.dataset.id
      })

                fetch(`http://localhost:3000/comments/${foundBlog}`)
                .then(response => json() )
                .then(dataComment => {
                  let commentList = document.createElement("li")

                  commentList.innerText = dataComment.content

                  let newDeleteButton = document.createElement("button")
                  newDeleteButton.className = "delete-comment"
                  newDeleteButton.innerText = "Delete"

                  commentList.append(newDeleteButton)
                  commentcontainer.append(commentList)

                })


  })


    authorContainer.addEventListener("click", () => {
          if (event.target.className === "delete-comment") {
              commentId = event.target.dataset.id
                  event.target.parentNode.remove()
                  fetch(`http://localhost:3000/comments/commentId`,
                    {
                      method: "DELETE"
                    })
          }
    })




}) // fin del evento
