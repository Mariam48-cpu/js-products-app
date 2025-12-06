let email = document.querySelector("#loginEmail");
let password = document.querySelector("#loginPassword");
let login_btn = document.querySelector("#login");

let storedEmail = localStorage.getItem("email");
let storedPassword = localStorage.getItem("password");

login_btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (email.value.trim() === "" || password.value.trim() === "") {
        alert("Please fill all data");
    } 
    else if (
        storedEmail &&
        storedEmail.trim().toLowerCase() === email.value.trim().toLowerCase() &&
        storedPassword &&
        storedPassword === password.value
    ) {
        alert("Login successful!");
        setTimeout(() => {
            window.location = "index.html";
        }, 1500);
    } else {
        alert("Invalid email or password");
    }
});
