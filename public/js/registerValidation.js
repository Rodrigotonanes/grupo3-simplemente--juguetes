window.onload = function(){
    const formReg = document.querySelector('formReg')
    const email = document.querySelector("[name='email']")
    const password = document.querySelector("[name='password']")
    const confirmpassword = document.querySelector("[name='confirmpassword']")
    const selectPicUser = document.querySelector(".selectPicUser")
    const userName = document.querySelector("[name='userName']")
    const name = document.querySelector("[name='name']")
    const province = document.querySelector("[name='province']")
    // const street = document.querySelector("[name='street']")
    const streetNumber = document.querySelector("[name='streetNumber']")
    // const betweenSt1 = document.querySelector("[name='betweenSt1']")
    // const locality = document.querySelector("[name='locality']")
    // const betweenSt2 = document.querySelector("[name='betweenSt2']")
    const postal = document.querySelector("[name='postal']")
    const floor = document.querySelector("[name='floor']")
    const phoneNumber = document.querySelector("[name='phoneNumber']")
    // const indications = document.querySelector("[name='postal']")
    // const botonOmitirRegis = document.querySelector(".botonOmitirRegis")
    const botonContinuarRegis = document.querySelector(".botonContinuarRegis")
// div's donde se mostraran los errores
const emailEr = document.querySelector(".emailEr")
const passwordEr = document.querySelector('.passwordEr')
const confirmpasswordEr = document.querySelector('.confirmpasswordEr')
const selectPicUserEr = document.querySelector('.selectPicUserEr')
const userNameEr = document.querySelector('.userNameEr')
const nameEr = document.querySelector('.nameEr')
const provinceErr = document.querySelector('.provinceErr')
// const streetEr = document.querySelector('.streetEr')
// const localityEr = document.querySelector('.localityEr')
const streetNumberEr = document.querySelector('.streetNumberEr')
const postalEr = document.querySelector('.postalEr')
const floorEr = document.querySelector('.floorEr')
const phoneNumberEr = document.querySelector('.phoneNumberEr')
let errores = true
const statusInvalid = (elementErr, msgErr) => {
    elementErr.innerHTML = msgErr;
    errores = true;
  };

  const statusValid = (elementErr) => {
    elementErr.innerHTML = null;
    errores = false;
  };

  function validarEmail(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
  }

  function validarAlfanumerico(text) {
    const regex =/^[a-zA-Z0-9\s]*$/;
    return regex.test(text);
}

function validarContrasenia(contrasenia) {
    const regex = /^([a-zA-Z0-9_-])*$/
    return regex.test(contrasenia);
}


function validarImagen(imagen) {
    const regex = /.png|.jpg|.jpeg|.webp|.gif/i;
    return regex.test(imagen);
}
function validarTelefono(tel) {
    const regex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/
    return regex.test(tel);
}


  // validacion EMAIL
email.addEventListener('blur',function(e){
    // console.log(email.value)
    // console.log(validarEmail(email.value))
switch(true){
    case email.value === '':
        const msg = "<div><p><i class='fa-solid fa-triangle-exclamation'></p></i>Debe ingresar un correo</div>"
        statusInvalid(emailEr,msg)
    break;
    case !validarEmail(email.value):
        const msg1 = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>Debe ingresar un correo valido</div>'
        statusInvalid(emailEr,msg1)
    break;
    default:
        statusValid(emailEr)
    break;
}
})

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

//BOTON OJO VER TEXTO
window.addEventListener("load", () => {
    const inputPass2 = document.querySelector("#password");
    const btnEye = document.querySelector("#btn-eye");
    const iconEye = document.querySelector("#icon-eye");
    btnEye.addEventListener("click", () =>{
        inputPass2.type = "text";
        iconEye.classList.remove("fa-eye")
        iconEye.classList.add("fa-eye-slash")
    })
}) 


// validacion CONFIRPASSWORD

confirmpassword.addEventListener('blur',function(e){
    switch(true){
        case confirmpassword.value === '' :
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>Debe confirmar la contraseña</div>'
            statusInvalid(confirmpasswordEr,msg)
        break;
        case confirmpassword.value !== password.value:
            const msg2 = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>Las contraseñas no coinciden</div>'
            statusInvalid(confirmpasswordEr,msg2)
        break;
        default:
            statusValid(confirmpasswordEr)
        break;
    }
})
// validacion SELECTPICUSER

selectPicUser.addEventListener('change',function(e){

    switch(true){
        case e.target.files.length > 1:
            const msg ="<div><p><i class='fa-solid fa-triangle-exclamation'></p></i> Debes usar una unica imagen</div>"
            statusInvalid(selectPicUserEr,msg)
        break;
        case !validarImagen(e.target.files[0].type):
            const msg1 = "<div><p><i class='fa-solid fa-triangle-exclamation'></p></i> La imagen debe ser .png, .jpg, .jpeg, .webp o .gif</div>"
            statusInvalid(selectPicUserEr,msg1)
        break;
        default:
            statusValid(selectPicUserEr)
        break;
    }
})
// validacion USERNAME

userName.addEventListener('blur', function(e){
    switch(true){
        case userName.value === '' :
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>Debe ingresar un nombre de usuario</div>'
            statusInvalid(userNameEr,msg)
        break;
        case userName.value.length > 45:
            const msg1 = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El nombre no debe ser mayor a 45 caracteres</div>'
            statusInvalid(userNameEr,msg1)
        break;
        case !validarAlfanumerico(userName.value):
            const msg2 = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El nombre debe ser alfanumerico</div>'
            statusInvalid(userNameEr,msg2)
        break;
        default:
            statusValid(userNameEr)
        break;
    }
})
// validacion NAME

name.addEventListener('blur',function(e){
    switch(true){
        case name.value === '':
            statusValid(nameEr)
        break;
        case !validarAlfanumerico(name.value):
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El nombre y apellido debe ser alfanumerico</div>'
            statusInvalid(nameEr,msg)
        break;
        default:
            statusValid(nameEr)
        break;
    }
})
//validacion PROVINCE

province.addEventListener('blur',function(e){
    const provinces = ["BA", "CA", "CH", 'CT', 'CB', 'CR', 'ALLÍ', 'FO', 'TU', 'ELEPÉ', 'LR', 'MZ', 'MI', 'NQ', 'RN', 'SA', 'SJ', 'SL', 'SC', 'SF', 'SE', 'TF', 'TU']
    switch(true){
        case !provinces.includes(province.value):
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>La provincia debe estar en la lista</div>'
            statusInvalid(provinceErr,msg)
        break;
        default:
            statusValid(provinceErr)
        break;
    }
})
//validacion STREETNUMBER

streetNumber.addEventListener('blur',function(e){
    switch(true){
        case name.value === null:
            statusValid(streetNumberEr)
        break;
        case streetNumber.value < 0:
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El numero debe ser mayor que cero</div>'
            statusInvalid(streetNumberEr,msg)
        break;
        default:
            statusValid(streetNumberEr)
        break;
    }
})
//validacion POSTAL

postal.addEventListener('blur',function(e){
    switch(true){
        case postal.value === null:
            statusValid(postalEr)
        break;
        case postal.value < 0:
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El numero debe ser mayor que cero</div>'
            statusInvalid(postalEr,msg)
        break;
        default:
            statusValid(postalEr)
        break;
    }
})
//validacion FLOOR

floor.addEventListener('blur',function(e){
    switch(true){
        case floor.value === null:
            statusValid(floorEr)
        break;
        case floor.value < 0:
            const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>El numero debe ser mayor que cero</div>'
            statusInvalid(floorEr,msg)
        break;
        default:
            statusValid(floorEr)
        break;
    }
})
// validacion PHONENUMBER 

// phoneNumber.addEventListener('blur',function(0){
//     switch(true){
//         case phoneNumber.value === null:
//             statusValid(phoneNumberEr)
//         break;
//         case !validarTelefono(phoneNumber.value):
//             const msg = '<div><p><i class="fa-solid fa-triangle-exclamation"></p></i>debe ser un telefono valido</div>'
//             statusInvalid(phoneNumberEr,msg)
//         break;
//         default:
//             statusValid(phoneNumberEr)
//         break;
//     }
// })

botonContinuarRegis.addEventListener('click',function(e){
    if(errores){
     return e.preventDefault()
    }
})
}