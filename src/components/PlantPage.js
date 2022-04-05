import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchPlant, setSearchPlant] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((plantsArray) => setPlants(plantsArray))
  }, [])

  function handleAddPlant(newPlant) {
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant => plant.id !== id))
    setPlants(updatedPlants)
  }

  function handleUpdatePricePlant(updatePlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatePlant.id) {
        return updatePlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  const displayedPlants = plants.filter((plant => {
    return plant.name.toLowerCase().includes(searchPlant.toLowerCase());
  }))

  return (
    <main>
      <NewPlantForm
        onAddPlant={handleAddPlant} 
      />
      <Search 
        searchPlant={searchPlant}
        onSearchChange={setSearchPlant} 
      />
      <PlantList 
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePrice={handleUpdatePricePlant}
      />
    </main>
  );
}

export default PlantPage;