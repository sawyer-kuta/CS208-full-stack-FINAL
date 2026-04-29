async function loadComments() {
    const response = await fetch('/api/comments');
    const data = await response.json();
    const list = document.getElementById('comments-list');
    list.innerHTML = '';

     if (data.comments.length === 0) {
        list.innerHTML = '<p>No comments yet. Be the first!</p>';
        return;
    }

    for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        const div = document.createElement('div');
        const date = new Date(comment.created_at).toLocaleDateString();
        div.innerHTML = `
            <strong>${comment.name}</strong>
            <p>${comment.message}</p>
            <small>${date}</small>
        `;
        list.appendChild(div);
    }
}

const form = document.getElementById('commentForm');
form.addEventListener('submit', commentHandler);

async function commentHandler(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, message: message })
    });

    if (response.ok) {
        loadComments();
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    } else {
        const data = await response.json();
        document.getElementById('error-message').textContent = data.error;
    }
}

loadComments();