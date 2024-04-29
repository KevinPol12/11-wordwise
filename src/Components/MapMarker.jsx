import { Marker, Popup } from "react-leaflet";

function MapMarker({ city }) {
  return (
    <Marker position={[city?.position.lat, city?.position.lng]}>
      <Popup>{city.notes}</Popup>
    </Marker>
  );
}

export default MapMarker;
