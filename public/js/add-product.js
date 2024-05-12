let user = JSON.parse(sessionStorage.user || null);
window.onload = () => {
  if (user == null) {
    location.replace("/login");
  }
};
let editables = [...document.querySelectorAll('*[contenteditable="true"]')];
editables.map((element) => {
  let placeholder = element.getAttribute("data-placeholder");
  element.innerHTML = placeholder;
  element.addEventListener("focus", () => {
    if (element.innerHTML === placeholder) {
      element.innerHTML = "";
    }
  });
  element.addEventListener("focusout", () => {
    if (!element.innerHTML.length) {
      element.innerHTML = placeholder;
    }
  });
});
///////form submisson
let addProductBtn = document.querySelector(".add-product-btn");
let loader = document.querySelector(".loader");
let productName = document.querySelector(".product-name");
let shortDes = document.querySelector(".product-des");
let price = document.querySelector(".price");
let detail = document.querySelector(".des");
let tags = document.querySelector(".tags");

addProductBtn.addEventListener("click", () => {
  ////verification
  if (productName.innerHTML == productName.getAttribute("data-placeholder")) {
    showFormError("should eneter product name");
  } else if (shortDes.innerHTML == shortDes.getAttribute("data-placeholder")) {
    showFormError("add short description");
  } else if (
    price.innerHTML == price.getAttribute("data-placeholder") ||
    !Number(price.innerHTML)
  ) {
    showFormError("add price");
  } else if (detail.innerHTML == detail.getAttribute("data-placeholder")) {
    showFormError("add product details");
  } else if (tags.innerHTML == tags.getAttribute("data-placeholder")) {
    showFormError("add some tag of product");
  } else {
    ////submit
    loader.style.display = "block";
  }
});
