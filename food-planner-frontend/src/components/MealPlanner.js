import React, { useState } from 'react';
import axios from 'axios';

function MealPlanner() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Dummy recipe list (replace with real data later)
  const recipes = [
    { id: '642583', title: 'Farfalle with Peas' },
    { id: '452116', title: 'Rustic Red Wine Spaghetti' },
    { id: '715538', title: 'Beef Lo Mein Noodles' },
  ];

  // State to assign meals to days
  const [plan, setPlan] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const handleChange = (day, mealId) => {
    setPlan((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  };

  const savePlan = async () => {
    try {
      const meals = Object.values(plan).filter(Boolean); // only selected meals
      await axios.post('http://localhost:5000/api/save-plan', {
      userId: 'test123',
      meals,
      });
      alert('Meal plan saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving meal plan');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Weekly Meal Plan</h2>
      <div className="row">
        {days.map((day) => (
          <div key={day} className="col-md-4 border p-3 mb-3">
            <h5>{day}</h5>
            <select
              className="form-control"
              value={plan[day]}
              onChange={(e) => handleChange(day, e.target.value)}
            >
              <option value="">Select a recipe</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={savePlan}>
        Save Plan
      </button>
    </div>
  );
}

export default MealPlanner;
