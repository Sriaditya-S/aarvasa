import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "leaflet/dist/leaflet.css";
import { Country, State, City } from "country-state-city";
import "./listings.css";
function W() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [state, set_state] = useState("");
  const [city, setcity] = useState("");
  const [pincode, set_Pincode] = useState("");
  const [min, set_Min] = useState("0");
  const [max, set_max] = useState("");
  const [area, set_area] = useState("");
  const mapRef = useRef(null);
  const [r, set_r] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 24.9748306, lng: 79.54356 });
  const [hoveredAddress, setHoveredAddress] = useState(""); // For storing address
  const [infoWindowVisible, setInfoWindowVisible] = useState(false); // For toggling InfoWindow visibility
  const [nearby_prop, set_near_by_prop] = useState([]);
  const [filtered_properties,set_filtered_properties] = useState([]);

  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    setStates(allStates);
  }, []);

  const handleStateChange = (e) => {
    const stateCode = e.target.value;

    if (stateCode) {
      const stateDetails = State.getStateByCodeAndCountry(stateCode, "IN");
      set_state(stateDetails.name);
      setSelectedState(stateCode);

      const allCities = City.getCitiesOfState("IN", stateCode);
      setCities(allCities);
    } else {
      set_state("");
      setSelectedState("");
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setcity(cityName);
  };

  // Reverse geocode the marker's position
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZQ7QBcNicwveYO_z21CjV_zkhM8nNb7M`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return "Address not found";
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Error retrieving address";
    }
  };

  const handleMarkerHover = async () => {
    const address = await reverseGeocode(coordinates.lat, coordinates.lng);
    setHoveredAddress(address);
    setInfoWindowVisible(true);
  };

  const handleMarkerOut = () => {
    setInfoWindowVisible(false);
  };

  const getRandomColor = () => {
    // Function to generate random colors for each marker
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let filter = async () => {
    const addressdetails = area.split(",");

    let v = [];

    for (let a in addressdetails) {
      let s = addressdetails[a].trim();
      let rtyu = s.toLowerCase();
      if (s == state || s == city || s == pincode || rtyu == 'india') {
        continue;
      } else {
        v.push(s);
      }
    }
    let i = "India";

    const fullAddress = `${v}, ${city}, ${state}, ${pincode}`;
    const requestData = {
      address: fullAddress,
      range: parseFloat(r),
    };
    try {
      const response = await fetch("http://localhost:8000/get_within_range", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Nearby Properties:", result.nearbyProperties);
        let temp = [];
        for(let c in result.nearbyProperties){
          temp.push(result.nearbyProperties[c]);

        }
        let rds = [];
        rds.push({latitude:0,longitude:0});
        for(let t in result.nearbyProperties){
          rds.push(result.nearbyProperties[t]);
        }
        set_near_by_prop([...rds]);
        set_filtered_properties([...temp]);
        alert("Data fetched successfully. Check console for details.");
      } else {
        console.error("Error:", result.error);
        alert("Error fetching data. See console for details.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to send request. See console for details.");
    }
  };

  return (
    <div className="filter-options">
      {/* State Dropdown */}
      <div>
        <label htmlFor="state">State: </label>
        <select id="state" onChange={handleStateChange}>
          <option value="">Select a State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div>
        <label htmlFor="city">City: </label>
        <select id="city" onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pincode Input */}
      <label htmlFor="pincode">Pincode:</label>
      <input
        type="text"
        id="pincode"
        name="pincode"
        value={pincode}
        onChange={(e) => set_Pincode(e.target.value)}
        placeholder="Enter Pincode"
      />

      <textarea
        id="address"
        name="address"
        rows="3"
        value={area}
        onChange={(e) => {
          set_area(e.target.value);
        }}
        required
      ></textarea>

      
      <div>
        <p>distance range in meters</p>
        <input
          type="text"
          name="range"
          value={r}
          onChange={(e) => {
            set_r(e.target.value);
          }}
        />
      </div>

      <button onClick={filter}>FILTER WITHIN THE RANGE</button>

      <LoadScript googleMapsApiKey="AIzaSyCZQ7QBcNicwveYO_z21CjV_zkhM8nNb7M">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={coordinates}
          zoom={15}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Add Marker for the user's coordinates */}
          {nearby_prop.map((property, index) => {
  console.log("Property:", property); // Check the property structure
  return (
    <Marker
      key={index}
      position={{
        lat: property.latitude,
        lng: property.longitude,
      }}
      icon={{
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(32, 32),
      }}
    />
  );
})}


        
          
          

          {/* Add markers for nearby properties */}
          
        </GoogleMap>
      </LoadScript>

      {
        filtered_properties.map((property, index)=>{
          return (
            <div key={index} className="property-card">
          <img
            src={property.uploadedMediaUrls[0]}
            alt=""
            className="property-image"
          />
          <div className="property-details">
            <h3>{property.city}</h3>
            <p>{property.state}</p>
            <p>{property.price}</p>
            <p>{property.size}</p>
            <p>{property.sqftPrice}</p>
            <p>{property.pincode}</p>
            <p>{property.addressDetails}</p>
          </div>
        </div>
          );

        })
      }
    </div>
  );
}

export default W;
