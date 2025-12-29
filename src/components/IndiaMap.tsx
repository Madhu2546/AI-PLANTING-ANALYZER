import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Map as MapIcon, Leaf, X } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// State-wise crop data for India
const stateData: Record<string, { crops: string[]; climate: string; soils: string[] }> = {
  "Punjab": {
    crops: ["Wheat", "Rice", "Cotton", "Maize"],
    climate: "Semi-arid with hot summers and cold winters",
    soils: ["Alluvial", "Sandy loam"]
  },
  "Haryana": {
    crops: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    climate: "Continental with extreme temperatures",
    soils: ["Alluvial", "Sandy"]
  },
  "Uttar Pradesh": {
    crops: ["Wheat", "Rice", "Sugarcane", "Potato"],
    climate: "Humid subtropical",
    soils: ["Alluvial", "Sandy loam"]
  },
  "Maharashtra": {
    crops: ["Cotton", "Sugarcane", "Grapes", "Orange"],
    climate: "Tropical monsoon",
    soils: ["Black", "Laterite", "Alluvial"]
  },
  "Gujarat": {
    crops: ["Cotton", "Groundnut", "Mango", "Banana"],
    climate: "Semi-arid to arid",
    soils: ["Black", "Sandy", "Alluvial"]
  },
  "Rajasthan": {
    crops: ["Wheat", "Millet", "Moth Beans", "Chickpea"],
    climate: "Arid to semi-arid",
    soils: ["Desert", "Sandy", "Alluvial"]
  },
  "Madhya Pradesh": {
    crops: ["Wheat", "Soybean", "Chickpea", "Cotton"],
    climate: "Subtropical humid",
    soils: ["Black", "Alluvial", "Red"]
  },
  "Karnataka": {
    crops: ["Rice", "Coffee", "Coconut", "Mango"],
    climate: "Tropical to semi-arid",
    soils: ["Red", "Black", "Laterite"]
  },
  "Tamil Nadu": {
    crops: ["Rice", "Coconut", "Banana", "Sugarcane"],
    climate: "Tropical wet and dry",
    soils: ["Alluvial", "Red", "Black"]
  },
  "Kerala": {
    crops: ["Rice", "Coconut", "Coffee", "Banana"],
    climate: "Tropical monsoon",
    soils: ["Laterite", "Alluvial", "Forest"]
  },
  "Andhra Pradesh": {
    crops: ["Rice", "Cotton", "Chili", "Tobacco"],
    climate: "Tropical wet and dry",
    soils: ["Black", "Red", "Alluvial"]
  },
  "Telangana": {
    crops: ["Rice", "Cotton", "Maize", "Mango"],
    climate: "Tropical semi-arid",
    soils: ["Black", "Red"]
  },
  "West Bengal": {
    crops: ["Rice", "Jute", "Tea", "Potato"],
    climate: "Tropical wet",
    soils: ["Alluvial", "Laterite"]
  },
  "Bihar": {
    crops: ["Rice", "Wheat", "Maize", "Lentil"],
    climate: "Humid subtropical",
    soils: ["Alluvial", "Sandy"]
  },
  "Odisha": {
    crops: ["Rice", "Jute", "Coconut", "Turmeric"],
    climate: "Tropical monsoon",
    soils: ["Alluvial", "Laterite", "Red"]
  },
  "Assam": {
    crops: ["Rice", "Tea", "Jute", "Sugarcane"],
    climate: "Subtropical monsoon",
    soils: ["Alluvial", "Laterite"]
  },
  "Chhattisgarh": {
    crops: ["Rice", "Maize", "Soybean", "Groundnut"],
    climate: "Tropical wet and dry",
    soils: ["Red", "Laterite", "Alluvial"]
  },
  "Jharkhand": {
    crops: ["Rice", "Wheat", "Maize", "Vegetables"],
    climate: "Subtropical humid",
    soils: ["Red", "Laterite"]
  },
  "Uttarakhand": {
    crops: ["Rice", "Wheat", "Sugarcane", "Apple"],
    climate: "Subtropical to alpine",
    soils: ["Mountain", "Alluvial"]
  },
  "Himachal Pradesh": {
    crops: ["Apple", "Wheat", "Maize", "Rice"],
    climate: "Subtropical to alpine",
    soils: ["Mountain", "Brown hill"]
  },
  "Jammu & Kashmir": {
    crops: ["Apple", "Rice", "Wheat", "Saffron"],
    climate: "Temperate to alpine",
    soils: ["Mountain", "Alluvial"]
  },
  "Goa": {
    crops: ["Rice", "Coconut", "Cashew", "Mango"],
    climate: "Tropical monsoon",
    soils: ["Laterite", "Alluvial"]
  }
};

// India state coordinates for markers
const stateCoordinates: Record<string, [number, number]> = {
  "Punjab": [75.3412, 31.1471],
  "Haryana": [76.0856, 29.0588],
  "Uttar Pradesh": [80.9462, 26.8467],
  "Maharashtra": [75.7139, 19.7515],
  "Gujarat": [71.1924, 22.2587],
  "Rajasthan": [74.2179, 27.0238],
  "Madhya Pradesh": [78.6569, 22.9734],
  "Karnataka": [75.7139, 15.3173],
  "Tamil Nadu": [78.6569, 11.1271],
  "Kerala": [76.2711, 10.8505],
  "Andhra Pradesh": [79.7400, 15.9129],
  "Telangana": [79.0193, 18.1124],
  "West Bengal": [87.8550, 22.9868],
  "Bihar": [85.3131, 25.0961],
  "Odisha": [85.0985, 20.9517],
  "Assam": [92.9376, 26.2006],
  "Chhattisgarh": [81.8661, 21.2787],
  "Jharkhand": [85.2799, 23.6102],
  "Uttarakhand": [79.0193, 30.0668],
  "Himachal Pradesh": [77.1734, 31.1048],
  "Jammu & Kashmir": [74.7973, 33.7782],
  "Goa": [74.1240, 15.2993]
};

const IndiaMap = () => {
  const { t } = useTranslation();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const loadMap = () => {
    if (!mapboxToken || !mapContainer.current) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      setIsMapLoaded(true);

      // Add markers for each state
      Object.entries(stateCoordinates).forEach(([state, coords]) => {
        const el = document.createElement("div");
        el.className = "state-marker";
        el.style.cssText = `
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, hsl(142, 76%, 36%), hsl(142, 71%, 45%));
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        `;
        el.onmouseenter = () => { el.style.transform = "scale(1.3)"; };
        el.onmouseleave = () => { el.style.transform = "scale(1)"; };
        el.onclick = () => setSelectedState(state);

        new mapboxgl.Marker(el)
          .setLngLat(coords)
          .addTo(map.current!);
      });
    });
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  const stateInfo = selectedState ? stateData[selectedState] : null;

  return (
    <section id="crop-map" className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <MapIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('map.title')}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('map.description')}
          </p>
        </motion.div>

        {!isMapLoaded ? (
          <motion.div
            className="bg-card rounded-2xl p-8 shadow-card border border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">{t('map.enterToken')}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="text"
                placeholder={t('map.tokenPlaceholder')}
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={loadMap} disabled={!mapboxToken}>
                {t('map.loadMap')}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <motion.div
              className="lg:col-span-2 bg-card rounded-2xl overflow-hidden shadow-card border border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div ref={mapContainer} className="h-[500px] w-full" />
            </motion.div>

            {/* State Info Panel */}
            <motion.div
              className="bg-card rounded-2xl p-6 shadow-card border border-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {selectedState && stateInfo ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-2xl font-bold text-foreground">{selectedState}</h3>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedState(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        {t('map.recommendedCrops')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stateInfo.crops.map((crop) => (
                          <span
                            key={crop}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('map.climate')}</h4>
                      <p className="text-foreground">{stateInfo.climate}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('map.majorSoils')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {stateInfo.soils.map((soil) => (
                          <span
                            key={soil}
                            className="px-3 py-1 bg-soil/10 text-soil-light rounded-full text-sm"
                          >
                            {soil}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <MapIcon className="w-12 h-12 mb-4 opacity-50" />
                  <p>{t('map.selectRegion')}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndiaMap;
