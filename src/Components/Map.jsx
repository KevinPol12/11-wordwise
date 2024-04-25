import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  /*With this method we can bring in any parameters passed in the URL to be used
  anywhere needed within the app */
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
      {/*Besides it, we get a setter function which allow us to update the 
      URL params */}
      <button onClick={() => setSearchParams({ lat: 50, lng: 95 })}>
        Change Pos
      </button>
    </div>
  );
}

export default Map;
