const targetDate = new Date(2022, 3, 11, 0, 0, 0);

const yearsElement   = document.querySelector('.years');
const daysElement    = document.querySelector('.days');
const hoursElement   = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');

const compactElement = document.querySelector('.compact');

const pad = (n, size) => String(n).padStart(size, '0');

const onStart = () => {
  setTimeout(() => {
    document.querySelector('#countup').classList.remove('hidden');
  }, 2000);
};

const onTick = ({ years, days, hours, minutes, seconds }) => {

  yearsElement.textContent   = pad(years, 2);
  daysElement.textContent    = pad(days, 3);
  hoursElement.textContent   = pad(hours, 2);
  minutesElement.textContent = pad(minutes, 2);
  secondsElement.textContent = pad(seconds, 2);

  if (compactElement) {
    compactElement.textContent = `${pad(years, 2)}y${pad(days, 3)}d${pad(hours, 2)}h`;
  }
};

const options = new LsCountupOptions({ targetDate, onTick, onStart });
const countup = new LsCountup(options);
countup.start();