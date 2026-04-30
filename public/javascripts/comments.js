let page = 1;

async function loadComments() {
    const response = await fetch(`/api/comments?page=${page}`);
    const data = await response.json();
    const list = document.getElementById('comments-list');

    if (page === 1) {
        list.innerHTML = '';
    }

    if (data.comments.length === 0 && page === 1) {
        list.innerHTML = '<p>No comments yet.</p>';
        return;
    }

    for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        const div = document.createElement('div');

        const nameEl = document.createElement('strong');
        nameEl.textContent = comment.name;

        const msgEl = document.createElement('p');
        msgEl.textContent = comment.message;

        const dateEl = document.createElement('small');
        dateEl.textContent = new Date(comment.created_at).toLocaleDateString();

        div.appendChild(nameEl);
        div.appendChild(msgEl);
        div.appendChild(dateEl);

        list.appendChild(div);
    }
}

const form = document.getElementById('commentForm');
form.addEventListener('submit', commentHandler);

const formButton = document.getElementById('commentForm');
const button = formButton.querySelector('button');

async function commentHandler(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    button.disabled = true;

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message })
        });

        if (response.ok) {
            loadComments();
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
            document.getElementById('error-message').textContent = '';
        } else {
            const data = await response.json();
            document.getElementById('error-message').textContent = data.error;
        }

    } finally {
        button.disabled = false;
    }
}

document.getElementById('loadMore').addEventListener('click', () => {
    page++;
    loadComments();
});

loadComments();