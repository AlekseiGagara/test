// переменные для кнопок
const editButton = document.querySelector(".user-profile__edit-button");
const addCardButton = document.querySelector(".user-profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
// переменные для popup'ов и input'ов
const popup = document.querySelector(".popup");
const popupAddCard = document.querySelector(".popup__add-card");
const popupEditProfile = document.querySelector(".popup__edit");
const popupZoomImage = document.querySelector(".popup__zoom-image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image_caption");
const addForm = document.querySelector('form[name="addNewPlaceForm"]');
const editForm = document.querySelector('form[name="editProfileForm"]');
const inputUsername = document.querySelector(".popup__input_profile_username");
const inputDescription = document.querySelector(".popup__input_profile_description");
const userProfileName = document.querySelector(".user-profile__name");
const userProfileDescription = document.querySelector(".user-profile__description");
const inputPlaceTitle = document.querySelector(".popup__input_place_title");
const inputPlaceImageLink = document.querySelector(".popup__input_place_link");
// переменные для добавления карточек в places
const placeTemplate = document.querySelector("#place-template");
const cardsContainer = document.querySelector(".places");
// массив со стартовыми карточками
const initialCards = [
  {
    name: "Карачаевск",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-karachaevsk.jpg"
  },
  {
    name: "Гора Эльбрус",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-elbrus.jpg"
  },
  {
    name: "Домбай",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-dombai.jpg"
  },
  {
    name: "Гранд-Каньон",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-grand_canyon.jpg"
  },
  {
    name: "Каппадокия",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-capadocia.jpg"
  },
  {
    name: "Большое Алматинское озеро",
    link: "https://alekseigagara.github.io/mesto/images/photo-grid-BAO.jpg"
  },
];

// цикл для автоматического добавления стартовых карточек с использованием информации из массива
initialCards.forEach(function (card) {
  // дублируем узел
  const placeElement = placeTemplate.content.cloneNode(true);

  // получаем элементы внутри карточки
  const placeTitle = placeElement.querySelector(".place__title");
  const placeImage = placeElement.querySelector(".place__image");

  // присваиваем необходимые данные из массива
  placeTitle.textContent = card.name;
  placeImage.src = card.link;
  placeImage.alt = card.name;

  // добавляем карточку в начало контейнера
  cardsContainer.prepend(placeElement);
});

//open popup
editButton.addEventListener("click", () => openPopup(popupEditProfile));
addCardButton.addEventListener("click", () => openPopup(popupAddCard));
cardsContainer.addEventListener("click", evt => {
  if (evt.target.classList.contains("place__image")) {
    const card = evt.target.closest(".place");
    const cardTitle = card.querySelector(".place__title").textContent;
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = cardTitle;
    popupZoomImage.classList.add ("popup_opened");
  }
});
//функция открытия popup
function openPopup (popupType) {
  popupType.classList.add ("popup_opened");
  inputUsername.value = userProfileName.textContent;
  inputDescription.value = userProfileDescription.textContent;
};


//цикл для кнопок закрытия, где выбирается ближайший popup к слушателю
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

//функция редактирования профиля
function handleEditFormSubmit (evt) {
  evt.preventDefault();
  //присваиваем значения из инпутов
  userProfileName.textContent = inputUsername.value;
  userProfileDescription.textContent = inputDescription.value;
  //закрываем popup
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}
//функция добавления новой карточки на страницу
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  //дублируем узел и выбираем необходимые элементы
  const placeElement = placeTemplate.content.cloneNode(true);
  const placeTitle = placeElement.querySelector(".place__title");
  const placeImage = placeElement.querySelector(".place__image");
  //присваиваем значения из инпутов
  placeTitle.textContent = inputPlaceTitle.value;
  placeImage.src = inputPlaceImageLink.value;
  placeImage.alt = inputPlaceTitle.value;
  // добавляем карточку в начало контейнера
  cardsContainer.prepend(placeElement);
  //закрываем popup
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

//close popup
function closePopup (popupType) {
  popupType.classList.remove("popup_opened");
};


//слушатели события на кнопках submit
editForm.addEventListener("submit", handleEditFormSubmit);
addForm.addEventListener("submit", handleAddCardFormSubmit);

//функция и слушатель для лайков
cardsContainer.addEventListener("click", evt => {
  if (evt.target.classList.contains("place__like-button")) {
    evt.target.classList.toggle("place__like-button_like-active");
  }
});
//функция и слушатель для удаления
cardsContainer.addEventListener("click", evt => {
  if (evt.target.classList.contains("place__delete-button")) {
    const placeElement = evt.target.closest(".place");
    placeElement.remove();
  }
});
