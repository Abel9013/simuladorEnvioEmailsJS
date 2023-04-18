document.addEventListener('DOMContentLoaded', function(){

  const emailIngresado = {
    email: '',
    asunto: '',
    mensaje: ''
  }

  // Seleccionar elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario')
  
  // Asignar eventos
  inputEmail.addEventListener('blur',validar);
  inputAsunto.addEventListener('blur',validar);
  inputMensaje.addEventListener('blur',validar);

  function validar(e){
    if(e.target.value.trim() === '') {
      mostarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      return
    }
    if(e.target.id === 'email' && !validarEmail(e.target.value)){ //Se deben cumplir ambas condiciones para el true
      mostarAlerta('El email no es válido',e.target.parentElement)
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
    console.log(Object.values(emailIngresado).includes(''));
  }
} )