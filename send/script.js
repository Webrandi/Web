// Replace 'YOUR_OPENWEATHER_API_KEY' with your OpenWeather API key
const apiKey = '4e8fcb0b6af802134fbe131c569da922';
const city = 'Patna';
const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_TELEGRAM_CHAT_ID';

function fetchWeather() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const message = `Weather in ${city}: ${weatherDescription}, Temperature: ${temperature}°C`;

      document.getElementById('weather-info').innerText = message;

      // Send message to Telegram
      sendTelegramMessage(message);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function sendTelegramMessage(message) {
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const formData = new FormData();

  formData.append('chat_id', chatId);
  formData.append('text', message);

  fetch(telegramApiUrl, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => console.log('Telegram API response:', data))
    .catch(error => console.error('Error sending message to Telegram:', error));
}

// Fetch weather on page load
fetchWeather();

// Fetch weather periodically (e.g., every hour)
setInterval(fetchWeather, 60000); // 1 hour in milliseconds
           
