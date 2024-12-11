function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function closeAllPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => (popup.style.display = "none"));
  document.getElementById("overlay").style.display = "none";
}
