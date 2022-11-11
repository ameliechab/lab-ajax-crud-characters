const charactersAPI = new APIHandler("http://localhost:8000");
const characterInfo = document.querySelector(".character-info");
const characterContainer = document.querySelector(".characters-container");

window.addEventListener("load", () => {
  document
    //Fetch all
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

  //Fetch one
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

  //Delete one
  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const characterId = document.querySelector(
        '[name="character-id-delete"]'
      ).value;
      axios.delete(`http://localhost:8000/characters/${characterId}`);
    });

  //Create a character
  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      character = {};
      character.name = document.querySelector(
        '#new-character-form [name="name"]'
      ).value;
      character.occupation = document.querySelector(
        '#new-character-form [name="occupation"]'
      ).value;
      character.weapon = document.querySelector(
        '#new-character-form [name="weapon"]'
      ).value;
      character.cartoon = document.querySelector(
        '#new-character-form [name="cartoon"]'
      ).value;

      console.log(character);
      await axios
        .post(`http://localhost:8000/characters`, character)
        .then((response) => {
          console.log(response);
        });
    });
});

// Update character
document
  .getElementById("edit-character-form")
  .addEventListener("submit", function (event) {
    character = {};
    character.id = document.querySelector(
      '#edit-character-form input[name="chr-id"]'
    ).value;
    character.name = document.querySelector(
      '#edit-character-form input[name="name"]'
    ).value;
    character.occupation = document.querySelector(
      '#edit-character-form input[name="occupation"]'
    ).value;
    character.weapon = document.querySelector(
      '#edit-character-form input[name="weapon"]'
    ).value;
    character.cartoon = document.querySelector(
      '#edit-character-form input[name="cartoon"]'
    ).value;

    const characterId = document.querySelector('[name="chr-id"]').value;
    axios
      .patch(`http://localhost:8000/characters/${characterId}`, character)
      .then((response) => {
        console.log(response);
      });
  });
