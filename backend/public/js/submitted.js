const redirectEl = document.getElementById('redirectEl');
let count = 0;
const countdown = setInterval(() => {
    count++;
    if (count >= 5) {
        window.location = '/';
    } else {
        redirectEl.innerHTML = parseInt(redirectEl.innerHTML) - 1;
    }
}, 1000);
