// const calendarBtn = document.getElementById('calendar-btn');
const backBtn = document.getElementById('back-btn');

// Update date display
function updateDateDisplay() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = now.getFullYear();
    
    document.querySelector('.date-day').textContent = `${day} ${month}`;
    document.querySelector('.date-year').textContent = year;
}

// calendarBtn.addEventListener('click', () => {
//     window.electronAPI.loadPage("calendar.html");
// });

backBtn.addEventListener('click', () => {
    window.electronAPI.loadPage("index.html");
});

// Initialize date display
updateDateDisplay();