import { useState, useCallback } from "react";
import { toast } from "sonner";

interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
}

interface UseWeatherReturn {
  fetchWeather: () => Promise<WeatherData | null>;
  isLoading: boolean;
  error: string | null;
}

// Using OpenWeatherMap API - user needs to provide API key
const OPENWEATHER_API_KEY = ""; // Will prompt user for key

export const useWeather = (): UseWeatherReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (): Promise<WeatherData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const { latitude, longitude } = position.coords;

      // For demo purposes, we'll use mock data based on Indian climate zones
      // In production, you would use the actual OpenWeatherMap API
      const mockWeatherByRegion = getMockWeatherData(latitude, longitude);
      
      setIsLoading(false);
      return mockWeatherByRegion;
    } catch (err) {
      setIsLoading(false);
      if (err instanceof GeolocationPositionError) {
        setError("Location access denied");
        return null;
      }
      setError("Failed to fetch weather data");
      return null;
    }
  }, []);

  return { fetchWeather, isLoading, error };
};

// Mock weather data based on approximate Indian regions
function getMockWeatherData(lat: number, lng: number): WeatherData {
  // Determine climate zone based on latitude
  if (lat > 28) {
    // North India - Punjab, Haryana, etc.
    return { temperature: "25", humidity: "55", rainfall: "80" };
  } else if (lat > 23) {
    // Central India - MP, Rajasthan, etc.
    return { temperature: "32", humidity: "45", rainfall: "60" };
  } else if (lat > 15) {
    // South-Central - Maharashtra, Telangana, etc.
    return { temperature: "30", humidity: "65", rainfall: "100" };
  } else {
    // South India - Kerala, Tamil Nadu, etc.
    return { temperature: "28", humidity: "80", rainfall: "150" };
  }
}

export default useWeather;
