const ul = document.getElementById('ul-element');
const addTask = document.getElementById('add-task-btn');
const inputTask = document.getElementById('input-task');
const progressBar = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressStats = document.getElementById('progress-stats');
const backBtn = document.getElementById('back-btn');

let percentage = 0;

const taskInTotal = {
    'pending': 0,
    'done':0,
}

backBtn.addEventListener('click', ()=> window.electronAPI.loadPage('index.html'))

function eliminateTask(element) {
    let elementStyle = element.style.textDecoration === 'line-through';

    element.style.textDecoration = elementStyle ? 'none' : 'line-through';
    elementStyle ? taskInTotal['done'] -=1 : taskInTotal['done'] +=1
    console.log(taskInTotal);
    progressStats.textContent = `Tasks Done: ${taskInTotal['done']}/${taskInTotal['pending']}`;
    return taskPercentage()
}

function taskPercentage() {
    const inProgress = ul.childElementCount;
    taskInTotal['pending'] = inProgress;
    console.log(taskInTotal)
    percentage = (taskInTotal['done']/taskInTotal['pending'])*100
    progressStats.textContent = `Tasks Done: ${taskInTotal['done']}/${taskInTotal['pending']}`;
    if (percentage > 0 && percentage < 50) {
        progressText.textContent = 'Keep Up!';
    } else if (percentage >= 50 && percentage < 100) {
        progressText.textContent = 'Yuhuuu!';
    } else if (percentage === 100) {
        progressText.textContent = 'Horaay!';
    } else {
        progressText.textContent = '';
    }

    console.log(percentage)
    return progressBar.style.width = `${percentage}%`;
}

addTask.onclick = () => {
    if (ul.childElementCount == 20 || inputTask.value === '') {
        return;
    }
    
    const icon = document.createElement('i');
    icon.className = "fa-solid fa-pen-to-square";
    icon.style.marginRight = '0.5rem';

    const removeTask = document.createElement('i');
    removeTask.className = "fa-solid fa-xmark";
    removeTask.style.marginLeft = '12px';
    removeTask.style.color = 'red';
    removeTask.style.cursor = 'pointer';
    removeTask.onclick = () => {
        ul.removeChild(li);
        taskPercentage();
    }

    const span = document.createElement('span');
    span.textContent = inputTask.value;
    span.style.cursor = 'pointer';
    span.onclick = () => {
        eliminateTask(span);
        if (span.style.textDecoration === 'line-through') {
            removeTask.style.color = 'black';
            removeTask.style.pointerEvents = 'none';
        } else {
            removeTask.style.color = 'red';
            removeTask.style.cursor = 'pointer';
            removeTask.style.pointerEvents = 'auto';
        }
    }

    const li = document.createElement('li');
    li.appendChild(icon);
    li.appendChild(span);
    li.appendChild(removeTask);
    ul.append(li);
    
    ul.scrollTop = ul.scrollHeight;
    inputTask.value = ''
    taskPercentage();
}

const popupWindow = document.getElementById('overlay');
const finishBtn = document.getElementById('finish-task-btn');
const closeCustomAlert = document.getElementById('close-alert-btn');
const submitTaskBtn = document.getElementById('submit-task-btn');


finishBtn.addEventListener('click', () => {
    popupWindow.style.display = 'flex';
})

closeCustomAlert.addEventListener('click', () => {
    popupWindow.style.display = 'none';
});

submitTaskBtn.addEventListener('click', () => {
    if (percentage == 100) {
        return window.electronAPI.loadPage("success_page.html");
    }
    return window.electronAPI.loadPage("failed_page.html");
})