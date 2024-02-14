const categories = document.querySelectorAll(".category");

const first_category = categories[0];
first_category.classList.add("selected-category");

const first_list = document.getElementById(first_category.textContent);
first_list.style.display = "grid"

categories.forEach(category => {
    category.addEventListener("click", () => {
        // hide the current category and list
        const currentCategory = document.querySelector(".selected-category");
        document.getElementById(currentCategory.textContent).style.display = "none";
        currentCategory.classList.remove("selected-category");
        
        // add selected-category to the classList and display the list
        category.classList.add("selected-category");
        document.getElementById(category.textContent).style.display = "grid";

    })
})
