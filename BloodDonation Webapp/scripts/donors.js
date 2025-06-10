// filepath: /D:/BloodDonation Webapp/scripts/donors.js
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.querySelector(".search-input");
    const resultsContainer = document.querySelector(".results");

    searchButton.addEventListener("click", function() {
        const location = searchInput.value;
        if (location) {
            // Simulate a search for donors
            const donors = [
                { name: "PCCOE Campus(Donor 1), Contact no: 980XXXXXXX", lat: 18.6517, lng: 73.7616 },
                { name: "Kamla Cross, Pcmc(Donor 2)Contact no: 880XXXXXXX", lat: 18.6286080, lng: 73.8033664 },
                { name: "Lokmanya Hospital, Chinchwad(Donor 3)Contact no: 9760XXXXXX", lat: 18.6373, lng: 73.7903 }
            ];

            resultsContainer.innerHTML = "";
            donors.forEach(function(donor) {
                const donorElement = document.createElement("div");
                donorElement.classList.add("donor-block");
                donorElement.innerHTML = `<h3>${donor.name}</h3><p>(${donor.lat}, ${donor.lng})</p>`;
                donorElement.addEventListener("click", function() {
                    map.setCenter({ lat: donor.lat, lng: donor.lng });
                    map.setZoom(15); // Optional: Zoom in when a donor is clicked
                });
                resultsContainer.appendChild(donorElement);
            });

            // Update map with donor locations
            initMap(donors);
        } else {
            resultsContainer.innerHTML = "<p>Please enter a location.</p>";
        }
    });

    let map;

    function initMap(donors) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 28.7041, lng: 77.1025 },
            zoom: 10,
        });

        donors.forEach(function(donor) {
            var marker = new google.maps.Marker({
                position: { lat: donor.lat, lng: donor.lng },
                map: map,
                title: donor.name
            });

            var infoWindow = new google.maps.InfoWindow({
                content: `<h3>${donor.name}</h3>`
            });

            marker.addListener("click", function() {
                infoWindow.open(map, marker);
            });
        });
    }
});