import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import PhotoCard from "./PhotoCard";
import "./App.css";

function App() {
  const { data: photos, loading, error } = useFetch("https://picsum.photos/v2/list?limit=100");
  const [selectedIds, setSelectedIds] = useState([]);

  const pairs = {
    0: 1,
    1: 0,
    2: 3,
    3: 2,
  };

  const handleSelect = (id) => {
    let newSelection = [...selectedIds];

    if (newSelection.includes(id)) {
      // Deselect current + pair
      newSelection = newSelection.filter((item) => item !== id && item !== pairs[id]);
    } else {
      // Select current + pair
      newSelection.push(id);
      if (pairs[id] !== undefined) {
        newSelection.push(pairs[id]);
      }
    }

    setSelectedIds(newSelection);
  };

  // 🔹 Heading click pe first 2 box select karna
  const handleHeadingClick = () => {
    setSelectedIds([0, 1]);
  };

  return (
    <div className="App">
      {loading && <div className="status-container"><div className="status-message">Loading....</div></div>}
      {error && <div className="status-container"><div className="status-message">Error: Failed to fetch...</div></div>}

      {!loading && !error && (
        <>
          <header className="App-header">
            <h1 onClick={handleHeadingClick} style={{ cursor: "pointer" }}>
              Photos
            </h1>
          </header>
          <main className="photo-grid">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                id={index}
                title={photo.author}
                color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                dimensions="600 X 600"
                selected={selectedIds.includes(index)}
                onSelect={handleSelect}
              />
            ))}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
