document.addEventListener('DOMContentLoaded', () => {
    const numPlayersInput = document.getElementById('numPlayers');
    const timerTimeInput = document.getElementById('timerTime');
    const createTimersButton = document.getElementById('createTimers');
    const startTimersButton = document.getElementById('startTimers');
    const nextTimerButton = document.getElementById('nextTimer');
    const timersContainer = document.getElementById('timersContainer');

    let timers = [];
    let currentPlayer = 0;
    let timerInterval;

    createTimersButton.addEventListener('click', () => {
        const numPlayers = parseInt(numPlayersInput.value);
        const timeInSeconds = parseInt(timerTimeInput.value);

        // Clear existing timers
        timersContainer.innerHTML = '';

        timers = Array(numPlayers).fill(timeInSeconds);
        currentPlayer = 0;

        for (let i = 0; i < numPlayers; i++) {
            const timerElement = document.createElement('div');
            timerElement.className = 'timer';
            timerElement.id = `timer-${i}`;
            timerElement.textContent = timeInSeconds;
            timersContainer.appendChild(timerElement);
        }

        startTimersButton.disabled = false;
        nextTimerButton.disabled = true;
    });

    startTimersButton.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        startTimer(currentPlayer);
        nextTimerButton.disabled = false;
    });

    nextTimerButton.addEventListener('click', () => {
        stopTimer();
    });

    function startTimer(playerIndex) {
        const timerElement = document.getElementById(`timer-${playerIndex}`);
        const timeInSeconds = timers[playerIndex];
        let timeLeft = timeInSeconds;

        timerElement.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timers[playerIndex] = 0;
                if (timers.every(time => time === 0)) {
                    alert('Game Over');
                    return;
                }
                currentPlayer = (currentPlayer + 1) % timers.length;
                while (timers[currentPlayer] === 0) {
                    currentPlayer = (currentPlayer + 1) % timers.length;
                }
                startTimer(currentPlayer);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timers[currentPlayer] = document.getElementById(`timer-${currentPlayer}`).textContent;
        currentPlayer = (currentPlayer + 1) % timers.length;
        while (timers[currentPlayer] === 0) {
            currentPlayer = (currentPlayer + 1) % timers.length;
        }
        startTimer(currentPlayer);
    }
});