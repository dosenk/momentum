/* eslint-disable class-methods-use-this */
export default class DateMomentum {
  constructor() {
    this.timeBlock = document.querySelector('.momentum__time');
    this.dateBlock = document.querySelector('.momentum__date');
    this.helloBlock = document.querySelector('.momentum__hello_greeting');
    this.nextImgBlock = document.querySelector('.change-button');
    this.body = document.querySelector('.bodyBackground');
    this.firsLoad = true;
    this.ArrForImg = this.getArrForImg();
  }

  getRealTime = () => {
    const date = new Date();
    const realTime = date.toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    const objTime = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      realTime,
    };
    return objTime;
  }

  getRealDate = () =>{
    const date = new Date();
    const month = date.toLocaleString('en-US', {
      month: 'long',
    });
    const weekDay = date.toLocaleString('en-US', {
      weekday: 'long',
    });
    const day = date.toLocaleString('en-US', {
      day: 'numeric',
    });
    return `${weekDay}, ${day} ${month}`;
  }

  // запускаем эту функцию раз в секунду
  displayDateTime = () => {
    const objRealTime = this.getRealTime();
    this.dateBlock.innerHTML = this.getRealDate();
    this.timeBlock.innerHTML = objRealTime.realTime;
    this.setHelloImgOfDay(objRealTime);
  }

  displayMainImage = (timesOfDay, image) => {
    // this.helloBlock.innerText = 'Good ' + timesOfDay + ',';
    const src = `./images/${timesOfDay.toLowerCase()}/${image}.jpg`;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      this.body.style.backgroundImage = `url(${src})`;
    };
  }

  displayMainHello = (timesOfDay) => {
    this.helloBlock.innerText = `Good ${timesOfDay}, `;
  }

  // получить: Morning, Afternoon, Evening, Night
  getTimesOfDay(objTime) {
    let timesOfDay;
    if (objTime.hour >= 6 && objTime.hour <= 11) {
      timesOfDay = 'Morning';
      this.nextTime = 12;
    } else if (objTime.hour >= 12 && objTime.hour <= 17) {
      timesOfDay = 'Afternoon';
      this.nextTime = 18;
    } else if (objTime.hour >= 18 && objTime.hour <= 23) {
      timesOfDay = 'Evening';
      this.nextTime = 0;
    } else if (objTime.hour >= 0 && objTime.hour <= 5) {
      timesOfDay = 'Night';
      this.nextTime = 6;
    }
    return timesOfDay;
  }

  // устанавливает картинку и приветсвие
  setHelloImgOfDay = (objTime) => {
    let timesOfDay;
    if (objTime.minute === 0 && objTime.second === 0) {
      timesOfDay = this.getTimesOfDay(objTime);
      this.objTime = objTime;
      this.displayMainImage(timesOfDay.toLowerCase(), this.ArrForImg[0]);
      this.displayMainHello(timesOfDay.toLowerCase());
      this.changeArrForImg();
    }
    if (this.firsLoad) {
      timesOfDay = this.getTimesOfDay(objTime);
      this.objTime = objTime;
      this.displayMainImage(timesOfDay.toLowerCase(), this.ArrForImg[0]);
      this.displayMainHello(timesOfDay.toLowerCase());
      this.firsLoad = false;
      this.changeArrForImg();
    }
  }

  getArrForImg = () => {
    const arrMain = [];
    let num;
    for (let i = 1; i <= 20; i += 1) {
      if (i < 10) num = (`0${i}`);
      else num = i;
      arrMain.push(num);
    }
    return arrMain.sort(() => Math.random() - 0.5);
  }

  changeArrForImg = () => {
    const first = this.ArrForImg.shift();
    this.ArrForImg.push(first);
  }

  setListener = () => {
    let { hour } = this.objTime; // текущий час для смены картинки

    this.nextImgBlock.addEventListener('click', () => {
      if (hour >= 23) hour = -1;
      hour += 1;
      const objTime = {
        hour,
        minute: 0,
        second: 0,
      };
      this.displayMainImage(this.getTimesOfDay(objTime).toLowerCase(), this.ArrForImg[0]);
      this.changeArrForImg();
      // this.setHelloImgOfDay(objTime) //если нужно менять приветсвие
    });
  }
}
