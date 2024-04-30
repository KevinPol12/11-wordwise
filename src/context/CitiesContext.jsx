import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
export const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, error: "", isLoading: true };
    case "notLoading":
      return { ...state, isLoading: false };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted": {
      const leftCities = state.cities.filter(
        (city) => city.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        cities: leftCities,
        currentCity: "",
      };
    }
    case "setMapPosition":
      return { ...state, mapPosition: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown Action");
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: "",
  mapPosition: [40, -3],
  error: "",
};

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState("");
  // const [mapPosition, setMapPosition] = useState([40, -3]);

  const [{ cities, isLoading, currentCity, mapPosition }, dispatch] =
    useReducer(reducer, initialState);

  /*Use reducer must be pure functions - fetching data logic can be added 
    to the use reducer so we keep this ones here and state pure logic 
    centralized in the reducer */
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(BASE_URL + "/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch {
        dispatch({ type: "rejected", payload: "Error fetching cities!" });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(BASE_URL + "/cities/" + id);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
      // setCurrentCity(data);
    } catch {
      dispatch({ type: "rejected", payload: "Error getting city!" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(BASE_URL + "/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating a city...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(BASE_URL + "/cities/" + id, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
      // setCities(leftCities);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting a city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        mapPosition,
        getCity,
        createCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside of the CitiesProvider!");
  return context;
}

export { CitiesProvider, useCities };
