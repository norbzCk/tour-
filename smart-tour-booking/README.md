# SmartTour Booking

A modern tour booking platform for exploring Tanzania's natural beauty and cultural heritage.

## Features

- **Multi-role Authentication**: Tourists, tour guides, operators, and administrators
- **Tour Discovery**: Browse tours across destinations like Zanzibar, Serengeti, Kilimanjaro, and Dar es Salaam
- **Booking System**: Reserve tours with secure MPesa payment integration
- **Interactive Dashboards**: Role-specific dashboards for users, guides, operators, and admins
- **Admin Panel**: Manage users, operators, tours, bookings, and view reports

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view the app.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── pages/          # Main application pages
├── components/     # Reusable UI components
├── context/        # React context providers
├── data/           # Mock data files
└── assets/         # Images and static assets
```

## User Roles

- **Tourist**: Browse and book tours, view bookings
- **Guide**: Manage assigned tours and schedules
- **Operator**: Create and manage tour offerings
- **Admin**: Full system access and management