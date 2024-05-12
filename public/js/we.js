/////if they logout to prevent get home page/////
/*
window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user == null) {
    location.replace("/login");
  }
};
*/

/////////////////////////////////////
const myButton = document.getElementById("myButton");
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
let userIcon = document.querySelector(".user-icon");
let userpopIcon = document.querySelector(".user-icon-popup");

//login shoe with icon
userIcon.addEventListener("click", () =>
  userpopIcon.classList.toggle("active")
);

//user login
let text = userpopIcon.querySelector("p");
let actionBtn = userpopIcon.querySelector("a");
let user = JSON.parse(sessionStorage.user || null);

//if user login then log out
if (user != null) {
  text.innerHTML = `log in as,${user.name}`;
  actionBtn.innerHTML = "Logout";
  actionBtn.addEventListener("click", () => logout());
}
//if isnt login
else {
  text.innerHTML = "Login to your account";
  actionBtn.innerHTML = "Login";
  actionBtn.addEventListener("click", () => (location.href = "/login"));
}
//logout function
const logout = () => {
  sessionStorage.clear();
  location.reload();
};

//////main
//this button selection type 2
if (myButton) {
  myButton.addEventListener("click", function () {
    window.location.href = "shop.html";
  });
}

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
//////signup button
//selcrtion type 1
const sinBtn = document.querySelector(".btn-normal");
sinBtn.addEventListener("click", function () {
  window.location.href = "signup.html";
});
/*
const signBtn = document.getElementById("normal1");
if (signBtn) {
  signBtn.addEventListener("click", function () {
    window.location.href = "signup.html";
  });
}
*/
