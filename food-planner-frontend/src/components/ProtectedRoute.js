import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
