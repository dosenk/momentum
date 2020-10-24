export default class DateMomentum{
    static map = new Map(); 

    constructor(){
        this.timeBlock = document.querySelector('.momentum__time')
        this.dateBlock = document.querySelector('.momentum__date')
        this.helloBlock = document.querySelector('.momentum__hello_greeting')
        this.nextImgBlock = document.querySelector('.change-button')
        this.body = document.querySelector('.bodyBackground')
        this.firsLoad = true
        this.ArrForImg = this.getArrForImg()
        this.counterForChangeImg = 0
    }

    getRealTime = () => {
        return new Date();
    }

    displayDateTime = () => {
        this.dateBlock.innerHTML = this.getDate()
        this.timeBlock.innerHTML = this.getTime()
    }
    
    getDate(){
        let date = this.getRealTime()
        let month = date.toLocaleString('en-US', {
            month: 'long'
        });
        let weekDay = date.toLocaleString('en-US', {
            weekday: 'long'
        });
        let day = date.getDay();
        return `${weekDay}, ${day} ${month}` 
    }

    getTime = () => {
        let date = this.getRealTime()
        let time = date.toLocaleString('en-GB', {
            hour:  'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        let objTime = {
            hour:  date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        }

        this.setHelloImgOfDay(objTime)
        return time;
    }

    displayMainImage = (timesOfDay, image) => {
            this.helloBlock.innerText = 'Good ' + timesOfDay + ',';
            let src = `/src/assets/images/${timesOfDay.toLowerCase()}/${image}.jpg`
            const img = document.createElement('img');
            img.src = src;
            img.onload = () => {    
                this.body.style.backgroundImage = `url(${src})`;  
                // body.style.backgroundImage = `url(${src})`;
            }; 
    }

    setHelloImgOfDay = (objTime) => {
        
        let timesOfDay;
        let nextTime;
        if(objTime.hour >= 6 && objTime.hour <= 11) {
            timesOfDay = 'Morning';
            this.nextTime = 12;
        } else if(objTime.hour >= 12 && objTime.hour <= 17) {
            timesOfDay = 'Afternoon';
            this.nextTime = 18;
        } else if(objTime.hour >= 18 && objTime.hour <= 23) {
            timesOfDay = 'Evening';
            this.nextTime = 0;
        } else if(objTime.hour >= 0  && objTime.hour <= 5) {
            timesOfDay = 'Night';
            this.nextTime = 6
        }

        if (objTime.minute === 0 && objTime.second === 0) {
            console.log(objTime, timesOfDay);
            this.objTime = objTime
            this.displayMainImage(timesOfDay.toLowerCase(), this.ArrForImg[0])
            this.changeArrForImg()
        }

        if (this.firsLoad) {
            this.objTime = objTime
            this.displayMainImage(timesOfDay.toLowerCase(), this.ArrForImg[0])
            this.firsLoad = false
            this.changeArrForImg()
        }
        
        return timesOfDay;
    }

    getArrForImg = () => {
        let arrMain = []
        let num
        for (let i = 1; i <= 20; i++) {
            if (i < 10) num = (`0${i}`)
            else num = i
            arrMain.push(num)
        }
        return arrMain.sort(() => Math.random() - 0.5);
    }

    changeArrForImg = () => {
        let first = this.ArrForImg.shift()
        this.ArrForImg.push(first)
    }

    setListener = () => {
        let hour = this.objTime.hour
        this.nextImgBlock.addEventListener('click', (e)=> {
            if (hour >= 23) hour = -1
            hour++
            let objTime = {
                hour:  hour,
                minute: 0,
                second: 0,
            }
            this.setHelloImgOfDay(objTime)
        })
    }
}