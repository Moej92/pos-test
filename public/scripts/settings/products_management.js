// handle slider
const slideToggle = document.querySelector(".toggler");
const nextSlide = document.querySelector(".next-slide");

slideToggle.addEventListener("click", () => {
    const visibleSlide = document.querySelector(".show-slide");
    const hiddenSlide = document.querySelector(".hide-slide");
    
    visibleSlide.classList.add("hide-slide");
    visibleSlide.classList.remove("show-slide");
    hiddenSlide.classList.remove("hide-slide");
    hiddenSlide.classList.add("show-slide");

    if(nextSlide.textContent == "إدارة الفئات" ) {
        nextSlide.textContent =  "إدارة المواد"
    } else {
        nextSlide.textContent = "إدارة الفئات"
    }
});


// handle edit screen
const editScreen = document.querySelector(".edit-screen");
const formContainer = document.querySelectorAll(".form-container");

document.querySelector(".exit-edit").addEventListener("click", () => {
    formContainer.forEach(form => form.style.display = "none");
    editScreen.style.display = "none";
});

const addCategory = document.querySelector(".add-category");
addCategory.addEventListener("click", () => {
    editScreen.style.display = "flex";
    document.getElementById("add-category-form").style.display = "block";
})

const categories = document.querySelectorAll(".category");
categories.forEach(category => {
    category.addEventListener("click", function() {
        editScreen.style.display = "flex";
        document.getElementById("edit-category-form").style.display = "block";
        document.querySelector(".current-category").value = this.firstElementChild.id;
        document.querySelector(".category_id").value = this.id;
    })
})

const addProduct = document.querySelector(".add-product");
addProduct.addEventListener("click", () => {
    editScreen.style.display = "flex";
    document.getElementById("add-product-form").style.display = "block";
});


const products = document.querySelectorAll(".category-product")
products.forEach(product => {
    product.addEventListener("click", function() {
        editScreen.style.display = "flex";
        const childern = product.getElementsByTagName("p")
        console.log(childern[1].textContent)
        document.getElementById("edit-product").value = this.id;
        document.getElementById("delete-product").value = this.id;
        document.querySelector(".edit-product-name").value = childern[0].textContent;
        document.querySelector(".edit-product-price").value = childern[1].textContent.replace("JD", "");
        document.getElementById("edit-product-form").style.display = "block";
    })
})
