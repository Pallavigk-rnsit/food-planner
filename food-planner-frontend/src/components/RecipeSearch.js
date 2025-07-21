import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';

function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(response => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
        console.error('API Error:', error);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  if (recipes.length === 0) return <Alert variant="info">No recipes found</Alert>;

  return (
    <div className="container mt-5">
      <h2>Find Recipes</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
