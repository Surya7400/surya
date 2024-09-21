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
      likes: 0 // Initialize likes count
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
      <button class="view-btn" data-index="${index}">View</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="share-btn" data-index="${index}">Share</button>
    `;
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
  } else if (e.target.classList.contains('edit-btn')) {
    const newContent = prompt('Edit your post:', posts[index].content);
    if (newContent !== null) {
      posts[index].content = newContent;
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    }
  } else if (e.target.classList.contains('delete-btn')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
  } else if (e.target.classList.contains('share-btn')) {
    sharePost(posts[index].content);
  } else if (e.target.classList.contains('view-btn')) {
    alert(`Post Content:\n\n${posts[index].content}`);
  }
});

if (localStorage.getItem('posts') === null) {
  localStorage.setItem('posts', JSON.stringify([]));
}
