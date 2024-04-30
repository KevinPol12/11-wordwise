import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import MapMarker from "./MapMarker";

function Map() {
  const { mapPosition, dispatch, cities } = useCities();

  const [newLat, newLng] = useUrlPosition();
  const newPosition = [newLat || mapPosition[0], newLng || mapPosition[1]];
  const navigate = useNavigate();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    setPosition: setGeoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (newLat && newLng) {
        dispatch({ type: "setMapPosition", payload: [newLat, newLng] });
        //  setMapPosition([newLat, newLng]);
        setGeoLocationPosition("");
      }
    },
    [newLat, newLng]
  );

  useEffect(
    function () {
      const { lat, lng } = geoLocationPosition;
      if (geoLocationPosition.lat != null) {
        dispatch({ type: "setMapPosition", payload: [lat, lng] });
        // setMapPosition([lat, lng]);
        navigate("cities");
        dispatch({ type: "city/loaded", payload: "" });
        // setCurrentCity("");
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition.lat && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <MapMarker city={city} key={city.id}></MapMarker>
        ))}

        <ChangeCenter newPosition={newPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ newPosition }) {
  const map = useMap();
  if (newPosition) map.setView(newPosition);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate("form?lat=" + lat + "&lng=" + lng);
    },
  });
}

export default Map;
