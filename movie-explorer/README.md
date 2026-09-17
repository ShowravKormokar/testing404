# 🎬 Movie Explorer

A responsive **Movie Explorer web application** built with React and TVMaze API. The application allows users to explore available shows, search for specific titles, and view detailed information through an interactive modal.

> **Assignment:** Foundation Program — Assignment 2
> **Objective:** Build a responsive Movie Explorer Application using React.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#️-tech-stack)
* [API Integration](#-api-integration)
* [API Endpoints](#-api-endpoints)
* [Application Flow](#-application-flow)
* [Project Architecture](#️-project-architecture)
* [Folder Structure](#-folder-structure)
* [Data Flow](#-data-flow)
* [Routing](#-routing)
* [State Management](#-state-management)
* [Search Architecture](#-search-architecture)
* [Loading and Error Handling](#-loading-and-error-handling)
* [UI/UX Guidelines](#-uiux-guidelines)
* [Responsive Design](#-responsive-design)
* [Accessibility](#-accessibility)
* [Performance Considerations](#-performance-considerations)
* [Component Architecture](#-component-architecture)
* [Installation](#-installation)
* [Environment Configuration](#️-environment-configuration)
* [Available Scripts](#-available-scripts)
* [Assignment Requirements](#-assignment-requirements)
* [Future Scalability](#-future-scalability)
* [Credits](#-credits)
* [License](#-license)

---

## 🎯 Overview

**Movie Explorer** is a responsive React application designed to provide a simple and polished interface for discovering TV shows through the **TVMaze API**.

The application contains two primary user-facing experiences:

1. **Home Page**

   * Application branding
   * Navigation
   * Hero section
   * Call-to-action
   * Footer

2. **Movie Listing Page**

   * Browse available shows
   * Search shows by title
   * Display responsive movie/show cards
   * Open detailed information in an interactive modal

Although the assignment uses the term **Movie Explorer**, the application uses TVMaze as its data source, which provides information about **TV shows**. The UI follows the assignment terminology while the data layer is structured so the external API can be replaced or extended in the future.

---

# ✨ Features

## 🏠 Home Page

* Responsive navigation bar
* Movie Explorer branding
* Navigation link to the Movies page
* Cinematic hero banner
* Movie/show-related visual background
* Application heading and description
* Call-to-action button
* Responsive footer
* Copyright information
* GitHub/social link support

---

## 🎬 Movie Listing

* Dedicated `/movies` route
* Fetches shows from TVMaze
* Responsive CSS Grid layout
* Reusable movie/show cards
* Movie/show poster
* Title
* Release year/date
* Rating
* Genre information where available
* `See Details` action

---

## 🔎 Search

Users can search for shows by title.

The application uses the TVMaze search endpoint:

```text
GET /search/shows?q={query}
```

Example:

```text
https://api.tvmaze.com/search/shows?q=girls
```

Search behavior includes:

* Prominent search input
* Dynamic search results
* Debounced API requests
* Empty search handling
* No-results state
* Clear search action
* API error handling
* Prevention of unnecessary requests

---

## 🎞️ Movie Details Modal

Clicking `See Details` opens an interactive modal containing detailed information about the selected show.

The modal can display:

* Large poster/image
* Title
* Rating
* Release date/year
* Genres
* Runtime where available
* Summary/overview
* Additional information available from TVMaze
* Cast information where requested from the API

The modal supports:

* Close button
* `X` button
* Backdrop interaction
* Escape-key interaction through the modal implementation
* Responsive mobile layout

---

## ⏳ Loading States

The application provides visual feedback while data is being loaded.

Instead of displaying only a generic `Loading...` message, the movie listing uses **skeleton cards** to preserve the page layout and provide better perceived performance.

Loading states are handled separately for:

* Initial movie/show loading
* Search requests
* Movie/show details

---

## ⚠️ Error Handling

The application provides dedicated UI states for different failure scenarios.

### API Error

```text
Something went wrong.

We couldn't load the shows right now.

[ Try Again ]
```

### Empty Search Result

```text
No shows found.

Try searching with another title.
```

### Missing Images

When a show does not contain an available image, a fallback poster/placeholder is displayed instead of a broken image.

### Unexpected React Errors

A React Error Boundary can be used to prevent an unexpected rendering error from breaking the entire application experience.

---

# 🛠️ Tech Stack

## Core

* **JavaScript**
* **React**
* **Vite**

## Styling

* **Tailwind CSS**
* CSS

## API & Networking

* **Axios**
* **TVMaze API**

## Routing

* **React Router DOM**

## Modal

* **React Modal**

## Icons

* **React Icons**

---

# 🌐 API Integration

The application uses the **TVMaze API** as its external data source.

TVMaze API documentation:

**https://www.tvmaze.com/api**

Base API URL:

```text
https://api.tvmaze.com
```

The API layer is intentionally separated from UI components.

Instead of making API requests directly inside components, the application follows:

```text
Component
    ↓
Custom Hook
    ↓
Service Layer
    ↓
API Layer
    ↓
Axios
    ↓
TVMaze API
```

This separation makes the application easier to maintain and allows the data source to be changed later without rewriting the UI.

---

# 🔌 API Endpoints

The project only uses the endpoints required for the assignment and the details experience.

## 1. Get All Shows

### Endpoint

```http
GET /shows
```

### Full URL

```text
https://api.tvmaze.com/shows
```

### Purpose

Used to populate the initial Movie Listing page.

The response provides information such as:

* ID
* Name
* Poster/image
* Rating
* Premiered date
* Genres
* Summary
* Runtime
* Language
* Status

---

## 2. Search Shows

### Endpoint

```http
GET /search/shows?q={query}
```

### Example

```text
https://api.tvmaze.com/search/shows?q=girls
```

### Purpose

Used when the user searches for a specific movie/show title.

TVMaze returns search results containing a relevance score and show information.

The application extracts the show data and converts it into the internal application model before rendering it.

---

## 3. Get Show Details

### Endpoint

```http
GET /shows/{id}
```

### Example

```text
https://api.tvmaze.com/shows/1
```

### Purpose

Used to retrieve detailed information for the selected show.

---

## 4. Get Show Details with Cast

### Endpoint

```http
GET /shows/{id}?embed=cast
```

### Example

```text
https://api.tvmaze.com/shows/1?embed=cast
```

### Purpose

Used when the details modal requires additional cast information.

This avoids fetching detailed information for every card before the user requests it.

---

# 📊 API Usage Strategy

The application avoids unnecessary API requests.

### Initial listing

```text
/movies
   ↓
GET /shows
```

### Search

```text
User enters query
       ↓
Debounce
       ↓
GET /search/shows?q=query
```

### Details

```text
User clicks See Details
       ↓
GET /shows/{id}?embed=cast
       ↓
Display modal
```

The application does **not** fetch individual details for every card in the listing. Details are requested only when the user opens a specific item.

This avoids an unnecessary **N+1 request pattern**.

---

# 🔄 Application Flow

```text
                         Movie Explorer
                              │
                 ┌────────────┴────────────┐
                 │                         │
               Home                      Movies
                 │                         │
       ┌─────────┼─────────┐       ┌───────┴────────┐
       │         │         │       │                │
    Navbar      Hero     Footer  Search          Movie Grid
                                                   │
                                            ┌──────┴──────┐
                                            │             │
                                         Cards        Empty/Error
                                            │
                                      See Details
                                            │
                                            ▼
                                    Details Modal
```

---

# 🏗️ Project Architecture

The application follows a lightweight **feature-oriented architecture**.

The main architectural principle is:

> **Pages compose, components render, hooks manage React/data logic, services communicate with APIs.**

### High-level architecture

```text
UI Layer
│
├── Pages
├── Layout Components
└── Movie Components
        │
        ▼
Application Logic
│
└── Custom Hooks
        │
        ▼
Data Layer
│
├── Movie Services
└── Movie API
        │
        ▼
Infrastructure
│
└── Axios Client
        │
        ▼
External API
│
└── TVMaze
```

---

# 📁 Folder Structure

```text
src/
│
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── providers.jsx
│
├── assets/
│   └── images/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Skeleton.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageLayout.jsx
│   │
│   └── movie/
│       ├── MovieCard.jsx
│       ├── MovieGrid.jsx
│       ├── MovieDetailsModal.jsx
│       ├── MovieMeta.jsx
│       └── MovieRating.jsx
│
├── features/
│   └── movies/
│       ├── movie.api.js
│       ├── movie.service.js
│       ├── movie.hooks.js
│       ├── movie.utils.js
│       └── movie.constants.js
│
├── pages/
│   ├── Home/
│   │   └── Home.jsx
│   │
│   ├── Movies/
│   │   ├── Movies.jsx
│   │   └── components/
│   │       ├── MovieSearch.jsx
│   │       ├── MovieList.jsx
│   │       └── MovieListSkeleton.jsx
│   │
│   └── NotFound/
│       └── NotFound.jsx
│
├── services/
│   └── api/
│       └── axios.js
│
├── hooks/
│   └── useDebounce.js
│
├── lib/
│   └── utils.js
│
├── styles/
│   └── globals.css
│
└── main.jsx
```

---

# 🧩 Folder Responsibilities

## `app/`

Application-level configuration.

Responsible for:

* React application setup
* Routing
* Global providers

---

## `pages/`

Contains route-level pages.

Examples:

```text
Home
Movies
NotFound
```

Pages should primarily compose components rather than contain large amounts of reusable logic.

---

## `components/`

Reusable UI components.

### `common/`

Generic components that can be reused across different features.

Examples:

```text
Button
Container
ErrorState
EmptyState
Skeleton
```

### `layout/`

Application-wide layout components.

```text
Navbar
Footer
PageLayout
```

### `movie/`

Reusable movie/show-specific UI.

```text
MovieCard
MovieGrid
MovieDetailsModal
MovieMeta
MovieRating
```

---

## `features/movies/`

Contains movie/show-specific application and data logic.

This is the main feature layer.

### `movie.api.js`

Defines API operations.

```text
getShows()
searchShows()
getShowDetails()
```

### `movie.service.js`

Handles data processing and API-to-application transformation.

### `movie.hooks.js`

Contains reusable React hooks for movie/show data.

### `movie.utils.js`

Contains movie-specific helper functions.

Examples:

```text
getMovieYear()
getMoviePoster()
getMovieRating()
formatGenres()
stripHtml()
```

### `movie.constants.js`

Contains feature-level constants.

---

## `services/api/`

Contains the shared Axios client.

Example responsibility:

```text
Base URL
Timeout
Common Axios configuration
```

---

## `hooks/`

Contains generic reusable React hooks.

Example:

```text
useDebounce()
```

---

## `lib/`

Contains generic application utilities that are not specific to movies.

---

# 🔄 Data Flow

The application follows a one-directional data flow.

```text
TVMaze API
    │
    ▼
Axios Client
    │
    ▼
Movie API
    │
    ▼
Movie Service
    │
    ▼
Custom Hook
    │
    ▼
Page
    │
    ▼
UI Components
```

For example:

```text
GET /shows
    ↓
movie.api.js
    ↓
movie.service.js
    ↓
useMovies()
    ↓
Movies.jsx
    ↓
MovieGrid
    ↓
MovieCard
```

---

# 🧹 API Data Normalization

TVMaze's response structure is kept inside the data layer rather than being repeated throughout UI components.

For example, an API response may contain:

```js
{
  id: 1,
  name: "Under the Dome",
  premiered: "2013-06-24",
  rating: {
    average: 6.5
  },
  image: {
    medium: "...",
    original: "..."
  }
}
```

The application can transform this into a UI-friendly model:

```js
{
  id: 1,
  title: "Under the Dome",
  releaseDate: "2013-06-24",
  year: 2013,
  rating: 6.5,
  poster: "...",
  genres: [],
  summary: "..."
}
```

This keeps UI components independent from the exact TVMaze response structure.

It also makes replacing the API in the future significantly easier.

---

# 🧭 Routing

React Router DOM is used for client-side navigation.

Current route structure:

```text
/
├── Home
│
├── /movies
│   └── Movie Listing
│
└── *
    └── Not Found
```

### Layout structure

```text
PageLayout
│
├── Navbar
│
├── <Outlet />
│
└── Footer
```

This prevents Navbar and Footer from being duplicated across pages.

Navigation uses React Router components such as:

```jsx
<Link to="/movies">
```

and:

```jsx
<NavLink to="/movies">
```

instead of performing full browser page reloads.

---

# 🧠 State Management

The application intentionally uses **local React state and custom hooks** rather than introducing unnecessary global state.

Typical state includes:

```text
movies
isLoading
error
searchQuery
selectedMovie
isModalOpen
```

### Local UI state

```text
Search query
Selected movie
Modal visibility
```

### Data state

Handled through movie-specific hooks.

This keeps state close to where it is actually needed.

A global state library such as Redux or Zustand is not necessary for the current assignment scope.

---

# 🔎 Search Architecture

Search uses a debounced input to prevent unnecessary API requests.

Without debounce:

```text
g
go
gol
gole
golem
```

could result in multiple API requests.

With debounce:

```text
User types
    ↓
Wait ~400ms
    ↓
Send request
```

Search flow:

```text
Search Input
     ↓
searchQuery
     ↓
Debounce
     ↓
useMovieSearch()
     ↓
GET /search/shows?q=query
     ↓
Normalize Results
     ↓
Movie Grid
```

The application can also synchronize the search query with the URL:

```text
/movies?q=breaking
```

This makes search state shareable and allows it to survive page refreshes.

---

# ⚡ Request Cancellation

Search requests can become stale when a user changes the query quickly.

For example:

```text
Request A → "bat"
Request B → "batm"
Request C → "batman"
```

If Request A finishes after Request C, its response should not replace the latest results.

The API layer can therefore cancel stale requests using Axios cancellation / `AbortController`.

Conceptually:

```text
Old Request → Cancel
Old Request → Cancel
Latest Request → Active
```

This keeps search results consistent with the user's latest query.

---

# ⏳ Loading and Error Handling

The application treats different UI states separately.

## Loading

```text
Loading
   ↓
Movie Grid Skeleton
```

Skeleton cards preserve the expected layout while data is being fetched.

---

## Error

```text
API Failure
   ↓
ErrorState
   ↓
Try Again
```

The user receives a meaningful message instead of a raw API or Axios error.

---

## Empty

```text
Successful Request
       ↓
No Results
       ↓
EmptyState
```

Example:

```text
No shows found.

Try searching with another title.
```

---

## Rendering Error

A React Error Boundary can be used to handle unexpected rendering errors separately from API failures.

This creates a clear distinction:

```text
Rendering error → Error Boundary

API error → Error State

No results → Empty State

Loading → Skeleton
```

---

# 🎨 UI/UX Guidelines

The visual direction follows a **minimal dark cinematic interface**.

## Color System

Suggested palette:

```text
Background:        #08080B
Surface:           #111116
Elevated Surface:  #18181F
Primary Text:      #F5F5F5
Muted Text:        #A1A1AA
Border:            #27272A
Accent:            #A855F7
Soft Accent:       #E9D5FF
```

The accent color is used selectively for:

* CTA buttons
* Active navigation
* Rating highlights
* Focus states
* Important interactive elements

---

## Typography

Recommended typography:

### Display Font

**Space Grotesk**

Used for:

* Hero heading
* Page headings
* Prominent titles

### UI / Body Font

**Plus Jakarta Sans**

Used for:

* Body text
* Navigation
* Buttons
* Metadata
* Descriptions

The combination provides a modern editorial/cinematic feel while maintaining readability.

---

# 🖱️ Interaction Design

Interactive elements use subtle transitions rather than excessive animation.

### Movie Card Hover

```text
translateY(-4px)
```

with a subtle poster scale effect.

### Buttons

Use:

* Clear hover state
* Focus state
* Smooth 200–300ms transition
* Comfortable touch target

### Modal

* Backdrop blur/dimming
* Smooth appearance
* Clear close button
* Mobile-friendly sizing

Animations should enhance usability rather than distract from the content.

---

# 📱 Responsive Design

The application is designed for mobile, tablet, and desktop screens.

## Mobile

```text
1-column grid
Stacked content
Full-width search
Touch-friendly controls
Nearly full-screen details modal
```

## Tablet

```text
2–3 column grid
Balanced spacing
```

## Desktop

```text
3–4+ column grid
Larger content container
Optimized spacing
```

Example Tailwind approach:

```text
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
```

The final number of columns should be adjusted based on actual card readability rather than forcing too many cards onto large screens.

---

# ♿ Accessibility

The application follows basic accessibility practices.

* Semantic HTML
* Real `<button>` elements for actions
* Accessible search input
* Descriptive image `alt` text
* Keyboard-friendly interactions
* Escape-key modal closing
* Visible focus states
* Sufficient text contrast
* Touch-friendly interactive elements

Interactive `<div>` elements are avoided when a semantic button or link is appropriate.

---

# 🚀 Performance Considerations

The project includes several lightweight performance considerations.

### Route Lazy Loading

Pages can be lazy-loaded using:

```jsx
React.lazy()
```

with:

```jsx
<Suspense />
```

This allows route-level code splitting.

---

### Search Debouncing

Prevents excessive search API calls.

---

### Request Cancellation

Prevents stale search responses from overwriting newer results.

---

### Lazy Images

Movie posters can use native image lazy loading:

```html
loading="lazy"
```

where appropriate.

---

### Avoiding N+1 Requests

Details are not fetched for every movie/show card.

Only the selected item requests detailed information.

---

# 🧩 Component Architecture

The application uses reusable components without excessive fragmentation.

```text
App
│
└── PageLayout
    │
    ├── Navbar
    │
    └── Outlet
         │
         ├── Home
         │    └── Hero
         │
         └── Movies
              │
              ├── MovieSearch
              │
              ├── MovieGrid
              │    │
              │    ├── MovieCard
              │    ├── MovieCard
              │    └── MovieCard
              │
              └── MovieDetailsModal
```

Components are created around meaningful UI responsibilities rather than splitting every small HTML element into a separate component.

---

# 💻 Installation

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Navigate into the project

```bash
cd movie-explorer
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

# ⚙️ Environment Configuration

TVMaze's public API does not require an API key.

The base URL can therefore be configured directly through the Axios client:

```text
https://api.tvmaze.com
```

For better environment separation, the application can optionally use:

```env
VITE_TVMAZE_BASE_URL=https://api.tvmaze.com
```

Then the Axios client can read:

```js
import.meta.env.VITE_TVMAZE_BASE_URL
```

This keeps the API configuration separate from application code.

---

# 📜 Available Scripts

Typical Vite scripts include:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs the project's linting configuration when configured.

---

# ✅ Assignment Requirements

The project implements the required assignment functionality.

## Home Page

* [x] Application logo/brand
* [x] Navigation links
* [x] Link/button to Movie Listing Page
* [x] Hero banner
* [x] Movie-related visual
* [x] Application heading
* [x] Description
* [x] CTA button
* [x] Footer
* [x] Copyright information

## Movie Listing

* [x] Dedicated Movie Listing Page
* [x] Search bar
* [x] Search by title
* [x] Dynamic search results
* [x] TVMaze API integration
* [x] Responsive movie grid
* [x] Reusable movie cards
* [x] Poster
* [x] Title
* [x] Release date/year
* [x] Rating
* [x] See Details button

## Details Modal

* [x] Interactive modal
* [x] Large poster/image
* [x] Movie/show title
* [x] Summary
* [x] Rating
* [x] Release date
* [x] Genre/additional information
* [x] Close button
* [x] Responsive layout
* [x] Backdrop/Escape interaction where supported

## Responsive UX

* [x] Mobile-friendly layout
* [x] Single-column mobile grid
* [x] Responsive desktop grid
* [x] Touch-friendly controls
* [x] Responsive modal
* [x] Responsive navigation

---

# 🔮 Future Scalability

The current implementation intentionally stays within the assignment scope.

However, the architecture provides clear extension points for future functionality.

Potential future features include:

```text
Favorites / Watchlist
Genre filtering
Pagination / infinite scrolling
Show details route
Episode information
Season information
Cast browsing
People search
Schedule browsing
Advanced sorting
Theme switching
Local persistence
Authentication
Personalized watchlists
API caching
```

The feature-oriented structure allows these additions without requiring major changes to existing UI components.

For example:

```text
features/
└── movies/
```

could later become:

```text
features/
├── movies/
├── favorites/
├── search/
├── people/
└── schedule/
```

without restructuring the entire application.

---

# 🧱 Architectural Principles

The project follows several simple engineering principles:

### Separation of Concerns

API communication, data transformation, business logic, and UI rendering are separated.

### Reusability

Common UI patterns are extracted into reusable components.

### Single Responsibility

Components and modules should have clear responsibilities.

### API Independence

UI components consume the application's normalized data model instead of depending directly on TVMaze's response structure.

### Predictable State

Local state is preferred unless state genuinely needs to be shared globally.

### Progressive Complexity

The application avoids adding libraries or architectural complexity that the current requirements do not justify.

---

# 🧪 Quality Checklist

Before considering the project complete, verify:

```text
[✓] Home page works on mobile and desktop
[✓] Movies page loads correctly
[✓] Search works correctly
[✓] Search requests are debounced
[✓] Empty search is handled
[✓] No-results state works
[✓] API errors have a useful UI
[✓] Movie cards handle missing images
[✓] Details modal opens correctly
[✓] Details modal closes correctly
[✓] Escape/backdrop closing works
[✓] Skeleton loading works
[✓] Responsive grid works
[✓] Keyboard navigation works
[✓] Images have useful alt text
[✓] No unnecessary API requests
[✓] No console errors
[✓] Production build succeeds
[✓] Routes work correctly
```

---

# 📚 API Documentation

TVMaze API Documentation:

https://www.tvmaze.com/api

TVMaze API Base URL:

https://api.tvmaze.com

---

# 🙌 Credits

Built as part of the **Foundation Program — Movie Explorer Assignment**.

Data provided by **TVMaze**.

TVMaze API:

https://www.tvmaze.com/api

---

# 📄 License

This project is created for educational/assignment purposes. Built by Showrav Kormokar.

Movie/show information and images are provided by the TVMaze API and are subject to their respective terms and policies.
