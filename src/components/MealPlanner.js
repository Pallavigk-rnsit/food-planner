import React from 'react';

function MealPlanner() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="container mt-5">
      <h2>Weekly Meal Plan</h2>
      <div className="row">
        {days.map(day => (
          <div key={day} className="col-md-4 border p-3">
            <h5>{day}</h5>
            <p>Drag meal here</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanner;