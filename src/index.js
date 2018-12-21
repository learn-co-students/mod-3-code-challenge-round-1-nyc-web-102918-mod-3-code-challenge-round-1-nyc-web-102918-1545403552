document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')
  const authors = document.querySelector("#author-select")
  const author = document.querySelector("#author-container")
  const blogs = author.querySelector("#blog-container")
  const comments = document.querySelector("#comment-container")

  authors.addEventListener("input", e => {
  	fetch(`http://localhost:3000/authors/${e.target.value}?_embed=blogPosts`)
  		.then(r => r.json())
  		.then(r => {
  			author.querySelector("#blog-name").textContent = r.blogName
  			author.querySelector("#author-name").textContent = r.name

  			blogs.innerHTML = r.blogPosts.map(b => `
  				<li data-id=${b.id}>${b.title}</li>
  			`).join("\n")
  		})
  })

  blogs.addEventListener("click", e => {
  	fetch(`http://localhost:3000/blogPosts/${e.target.dataset.id}?_embed=comments`)
  		.then(r => r.json())
  		.then(r => {
  			comments.innerHTML = r.comments.map(c => `
  				<li id="c-${c.id}">
  					${c.content}
  					<button data-id=${c.id} data-action="delete">Delete</button>
  				</li>
  			`).join("\n")
  		})
  })

  comments.addEventListener("click", e=> {
  	if (e.target.dataset.action === "delete") {
  		fetch(`http://localhost:3000/comments/${e.target.dataset.id}`, {
  			method: "DELETE",
  			headers: {
  				'Accept': "application/json",
  				'Content-Type': "application/json"
  			}
  		})

  		comments.querySelector("#c-" + e.target.dataset.id).remove()
  	}
  })
})
