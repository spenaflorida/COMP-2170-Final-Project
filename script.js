const status = document.getElementById("status");
const getFruitButton = document.getElementById("getFruit");
const removeFruitButton = document.getElementById("removeFruit");
const searchButton = document.getElementById("searchButton");
const fruitSearch = document.getElementById("fruitSearch");
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");

// SAVE TO LOCAL STORAGE
function saveFruit(fruit) {
    localStorage.setItem("lastFruit", JSON.stringify(fruit));
}

// LOAD FROM LOCAL STORAGE ON PAGE START
window.addEventListener("load", function () {
    const savedFruit = localStorage.getItem("lastFruit");
    if (savedFruit) {
        const fruit = JSON.parse(savedFruit);
        displayFruit(fruit);
    }
});


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

// DISPLAY FUNCTION (TEXT ONLY + SAVE)
function displayFruit(fruit) {
    status.innerHTML = `
        <strong>${fruit.name}</strong><br><br>
        Type: ${fruit.type}<br><br>
        Description: ${fruit.description}
    `;
    // SAVE LAST VIEWED FRUIT
    saveFruit(fruit);
}

// REMOVE
function removeFruit() {
    status.textContent =
        "Devil Fruit will appear here.";
    fruitSearch.value = "";
    // CLEAR STORAGE
    localStorage.removeItem("lastFruit");
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
removeFruitButton.addEventListener("click", removeFruit);
searchButton.addEventListener("click", searchFruit);

// NAV EVENTS
menuButton.addEventListener("click", () => {
    sideMenu.classList.add("open");
    document.body.classList.add("menu-open");
});

closeMenu.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
});