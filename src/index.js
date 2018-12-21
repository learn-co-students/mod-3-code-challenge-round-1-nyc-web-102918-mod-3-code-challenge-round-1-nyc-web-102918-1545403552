document.addEventListener('DOMContentLoaded', () => {
  let author = []
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')

  const authorSelect = document.querySelector("#author-select")
  const authorContainer = document.querySelector("#author-container")
  const blogContainer = document.querySelector("#blog-container")
  const commentContainer = document.querySelector("#comment-container")

  authorSelect.addEventListener("change", (event) => {
    authorId = event.target.value

    fetch (`http://localhost:3000/authors/${authorId}?_embed=blogPosts`)
      .then(response => response.json())
      .then(authorData => {
        author = authorData
        authorContainer.innerHTML +=
          `<div id="author-container">
            <h3 id="blog-name">${author.blogName}</h3>
            <h4 id="author-name">${author.name}</h4>

            <ul id="blog-container">

            </ul>
          </div>
          `

        //I got everything to console.log, but it wouldn't show up on the page!!! AAAAGHHH!!! *_*

          console.log(author)
          const blogPosts = author.blogPosts
          blogPosts.forEach(blog => {
            const newLi = document.createElement("li")
            newLi.innerText = blog.title
            newLi.dataset.id = blog.id
            console.log(newLi)
            blogContainer.appendChild(newLi)
            console.log(blogContainer)
        })
      })

      //I have to attach the blog id to each post so that when I add an event listener click to each blog title, I can access the comments associated with that blog.
      // blogContainer.addEventListener("click", (event) => {
      //   if (event.target.tagName === "LI") {
      //     commentContainer.innerHTML +=
      //       `
      //       <h4>Comments</h4>
      //         <ul id="comment-container">
      //           <li>
      //             first comment
      //             <button data-id="IDFORTHISCOMMENT">Delete</button>
      //           </li>
      //           <li>
      //             Oooh, thanks for sharing!
      //             <button data-id="IDFORTHISCOMMENT">Delete</button>
      //           </li>
      //           <li>
      //             So helpful!
      //             <button data-id="IDFORTHISCOMMENT">Delete</button>
      //           </li>
      //           <li>
      //             The best I've read in ages <3
      //             <button data-id="IDFORTHISCOMMENT">Delete</button>
      //           </li>
      //         </ul>
      //       `
      //   }
      // })


      //addEventListener to the comment-container, if they clicked on the delete button, removechild for the specific li





  }) //authorSelect.addEventListener("change", (event) => {

})//document.addEventListener('DOMContentLoaded', () => {
