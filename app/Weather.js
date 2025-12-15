import React, { useState, useRef } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { styles } from '../lib/styles';
import { getWeather, getForecast } from '../lib/api';

// Formatage de l'heure en français (24h)
const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    try {
        // 'fr-FR' donne le format 24h par défaut (ex: 14:30)
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        // Fallback simple : HH:MM
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    }
};

const Weather = () => {
    const [city, setCity] = useState("");
    const [displayCity, setDisplayCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    const handleGetWeather = async () => {
        setDisplayCity(city);
        getWeather(city, setWeatherData, setForecastData);
    };

    const handleGetForecast = async () => {
        setDisplayCity(city);
        setSelectedDayIndex(0);
        await getWeather(city, setWeatherData, setForecastData); // récupère météo actuelle
        getForecast(city, setWeatherData, setForecastData); // récupère prévisions
    };

    // Generate an array of Date objects for today + next (n-1) days
    const getDays = (n) => {
        const days = [];
        const now = new Date();
        for (let i = 0; i < n; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() + i);
            d.setHours(0, 0, 0, 0);
            days.push(d);
        }
        return days;
    };

    const days = getDays(10); // today + next 9 days

    // Get forecast entries for a specific day
    const entriesForDay = (dayDate) => {
        if (!Array.isArray(forecastData)) return [];
        return forecastData.filter(item => {
            const d = new Date(item.dt * 1000);
            return d.getFullYear() === dayDate.getFullYear() &&
                d.getMonth() === dayDate.getMonth() &&
                d.getDate() === dayDate.getDate();
        });
    };

    // Préparer les éléments à afficher pour le jour sélectionné
    let displayItems = [];

    if (forecastData) {
        // Récupère les prévisions du jour sélectionné
        displayItems = entriesForDay(days[selectedDayIndex]);

        // Ajouter le créneau actuel pour aujourd'hui et les autres jours si possible
        if (selectedDayIndex === 0 && displayItems.length > 0) {
            displayItems.unshift({
                dt: Math.floor(Date.now() / 1000),
                main: { temp: displayItems[0].main.temp },
                weather: displayItems[0].weather,
                isCurrent: true,
            });
        }
    }

    const formatDateLabel = (date) => {
        try {
            return date.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
        } catch (e) {
            // Fallback simple format DD/MM
            return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
        }
    };

    // Ref pour la ScrollView horizontale
    const scrollRef = useRef(null);
    // Position actuelle du scroll (pour web / mobile)
    const scrollX = useRef(0);

    // Scroll vers la droite
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ x: scrollX.current + 150, animated: true });
            scrollX.current += 150;
        }
    };

    // Scroll vers la gauche
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ x: Math.max(scrollX.current - 150, 0), animated: true });
            scrollX.current = Math.max(scrollX.current - 150, 0);
        }
    };

    // Mettre à jour la position du scroll
    const onScroll = (event) => {
        scrollX.current = event.nativeEvent.contentOffset.x;
    };


    // Simplification : affichage direct des créneaux horaires du jour sélectionné.
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>🌤️ Portail météo</Text>
                <Text style={styles.subtitle}>par Uğur Kulaksız</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Entrez le nom de la ville"
                    placeholderTextColor="#cccccc"
                    value={city}
                    onChangeText={setCity}
                />

                <View style={styles.buttonGroup}>
                    <Pressable onPress={handleGetWeather} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>Obtenir la météo</Text>
                    </Pressable>

                    <Pressable onPress={handleGetForecast} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>Obtenir les prévisions</Text>
                    </Pressable>
                </View>

                <ScrollView style={styles.results}>
                    {displayCity !== "" && (
                        <View style={styles.weatherInfo}>
                            <Text style={[styles.heading, { fontSize: 22, marginTop: 10 }]}>
                                {displayCity}
                            </Text>
                        </View>
                    )}

                    {/* Day selector */}
                    {forecastData && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
                            {days.map((d, idx) => (
                                <Pressable
                                    key={idx}
                                    onPress={() => setSelectedDayIndex(idx)}
                                    style={({ pressed }) => [
                                        { padding: 8, marginRight: 8, borderRadius: 6, borderWidth: 1, borderColor: selectedDayIndex === idx ? '#007AFF' : '#ccc', backgroundColor: selectedDayIndex === idx ? '#E6F0FF' : 'transparent' },
                                        pressed && { opacity: 0.7 }
                                    ]}
                                >
                                    <Text style={[styles.dayLabel, selectedDayIndex === idx && styles.dayLabelActive]}>{formatDateLabel(d)}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    )}

                    {weatherData && (
                        <View style={styles.weatherInfo}>
                            <Text style={styles.weatherText}>
                                <Text style={styles.heading}>Température:</Text> {weatherData.temperature} °C
                            </Text>
                            <Text style={styles.weatherText}>
                                <Text style={styles.heading}>Description:</Text> {weatherData.description}
                            </Text>
                        </View>
                    )}

                    {forecastData && (
                        <View style={styles.weatherInfo}>
                            <Text style={[styles.heading, styles.forecastTitle]}>Prévisions par créneaux de 3h pour le {formatDateLabel(days[selectedDayIndex])} :</Text>

                            {displayItems.length === 0 ? (
                                <Text style={styles.weatherText}>Aucune donnée de prévision pour ce jour.</Text>
                            ) : (
                                <View style={styles.forecastScrollWrapper}>
                                    {/* Flèche gauche */}
                                    <Pressable onPress={scrollLeft} style={({ pressed }) => [styles.arrowButton, pressed && styles.arrowButtonPressed]}>
                                        <Text style={styles.arrowText}>❮</Text>
                                    </Pressable>

                                    {/* ScrollView horizontal */}
                                    <ScrollView
                                        ref={scrollRef}
                                        horizontal
                                        onScroll={onScroll}
                                        scrollEventThrottle={16}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizontalScroll}
                                    >
                                        {displayItems.map((forecastItem, index) => (
                                            <View key={index} style={styles.forecastCard}>
                                                <Text style={styles.forecastTime}>
                                                    {formatTime(forecastItem.dt)}
                                                    {forecastItem.isCurrent ? ' (actuel)' : ''}
                                                </Text>
                                                <Text style={styles.forecastTemp}>🌡 {forecastItem.main.temp != null ? `${forecastItem.main.temp.toFixed(1)} °C` : '—'}</Text>
                                                <Text style={styles.forecastDesc}>{forecastItem.weather?.[0]?.description ?? ''}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>

                                    {/* Flèche droite */}
                                    <Pressable onPress={scrollRight} style={({ pressed }) => [styles.arrowButton, pressed && styles.arrowButtonPressed]}>
                                        <Text style={styles.arrowText}>❯</Text>
                                    </Pressable>
                                </View>
                            )}

                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );

};

export default Weather;