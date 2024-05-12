//to prevent get seller page without login or after log out
window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user == null) {
    location.replace("/login");
  }
  //if they have account or login they will get next page
  else if (user.seller) {
    location.replace("/dashboard");
  }
};
////////////////////////////////////////////////////
let loader = document.querySelector(".loader");
let applyBtn = document.querySelector(".apply-btn");

applyBtn.addEventListener("click", () => {
  let businessName = document.querySelector("#name").value;
  let adress = document.querySelector("#adress").value;
  let about = document.querySelector("#about").value;
  let number = document.querySelector("#number").value;
  if (
    !businessName.length ||
    !adress.length ||
    !about.length ||
    number.length < 10 ||
    !Number(number)
  ) {
    showFormError("some information is/are incorrect");
  } else {
    //send data to storage
    loader.style.display = "block";
    sendData("/seller", {
      name: businessName,
      adress: adress,
      about: about,
      number: number,
      email: JSON.parse(sessionStorage.user).email,
    });
  }
});
