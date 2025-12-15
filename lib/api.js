import { Alert } from 'react-native';

const API_KEY = 'd158b4c41bf4757db6533c80809ded6a';

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        // Try to parse error message from body, fallback to status text
        const errBody = await response.json().catch(() => ({}));
        const message = errBody.message || response.statusText || `HTTP ${response.status}`;
        throw new Error(message);
    }
    return response.json();
}

export const getWeather = async (city, setWeatherData, setForecastData) => {
    if (!city) {
        Alert.alert('Erreur', 'Veuillez indiquer le nom d\'une ville.');
        return;
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
        )}&appid=${API_KEY}&units=metric&lang=fr`;

        const data = await fetchJson(apiUrl);

        // temperature is already in Celsius because of units=metric
        const temperatureCelsius = typeof data.main?.temp === 'number' ? data.main.temp.toFixed(1) : null;
        const description = data.weather?.[0]?.description ?? '';
        const currentTime = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes

        setForecastData(null);
        setWeatherData({ 
            temperature: temperatureCelsius, 
            description,
            dt: currentTime // Ajout de l'heure actuelle
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques : ', error);
        Alert.alert('Erreur', error.message || 'Échec de la récupération des données météorologiques. Veuillez réessayer.');
    }
};

export const getForecast = async (city, setWeatherData, setForecastData) => {
    if (!city) {
        Alert.alert('Erreur', 'Veuillez indiquer le nom d\'une ville.');
        return;
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            city
        )}&appid=${API_KEY}&units=metric&lang=fr`;

        const data = await fetchJson(apiUrl);

    // Return the full 3-hour interval forecast list (up to 5 days)
    const forecast = Array.isArray(data.list) ? data.list : [];

        setWeatherData(null);
        setForecastData(forecast);
    } catch (error) {
        console.error('Erreur lors de la récupération des données de prévision : ', error);
        Alert.alert('Erreur', error.message || 'Échec de la récupération des données de prévision. Veuillez réessayer.');
    }
};