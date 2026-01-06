import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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

      // Call edge function to get weather data
      const { data, error: funcError } = await supabase.functions.invoke('get-weather', {
        body: { latitude, longitude }
      });

      if (funcError) {
        throw new Error(funcError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        temperature: Math.round(data.temperature).toString(),
        humidity: Math.round(data.humidity).toString(),
        rainfall: Math.round(data.rainfall).toString(),
      };
    } catch (err) {
      setIsLoading(false);
      if (err instanceof GeolocationPositionError) {
        setError("Location access denied");
        return null;
      }
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchWeather, isLoading, error };
};

export default useWeather;
