(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("body").classList.add("js");

    var postalField = document.getElementById("billing_postcode"),
      cityField = document.getElementById("billing_city"),
      stateField = document.getElementById("billing_state"),
      countryField = document.getElementById("billing_country");

    postalField.addEventListener("blur", function queryPostalCode() {
      // Strip everything other than numbers and dashes from the postal code
      var postalCode = postalField.value.replace(/[^0-9-]/gi, "");
      if (postalCode.length < 5) {
        console.error("Postal code was poorly formed");
        return;
      }

      let country = countryField.value;
      if (!country) {
        country = "US";
      }

      // make the locations query
      axios
        .get("https://httpbin.org/get?postalCode=" + postalCode)
        .then(function (response) {
          // handle success
          console.log(response.data);

          var state = response.data.args.postalCode;
          var city = response.data.args.postalCode;

          cityField.value = city;
          stateField.value = state;

          cityField.parentNode.parentNode.style.display = "block";
          stateField.parentNode.parentNode.style.display = "block";
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
    });
  });
})();
