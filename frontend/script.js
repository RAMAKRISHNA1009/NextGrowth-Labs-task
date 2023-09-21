document.addEventListener("DOMContentLoaded", function () {
  const userSlider = new Slider("#userSlider");
  userSlider.on("change", function (slideEvt) {
    const sliderValue = slideEvt.newValue;

    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.remove("highlighted-plan");
    });

    if (sliderValue >= 10 && sliderValue < 20) {
      document
        .querySelector(".col-md-4:nth-child(1) .card")
        .classList.add("highlighted-plan");
    } else if (sliderValue >= 11 && sliderValue < 21) {
      document
        .querySelector(".col-md-4:nth-child(2) .card")
        .classList.add("highlighted-plan");
    } else if (sliderValue >= 20 && sliderValue <= 30) {
      document
        .querySelector(".col-md-4:nth-child(3) .card")
        .classList.add("highlighted-plan");
    }
  });
  const openModalButtons = document.querySelectorAll(".open-modal");
  openModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const cardTitle =
        this.closest(".pricing-card").querySelector(".card-title").textContent;
      document.getElementById("modalCardTitle").textContent = cardTitle;
      const myModal = new bootstrap.Modal(document.getElementById("myModal"));
      myModal.show();
    });
  });
  const modalSubmitButton = document.getElementById("modalSubmitButton");
  modalSubmitButton.addEventListener("click", function () {
    document.querySelector("form").submit();
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.hide();
  });
});
const universityList = document.getElementById("university-list");
let page = 1;
let isLoading = false;

function loadMoreUniversities() {
  if (isLoading) return;
  isLoading = true;

  const apiUrl = `http://universities.hipolabs.com/search?country=India&page=${page}&amount=40`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        data.forEach((university) => {
          const listItem = document.createElement("li");
          listItem.textContent = university.name;
          universityList.appendChild(listItem);
        });
        page++;
        isLoading = false;
      }, 3000);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      isLoading = false;
    });
}

function isBottomOfPage() {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  return scrollY + windowHeight >= documentHeight;
}

window.addEventListener("scroll", () => {
  if (isBottomOfPage()) {
    loadMoreUniversities();
  }
});
loadMoreUniversities();
