const inputUserPicture = document.querySelector("[name='userPicture']");
const inputName = document.querySelector("[name='name']");
const inputPostal = document.querySelector("[name='postal']");
const inputStreet = document.querySelector("[name='street']");
const inputStreetNumber = document.querySelector("[name='streetNumber']");
const inputFloor = document.querySelector("[name='floor']");
const inputBetweenSt1 = document.querySelector("[name='betweenSt1']");
const inputBetweenSt2 = document.querySelector("[name='betweenSt2']");
const inputPhoneNumber = document.querySelector("[name='phoneNumber']");
const inputIndications = document.querySelector("[name='indications']");

//Validar name
const exRegAlfanumeric = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

// Validador formato de imagen
const regExpFiles = /\.(png|jpg|jpeg|webp|gif)$/i;

//validador de NumberPhone
const numberPhoneValidatorRegex = /^\+\d{1,3}\d{10}$/;

//validaddor de Numero entero positivo
const positiveIntegerRegex = /^\d+$/;

// Validador de códigos postales Argentinos //Ejemplo C1000AAA (moderno) 1234 (antiguo)
const exRegArgentinaPostalCode = /^[A-Z]?\d{4}[A-Z]{0,3}$/;

// validador de cadena de texto //Permite tilde y caracteres especiales
const stringValidatorRegex =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00e0-\u00fc\u00c0-\u00dc0-9\s.]+$/;

window.addEventListener("load", () => {
  let existError = true;

  const statusInvalid = (elementErr, msgErr, elementInput) => {
    elementErr.innerHTML = msgErr;
    elementInput.classList.add("is-invalid");
    existError = true;
  };

  const statusValid = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.add("is-valid");
    elementInput.classList.remove("is-invalid");
    existError = false;
  };
  const statusEmpty = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.remove("is-valid");
    elementInput.classList.remove("is-invalid");
  };

  /* validation input userPicture */
  const errUserPicture = document.querySelector(".error-userPicture");
  inputUserPicture.addEventListener("change", function () {
    const files = Array.from(this.files);
    switch (true) {
      case !files.length:
        statusInvalid(errUserPicture, "Debes ingresar una imagen", this);
        break;

      case files.length > 1:
        statusInvalid(
          errUserPicture,
          "No puedes ingresar mas de 1 archivo",
          this
        );
        break;

      case files.some(
        (file) => !regExpFiles.test(file.name)
      ) /* file (1).rar */:
        statusInvalid(
          errUserPicture,
          "El formato de la imagen es invalido",
          this
        );
        break;

      default:
        statusValid(errUserPicture, this);
        break;
    }
  });
  /* end validation input userPicture */

  /* validation input name*/
  const errName = document.querySelector(".error-name");
  inputName.addEventListener("blur", function () {
    const value = this.value.trim(); //quita espacios
    switch (true) {
      case !value.length:
        statusInvalid(errName, `El nombre y apellido es requerido`, this);
        break;
      case !exRegAlfanumeric.test(value):
        statusInvalid(
          errName,
          "El nombre y apellido debe ser alfanumérico",
          this
        );
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errName,
          "El nombre y apellido debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errName, this);
        break;
    }
  });
  inputName.addEventListener("focus", function () {
    statusEmpty(errName, this);
  });
  /*end validation input name */

  /* validation input postal*/
  const errPostal = document.querySelector(".error-postal");
  inputPostal.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errPostal, this);
      return;
    }
    switch (true) {
      case !exRegArgentinaPostalCode.test(value):
        statusInvalid(
          errPostal,
          "El código postal no es válido para Argentina",
          this
        );
        break;
      case value.length < 4 || value.length > 8:
        statusInvalid(
          errPostal,
          "El código postal debe tener mínimo 5 y un máximo de 8 caracteres",
          this
        );
        break;
      default:
        statusValid(errPostal, this);
        break;
    }
  });
  inputPostal.addEventListener("focus", function () {
    statusEmpty(errPostal, this);
  });
  /* end validation input postal*/

  /* validation input street*/
  const errStreet = document.querySelector(".error-street");
  inputStreet.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errStreet, this);
      return;
    }
    switch (true) {
      case !stringValidatorRegex.test(value):
        statusInvalid(errStreet, "La dirección debe ser alfanumérico", this);
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errStreet,
          "La dirección debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errStreet, this);
        break;
    }
  });
  inputStreet.addEventListener("focus", function () {
    statusEmpty(errStreet, this);
  });
  /* end validation input street*/

  /* validation input streetNumber */
  const errStreetNumber = document.querySelector(".error-streetNumber");
  inputStreetNumber.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errStreetNumber, this);
      return;
    }
    switch (true) {
      case !positiveIntegerRegex.test(value):
        statusInvalid(
          errStreetNumber,
          "La numeración debe ser un número entero positivo",
          this
        );
        break;
      case value < 1 || value > 9999:
        statusInvalid(
          errStreetNumber,
          "La numeración debe tener un valor entre 1 y 9999",
          this
        );
        break;
      default:
        statusValid(errStreetNumber, this);
        break;
    }
  });
  inputStreetNumber.addEventListener("focus", function () {
    statusEmpty(errStreetNumber, this);
  });

  /* end validation input streetNumber */

  /* validation input floor*/
  const errFloor = document.querySelector(".error-floor");
  inputFloor.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errFloor, this);
      return;
    }
    switch (true) {
      case !positiveIntegerRegex.test(value):
        statusInvalid(
          errFloor,
          "El número de piso debe ser un número entero positivo",
          this
        );
        break;
      case value < 1 || value > 200:
        statusInvalid(
          errFloor,
          "El número de piso debe estar entre 1 y 200",
          this
        );
        break;
      default:
        statusValid(errFloor, this);
        break;
    }
  });
  inputFloor.addEventListener("focus", function () {
    statusEmpty(errFloor, this);
  });
  /* end validation input floor */

  /* validation input betweenSt1*/
  const errBetweenSt1 = document.querySelector(".error-betweenSt1");
  inputBetweenSt1.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errBetweenSt1, this);
      return;
    }
    switch (true) {
      case !stringValidatorRegex.test(value):
        statusInvalid(
          errBetweenSt1,
          "La dirección debe ser alfanumérico",
          this
        );
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errBetweenSt1,
          "La dirección debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errBetweenSt1, this);
        break;
    }
  });
  inputBetweenSt1.addEventListener("focus", function () {
    statusEmpty(errBetweenSt1, this);
  });
  /* end validation input betweenSt1*/

  /* validation input betweenSt2*/
  const errBetweenSt2 = document.querySelector(".error-betweenSt2");
  inputBetweenSt2.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errBetweenSt2, this);
      return;
    }
    switch (true) {
      case !stringValidatorRegex.test(value):
        statusInvalid(
          errBetweenSt2,
          "La dirección debe ser alfanumérico",
          this
        );
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errBetweenSt2,
          "La dirección debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errBetweenSt2, this);
        break;
    }
  });
  inputBetweenSt2.addEventListener("focus", function () {
    statusEmpty(errBetweenSt2, this);
  });
  /* end validation input betweenSt2*/

  /* validation input phoneNumber*/
  const errPhoneNumber = document.querySelector(".error-phoneNumber");
  inputPhoneNumber.addEventListener("blur", function () {
    const value = this.value.trim();
    console.log("Phone Number Entered:", value); // Debug log
    if (!value.length) {
      statusEmpty(errPhoneNumber, this);
      return;
    }
    switch (true) {
      // case !numberPhoneValidatorRegex.test(value):
      //   statusInvalid(
      //     errPhoneNumber,
      //     "El número de teléfono debe ser alfanumérico",
      //     this
      //   );
      //   break;

      case !validator.isMobilePhone(value, "es-AR"):
        statusInvalid(
          errPhoneNumber,
          "El número de teléfono no es válido",
          this
        );
        break;

      default:
        statusValid(errPhoneNumber, this);
        break;
    }
  });
  inputPhoneNumber.addEventListener("focus", function () {
    statusEmpty(errPhoneNumber, this);
  });
  /* end validation input phoneNumber*/

  /* validation input indications*/
  const errIndications = document.querySelector(".error-indications");
  inputIndications.addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value.length) {
      statusEmpty(errIndications, this);
      return;
    }
    switch (true) {
      case !stringValidatorRegex.test(value):
        statusInvalid(
          errIndications,
          "Los datos adicionales debe ser alfanumérico",
          this
        );
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errIndications,
          "Los datos adicionales debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errIndications, this);
        break;
    }
  });
  inputIndications.addEventListener("focus", function () {
    statusEmpty(errIndications, this);
  });
  /* end validation input indications*/
  /* FORMULARIO */
  const formCreate = document.querySelector("#form-create-product");
  const errFormGeneral = document.querySelector(".err-form-general");
  const fieldsRequired = document.querySelectorAll(".field-required");
  formCreate.addEventListener("submit", function (event) {
    const isName = inputName.value?.trim();
    //   const isPrice = inputPrice.value?.trim();
    //   const isSku = inputSku.value?.trim();
    //   const isCategory =
    //     inputCategory.options[inputCategory.selectedIndex].value?.trim();
    //   const isStock = inputStock.value?.trim();
    //   const isImagePrincipal = inputImagePrincipal.files.length;
    //   const isImageSecondary = inputImageSecondary.files.length;
    //   const isDescription = inputDescription.value?.trim();
    event.preventDefault();
    if (this.id === "form-create-product") {
      switch (true) {
        case !isName:
          //   case !isPrice:
          //   case !isSku:
          //   case !isCategory:
          //   case !isStock:
          //   case !isImagePrincipal:
          //   case !isImageSecondary:
          //   case !isDescription:
          existError = true;
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          errFormGeneral.classList.add("alert", "alert-danger");
          fieldsRequired.forEach((field) => (field.innerHTML = "*"));
          break;
      }
    } else {
      switch (true) {
        case !isName:
          //   case !isPrice:
          //   case !isSku:
          //   case !isCategory:
          //   case !isStock:
          //   case !isDescription:
          existError = true;
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          errFormGeneral.classList.add("alert", "alert-danger");
          fieldsRequired.forEach((field) => (field.innerHTML = "*"));
          break;
      }
    }

    if (!existError) {
      this.submit();
    }
  });
});
