const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('login-btn');
const userDashboard = document.getElementById('user-dashboard');
const userUsername = document.getElementById('user-username');
const postContent = document.getElementById('post-content');
const postButton = document.getElementById('post-btn');
const postList = document.getElementById('post-list');
let currentUser = null;

loginButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username !== '') {
    currentUser = username;
    loginForm.style.display = 'none';
    userDashboard.style.display = 'block';
    userUsername.textContent = username;
    loadPosts();
  }
});

postButton.addEventListener('click', () => {
  const content = postContent.value.trim();
  if (content !== '') {
    const post = {
      username: currentUser,
      content: content,
      likes: 0,
      comments: [] // Initialize comments array
    };
    savePost(post);
    postContent.value = '';
    loadPosts();
  }
});

function savePost(post) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
  postList.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach((post, index) => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `
      <p><strong>${post.username}</strong>: ${post.content}</p>
      <button class="like-btn" data-index="${index}">Like (${post.likes})</button>
      <button class="comment-btn" data-index="${index}">Comment</button>
      <button class="emoji-btn" data-index="${index}">😊</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="share-btn" data-index="${index}">Share</button>
      <ul class="comments-list"></ul>
    `;
    
    post.comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.textContent = comment;
      postItem.querySelector('.comments-list').appendChild(commentItem);
    });

    postList.appendChild(postItem);
  });
}

function sharePost(content) {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this post',
      text: content,
      url: window.location.href
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert('Share functionality is not supported in this browser.');
  }
}

postList.addEventListener('click', (e) => {
  const index = e.target.getAttribute('data-index');
  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  if (e.target.classList.contains('like-btn')) {
    posts[index].likes += 1;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
  } else if (e.target.classList.contains('delete-btn')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
  } else if (e.target.classList.contains('share-btn')) {
    sharePost(posts[index].content);
  } else if (e.target.classList.contains('comment-btn')) {
    const comment = prompt('Add a comment:');
    if (comment) {
      posts[index].comments.push(comment);
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    }
  } else if (e.target.classList.contains('emoji-btn')) {
    const emoji = prompt('Choose an emoji:');
    if (emoji) {
      // Here you can handle the emoji reactions, for simplicity we’ll just log it
      console.log(`User reacted with: ${emoji}`);
    }
  }
});

if (localStorage.getItem('posts') === null) {
  localStorage.setItem('posts', JSON.stringify([]));
}
