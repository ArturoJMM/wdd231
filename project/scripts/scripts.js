// Show date and year
const year = document.querySelector("#currentyear");
const full = document.querySelector("#lastModified");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;
full.innerHTML = `Last modified: ${new Intl.DateTimeFormat("en-US",{dateStyle: "full"}).format(today)}`;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requirementForm");

    // JavaScript Functions
    function saveFormDataToLocalStorage(formData) {
        
        // JavaScript Arrays and Array Methods
        const formDataObject = {};
        
        //JavaScript Objects
        formData.forEach((value, key) => {
            if (value.trim() !== "") { 
                formDataObject[key] = value;
            }
        });

        // saving instruction
        localStorage.setItem("requirementData", JSON.stringify(formDataObject));
    }

    // Listener for the form event
    form.addEventListener("submit", (event) => {
        // avoid default behavior of the form
        event.preventDefault();

        // Capture the form data
        const formData = new FormData(form);

        // Conditional for validate the requirement of a number and a email
        const email = formData.get("email");
        const phone = formData.get("phone");

        if (!email && !phone) {
            alert(`Please provide either an email or a phone number.`); // JavaScript Template Literals
            return;
        }

        // Call the saving function
        saveFormDataToLocalStorage(formData);

        // Reroute user to confirmation page.
        window.location.href = "review.html";
    });
});