const button = document.getElementById("APIButton");
const status = document.getElementById("status");
const button = document.getElementById("getFruit");
const button = document.getElementById("removeFruit");


button.addEventListener("click", function () {
    status.textContent = "Getting Devil Fruit...";

    fetch("https://api.api-onepiece.com/v2/fruits/en/{id]")
    .then(response => response.json())
    .then(data => {
        text.src = data.message;
        status.textContent = "Your Devil Fruit is...";
    })
    .catch(error => console.error("Error getting Devil Fruit: ", error))
})