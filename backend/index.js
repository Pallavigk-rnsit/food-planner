const axios = require('axios');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ====== 🔥 Test Firestore Connection ======
app.get('/test-firestore', async (req, res) => {
  try {
    const docRef = db.collection('test').doc('testDoc');
    await docRef.set({ message: "Firestore is working!" });
    res.send('Firestore connected! Check your Firebase Console.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ====== 🍝 Fetch Recipes from Spoonacular ======
const SPOONACULAR_API_KEY = '68db36e7bf70410f982d549ac5350b08';

app.get('/api/recipes', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta&number=5`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// ====== 📝 Save Meal Plan to Firestore ======
app.post('/api/save-plan', async (req, res) => {
  try {
    const { userId, meals } = req.body;
    await db.collection('plans').doc(userId).set({ meals });
    res.status(200).send('Plan saved!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ====== Start Server ======
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
