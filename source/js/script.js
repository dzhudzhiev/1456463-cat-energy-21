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

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.9386, 30.3231],
    zoom: 16,
    controls: [],
  });

  myMap.geoObjects.add(
    new ymaps.Placemark(
      [59.9386, 30.3231],
      {},
      {
        preset: "islands#greenDotIcon",
        iconColor: "#68b738",
      }
    )
  );
}
