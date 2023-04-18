document.addEventListener('DOMContentLoaded', function(){

  const emailIngresado = {
    email: '',
    asunto: '',
    mensaje: ''
  }

  // Seleccionar elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputCC = document.querySelector('#cc');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario')
  const btnSubmit = document.querySelector('#formulario button[type="submit"]')
  const btnReset = document.querySelector('#formulario button[type="reset"]')
  const spinner = document.querySelector('#spinner')
  
  // Asignar eventos
  inputEmail.addEventListener('input',validar);
  inputAsunto.addEventListener('input',validar);
  inputMensaje.addEventListener('input',validar);
  inputCC.addEventListener('input',validar )


  formulario.addEventListener('submit', enviarEmail)

  btnReset.addEventListener('click', function(e) {
    e.preventDefault()
    reiniciarFormulario()
  })
  // function comprobarCC () {
  //   validar()
  // }
  function reiniciarFormulario(){
    // reiniciar objeto
    emailIngresado.email = '';
    emailIngresado.asunto = '';
    emailIngresado.mensaje = '';
    
    formulario.reset();
    comprobarEmail();

  }

  function validar(e){
    if(e.target.value.trim() === '') {
      mostarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      emailIngresado[e.target.id] = ''
      comprobarEmail()
      return
    }
    if((e.target.id === 'email' || e.target.id === 'cc') && !validarEmail(e.target.value)){ //Se deben cumplir ambas condiciones para el true
      mostarAlerta('El email no es válido',e.target.parentElement)
      emailIngresado[e.target.id] = ''
      comprobarEmail()
      return
    }
    limpiarAlerta(e.target.parentElement)
    
    // Asignar valores
    emailIngresado[e.target.id] = e.target.value.trim().toLowerCase()
    
    // Comprobar el objeto de email
    comprobarEmail()
    
  }
  function mostarAlerta(mensaje, referencia){
    // Comprueba si ya existe una alerta
    limpiarAlerta(referencia)
    // Generar Alerta HTML
    const error = document.createElement('P');
    error.textContent = mensaje
    error.classList.add('bg-red-600','text-white','p-2','uppercase', 'text-center')
    referencia.appendChild(error)
   }
 
  
  function limpiarAlerta(referencia){
    const alerta = referencia.querySelector(".bg-red-600")
    if(alerta){ //Existe la alerta 
      alerta.remove()
    }
  }

  function validarEmail(inputEmail){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(inputEmail)
    return resultado
  }
  function comprobarEmail () {
    if(Object.values(emailIngresado).includes('')){
      btnSubmit.classList.add("opacity-50")
      btnSubmit.disabled = true;
      return
    } 
    btnSubmit.classList.remove("opacity-50")
    btnSubmit.disabled = false;
  }
  function enviarEmail(e) {
    e.preventDefault()
    spinner.classList.add("flex")
    spinner.classList.remove("hidden")
    setTimeout(() => {
      spinner.classList.remove("flex")
      spinner.classList.add("hidden")
      reiniciarFormulario()
      // Crear una alerta
      const alertaExito = document.createElement('P')
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10','font-bold', 'text-sm', 'uppercase')
      alertaExito.textContent = 'Mensaje enviado correctamente'
      formulario.appendChild(alertaExito)
      setTimeout(() => {
        alertaExito.remove()
      }, 2500);
    }, 3000 );

  }
} )