import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0f0c29',
    backgroundImage:
      Platform.OS === 'web' ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' : undefined,
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 100,
  },
  card: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1000 : 400,
    padding: Platform.OS === 'web' ? 40 : 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: Platform.OS === 'web' ? 'blur(15px)' : undefined,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#b0c4de',
    fontSize: Platform.OS === 'web' ? 24 : 18,
    marginBottom: 25,
  },
  input: {
    height: Platform.OS === 'web' ? 55 : 45,
    width: '100%',
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: Platform.OS === 'web' ? '0%' : '10%',
  },
  button: {
    backgroundColor: '#6a5acd',
    paddingVertical: Platform.OS === 'web' ? 16 : 12,
    paddingHorizontal: Platform.OS === 'web' ? 30 : 20,
    borderRadius: 8,
    shadowColor: '#9b59b6',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    transitionDuration: '200ms',
    marginHorizontal: 5,
  },
  buttonPressed: {
    backgroundColor: '#352ec6ff',
    transform: [{ scale: 0.97 }],
  },
  buttonTextHome: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: Platform.OS === 'web' ? 16 : 12,
    fontWeight: '600',
  },
  weatherInfo: {
    marginTop: 30,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  heading: {
    fontSize: Platform.OS === 'web' ? 22 : 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  weatherText: {
    color: '#e6e6fa',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    marginBottom: 8,
  },
  results: {
    marginTop: 20,
    width: '100%',
    maxHeight: Platform.OS === 'web' ? '40vh' : undefined,
    overflow: Platform.OS === 'web' ? 'auto' : undefined,
    ...(Platform.OS === 'web' && {
      scrollbarWidth: "thin",
      scrollbarColor: "#ffffffff transparent",
    }),
  },
  // Day selector labels
  dayLabel: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    color: '#ffffffff',
    paddingHorizontal: 6,
  },
  dayLabelActive: {
    color: '#003366',
    fontWeight: '700',
  },
  // Forecast title and items
  forecastTitle: {
    color: '#ffffffff',
  },
  forecastItem: {
    color: '#e6e6fa',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    marginBottom: 6,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'center',
  },

  // Styles pour les cartes d'aperçu horizontales
  forecastCard: {
    minWidth: Platform.OS === 'web' ? 140 : 120,
    padding: 10,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  forecastTime: {
    color: '#ffffff',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '700',
    marginBottom: 4,
    marginRight: Platform.OS === 'web' ? 12 : 8,
  },
  forecastTemp: {
    color: '#e6e6fa',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    marginBottom: 2,
    marginRight: Platform.OS === 'web' ? 12 : 8,
  },
  forecastDesc: {
    color: '#cfd8e3',
    fontSize: Platform.OS === 'web' ? 16 : 14,
  },

  // Flêches de défilement horizontales pour les prévisions
  forecastScrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },

  forecastHorizontal: {
    flexGrow: 0,
    maxWidth: '78%',
  },

  horizontalScroll: {
    flex: 1,
    marginHorizontal: 6,
  },

  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backdropFilter: Platform.OS === 'web' ? 'blur(6px)' : undefined,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  arrowButtonPressed: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ scale: 0.92 }],
  },

  arrowText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },

});