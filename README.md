# 🚀 Futuristic MERN Portfolio — Hamday Rabby Hossain

A modern, futuristic portfolio built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) with a cyberpunk-inspired dark theme.

## ✨ Features

- **Futuristic Dark Theme** — Deep space background with neon cyan/purple accents
- **Interactive Particle Background** — Mouse-reactive floating particles with connecting lines
- **Glassmorphism UI** — Frosted glass cards with backdrop blur effects
- **Typewriter Effect** — Animated role cycling on the hero section
- **Scroll Animations** — Elements reveal on scroll with smooth transitions
- **Project Filtering** — Filter projects by category (Software / ML & AI)
- **Timeline Layout** — Experience and education displayed in a timeline
- **Contact Form** — Connected to Express API, stores messages in MongoDB
- **Fully Responsive** — Mobile-first design with hamburger navigation
- **Loading Screen** — Animated loader with gradient progress bar

## 🛠 Tech Stack

| Layer     | Technologies                          |
|-----------|---------------------------------------|
| Frontend  | React, Vite, React Router, Vanilla CSS |
| Backend   | Express.js, Node.js                   |
| Database  | MongoDB, Mongoose                     |
| Fonts     | Space Grotesk, Orbitron, JetBrains Mono |

## 📁 Project Structure

```
MERN_Portfolio/
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Navbar, Footer, Loader, ParticleBackground
│   │   ├── pages/         # Home, About, Projects, Resume, Contact
│   │   ├── data/          # Portfolio content data
│   │   ├── hooks/         # Custom hooks (scroll reveal)
│   │   ├── App.jsx        # Main app with routing
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Complete design system
│   └── index.html
├── server/                # Express Backend
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   └── .env               # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
# Update .env with your MongoDB URI
node server.js
```

## 🎨 Design System

- **Background**: `#050816` (Deep space)
- **Primary**: `#00f0ff` (Electric cyan)
- **Secondary**: `#8b5cf6` (Neon purple)
- **Tertiary**: `#ec4899` (Hot pink)
- **Glass**: `rgba(255,255,255,0.05)` with backdrop-blur

## 📄 License

MIT © Hamday Rabby Hossain
