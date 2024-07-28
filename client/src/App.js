import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreeDTour from "./components/ThreeDTour";

function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    axios
      .get("/api/property/get")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewTour = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div>
      <h1>Properties</h1>
      {selectedProperty ? (
        <div>
          <button onClick={() => setSelectedProperty(null)}>
            Back to List
          </button>
          <ThreeDTour modelPath={`/models/${selectedProperty.fileName}`} />
        </div>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property._id}>
              {property.name}{" "}
              <button onClick={() => handleViewTour(property)}>
                View 3D Tour
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
