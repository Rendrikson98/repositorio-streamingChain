let hour: number = 0;
let minute: number = 0;
let second: number = 0;
export let total: number = 0;
let cron: NodeJS.Timeout;

let views: number = 0;

export const start = () => {
  pause();
  cron = setInterval(() => {
    timer();
    console.log(timer());
    // console.log(cron);
  }, 1000);
};

export const pause = () => {
  clearInterval(cron);
};

export const reset = () => {
  hour = 0;
  minute = 0;
  second = 0;
};

const timer = () => {
  second += 0.5;
  /*if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  total = `${hour}:${minute}:${second}`;*/
  total = second;
  return total;
};

const handleClose = () => {
  console.log(total)
}