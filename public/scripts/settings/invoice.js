const filter_toggler = document.querySelector(".filter-toggle");
const filter_form = document.querySelector(".filter-form ");

filter_toggler.addEventListener("click", function() {
    this.classList.toggle("open-filter");
    filter_form.classList.toggle("open-form");
})

console.log(filter_toggler)