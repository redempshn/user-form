let btn = document.querySelector(".down-btn");

btn.addEventListener("click", () =>
  window.scrollTo({
    top: 900,
    behavior: "smooth",
  })
);
