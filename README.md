# 🚀 Diario Visual - Aplicación React Native con Firebase

## 📌 Descripción

Diario Visual es la práctica final de DeInt del curso DAM, y consiste en una aplicación desarrollada en **React Native** que permite a los usuarios registrar sus experiencias, almacenar contenido visual y acceder de manera segura mediante **Firebase Authentication**. La información se gestiona con **Firestore Database** para garantizar un almacenamiento seguro y escalable.

## 🎯 **Características Principales**

- 📲 **Registro e inicio de sesión** con Firebase Authentication.
- 🔥 **Gestión de publicaciones** con imágenes y texto almacenados en Firestore.
- ☁️ **Integración con Firebase Firestore** para almacenamiento de datos en la nube.
- 💾 **Almacenamiento seguro de imágenes** en Firebase Storage.
- 🛠 **Interfaz moderna** con React Native y Tailwind CSS para diseño estilizado.

## 🛠 **Tecnologías Utilizadas**

| Tecnología              | Descripción                                   |
| ----------------------- | --------------------------------------------- |
| React Native            | Framework para desarrollo de apps móviles     |
| Firebase Authentication | Manejo de autenticación de usuarios           |
| Firestore Database      | Base de datos NoSQL en tiempo real            |
| Firebase Storage        | Almacenamiento de imágenes                    |
| Tailwind CSS            | Diseño moderno y estilizado                   |
| Expo                    | Framework para facilitar desarrollo y testing |

## 📥 **Instalación y Configuración**

### 2️⃣ **Instalar dependencias**

Si usas **npm**:

```sh
npm install
```

Si usas **yarn**:

```sh
yarn install
```

### 3️⃣ **Configurar Firebase**

1. Crea un proyecto en [**Firebase Console**](https://console.firebase.google.com/).
2. Agrega una nueva aplicación **(Web App)**.
3. Copia la configuración del SDK y pégala en el archivo `` dentro del proyecto:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

### 4️⃣ **Ejecutar la aplicación**

Para iniciar en modo desarrollo:

```sh
npm start  # O bien yarn start
```

Si usas Expo:

```sh
expo start
```

## 🔐 **Autenticación y Seguridad**

- Se utiliza **Firebase Authentication** con reglas de seguridad en Firestore para garantizar un acceso seguro a los datos.
- Las imágenes se almacenan en **Firebase Storage** con restricciones de acceso controladas.
