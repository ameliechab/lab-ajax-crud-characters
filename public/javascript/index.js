const charactersAPI = new APIHandler("http://localhost:8000");
const characterInfo = document.querySelector(".character-info");
const characterContainer = document.querySelector(".characters-container");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      axios
        .get(`http://localhost:8000/characters`)
        .then((response) => {
          const characters = response.data;
          characters.forEach((characterDetails) => {
            const clone = characterInfo.cloneNode(true);
            clone.querySelector(".name").innerText = characterDetails.name;
            clone.querySelector(".occupation").innerText =
              characterDetails.occupation;
            clone.querySelector(".cartoon").innerText =
              characterDetails.cartoon;
            clone.querySelector(".weapon").innerText = characterDetails.weapon;
            characterContainer.append(clone);
          });
        })
        .catch((err) => console.log("Error while getting the data: ", err));
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const characterId = document.querySelector('[name="character-id"]').value;

      axios
        .get(`http://localhost:8000/characters/${characterId}`)
        .then((response) => {
          const characterDetails = response.data;
          console.log(characterDetails);
          document.querySelector(".name").innerText = characterDetails.name;
          document.querySelector(".occupation").innerText =
            characterDetails.occupation;
          document.querySelector(".cartoon").innerText =
            characterDetails.cartoon;
          document.querySelector(".weapon").innerText = characterDetails.weapon;
        })
        .catch((err) => console.log("Error while getting the data: ", err));
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const characterId = document.querySelector(
        '[name="character-id-delete"]'
      ).value;
      axios.delete(`http://localhost:8000/characters/${characterId}`);
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {});

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {});
});
