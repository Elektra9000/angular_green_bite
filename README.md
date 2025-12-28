# 🌿 GreenBite — Angular + Netlify Serverless Project

## 🚀 Project Overview

GreenBite is a lightweight Angular application designed to explore fruit data through a clean UI, fast search, and serverless API integration.
The project uses Angular standalone components, RxJS, and Netlify Functions to deliver a smooth, responsive experience without the need for a traditional backend server.

Users can:
- Browse a curated list of fruits
- Search for fruits by name with a debounced, real‑time search bar
- View detailed nutritional information
- Explore suggested fruits with dynamic shuffling
- Navigate through a clean, mobile‑friendly interface
The backend is powered by Netlify Functions, which fetch fruit data from a public API and expose it through serverless endpoints.

## 📂 Project Structure
The application is organized into the following main sections:
<u>Home Page</u>
- Displays a grid of fruits
- Includes a debounced search bar
- Shows dynamic “Suggested Fruits” thumbnails
- Suggested fruits are randomly shuffled on each visit or refresh  
- Allows navigation to fruit detail pages
<u>Fruit Detail Page</u>
- Shows detailed information for a selected fruit
- Includes nutritional values and metadata
<u>Serverless API (Netlify Functions)</u>
- /fruit-all — returns the full list of fruits
- /fruit/:name — returns a single fruit by name
- Functions are located in:
```sh
/netlify/functions
```
<u>Assets</u>
- Custom fruit thumbnails
- Fallback images
- Backgrounds and UI icons

## 🧩 Main Technologies Used
This project is built with:
- Angular 19 — modern frontend framework
- Standalone Components — no NgModules
- RxJS — reactive programming for search and data streams
- Netlify Functions — serverless backend
- TypeScript — type‑safe development
- Angular Router — navigation and routing
- CSS3 — custom responsive styling


All dependencies are listed in <ul>package.json</ul>.
No global installations required.

## ⚙ Installation & Development
Clone the repository:
```sh
git clone https://github.com/Elektra9000/angular_green_bite
cd angular_green_bite
```

Install dependencies:
```sh
npm install
```

Run the development server:
```sh
ng serve
```

The app will be available at:
```sh
http://localhost:4200/
```

## 🧪 Local API Development (Netlify Dev)
To run the serverless functions locally:
```sh
netlify dev
```

This starts:
- Angular frontend
- Netlify Functions backend
- Proxy routing so that API calls work automatically
Local API endpoints:
```sh
http://localhost:8888/.netlify/functions/fruit-all
http://localhost:8888/.netlify/functions/fruit/<name>
```

## 🌐 Deployment
GreenBite is deployed on Netlify using:
- npm run build as the build command
- dist/progetto-angular-2 as the publish directory
- netlify/functions as the serverless functions directory
Live website:
👉 [Visit GreenBite Live](green-bite-angular2.netlify.app)


