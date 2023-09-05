// Enable the submit button when both fields are filled
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const street = document.getElementById("street");
const landmark = document.getElementById("landmark");
const city = document.getElementById("city");
const postalCode = document.getElementById("postalCode");
const state = document.getElementById("state");
const country = document.getElementById("country");
const submitButton = document.getElementById("submitBtn");

firstName.addEventListener("input", toggleSubmitButton);
street.addEventListener("input", toggleSubmitButton);
landmark.addEventListener("input", toggleSubmitButton);
city.addEventListener("input", toggleSubmitButton);
postalCode.addEventListener("input", toggleSubmitButton);
state.addEventListener("input", toggleSubmitButton);
country.addEventListener("input", toggleSubmitButton);

function toggleSubmitButton() {
  if (
    firstName.value.trim() !== "" &&
    street.value.trim() !== "" &&
    landmark.value.trim() !== "" &&
    city.value.trim() !== "" &&
    postalCode.value.trim() !== "" &&
    state.value.trim() !== "" &&
    country.value.trim() !== ""
  ) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }
}

// store the user information on the database
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  //   const form = document.querySelector("form");
  //   const formData = new FormData(form);
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    street: street.value,
    landmark: landmark.value,
    postalCode: postalCode.value,
    city: city.value,
    state: state.value,
    country: country.value,
  };
  console.log(formData);

  fetch("https://submitform.onrender.com/api/submit/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(formData), // Convert formData to a JSON string
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server response data here
      console.log("Server Response:", data);
      data.status === 500
        ? alert("Database Error!")
        : alert("Form successfully submited...");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Form submission faild!");
    });
});
