let ratingStarInput = [...document.querySelectorAll(".rating-star")];
let rate = 0;

ratingStarInput.map((star, index) => {
  star.addEventListener("click", () => {
    rate = `${index + 1}.0`;
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        ratingStarInput[i].src = "/img/fill star.png";
      } else {
        ratingStarInput[i].src = "/img/no fill star.png";
      }
    }
  });
});
let user = JSON.parse(sessionStorage.user || null);
let reviewHeadline = document.querySelector(".review-headline");
let review = document.querySelector(".review-field");
let load = document.querySelector(".load");
let addReviewBtn = document.querySelector(".add-review-btn");
addReviewBtn.addEventListener("click", () => {
  if (user == null) {
    location.href = "/login";
  } else {
    if (!reviewHeadline.value.length || !review.value.length || rate == 0) {
      showFormError("fill all the inputs");
    } else if (reviewHeadline.value.length < 5) {
      showFormError("headline should be more than 10 word");
    } else if (review.value.length < 10) {
      showFormError("review should be more than 10 word");
    } else {
      load.style.display = "block";
      sendData("/add-");
    }
  }
});
