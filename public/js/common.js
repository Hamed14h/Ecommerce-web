const sendData = (path, data) => {
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => processData(data));
};

const processData = (data) => {
  loader.style.display = null;
  if (data.alert) {
    showFormError(data.alert);
  } else if (data.email) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
  } else if (data.seller) {
    let user = JSON.parse(sessionStorage.user);
    user.seller = true;
    sessionStorage.user = JSON.stringify(user);
    location.replace("/dashboard");
  }
};
const showFormError = (err) => {
  let errorEle = document.querySelector(".error");
  if (errorEle) {
    // Check if the error element exists
    errorEle.innerHTML = err; // Set the error message
    errorEle.classList.add("show"); // Make the error element visible
  } else {
    console.error("Error element not found in the document.");
  }
  setTimeout(() => {
    errorEle.classList.remove("show");
  }, 2000);
};
