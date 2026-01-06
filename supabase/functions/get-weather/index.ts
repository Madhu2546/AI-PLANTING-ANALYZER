import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching weather for coordinates: ${latitude}, ${longitude}`);

    // Using Open-Meteo API - completely free, no API key required
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      console.error('Weather API error:', response.status, response.statusText);
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Weather data received:', JSON.stringify(data));

    // Transform the data to a more usable format
    const weatherData = {
      temperature: data.current?.temperature_2m || null,
      humidity: data.current?.relative_humidity_2m || null,
      rainfall: data.current?.rain || 0,
      weatherCode: data.current?.weather_code || null,
      daily: {
        maxTemp: data.daily?.temperature_2m_max?.[0] || null,
        minTemp: data.daily?.temperature_2m_min?.[0] || null,
        precipitation: data.daily?.precipitation_sum?.[0] || 0,
      },
      units: {
        temperature: data.current_units?.temperature_2m || '°C',
        humidity: data.current_units?.relative_humidity_2m || '%',
        rainfall: data.current_units?.rain || 'mm',
      }
    };

    return new Response(
      JSON.stringify(weatherData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching weather:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
