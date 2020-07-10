
const jobs = document.querySelector('#jobs');
const salario_validacion = document.querySelector('#salario-validacion');


let trabajo_actual = [];
let id_departamento = 0;

const salario = document.getElementById('salario');
let index = 0
const obtenerSalario = async () => {
    trabajo_actual = await main.getSalaries();
    //console.log(trabajo_actual)
    //console.log(trabajo_actual[0].salario_minimo);
    salario.placeholder = `Salario debe estar entre ${trabajo_actual[0].salario_minimo} y ${trabajo_actual[0].salario_maximo}`;
}

jobs.addEventListener('change', (e) => {
    //console.log(trabajo_actual)
    
    salario.placeholder = `Salario debe estar entre ${trabajo_actual[0].salario_minimo} y ${trabajo_actual[0].salario_maximo} `;
    //console.log(jobs)
    index = jobs.selectedIndex;
    salario.placeholder = `Salario debe estar entre ${trabajo_actual[index].salario_minimo} y ${trabajo_actual[index].salario_maximo} `;

    
    id_departamento = trabajo_actual[index].departamento;

    //item_select = jobs.
})
salario.addEventListener('keyup', e => {
    if (salario.value.length == 0) {
        salario_validacion.textContent = ""
    }
    console.log(salario.value);
    let salariominimo = trabajo_actual[index].salario_minimo;
    let salariomaximo = trabajo_actual[index].salario_maximo;
    //console.log(salariominimo,saslariomaximo)

    if (salario.value > salariomaximo || salario.value < salariominimo) {

        console.log(salario.value)
        salario_validacion.style.color = "#fff";
        salario_validacion.classList.remove("bg-success");
        salario_validacion.classList.add("bg-danger");
        salario_validacion.textContent = "Agregar un salario valido"
    } else {
        salario_validacion.style.color = "#fff";
        salario_validacion.classList.remove("bg-danger");
        salario_validacion.classList.add("bg-success")
        salario_validacion.textContent = "Salario valido"
    }
})


obtenerSalario();
