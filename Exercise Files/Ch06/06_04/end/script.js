(function () {
  "use strict";

  const bingMapsKey = "BING_MAPS_KEY";

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
        .get("https://dev.virtualearth.net/REST/v1/Locations", {
          params: {
            countryRegion: country,
            postalCode: postalCode,
            maxResults: 10,
            key: bingMapsKey,
          },
        })
        .then(function (response) {
          // handle success
          console.log(response.data);

          var address = response.data.resourceSets[0].resources[0].address;

          var state = address.adminDistrict;
          var city = address.locality;

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
