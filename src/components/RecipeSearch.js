import React from 'react';

function RecipeSearch() {
  return (
    <div className="container mt-5">
      <h2>Find Recipes</h2>
      <input 
        type="text" 
        placeholder="Search for recipes..." 
        className="form-control mb-2" 
      />
      <button className="btn btn-success">Search</button>
    </div>
  );
}

export default RecipeSearch;