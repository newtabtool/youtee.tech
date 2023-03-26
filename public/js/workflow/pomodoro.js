const clock = document.getElementById('clock');
const contClock = document.getElementById('cont-clock');
const playPomorodoButton = document.getElementById('play-pomodoro');
const pausePomorodoButton = document.getElementById('pause-pomodoro');
let currentTimeSeconds = 0;
let currentTimeMinutes = 00;
let pomodoroTimer;
let breaks = 0;
let isBigBreak = false;
let isBreak = false;
function startPomodoro() {
    document.getElementById('conteiner-clock').innerHTML = `
            <div class="conteiner-clock work" id="cont-clock">

        <button onclick="pomodoro()" id="play-pomodoro" class="hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            </svg></button>


        <button onclick="pausePomodoro()" id="pause-pomodoro" class="hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
            </svg></button>


        <button onclick="restartPomodoro()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path
                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg></button>

        <b id="clock"></b>
        <button id="closePomodoro" onclick="closePomodoro()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>
</button>
    </div>
            `
    pomodoro()

}
function pausePomodoro() {
    document.getElementById('play-pomodoro').classList.remove('hidden');
    document.getElementById('pause-pomodoro').classList.add('hidden');
    clearInterval(pomodoroTimer);
}
function closePomodoro(){
    document.getElementById('cont-clock').remove();
    currentTimeMinutes = 0;
    currentTimeSeconds = 0;
    breaks = 0;
    isBigBreak = false;
    isBreak = false;
    clearInterval(pomodoroTimer); 0
}
function restartPomodoro() {
    currentTimeMinutes = 0;
    currentTimeSeconds = 0;
    breaks = 0;
    isBigBreak = false;
    isBreak = false;
    clearInterval(pomodoroTimer); 0
    pomodoro()
}
function pomodoro() {
    document.getElementById('pause-pomodoro').classList.remove('hidden');
    document.getElementById('play-pomodoro').classList.add('hidden');

    pomodoroTimer = setInterval(() => {

        if (!isBreak && !isBigBreak) {
            currentTimeSeconds++;
            if (currentTimeSeconds < 10) {
                document.getElementById('clock').textContent = currentTimeMinutes + ':0' + currentTimeSeconds + ' - Foco';
            } else {
                document.getElementById('clock').textContent = currentTimeMinutes + ':' + currentTimeSeconds + ' - Foco';
            }
            if (currentTimeSeconds === 60) {
                currentTimeMinutes++;
                currentTimeSeconds = 0;
            }
            if (currentTimeMinutes === 25) {
                isBreak = true;
                console.log("pausar trabalho")
                currentTimeMinutes = 0;
                currentTimeSeconds = 0;
                breaks++;
            }
        }
        if (isBreak) {
            contClock.classList.remove('work')
            contClock.classList.add('pause')
            currentTimeSeconds++;
            if (currentTimeSeconds < 10) {
                document.getElementById('clock').textContent = currentTimeMinutes + ':0' + currentTimeSeconds + ' - Descanso';
            } else {
                document.getElementById('clock').textContent = currentTimeMinutes + ':' + currentTimeSeconds + ' - Descanso';
            }
            if (currentTimeSeconds === 60) {
                currentTimeMinutes++;
                currentTimeSeconds = 0;
            }
            if (currentTimeMinutes === 5) {
                isBreak = false;
                console.log("voltar ao trabalho");
                currentTimeMinutes = 0;
                currentTimeSeconds = 0;
                breaks++;
                contClock.classList.remove('pause')
                contClock.classList.add('work')

            }
            if (breaks === 3) {
                isBigBreak = true;
                isBreak = false;
                currentTimeMinutes = 0;
                currentTimeSeconds = 0;

            }
        }

        if (isBigBreak) {
            contClock.classList.remove('work')
            contClock.classList.add('break')
            currentTimeSeconds++;
            if (currentTimeSeconds < 10) {
                document.getElementById('clock').textContent = currentTimeMinutes + ':0' + currentTimeSeconds + ' - Pausa';
            } else {
                document.getElementById('clock').textContent = currentTimeMinutes + ':' + currentTimeSeconds + ' - Pausa';
            }
            if (currentTimeSeconds === 60) {
                currentTimeMinutes++;
                currentTimeSeconds = 0;
            }
            if (currentTimeMinutes === 30) {
                isBreak = false;
                isBigBreak = false;
                currentTimeMinutes = 0;
                currentTimeSeconds = 0;
                breaks = 0;
                contClock.classList.remove('break')
                contClock.classList.add('work')
            }
        }
    }, 1000)
}