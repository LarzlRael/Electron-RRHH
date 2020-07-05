const next = document.querySelector('.next');
const next2 = document.querySelector('.next2');

const back = document.querySelector('.back');
const back2 = document.querySelector('.back2');

const datosPersonales = document.querySelector('.datos-personales');
const direccion = document.querySelector('.direccion');
const puesto_trabajo = document.querySelector('.puesto-trabajo');

const formNewEmploye = document.querySelector('#form-new-employe');
//alert(formNewEmploye.childElementCount);

const stepper = document.querySelector('.stepper');


//? metodos para ir adelante
next.addEventListener('click', (e) => {
    e.preventDefault()
    datosPersonales.classList.remove('active');
    direccion.classList.add('active');

    stepper.childNodes[0].classList.remove('active');
    stepper.childNodes[1].classList.add('active');
})
next2.addEventListener('click', (e) => {
    e.preventDefault()
    direccion.classList.remove('active');
    puesto_trabajo.classList.add('active');
    stepper.childNodes[1].classList.remove('active');
    stepper.childNodes[2].classList.add('active');
});

//metodos para ir atras

back.addEventListener('click', e => {
    e.preventDefault();
    direccion.classList.remove('active');
    datosPersonales.classList.add('active');
    stepper.childNodes[1].classList.remove('active');
    stepper.childNodes[0].classList.add('active');
})
back2.addEventListener('click', e => {

    e.preventDefault();
    puesto_trabajo.classList.remove('active');
    direccion.classList.add('active');
    stepper.childNodes[2].classList.remove('active');
    stepper.childNodes[1].classList.add('active');
})

//alert(formNewEmploye.childElementCount);

//const stepper = document.querySelector('.stepper');


const balls = formNewEmploye.childElementCount;

for (let i = 0; i < balls; i++) {
    const div = document.createElement('div');
    if (i === 0) {
        div.classList.add('active');
    }
    div.classList.add('step');
    stepper.appendChild(div)
}


//? metodo para recibir los datos del formulario

formNewEmploye.addEventListener('submit', e => {
    e.preventDefault()
    alert('esto se va enviar');
})