import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import "./listings.css";
import { useNavigate } from "react-router-dom";

const Listings = () => {
    const [indicator,set_indicator] = useState(0);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [state, set_state] = useState("");
  const [city, setcity] = useState("");
  const [pincode, set_Pincode] = useState("");
  const [min, set_Min] = useState("0");
  const [max, set_max] = useState("");
  let [filtered_properties,set_filtered_properties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    setStates(allStates);
  }, []);

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
  
    if (stateCode) {
      const stateDetails = State.getStateByCodeAndCountry(stateCode, "IN"); // Get state details
      set_state(stateDetails.name); // Store full state name
      setSelectedState(stateCode);
  
      // Fetch cities for the selected state
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

  const applyFilters = async () => {
    const filters = { state, city, pincode, min, max };
    console.log("Filters applied:", filters);

    try {
      const response = await fetch("http://localhost:8000/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (response.ok) {
        const data = await response.json();
        set_filtered_properties([...data]);
        set_indicator(1);
        console.log("Filtered data:", data);
      } else {
        console.error("Failed to apply filters");
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };


  const properties = [
    { 
      id:1,
      name: "Risland Sky Mansion",
      location: "Chattarpur, New Delhi",
      price: "₹6.29 Cr - ₹7.79 Cr",
      type: "3 BHK | Ready to Move",
      certificatesLink: "#",
      amenitiesLink: "#",
      contactBuilder: "#",
      downloadBrochure: "#",
    },
      {id:2,
      name: "Risland Sky Mansion",
      location: "Chattarpur, New Delhi",
      price: "₹6.29 Cr - ₹7.79 Cr",
      type: "3 BHK | Ready to Move",
      certificatesLink: "#",
      amenitiesLink: "#",
      contactBuilder: "#",
      downloadBrochure: "#",
      },
      {id:3,
        name: "Risland Sky Mansion",
        location: "Chattarpur, New Delhi",
        price: "₹6.29 Cr - ₹7.79 Cr",
        type: "3 BHK | Ready to Move",
        certificatesLink: "#",
        amenitiesLink: "#",
        contactBuilder: "#",
        downloadBrochure: "#",
        },
        {id:4,
          name: "Risland Sky Mansion",
          location: "Chattarpur, New Delhi",
          price: "₹6.29 Cr - ₹7.79 Cr",
          type: "3 BHK | Ready to Move",
          certificatesLink: "#",
          amenitiesLink: "#",
          contactBuilder: "#",
          downloadBrochure: "#",
          },
          {id:5,
            name: "Risland Sky Mansion",
            location: "Chattarpur, New Delhi",
            price: "₹6.29 Cr - ₹7.79 Cr",
            type: "3 BHK | Ready to Move",
            certificatesLink: "#",
            amenitiesLink: "#",
            contactBuilder: "#",
            downloadBrochure: "#",
            }
    // Repeat or fetch properties dynamically
  ];
  const projects = [
      { 
        id:1,
        name: "Munish Homes",
        price: "₹22 Lac - ₹60 Lac",
        location: "Dwarka Mor",
        contactLink: "#",
      },
      { 
        id:2,
        name: "Munish Homes",
        price: "₹22 Lac - ₹60 Lac",
        location: "Dwarka Mor",
        contactLink: "#",
      },
      // Add more projects as needed
    ];

    if(indicator == 0){
        return (
            <div className="property-listing-container">
              <h2>Top Projects in New Delhi</h2>
              <div className="filters">
        <h3>Filters</h3>
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
            <select
              id="city"
              onChange={handleCityChange}
              disabled={!selectedState}
            >
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

          {/* Price Range Inputs */}
          <label htmlFor="price-min">Price Range</label>
          <div className="price-range">
            <input
              type="text"
              id="price-min"
              name="min"
              value={min}
              onChange={(e) => set_Min(e.target.value)}
              placeholder="Min Price"
            />
            <span> - </span>
            <input
              type="text"
              id="price-max"
              name="max"
              value={max}
              onChange={(e) => set_max(e.target.value)}
              placeholder="Max Price"
            />
          </div>

          <button className="apply-filters" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
              {properties.map((property, index) => (
                <div key={index} className="property-card">
                  <img
                    src="/mansion.jpeg" // Replace with actual image URLs
                    alt={property.name}
                    className="property-image"
                  />
                  <div className="property-details">
                    <h3>{property.name}</h3>
                    <p>{property.location}</p>
                    <p>{property.price}</p>
                    <p>{property.type}</p>
                  </div>
                  <div className="middle-card">
                   <div className="expert">
                    <h2>EXPERT REVIEWS & ADVICE</h2>
                    </div>
                   <div className="property-actions">
                    <div className="RERA">
                      <h3>RERA Reports</h3>
                      <p>Project certificates and legal approval</p>
                    <a href={property.certificatesLink} className="certificates-link">
                      View Certificates 
                    </a>
                    </div>
                    <div className="amenti">
                    <h3>Amenties</h3>
                    <p>All 19 amenties in a project</p>
                    <a href={property.amenitiesLink} className="amenities-link">
                      View Amenities
                    </a>
                   </div>
                   </div>
                  </div>
                  <div className="cta-buttons">
                    <a href={property.contactBuilder} className="contact-builder">
                      Contact Builder
                    </a>
                    <a href={property.downloadBrochure} className="download-brochure">
                      Download Brochure
                    </a>
                  </div>
                </div>
              ))}
              <div className="projects-container">
              <h2>Explore Projects in New Delhi</h2>
              <div className="icons-row">
             <div className="icol"><div className="icon1"><span role="img" aria-label="Speaker">💸</span></div></div>
                <div className="icon"><span role="img" aria-label="buildings">🏢</span></div>
                <div className="icon"><span role="img" aria-label="star">⭐</span></div>
              </div>
              <div className="projects-row">
                {projects.map((project, index) => (
                  <div key={index} className="projectl-card">
                    <div className="projectl-image">
                      {/* Replace with actual image source */}
                      <img src="/img.jpeg" alt={project.name} />
                    </div>
                    <div className="projectl-details">
                      <h3>{project.name}</h3>
                      <p>{project.price}</p>
                      <p>{project.location}</p>
                      <a href={project.contactLink} className="contact-link">
                        Contact Seller →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {properties.map((property, index) => (
                <div key={index} className="property-card">
                  <img
                    src="/mansion.jpeg" // Replace with actual image URLs
                    alt={property.name}
                    className="property-image"
                  />
                  <div className="property-details">
                    <h3>{property.name}</h3>
                    <p>{property.location}</p>
                    <p>{property.price}</p>
                    <p>{property.type}</p>
                  </div>
                  <div className="middle-card">
                   <div className="expert">
                    <h2>EXPERT REVIEWS & ADVICE</h2>
                    </div>
                   <div className="property-actions">
                    <div className="RERA">
                      <h3>RERA Reports</h3>
                      <p>Project certificates and legal approval</p>
                    <a href={property.certificatesLink} className="certificates-link">
                      View Certificates 
                    </a>
                    </div>
                    <div className="amenti">
                    <h3>Amenties</h3>
                    <p>All 19 amenties in a project</p>
                    <a href={property.amenitiesLink} className="amenities-link">
                      View Amenities
                    </a>
                   </div>
                   </div>
                  </div>
                  <div className="cta-buttons">
                    <a href={property.contactBuilder} className="contact-builder">
                      Contact Builder
                    </a>
                    <a href={property.downloadBrochure} className="download-brochure">
                      Download Brochure
                    </a>
                  </div>
                </div>
              ))}
              {properties.map((property, index) => (
                <div key={index} className="property-card">
                  <img
                    src="/mansion.jpeg" // Replace with actual image URLs
                    alt={property.name}
                    className="property-image"
                  />
                  <div className="property-details">
                    <h3>{property.name}</h3>
                    <p>{property.location}</p>
                    <p>{property.price}</p>
                    <p>{property.type}</p>
                  </div>
                  <div className="middle-card">
                   <div className="expert">
                    <h2>EXPERT REVIEWS & ADVICE</h2>
                    </div>
                   <div className="property-actions">
                    <div className="RERA">
                      <h3>RERA Reports</h3>
                      <p>Project certificates and legal approval</p>
                    <a href={property.certificatesLink} className="certificates-link">
                      View Certificates 
                    </a>
                    </div>
                    <div className="amenti">
                    <h3>Amenties</h3>
                    <p>All 19 amenties in a project</p>
                    <a href={property.amenitiesLink} className="amenities-link">
                      View Amenities
                    </a>
                   </div>
                   </div>
                  </div>
                  <div className="cta-buttons">
                    <a href={property.contactBuilder} className="contact-builder">
                      Contact Builder
                    </a>
                    <a href={property.downloadBrochure} className="download-brochure">
                      Download Brochure
                    </a>
                  </div>
                </div>
              ))}
          
            {/Footer/}
            <footer className="footerapp">
          <div className="footerapp-section">
            <div className="logon">
              <div className="oval-bg">
                <img
                  src="/AarvasaL.png"
                  alt="Aarvasa Logo 1"
                  className="logon-image"
                />
              </div>
            </div>
            <p>Building Dreams , Securing Futures</p>
            <div className="appsocial-icons">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
          <div className="footerapp-section">
            <h3 className="underlinedapp">Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Our Team</li>
            </ul>
          </div>
          <div className="footerapp-section">
            <h3 className="underlinedapp">Privacy & Terms</h3>
            <ul>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund and Cancellation Policy</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="footerapp-section">
            <h3 className="underlinedapp">Contact Us</h3>
            <p>Technology Tower, VIT Vellore</p>
            <p>Room No. 004, Ground Floor</p>
            <p>Vellore, Tamil Nadu, 632014</p>
            <p>Email: theaarvasa@gmail.com</p>
          </div>
        
        </footer>
            </div>
            
          );

    }
    
    return (
      <div>
        <div className="property-listing-container">
          <h2>Top Projects in New Delhi</h2>
          <div className="filters">
            <h3>Filters</h3>
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
                <select
                  id="city"
                  onChange={handleCityChange}
                  disabled={!selectedState}
                >
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
    
              {/* Price Range Inputs */}
              <label htmlFor="price-min">Price Range</label>
              <div className="price-range">
                <input
                  type="text"
                  id="price-min"
                  name="min"
                  value={min}
                  onChange={(e) => set_Min(e.target.value)}
                  placeholder="Min Price"
                />
                <span> - </span>
                <input
                  type="text"
                  id="price-max"
                  name="max"
                  value={max}
                  onChange={(e) => set_max(e.target.value)}
                  placeholder="Max Price"
                />
              </div>
    
              <button className="apply-filters" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
    
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
    
          <button onClick={()=>{
            navigate('/w');
          }}>click</button>
    
          {/* Properties Section */}
          {/*properties.map((property, index) => (
            <div key={index} className="property-card">
              <img
                src="/mansion.jpeg"
                alt={property.name}
                className="property-image"
              />
              <div className="property-details">
                <h3>{property.name}</h3>
                <p>{property.location}</p>
                <p>{property.price}</p>
                <p>{property.type}</p>
              </div>
            </div>
          ))}
      
        {/* Footer */}
        <footer className="footer">
            <div className="footer-section">
              <h3>
                <span className="time">Time</span>
                <span className="slotter">Slotter</span>
              </h3>
              <p>Revolutionize scheduling with TimeSlotter.</p>
              <div className="social-icons">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="underlined">Quick Links</h3>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Our Team</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="underlined">Privacy & Terms</h3>
              <ul>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
                <li>Refund and Cancellation Policy</li>
                <li>Security</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="underlined">Contact Us</h3>
              <p>Technology Tower, VIT Vellore</p>
              <p>Room No. 004, Ground Floor</p>
              <p>Vellore, Tamil Nadu, 632014</p>
              <p>Email: timeslotter@outlook.com</p>
            </div>
          </footer>
        </div>
      </div>
      );
  
};

export default Listings;