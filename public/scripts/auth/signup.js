const signup_form = document.querySelector("form");
const loading = document.querySelector(".loading");

signup_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "block";

    const username = signup_form.username.value;
    const password = signup_form.password.value;

    try {
        const res = await fetch("/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        if(json.error) {
            loading.style.display = "none";
            document.querySelector(".err-msg").textContent = json.error;
        }
        console.log(json);
        if(json.user) {
            location.assign("/"); 
        }
    }
    catch(err) {
        console.error(err.message);
    }
})