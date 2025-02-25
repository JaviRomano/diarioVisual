// 📌 src/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpx6RmTjIb4tvz7hY5FtXJtNP8AoDgrrk",
    authDomain: "diariovisual-46f11.firebaseapp.com",
    projectId: "diariovisual-46f11",
    storageBucket: "diariovisual-46f11.firebasestorage.app",
    messagingSenderId: "182385383584",
    appId: "1:182385383584:web:f811b223cf289d0fa251c5",
    measurementId: "G-P84TTHZLQL"
  };

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
