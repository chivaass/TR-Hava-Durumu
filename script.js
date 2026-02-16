/**
 * Amaç: Asenkron API yönetimi.
*/

const citySelect = document.getElementById('citySelect');
const weatherResult = document.getElementById('weatherResult');
const hourlyTimeline = document.getElementById('hourlyTimeline');

let updateInterval; // Zamanlayıcıyı saklamak için değişken

// Veri çekme işlemini ayrı bir fonksiyon yapıyoruz ki hem ilk seçimde hem de zamanlayıcıda kullanabilelim
async function fetchWeatherData() {
    const rawValue = citySelect.value;
    if (!rawValue) return;

    const [plaka, lat, lon] = rawValue.split(',');
    const selectedCityName = citySelect.options[citySelect.selectedIndex].text;

    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&forecast_days=1`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Ağ hatası!");
        
        const data = await response.json();
        updateWeatherUI(data, selectedCityName);
        
        console.log(`Veri güncellendi: ${new Date().toLocaleTimeString()}`); // Konsoldan takip etmek için

    } catch (error) {
        console.error("Hata:", error);
    }
}

// Olay İzleyici: Kullanıcı şehir seçtiğinde çalışır
citySelect.addEventListener('change', () => {
    // Önceki zamanlayıcıyı temizle (Yeni şehir seçilirse eskisi çakışmasın)
    clearInterval(updateInterval);

    if (!citySelect.value) {
        weatherResult.classList.add('hidden');
        return;
    }

    // İlk veriyi hemen çek
    fetchWeatherData();

    // REAL-TIME: Her 5 dakikada bir (300.000 ms) veriyi otomatik tazele
    updateInterval = setInterval(fetchWeatherData, 300000); 
});

function updateWeatherUI(data, cityName) {
    const current = data.current;

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('tempValue').innerText = Math.round(current.temperature_2m);
    document.getElementById('windSpeed').innerText = `${current.wind_speed_10m} km/s`;
    document.getElementById('humidity').innerText = `${current.relative_humidity_2m} %`;
    document.getElementById('windDir').innerText = `Yön: ${getWindDirection(current.wind_direction_10m)}`;
    document.getElementById('weatherDesc').innerText = translateWeatherCode(current.weather_code);

    hourlyTimeline.innerHTML = '';
    
    for(let i = 0; i < 24; i++) {
        const hourValue = new Date(data.hourly.time[i]).getHours();
        const formattedHour = hourValue.toString().padStart(2, '0') + ":00";
        
        const temp = Math.round(data.hourly.temperature_2m[i]);
        const code = data.hourly.weather_code[i];

        const item = document.createElement('div');
        item.className = 'hourly-item';
        item.innerHTML = `
            <span>${formattedHour}</span>
            <b>${temp}°</b>
            <span>${getWeatherEmoji(code)}</span>
        `;
        hourlyTimeline.appendChild(item);
    }

    weatherResult.classList.remove('hidden');
}

function getWindDirection(degree) {
    const directions = ['Kuzey', 'Kuzey Doğu', 'Doğu', 'Güney Doğu', 'Güney', 'Güney Batı', 'Batı', 'Kuzey Batı'];
    return directions[Math.round(degree / 45) % 8];
}

function getWeatherEmoji(code) {
    const emojis = { 0: "☀️", 1: "🌤️", 3: "☁️", 45: "🌫️", 61: "🌧️", 71: "❄️", 95: "⚡" };
    return emojis[code] || "☁️";
}

function translateWeatherCode(code) {
    const codes = {
        0: "Açık Gökyüzü", 1: "Genellikle Açık", 3: "Parçalı Bulutlu", 
        45: "Sisli", 61: "Yağmurlu", 71: "Kar Yağışlı", 95: "Fırtına"
    };
    return codes[code] || "Bulutlu";
}