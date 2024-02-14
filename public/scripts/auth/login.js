const login_form = document.querySelector("form");
const loading = document.querySelector(".loading");

login_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "block";

    const username = login_form.username.value;
    const password = login_form.password.value;

    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        if(json.error) {
            document.querySelector(".err-msg").textContent = json.error;
            loading.style.display = "none";
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