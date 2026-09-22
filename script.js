// ==========================================
// 1. BOOKING FORM
// ==========================================

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const bookingData = {

            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            hotelName: document.getElementById("hotelName").value,

            checkIn: document.getElementById("checkIn").value,

            checkOut: document.getElementById("checkOut").value,

            guests: Number(
                document.getElementById("guests").value
            )

        };


        // Check-out date validation
        if (bookingData.checkOut <= bookingData.checkIn) {

            bookingMessage.textContent =
                "Check-out date must be after check-in date.";

            bookingMessage.style.color = "red";

            return;
        }


        try {

            const response = await fetch(
                 "https://hotelhub-p5vf.onrender.com/api/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(bookingData)
                }
            );


            const data = await response.json();


            if (response.ok) {

                bookingMessage.textContent =
                    "Booking successful! Your room has been booked.";

                bookingMessage.style.color = "green";

                bookingForm.reset();

            } else {

                bookingMessage.textContent =
                    data.message || "Booking failed.";

                bookingMessage.style.color = "red";

            }


        } catch (error) {

            console.error("Booking Error:", error);

            bookingMessage.textContent =
                "Unable to connect to the server.";

            bookingMessage.style.color = "red";

        }

    });

}


// ==========================================
// 2. HOTEL SEARCH
// ==========================================

const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");
const hotelContainer = document.getElementById("hotelContainer");


if (searchButton) {

    searchButton.addEventListener("click", async function () {

        const location = document
            .getElementById("searchLocation")
            .value
            .trim();

        const checkIn = document
            .getElementById("searchCheckIn")
            .value;

        const checkOut = document
            .getElementById("searchCheckOut")
            .value;

        const guests = document
            .getElementById("searchGuests")
            .value;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (location === "") {

            searchMessage.textContent =
                "Please enter a location.";

            searchMessage.style.color = "red";

            return;
        }


        if (checkIn === "" || checkOut === "") {

            searchMessage.textContent =
                "Please select check-in and check-out dates.";

            searchMessage.style.color = "red";

            return;
        }


        if (checkOut <= checkIn) {

            searchMessage.textContent =
                "Check-out date must be after check-in date.";

            searchMessage.style.color = "red";

            return;
        }


        // ==========================================
        // GET HOTELS FROM BACKEND
        // ==========================================

        try {

            const response = await fetch(
              "https://hotelhub-p5vf.onrender.com/api/hotels"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch hotels"
                );

            }


            const hotels = await response.json();


            // ==========================================
            // FILTER HOTELS
            // ==========================================

            const results = hotels.filter(function (hotel) {

                return hotel.location
                    .toLowerCase()
                    .includes(location.toLowerCase());

            });


            // ==========================================
            // NO HOTELS FOUND
            // ==========================================

            if (results.length === 0) {

                searchMessage.textContent =
                    "No hotels found in " + location + ".";

                searchMessage.style.color = "red";

                hotelContainer.innerHTML = "";

                return;
            }


            // ==========================================
            // DISPLAY SEARCH RESULTS
            // ==========================================

            hotelContainer.innerHTML = "";


            results.forEach(function (hotel) {

                const hotelCard =
                    document.createElement("div");

                hotelCard.className = "hotel-card";


                hotelCard.innerHTML = `

                    <img
                        src="${hotel.image}"
                        alt="${hotel.name}"
                    >

                    <div class="hotel-info">

                        <h3>${hotel.name}</h3>

                        <p class="location">
                            ${hotel.location}, India
                        </p>

                        <p>
                            ⭐ ${hotel.rating}
                        </p>

                        <p class="description">
                            ${hotel.description}
                        </p>

                        <div class="price">
                            ₹${hotel.price}
                            <span>/ night</span>
                        </div>

                        <a
                            href="#booking"
                            class="book-btn"
                            onclick="selectHotel('${hotel.name}')"
                        >
                            Book Now
                        </a>

                    </div>

                `;


                hotelContainer.appendChild(hotelCard);

            });


            // ==========================================
            // SEARCH MESSAGE
            // ==========================================

            searchMessage.textContent =
                results.length +
                " hotel(s) found in " +
                location +
                " for " +
                guests +
                " guest(s).";

            searchMessage.style.color = "green";


            // Scroll to hotels

            document
                .getElementById("hotels")
                .scrollIntoView({
                    behavior: "smooth"
                });


        } catch (error) {

            console.error("Search Error:", error);

            searchMessage.textContent =
                "Unable to connect to the server.";

            searchMessage.style.color = "red";

        }

    });

}


// ==========================================
// 3. SELECT HOTEL FOR BOOKING
// ==========================================

function selectHotel(hotelName) {

    const hotelSelect =
        document.getElementById("hotelName");

    if (hotelSelect) {

        hotelSelect.value = hotelName;

    }

}