# JavaScript Code Challenge

## Objectives

- DOM Manipulation
- Events and Event Handlers
- Callbacks
- Fetching from APIs

## Instructions

Today we're building BlogN, an app for blogging.

A BlogN user will be able to do the following things:

  - As a user, when the page loads I will see a blank page with a dropdown menu listing current blog authors.

  - As a user, when I select a blog author from a dropdown menu, I will see a title for all their blog posts.

  - As a user, when I click on a blog post title, I will view all the comments for that blog post.

  - As a user, when I click on a delete button for a comment, it should delete the comment.

## Functionality demo
  ![Example](./example.gif "Example Functionality")

Please look at the starter code in `index.html` before you begin.

## The API

Instead of actually accessing the data from a remote API, this challenge uses a package called [json-server](https://github.com/typicode/json-server) to create a fake API for development and testing.

It is very easy to set-up.

1 - Run the command `$ npm install -g json-server` in the command line from this directory

2 - Run  `$ json-server --watch db.json`

That's it. You will have a server running on `localhost:3000` that serves the JSON data contained in the `db.json` file.

*Troubleshooting: If this fails, be sure you don't already have something running on port 3000*

---

## Deliverables and How to Approach

For this challenge it is important to work iteratively, one feature at a time, before moving on to the next. You should **prioritize making code that works over attempting all of the deliverables. Don't try to get too fancy too fast! Just get something working!**

---

### Step 1 - Get Blog Posts for a Single Blog

When an author is selected from the dropdown, make a Fetch request to retrieve all their blog posts. If you aren't sure how to listen for a dropdown change event, try reading documentation on [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/change).

#### API Docs
#### Endpoint to show an author's blog posts
This request returns all the blog posts for an author with ID `1`. **You must dynamically make this `GET` request to the correct author id whenever an author is selected from the dropdown.**

```js
GET 'http://localhost:3000/authors/1?_embed=blogPosts'
```

```json
Example Response:
{
  "name": "May Cheung",
  "id": 1,
  "blogPosts": [
    {
      "title": "May's Mind Your Manners",
      "authorId": 1,
      "id": 1
    }, {
      "title": "May's Tips on How to Listen Well",
      "authorId": 1,
      "id": 5
    }
  ]
}
```

---

Some notes about this particular API:
  - A `GET` request to `http://localhost:3000/authors/1` will return something like this:
```json
{
  "blogName": "Well-Mannered with May",
  "name": "May Cheung",
  "id": 1
}
```
  - However, we need more than just the blog name and author name. We also need this author's blog posts.
  - In order to tell our server to send that data as well, we need to send a url param that will also send blogposts:
  - `GET` to `http://localhost:3000/authors/1?_embed=blogPosts` will return that author's posts (see the previous snippet for a sample response).

---

Use the data from the API response to append the information to the DOM. You will need to add to the `author-container`:

- the blog name
- the author's name
- the title for each blog entry

Your `author-container` _could_ look something like this:

```html
<div id="author-container">
  <h3 id="blog-name">Well-Mannered with May</h3>
  <h4 id="author-name">May Cheung</h4>

  <ul id="blog-container">
    <li data-id="IDFORTHISPOST">May's Mind Your Manners</li>
    <li data-id="IDFORTHISPOST">May's Tips on How to Listen Well</li>
  </ul>
</div>
```

(If you cannot get your fetch request to work correctly you can always paste the sample response above into your file and append that data to the DOM.)

---

### Step 2 - Get Comments for a Single Blog Post

When a user clicks on a blog post, make a `fetch` request to retrieve all the comments for that blog post.

#### API Docs
#### Endpoint to show a blog post's comments:
This request returns all the comments with a blogPost `id` of `1`. You must dynamically make this request to the correct blogPost `id` whenever a blog post title is clicked on.

```js
GET 'http://localhost:3000/blogPosts/1?_embed=comments'
```

Example Response:
```json
{
  "title": "May's Mind Your Manners",
  "authorId": 1,
  "id": 1,
  "comments": [
    {
      "content": "first comment!",
      "blogPostId": 1,
      "id": 1
    },
    {
      "content": "Oooh, thanks for sharing!",
      "blogPostId": 1,
      "id": 2
    },
    {
      "content": "The best I've read in ages <3",
      "blogPostId": 1,
      "id": 4
    }
  ]
}
```

Use the data from the API response to append the information to the DOM. You will need to add the comment content to the comment-container.

The HTML for your `comment-container` might look something like this:

```html
<h4>Comments</h4>
<ul id="comment-container">
  <li>
    first comment
    <button data-id="IDFORTHISCOMMENT">Delete</button>
  </li>
  <li>
    Oooh, thanks for sharing!
    <button data-id="IDFORTHISCOMMENT">Delete</button>
  </li>
  <li>
    So helpful!
    <button data-id="IDFORTHISCOMMENT">Delete</button>
  </li>
  <li>
    The best I've read in ages <3
    <button data-id="IDFORTHISCOMMENT">Delete</button>
  </li>
</ul>
```

---

### Step 3 - Delete Comments

When a user clicks on a button next to a comment, an http request should be sent to the server to delete that comment.

That comment should also be removed from the DOM.

#### API Docs
#### Endpoint to delete a comment

```js
DELETE 'http://localhost:3000/comments/1'

Required Headers:
{
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

Example Response:
{}

```

This request deletes the comment with id 1. You must dynamically make this request to the correct comment id whenever a comment delete button is clicked on.

Whether or not the DELETE request was successful, the API will return `{}`. To confirm if the comment was deleted, try to view it at `http://localhost:3000/comments/:id`.
