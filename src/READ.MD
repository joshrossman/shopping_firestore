# 🛒 Shopping Firestore

A modern e-commerce web application built with React, TypeScript, and Firebase Firestore. This project demonstrates how to integrate a scalable NoSQL database with a responsive frontend to create a seamless shopping experience.

## 🚀 Features

- **Product Catalog**: Browse a variety of products with detailed descriptions and images.
- **Shopping Cart**: Add, remove, and update product quantities in your cart.
- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Order Management**: Place orders and view order history.
- **Real-time Updates**: Instant updates across devices using Firestore's real-time capabilities.

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Firebase Firestore, Firebase Authentication
- **State Management**: React Context API (or consider Redux for larger applications)
- **Styling**: CSS Modules / Styled Components
- **Build Tool**: Vite for fast development and optimized builds

## 📦 Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deploying and managing Firebase services)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joshrossman/shopping_firestore.git
   cd shopping_firestore
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication services.
   - Download the `firebaseConfig.js` file and place it in the `src/` directory.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser to view the application.

## 🔧 Development

- **Start the development server**: `npm run dev` 
- **Build for production**: `npm run build` 
- **Run tests**: `npm run test` 


