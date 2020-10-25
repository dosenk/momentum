export default class Person {
  constructor() {
    this.name = document.querySelector('.momentum__hello_name')
    this.focus = document.querySelector('.momentum__focus_answer');
  }

  getName = () => {
  if (localStorage.getItem('name') === null) {
    this.name.textContent = '[Enter Name]';
  } else {
    this.name.textContent = localStorage.getItem('name');
  }
  return name
};

  setName = (e) => {
    // console.log();
    let name = localStorage.getItem('name')
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim() === '') {
        e.target.innerText = name !== null ? (' ' +  name) : '[Enter Name]';
      } else {
      localStorage.setItem('name', e.target.innerText);
    }
      this.name.blur();
    }
  } else {
    e.target.innerText = name !== null ? (' ' +  name) : '[Enter Name]';
  }
}

getFocus = () => {
  if (localStorage.getItem('focus') === null) {
    this.focus.textContent = '[Enter Focus]';
  } else {
    this.focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
setFocus = (e) => {
  let focus = localStorage.getItem('focus')
  if (e.type === 'keypress') {
    
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim() === '') {
        // e.target.innerText = localStorage.getItem('focus');
        e.target.innerText = focus !== null ? (' ' +  focus) : '[Enter Focus]';
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }
      this.focus.blur();
    }
  } else {
        e.target.innerText = focus !== null ? (' ' +  focus) : '[Enter Focus]';
  }

  
}

addedListeners = () => {
  this.name.addEventListener('keypress', this.setName);
  this.name.addEventListener('blur', this.setName);
  this.focus.addEventListener('keypress', this.setFocus);
  this.focus.addEventListener('blur', this.setFocus);
  this.name.addEventListener('mousedown', (event) => {
    event.target.innerText = ''
  });
  this.focus.addEventListener('mousedown', (event) => {
    event.target.innerText = ''
  });
}
}