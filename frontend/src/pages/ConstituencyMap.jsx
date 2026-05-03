import { useState, useEffect, useRef } from 'react';
import { Loader2, Info, Search, Navigation, MapPin } from 'lucide-react';

export default function ConstituencyMap() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function initMap() {
      try {
        if (!window.google || !window.google.maps) {
          // If API isn't loaded yet, wait a bit or handle error
          setTimeout(initMap, 500);
          return;
        }

        const { Map } = await google.maps.importLibrary("maps");
        // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

        const newMap = new Map(mapRef.current, {
          center: defaultCenter,
          zoom: 5,
          mapId: "1d006bee381fe9eefb98eec4",
          disableDefaultUI: false,
        });

        setMap(newMap);
        setLoading(false);
      } catch (err) {
        console.error("Error loading map:", err);
        setError("Failed to load map. Please check your API key.");
        setLoading(false);
      }
    }

    initMap();
  }, []);

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          map.setZoom(14);
          setLocation(pos);
          
          // Add a marker for user location
          new google.maps.Marker({
            position: pos,
            map: map,
            title: "You are here",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4f46e5",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
            }
          });

          // Search for real nearby schools/community centers to act as polling booths
          const request = {
            location: pos,
            radius: '2000',
            type: ['school', 'local_government_office']
          };

          const service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              const booths = results.slice(0, 3).map(place => ({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                address: place.vicinity
              }));
              
              booths.forEach(booth => {
                new window.google.maps.Marker({
                  position: { lat: booth.lat, lng: booth.lng },
                  map: map,
                  title: booth.name,
                  icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });
              });
              
              // We could also set these in state to display in the side panel
              setLocation({ ...pos, booths });
            }
            setLoading(false);
          });
        },
        (geoError) => {
          let errorMsg = "Location access denied.";
          if (geoError.code === 1) errorMsg = "Please allow location access to find nearby booths.";
          else if (geoError.code === 2) errorMsg = "Location unavailable. Please check your device settings.";
          else if (geoError.code === 3) errorMsg = "Location request timed out. Please try again.";
          setError(errorMsg);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation not supported.");
    }
  };

  return (
    <div className="page-container booth-container">
      <div className="booth-header">
        <h1>Booth Locator</h1>
        <p>Find your nearest polling station and constituency boundaries.</p>
      </div>

      <div className="card booth-map-card">
        
        {/* Map Area */}
        <div className="map-area">
          {loading && (
            <div className="map-loading-overlay">
              <Loader2 size={40} className="animate-spin" color="#4f46e5" />
              <p>Locating your booth...</p>
            </div>
          )}

          {error && (
            <div className="map-error-overlay">
              <Info size={48} color="#f87171" />
              <h3>{error}</h3>
              <p>Ensure your Google Maps API key is valid.</p>
              <button className="btn-primary" style={{ width: 'auto' }} onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          <div ref={mapRef} className="google-map-container" />

          {/* Map Overlay Controls */}
          <div className="map-controls">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input 
                className="input-glass search-input" 
                placeholder="Pincode or area..." 
              />
            </div>
            <button 
              className="btn-primary locate-btn" 
              onClick={handleUseLocation}
              disabled={loading}
              title="Use my location"
            >
              <Navigation size={18} />
            </button>
          </div>
        </div>

        {/* Details Side Panel */}
        <div className="map-side-panel">
          <h3 className="panel-title">
            <MapPin size={18} color="#4f46e5" /> Booth Details
          </h3>
          
          <div className="booth-list">
            {location && location.booths && location.booths.length > 0 ? (
              location.booths.map((booth, idx) => (
                <div key={idx} className="card-glass booth-item">
                  {idx === 0 && <p className="badge badge-active" style={{ marginBottom: '8px', fontSize: '10px' }}>Closest</p>}
                  <h4>{booth.name}</h4>
                  <p>{booth.address || 'Address unavailable'}</p>
                  <button className="btn-primary navigate-btn" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}`)}>Navigate</button>
                </div>
              ))
            ) : location ? (
              <div className="searching-state">
                <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 12px', color: '#4f46e5' }} />
                <p style={{ fontSize: '13px', color: '#918fa1' }}>Searching for booths...</p>
              </div>
            ) : (
              <div className="empty-state">
                <Navigation size={32} style={{ marginBottom: '12px', color: '#464555', margin: '0 auto' }} />
                <p style={{ fontSize: '13px', color: '#918fa1' }}>Enable location to see nearby booths.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="card-glass info-card">
          <div className="info-icon-wrapper" style={{ background: 'rgba(14, 165, 233, 0.1)' }}>
            <Info color="#0ea5e9" size={20} />
          </div>
          <div>
            <h4>EPIC Search</h4>
            <p>Find your booth by entering your Voter ID number.</p>
          </div>
        </div>
        <div className="card-glass info-card">
          <div className="info-icon-wrapper" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            <Navigation color="#22c55e" size={20} />
          </div>
          <div>
            <h4>Nearby Booths</h4>
            <p>{location && location.booths ? `Showing ${location.booths.length} booths near you.` : 'Use your location to see booths.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
