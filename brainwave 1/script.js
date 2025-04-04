/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("username")) {
        document.getElementById("welcome").innerText = "Welcome, " + localStorage.getItem("username");
        document.getElementById("auth").style.display = "none";
        document.getElementById("blog").style.display = "block";
    }
    displayPosts();
});

function login() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a username.');
        return;
    }
    document.getElementById('welcome').innerText = `Welcome, ${username}!`;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('blog').style.display = 'block';
    document.querySelector('button[onclick="logout()"]').style.display = 'inline-block';
}

function logout() {
    document.getElementById('username').value = '';
    document.getElementById('welcome').innerText = '';
    document.getElementById('auth').style.display = 'block';
    document.getElementById('blog').style.display = 'none';
    document.querySelector('button[onclick="logout()"]').style.display = 'none';
}

function createPost() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    if (!title || !content) {
        alert('Please fill in both the title and content.');
        return;
    }

    const post = {
        title,
        content,
        timestamp: new Date().toLocaleString(),
    };

    // Save to local storage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Update UI
    displayPosts();
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}

function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted on: ${post.timestamp}</small>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}
