const doneBtn = document.getElementById('done-btn');

doneBtn.addEventListener('click', () => {window.electronAPI.loadPage("index.html")})