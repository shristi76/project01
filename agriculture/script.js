function toggleMenu() {
    const menu = document.querySelector('.hamburger-menu');
    menu.classList.toggle('active');
  
}
// Function to open and close the chatbot popup
// function openChatbot() {
//     const popup = document.getElementById('chatbot-popup');
//     popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
// }

// Function to handle sending the query (you can expand this to send the query to a server)
// function sendQuery() {
//     const query = document.getElementById('chat-query').value;
//     if (query.trim() !== '') {
//         alert('Query sent: ' + query);
//         document.getElementById('chat-query').value = ''; // Clear the input
//         openChatbot(); // Optionally close the popup after sending
//     } else {
//         alert('Please enter a query before sending.');
//     }
// }
// Function to handle the "Analyze" button click
function openAnalyzePage() {
    window.location.href = 'analyze.html',target=_blank; // Change 'analyze.html' to the URL of the page you want to open
}

// Add event listener to the Analyze button
document.getElementById('analyze-btn').addEventListener('click', openAnalyzePage);

document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        document.getElementById('weather-info').innerText = "Geolocation is not supported by this browser.";
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const locationName = data.name;

            document.getElementById('weather-info').innerText = `Location: ${locationName}\nTemperature: ${temp}°C\nCondition: ${weatherDescription}`;
        })
        .catch(error => {
            document.getElementById('weather-info').innerText = "Unable to fetch weather data.";
            console.error("Error fetching weather data: ", error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        document.getElementById('weather-info').innerText = "Geolocation is not supported by this browser.";
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `/weather?lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const locationName = data.name;

            document.getElementById('weather-info').innerText = `Location: ${locationName}\nTemperature: ${temp}°C\nCondition: ${weatherDescription}`;
        })
        .catch(error => {
            document.getElementById('weather-info').innerText = "Unable to fetch weather data.";
            console.error("Error fetching weather data: ", error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        document.getElementById('weather-info').innerText = "Geolocation is not supported by this browser.";
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `/weather?lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const locationName = data.name;

            document.getElementById('weather-info').innerText = `Location: ${locationName}\nTemperature: ${temp}°C\nCondition: ${weatherDescription}`;
        })
        .catch(error => {
            document.getElementById('weather-info').innerText = "Unable to fetch weather data.";
            console.error("Error fetching weather data: ", error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        document.getElementById('weather-info').innerText = "Geolocation is not supported by this browser.";
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'bfdde316b8b6c043b5420d8b04d8984c';  // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const locationName = data.name;

            document.getElementById('weather-info').innerText = `Location: ${locationName}\nTemperature: ${temp}°C\nCondition: ${weatherDescription}`;
        })
        .catch(error => {
            document.getElementById('weather-info').innerText = "Unable to fetch weather data.";
            console.error("Error fetching weather data: ", error);
        });
}
function analyzeField() {
    const location = document.getElementById('search-input').value;
    const soilType = document.getElementById('soil-type').value;
    const landSize = document.getElementById('land-size').value;

    if (location && soilType && landSize) {
        // You can handle the inputs as needed, e.g., send them to a server or process them locally
        console.log("Location:", location);
        console.log("Soil Type:", soilType);
        console.log("Land Size:", landSize);

        // Example: Redirecting to another page with query parameters
        window.location.href = `analyze.html?location=${encodeURIComponent(location)}&soilType=${encodeURIComponent(soilType)}&landSize=${encodeURIComponent(landSize)}`;
    } else {
        alert("Please fill out all the fields before analyzing.");
    }
}
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function navigateTo(option) {
    alert(`Navigating to ${option}`);
    // Here you can add the logic to navigate to the respective pages or perform any action
}
// function openChatbot() {
//     const popup = document.getElementById('chatbot-popup');
//     popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
// }
// // Function to handle sending the query and displaying a confirmation message
// function openChatbot() {
//     const popup = document.getElementById('chatbot-popup');
//     popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
// }

// function sendQuery() {
//     const query = document.getElementById('chat-query').value;
//     if (query.trim() !== '') {
//         // Display a confirmation message to the user
//         alert('Your query is sent: ' + query);

//         // Optionally, clear the input field
//         document.getElementById('chat-query').value = '';

//         // Optionally, close the chatbot popup
//         openChatbot();
//     } else {
//         alert('Please enter a query before sending.');
//     }
// }

// function sendQuery() {
//     const query = document.getElementById('chat-query').value.toLowerCase();
//     const chatLog = document.getElementById('chat-log');
    
//     if (query.includes("weather")) {
//         fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.4050&current_weather=true')
//             .then(response => response.json())
//             .then(data => {
//                 const weather = data.current_weather.temperature;
//                 const responseMessage = document.createElement('p');
//                 responseMessage.textContent = "Bot: The current temperature is " + weather + "°C.";
//                 chatLog.appendChild(responseMessage);
//                 chatLog.scrollTop = chatLog.scrollHeight;
//             })
//             .catch(error => console.error('Error fetching weather data:', error));
//     } else {
//         const userMessage = document.createElement('p');
//         userMessage.textContent = "You: " + query;
//         chatLog.appendChild(userMessage);
        
//         const responseMessage = document.createElement('p');
//         responseMessage.textContent = "Bot: " + (chatbotResponses[query] || "Sorry, I don't understand that.");
//         chatLog.appendChild(responseMessage);
//         chatLog.scrollTop = chatLog.scrollHeight;
//     }
    
//     document.getElementById('chat-query').value = ''; // Clear the input
// }





async function analyzeCrops() {
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state, city }),
    });

    const data = await response.json();
    // Display the results on the frontend
    console.log(data.predicted_crops);
}
