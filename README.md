# 3 Tier Men's Hair Care App

A premium e-commerce application for men's hair care products.

## Features
- **User Accounts**: Signup, Login, Profile Management.
- **Shop**: Trending products, Product details, Shopping Cart.
- **Checkout**: Payment placeholder with Card and UPI options.
- **Admin**: (Database managed) Product listing.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Premium UI).
- **Backend**: Node.js, Express.
- **Database**: MySQL.

## Prerequisites
- Node.js installed.
- MySQL Server installed and running.

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (Workbench, Command Line, etc.).
2. Create a new database named `men_haircare_db`.
3. Import the `backend/schema.sql` file to create the tables.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following content:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=men_haircare_db
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `backend/`: API routes, controllers, and database logic.
- `frontend/`: React application and styles.

