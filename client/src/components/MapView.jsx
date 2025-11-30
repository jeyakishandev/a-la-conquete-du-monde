import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet avec Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Créer l'icône personnalisée
const createCustomIcon = () => {
  return new Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Composant pour centrer la carte sur les marqueurs
function MapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

/**
 * Composant de carte interactive avec Leaflet
 * Affiche les destinations sur une carte du monde
 */
export default function MapView({ destinations = [], onMarkerClick }) {
  const mapRef = useRef(null);

  // Coordonnées par défaut (centre du monde)
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  // Calculer le centre optimal si on a des destinations
  const getMapCenter = () => {
    if (destinations.length === 0) return defaultCenter;
    
    const validDests = destinations.filter(d => d.latitude && d.longitude);
    if (validDests.length === 0) return defaultCenter;

    const avgLat = validDests.reduce((sum, d) => sum + parseFloat(d.latitude), 0) / validDests.length;
    const avgLng = validDests.reduce((sum, d) => sum + parseFloat(d.longitude), 0) / validDests.length;
    
    return [avgLat, avgLng];
  };

  const center = getMapCenter();
  const zoom = destinations.length === 1 ? 5 : defaultZoom;

  return (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapCenter center={center} zoom={zoom} />

        {destinations
          .filter(dest => dest.latitude && dest.longitude)
          .map((destination, index) => (
            <Marker
              key={destination.id || index}
              position={[parseFloat(destination.latitude), parseFloat(destination.longitude)]}
              icon={createCustomIcon()}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick) {
                    onMarkerClick(destination);
                  }
                },
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {destination.name}
                  </h3>
                  {destination.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {destination.description}
                    </p>
                  )}
                  {destination.continent && (
                    <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {destination.continent}
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

