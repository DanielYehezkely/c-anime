# C-Anime <img src="/public/assets/icons/favicon_logoai/faviconTemp.ico">

<img src="/path/to/your/animated-gif.gif" alt="App Demo" width="600">

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Environment Variables](#environment-variables)
7. [Advanced Features](#advanced-features)
8. [Challenges Faced](#challenges-faced)
9. [Known Bugs](#known-bugs)
10. [Future Improvements](#future-improvements)
11. [Links](#links)

## Overview

C-Anime Platform is a comprehensive web application designed for anime enthusiasts. It allows users to find their favorite anime, add them to a personalized watchlist, leave comments, like or dislike anime, and much more. This project is built using React and TypeScript, leveraging various APIs and Firebase for data management and authentication.

## Features

### Core Functionality:
1. **User Authentication**
   - Secure Firebase authentication with options for Google sign-in and password reset.

2. **Anime Search and Explore**
   - Search for anime using the search bar or explore new anime through carousels on the homepage.

3. **Anime Details**
   - View detailed information about an anime, including trailers and manga links.
   - Perform actions such as liking, disliking, commenting, and adding to the watchlist.

4. **Watchlist Management**
   - Add anime to your watchlist.
   - Manage your watchlist by removing anime or marking them as watched.

### Enhanced Features:
1. **Real-time Comments**
   - Leave live comments on anime pages, fostering a community atmosphere.

2. **Responsive Design**
   - A responsive layout ensures the platform works seamlessly across different devices.

3. **Interactive UI**
   - Smooth interactions and dynamic content updates enhance the user experience.

## Tech Stack

- **Frontend**: React, TypeScript, HTML, CSS
- **Libraries**: Firebase, React Router, React Icons, Axios, Lodash, Swiper, styled-components, @mui/material
- **State Management**: React State and Context API
- **Backend**: Firebase for authentication and real-time data storage
- **APIs**: AniList and Jikan

## Setup and Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository from GitHub**:
   - `git clone https://github.com/DanielYehezkely/c-anime`

2. **Navigate to the project directory**:
   - `cd c-anime-platform`

3. **Install the necessary dependencies**:
   - `npm install`

4. **Set up Firebase configuration**:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration variables (see [Environment Variables](#environment-variables)).

5. **Start the development server**:
   - `npm start`

6. **Open the app in your web browser**:
   - Visit `http://localhost:3000`

## Usage

1. **Home Page**:
   - Browse through carousels to explore new anime.
   - Use the search bar to find specific anime.

2. **User Authentication**:
   - Login or sign up to access personalized features.
   - Use Google sign-in or reset your password if needed.

3. **Anime Details**:
   - Click on an anime to view detailed information.
   - Like, dislike, or comment on the anime.
   - Add anime to your watchlist.

4. **Watchlist Management**:
   - Access the watchlist page to manage your watchlist.
   - Remove anime or mark them as watched.

## Environment Variables

The application requires a `.env` file to store environment-specific configurations.

1. **Create a `.env` file**:
   - Copy the provided `.env.template` file to `.env`:
     - `cp .env.template .env`

2. **Edit the `.env` file**:
   - Fill in the required environment variables. Below are examples of variables you might need:
     - `VITE_API_KEY=YOUR_FIREBASE_API_KEY`
     - `VITE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN`
     - `VITE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID`
     - `VITE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET`
     - `VITE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_APP_ID=YOUR_FIREBASE_APP_ID`
     - `VITE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID`

## Advanced Features

1. **Real-time Data Synchronization**:
   - The app syncs user comments, likes, and watchlist in real-time using Firebase.

2. **Enhanced UI/UX with MUI**:
   - The app uses Material-UI for a polished and responsive user interface.

3. **Debounced Actions**:
   - Debounced actions for likes and dislikes to optimize performance and avoid redundant updates.

## Challenges Faced

1. **Handling API Data**:
   - Ensuring seamless integration and data consistency when fetching anime data from AniList and Jikan APIs.

2. **State Management**:
   - Managing state across various components and ensuring real-time updates for a responsive user experience.

3. **Cross-Origin Resource Sharing (CORS) Issues**:
   - We encountered CORS issues when making API requests directly to the MyAnimeList API.

4. **Customizing MUI Components with TypeScript**:
   - Customizing MUI components using TypeScript was difficult due to complex types and styling conflicts with custom CSS modules.

## Known Bugs

- **Responsive Layout**: Certain components may not render optimally on very small screens. Improvements are planned for better mobile support.
- **API Rate Limits**: Occasionally, API rate limits can cause delays in fetching anime data during peak usage.

## Future Improvements

1. **Enhanced Mobile Support**:
   - Improve the responsive design for better usability on mobile devices.

2. **User Roles and Permissions**:
   - Extend the authentication system to support different user roles and permissions.

3. **Detailed Analytics and Reporting**:
   - Add comprehensive analytics and reporting features to provide insights into user activities and preferences.

4. **Admin Panel**:
   - Implement an admin panel for managing user data, comments, and anime listings.

## Links

- **GitHub Repository**: [C-Anime](https://github.com/DanielYehezkely/c-anime)
- **Live Deployment**: [Netlify Link](https://dyz-c-anime.netlify.app/)
