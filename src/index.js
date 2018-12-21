document.addEventListener('DOMContentLoaded', function() {
  console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')
   document.getElementById("author-select").onchange=changeEventHandler;

      // authorSelect.addEventListener("click", function() {
      //   const options = authorSelect.querySelectorAll("option");
      // })
   


  let allBlogs = []
  const authorContainer = document.getElementById("author-container")
  const blogContainer = document.getElementById("blog-container")
  const commentContainer = document.getElementById("comment-container")

fetch("http://localhost:3000/authors")
  .then(function(response){ 
    console.log(response)
    return response.json()
  })
  .then(function(blogDataJson){
       allBlogs =blogDataJson
       console.table(allBlogs)
      showAllAuthor(allBlogs)
  })

  function changeEventHandler(event) {
    console.log(event)
    console.log(event.target)
     let options = event.target.querySelectorAll("option")
      console.log(options)
      if (options = "1"){
        let author= "May Cheung"
        return renderSingleAuthor(author)
      }
      else if (options = "2"){
        let author = "Natalie Perpepaj"
        return renderSingleAuthor(author)
      }
      else if (options = "3"){
        let author = "Laura Kim"
        return renderSingleAuthor(author)
      }
      else if (options = "4"){
        let author = "Brooke Yalof"
        return renderSingleAuthor(author)
      } else{ console.log('Please Select One')
      }
      }
    // You can use “this” to refer to the selected element.
    // if(!event.target.value) alert('Please Select One');
    // else if(event.target.value=== "Natalie Perpepaj"){

    // }; 


  function showAllAuthor(author){
    authorContainer.innerHTML = author.map(renderSingleAuthor)
  }

  function renderSingleAuthor(author){
    console.log("rending")
    return `
    <div id="author-container" author-id="author-${author.id}">
    <h3 id="blog-name">"${author.title}"</h3>
    <h4 id="author-name">"${author.name}"</h4>
  
    <ul id="blog-container">
      <li data-id="IDFORTHISPOST">May's Mind Your Manners</li>
      <li data-id="IDFORTHISPOST">May's Tips on How to Listen Well</li>
    </ul>
  </div>
    `
  }

  // function renderSingleComment(comment){
  //   return `
  //   <h4>Comments</h4>
  //   <ul id="comment-container">
  //     <li>
  //       first comment
  //       <button data-id="IDFORTHISCOMMENT">Delete</button>
  //     </li>
  //     <li>
  //       Oooh, thanks for sharing!
  //       <button data-id="IDFORTHISCOMMENT">Delete</button>
  //     </li>
  //     <li>
  //       So helpful!
  //       <button data-id="IDFORTHISCOMMENT">Delete</button>
  //     </li>
  //     <li>
  //       The best I've read in ages <3
  //       <button data-id="IDFORTHISCOMMENT">Delete</button>
  //     </li>
  //   </ul>
  //   `
  // }

  changeEventHandler()

},false);

