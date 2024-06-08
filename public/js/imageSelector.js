const defaultFile = "/images/authentication/default.png";

const file = document.getElementById("selectPicUser");
const img = document.getElementById("userPictureReg");

file.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0];
  
  if (selectedFile) {
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      img.src = defaultFile;
      file.value = ""; // Reset the input file
    }
  } else {
    img.src = defaultFile;
  }
});
