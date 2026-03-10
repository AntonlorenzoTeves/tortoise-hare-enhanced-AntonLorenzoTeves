//render the track
//start the race with a button click
//trigger the move every secodn (setINternval())
//move the tortoise randomly (Math.random())
//move the hare randomly
//fix the position if they go beuonf the range ( 0 , -70)
//render the track with the new positions
//when one of the animals reach 70+, show result ,message

const TRACK_length = 70
const startBtn = document.getElementById('startBtn');
const messageEl = document.getElementById('message');
const trackEl = document.getElementById('track');
const tWinstotal = document.getElementById('t-wins');

let tPoints = 0;
let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let stepCount = 0;

startBtn.addEventListener("click",startRace)

function startRace(){
    messageEl.textContent = "Bang!!! look at them go"

    startBtn.disabled = true;

    //avoid double tracks   
    if (raceIntervalId !== null){
        clearInterval(raceIntervalId)
    }
    raceIntervalId = setInterval(raceStep,1000)
}

function raceStep(){
    stepCount += 1
    //move the tortoise randomly
    moveTortoise()
    // move the hare randomly
    moveHare()
    //fix the position if the go beyond the range (0 , -70)
    clampPositions()

    //when one fo the animals reach 70+, show result message
    if(tortoisePosition >= TRACK_length){
        clearInterval(raceIntervalId)
        raceIntervalId = null
        showResult()
        startBtn.disabled = false
    }
    //render the reack with the new positions
    renderTrack()
}

function moveTortoise(){
    let roll = Math.floor(Math.random()* 10) + 1

    if (roll >=1 && roll <= 5){
        // 1 - 5 fast plod
        tortoisePosition +=4
    } else if (roll >= 6 && roll <= 7){
        tortoisePosition -=5
    } else{
        tortoisePosition += 1
    }
}

function moveHare(){
       let roll = Math.floor(Math.random()* 10) + 1

    if (roll >=1 && roll <= 2){
        // 1 - 5 fast plod
    } else if (roll >= 3 && roll <= 4){
        harePosition +=5   
    }else if (roll >= 5 && roll <= 6){
        harePosition +=3 
    }else if (roll >= 7 && roll <= 8){
        harePosition -=5   
    } else{
        harePosition += 1
    } 
}

function clampPositions(){
    tortoisePosition = Math.min(TRACK_length, Math.max(1, tortoisePosition))
    harePosition = Math.min(TRACK_length,Math.max(1,harePosition))
}

function renderTrack(){
    trackEl.innerHTML = ''

    for (let i = 1; i <= TRACK_length; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')

        let isTortoiseHere = tortoisePosition === i
        let isHareHere = harePosition === i

        if(isTortoiseHere && isHareHere){
            cell.classList.add('both')
            cell.textContent = '🔥'
        }else if (isTortoiseHere){
            cell.classList.add('Tortoise')
            cell.textContent = '🐢'
        }else if (isHareHere){
            cell.classList.add('Hare')
            cell.textContent = '🐇'
        }
            trackEl.appendChild(cell)
    }
}

function showResult(){
    if ( tortoisePosition >= TRACK_length && harePosition >= TRACK_length){
        messageEl.textContent = "It's a tie"
    } else if (tortoisePosition >= TRACK_length){
                tPoints++;
                tWinstotal.textContent = `Tortoise wins: ${tPoints}`;
    } else if (harePosition >= TRACK_length){
                messageEl.textContent = "Hare wins"
    } else {
                        messageEl.textContent = "Race has stopped"

    }
}

renderTrack();