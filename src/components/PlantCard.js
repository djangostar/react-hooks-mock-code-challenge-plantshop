import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePrice }) {
  const { id, image, name, price} = plant
  const [isInStock, setIsInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(price)
  
  
  function handleToggle() {
    setIsInStock((isInStock) => !isInStock)
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })

    onDeletePlant(id)
  }

  function handlePriceFormSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: updatedPrice})
    })
      .then((res) => res.json())
      .then(updatePlant => {
        onUpdatePrice(updatePlant)
      })
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleToggle}>In Stock</button>
      ) : (
        <button onClick={handleToggle}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input 
          type="number" 
          step="0.01"
          placeholder="New Price..."
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;