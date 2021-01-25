const pageHeader = document.querySelector(".page-header");
const navToggle = document.querySelector(".page-header__nav-toggle");

pageHeader.classList.remove("page-header--nojs");

navToggle.addEventListener("click", function () {
  if (pageHeader.classList.contains("page-header--nav-opened")) {
    pageHeader.classList.remove("page-header--nav-opened");
    pageHeader.classList.add("page-header--nav-closed");
  } else {
    pageHeader.classList.remove("page-header--nav-closed");
    pageHeader.classList.add("page-header--nav-opened");
  }
});
