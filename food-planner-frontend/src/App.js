import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/plan" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/plan" />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <RecipeSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <MealPlanner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
