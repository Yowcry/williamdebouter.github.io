const targetDate = new Date(2022, 4, 14)
const yearsElement = document.querySelector('.years')
const daysElement = document.querySelector('.days')
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

const onStart = () => {
    setTimeout(function() {
        document.querySelector('#countup').classList.remove('hidden')
    }, 2000)
}

const onTick = ({ years, days, hours, minutes, seconds }) => {
    yearsElement.innerHTML = years
    daysElement.innerHTML = days
    hoursElement.innerHTML = hours
    minutesElement.innerHTML = minutes
    secondsElement.innerHTML = seconds
}

const options = new LsCountupOptions({ targetDate, onTick, onStart })
const countup = new LsCountup(options)

countup.start()
