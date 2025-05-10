const beginBtn = document.getElementById("begin-btn");
        beginBtn.onclick = () => {
            window.electronAPI.loadPage("main_menu.html");
        }