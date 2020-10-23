
export default class DateMomentum{
    static map = new Map(); 

    constructor(){
        this.timeBlock = document.querySelector('.momentum__time')
        this.dateBlock = document.querySelector('.momentum__date')
        this.helloBlock = document.querySelector('.momentum__hello_greeting')
        this.nextImgBlock = document.querySelector('.change-button')
        this.body = document.querySelector('body')
        this.firsLoad = true
        this.ArrForImg = this.getArrForImg()
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
            console.log(objTime);
            this.helloBlock.innerText = 'Good ' + timesOfDay + ','
            this.body.style.background = `url("/src/assets/images/${timesOfDay.toLowerCase()}/${this.ArrForImg[0]}.jpg")`
            this.changeArrForImg()
        }

        if (this.firsLoad) {
            this.helloBlock.innerText = 'Good ' + timesOfDay + ','
            this.body.style.background = `url("/src/assets/images/${timesOfDay.toLowerCase()}/${this.ArrForImg[0]}.jpg")`
            this.firsLoad = false
            this.changeArrForImg()
        }
        
        return timesOfDay;
    }

    getArrForImg = () => {
        let arr = [[],[],[],[]]
        let arrMain = []
        let num
        for (let i = 1; i <= 24; i++) {
            if (i < 10) num = (`0${i}`)
            else num = i
            console.log(num);
            if (i>=1 && i<= 5) {
                arr[0].push(`${num}`)
            }
            if (i>=6 && i<= 12) {
                arr[1].push(`${num}`)
            }
            if (i>=13 && i<= 18) {
                arr[2].push(`${num}`)
            }
            if (i>=19 && i<= 24) {
                arr[3].push(`${num}`)
            }
        }
        arr.forEach(item => {
            console.log(item);
            item.sort(() => Math.random() - 0.5);
            item.forEach(num => {
                arrMain.push(num)
            })
        })
        console.log(arrMain);
        return arrMain
    }

    changeArrForImg = () => {
        let first = this.ArrForImg.shift()
        // console.log(first);
        this.ArrForImg.push(first)
    }

    setListener = () => {
        this.nextImgBlock.addEventListener('click', (e)=> {
            console.log(this.ArrForImg);
            let objTime = {
                hour:  this.ArrForImg[0], //=== '24' ? '0' : this.ArrForImg[0],
                minute: 0,
                second: 0,
            }
            // this.changeArrForImg()
            this.setHelloImgOfDay(objTime)
        })
    }
}