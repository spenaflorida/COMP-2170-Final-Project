const status = document.getElementById("status");
const getFruitButton = document.getElementById("getFruit");
const removeFruitButton = document.getElementById("removeFruit");
const searchButton = document.getElementById("searchButton");
const fruitSearch = document.getElementById("fruitSearch");

// GET RANDOM FRUIT
async function getRandomFruit() {
    status.textContent = "Getting Devil Fruit...";
    try {
        const response = await fetch(
            "https://api.api-onepiece.com/v2/fruits/en"
        );
        const fruits = await response.json();
        const randomIndex =
            Math.floor(Math.random() * fruits.length);
        const fruit = fruits[randomIndex];
        displayFruit(fruit);
    } catch (error) {
        console.error(error);
        status.textContent =
            "Failed to load Devil Fruit.";
    }
}

// DISPLAY FUNCTION (TEXT ONLY)
function displayFruit(fruit) {
    status.innerHTML = `
        <strong>${fruit.name}</strong><br><br>
        Type: ${fruit.type}<br><br>
        Description: ${fruit.description}
    `;
}

// REMOVE
function removeFruit() {
    status.textContent =
        "Devil Fruit will appear here.";
    fruitSearch.value = "";
}

// SEARCH
async function searchFruit() {
    const searchInput =
        fruitSearch.value.trim().toLowerCase();
    if (searchInput === "") {
        status.textContent =
            "Please enter a Devil Fruit name.";
        return;
    }
    status.textContent =
        "Searching...";
    try {
        const response = await fetch(
            "https://api.api-onepiece.com/v2/fruits/en"
        );
        const fruits = await response.json();
        const foundFruit = fruits.find(fruit =>
            fruit.name.toLowerCase()
            .includes(searchInput)
        );
        if (foundFruit) {
            displayFruit(foundFruit);
        } else {
            status.textContent =
                "Devil Fruit not found.";
        }
    } catch (error) {
        console.error(error);
        status.textContent =
            "Error searching Devil Fruit.";
    }
}

// EVENTS
getFruitButton.addEventListener("click", getRandomFruit);
removeFruitButton.addEventListener("click",removeFruit);
searchButton.addEventListener("click",searchFruit);