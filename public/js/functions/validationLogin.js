const inputUserName = document.querySelector("[name='userName']")
const password = document.querySelector("[name='password']")

window.addEventListener('load', function() {
  /* validation input name*/
  const errUserName = document.querySelector(".error-userName");
  inputUserName.addEventListener("blur", function () {
    const value = this.value.trim(); 
  switch (true) {
    case !value.length:
      statusInvalid(errUserName, `El nombre es requerido`, this);
      break;
    case !exRegLettersOnly.test(value):
      statusInvalid(errUserName, "El nombre solo debe contener letras y espacios", this);
      break;
    case value.length < 5 || value.length > 100:
      statusInvalid(
        errUserName,
        "El nombre debe tener entre 5 y 100 caracteres",
        this
      );
      break;
    default:
      statusValid(errUserName, this);
      break;
    }
  });
  inputUserName.addEventListener("focus", function () {
    errUserName.innerHTML = null;
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
  });
  /*end validation input name */


  
// validacion PASSWORD
password.addEventListener('blur',function(e){
    const passLength = this.value.length
    switch(true){
        case this.value === '' :
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>Debe ingresar una contraseña</div>'
            statusInvalid(passwordEr,msg)
        break;
        case !validarContrasenia(password.value):
            const msg1 = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i> La contraseña debe ser alfanumerica y no contener espacios</div>'
            statusInvalid(passwordEr,msg1)
        break;
        case passLength < 8 || passLength > 20:
            const msg2 ='<div><p><i class="fa-solid fa-triangle-exclamation"></p></i> La contraseña debe tener entre 8 y 20 caracteres</div>'
            statusInvalid(passwordEr,msg2)
        break;
        default:
            statusValid(passwordEr)
        break;
    }
})

    const formulario = document.querySelector(".form")
   

    formulario.addEventListener("submit", function (event){
      
      if(errUserName || password){
        event.preventDefault();
       
      }
    });


})