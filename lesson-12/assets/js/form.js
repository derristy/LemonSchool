let file = document.querySelector("#file-upload-input");
let file_name = document.querySelector(".file-upload-name");
let btn = document.querySelector(".file-upload-btn");

btn.addEventListener("click", function(){
  file.click();
});

file.addEventListener("change", function(){
  if(file.value){
    file_name.innerHTML = "Path: " + file.value;
  } else {
    file_name.innerHTML = "Not selected";
  }
});