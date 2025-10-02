import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyAIYcpysf2evx0rSp-Rl-LgPuYkCsH_6qA",
  authDomain: "food-delivery-dc487.firebaseapp.com",
  projectId: "food-delivery-dc487",
  storageBucket: "food-delivery-dc487.firebasestorage.app",
  messagingSenderId: "486541510361",
  appId: "1:486541510361:web:5a2959702cb3ff957460c8",
  measurementId: "G-MV27GGV3VT"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const analytics = getAnalytics(app); 
export const auth = getAuth(app); 
export default app;