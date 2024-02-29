const time = document.querySelector('#time')
const startBtn = document.querySelector('#start')
const pauseBtn = document.querySelector('#pause')
const resumeBtn = document.querySelector('#resume')
const stopBtn = document.querySelector('#stop')
const hourElement = document.querySelector('#hour')
const minuteElement = document.querySelector('#minute')
const secondElement = document.querySelector('#second')
const millisecondElement = document.querySelector('#millisecond')

let hours = 0
let minutes = 0
let seconds = 0
let milliseconds = 0
let intervalId
let isPaused = false

function startCount(){
    intervalId = setInterval(() =>{
        if(!isPaused){
            milliseconds += 10
            if(milliseconds == 1000){
                milliseconds = 0
                seconds ++
            }
    
            if(seconds == 60){
                seconds = 0
                minutes ++
                minuteElement.classList.add('blink')
                setTimeout(()=>{
                    minuteElement.classList.remove('blink')
                },2000)

            }
    
            millisecondElement.textContent = formatMilliseconds(milliseconds)
            secondElement.textContent = insertZero(seconds)
            minuteElement.textContent = insertZero(minutes)
            hourElement.textContent = insertZero(hours)
        }
    }, 10)
}

pauseBtn.addEventListener('click', () =>{
    isPaused = true
    pauseBtn.classList.add('hidden')
    resumeBtn.classList.remove('hidden')
})

startBtn.addEventListener('click', () =>{
    startBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden')
    isPaused = false
    startCount()
})

resumeBtn.addEventListener('click', () =>{
    isPaused = false
    resumeBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden')
})

stopBtn.addEventListener('click', stopTimer)


function stopTimer (){
    if(pauseBtn.classList.contains('hidden')){
        clearInterval(intervalId)
        millisecondElement.textContent = '000'
        secondElement.textContent = '00'
        minuteElement.textContent = '00'
        hourElement.textContent = '00'
        milliseconds = 0
        seconds = 0
        minutes = 0
        hours = 0

        startBtn.classList.remove('hidden')
        resumeBtn.classList.add('hidden')
        pauseBtn.classList.add('hidden')
    }
}

function insertZero (time){
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time){
    return time < 100 ? `${time}`.padStart(3,'0') : time
}