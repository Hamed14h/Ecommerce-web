window.onload = () => {
  if (sessionStorage.user) {
    const user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("/html/index.html");
    }
  }
};

let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");
formBtn.addEventListener("click", () => {
  let fullname = document.querySelector("#name") || null;
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let number = document.querySelector("#number" || null);
  let tac = document.querySelector("#tc") || null;
  //form validtaion

  if (fullname != null) {
    if (fullname.value.length < 3) {
      showFormError("name must be 3 letters long");
    } else if (!email.value.length) {
      showFormError("enter your email");
    } else if (password.value.length < 5) {
      showFormError("enter your password and at least 5 letter long");
    } else if (Number(number) || number.value.length < 10) {
      showFormError("invalid number");
    } else if (!tac.checked) {
      showFormError("you must agree with terms and conditin");
    }
    //submit
    else {
      loader.style.display = "block";
      sendData("/signup", {
        name: fullname.value,
        email: email.value,
        number: number.value,
        password: password.value,
        tac: tac.checked,
      });
    }
  } else {
    //login
    if (!email.value.length || !password.value.length) {
      showFormError("fill the inputs");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: email.value,

        password: password.value,
      });
    }
  }
});
