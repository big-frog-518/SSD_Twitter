window.onload = function () {

    document.getElementById('login').onclick = login;


}

async function login(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    
    if(response.status === 200) {
        sessionStorage.setItem('accessToken', result.token);
        location.href = 'index.html';
    } else {
        document.getElementById('error').innerText = result.error;
    }


}