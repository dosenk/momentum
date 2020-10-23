import './style.scss'
import Person from './classes/person'
import DateMomentum from './classes/dateMomentum'


window.onload = () => {
    renderingDom()
    const person = new Person()
    const dateMomentum = new DateMomentum()
    person.addedListeners()
    person.getName()
    person.getFocus()

    setInterval(dateMomentum.displayDateTime, 1000)

    dateMomentum.setListener()
    // dateMomentum.ArrForImg
    // console.log(dateMomentum.ArrForImg);

   
}


const renderingDom = () => {
    const body = document.querySelector('body');
    const bodyWrapper = createElem('div', null, 'momentum');
    const bodyButton = createElem('button', null, 'change-button');
        const bodyWrapperTime = createElem('div', null, 'momentum__time');
        const bodyWrapperDate = createElem('div', null, 'momentum__date');
        const bodyWrapperHello = createElem('div', null, 'momentum__hello');
        const bodyWrapperHelloGreeting = createElem('span', '', 'momentum__hello_greeting');
        const bodyWrapperHelloName = createElem('span', ' [Enter Name]', 'momentum__hello_name');
        bodyWrapperHelloName.setAttribute('contenteditable', 'true')
            bodyWrapperHello.append(bodyWrapperHelloGreeting, bodyWrapperHelloName);
        const bodyWrapperFocus = createElem('div', null, 'momentum__focus');
        const bodyWrapperFocusQuestion = createElem('span', 'What Is Your Focus For Today?', 'momentum__focus_question');
        const bodyWrapperFocusAnswer = createElem('span', null, 'momentum__focus_answer');
        bodyWrapperFocusAnswer.setAttribute('contenteditable', 'true')


    bodyWrapperFocus.append(bodyWrapperFocusQuestion, bodyWrapperFocusAnswer);
        bodyWrapper.append(bodyWrapperTime, bodyWrapperDate, bodyWrapperHello, bodyWrapperFocus)
        body.append(bodyWrapper, bodyButton)
}


const createElem = (tagName, innerText = null, ...classes) => {
  const element = document.createElement(tagName);
  classes.forEach((className) => {
    element.classList.add(className);
    if (innerText !== null) element.innerText = innerText;
  });
  return element;
};