# Georgia Foreclosure - Vue 3 Application

A comprehensive property foreclosure listing application built with Vue 3, Vuex, and Element Plus.

## Features

- **Property Listings**: Browse foreclosure properties with detailed information
- **Interactive Map**: View properties on an interactive map with custom markers
- **Advanced Filtering**: Filter properties by county, month, beds, baths, price range, and more
- **Multiple Views**: Switch between tile view, list view, and map view
- **Favorites**: Mark properties as favorites
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Element Plus for a polished user experience

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vuex 4** - State management
- **Vue Router 4** - Client-side routing
- **Element Plus** - UI component library
- **Leaflet** - Interactive maps
- **Vite** - Next-generation frontend tooling
- **Sass** - CSS preprocessor

## Project Structure

```
src/
├── assets/
│   └── styles/
│       └── main.scss           # Global styles
├── components/
│   ├── filters/
│   │   ├── AdvancedFilters.vue # Advanced filter drawer
│   │   └── FilterPanel.vue     # Main filter controls
│   ├── layout/
│   │   └── AppHeader.vue       # Application header
│   ├── map/
│   │   └── MapView.vue         # Interactive map component
│   └── properties/
│       ├── PropertyCard.vue    # Property card (tile view)
│       └── PropertyListView.vue # Property list (table view)
├── data/
│   └── mockProperties.js       # Mock property data
├── router/
│   └── index.js                # Vue Router configuration
├── services/
│   └── propertyService.js      # Property data service
├── store/
│   ├── index.js                # Vuex store root
│   └── modules/
│       ├── filters.js          # Filter state management
│       ├── properties.js       # Property state management
│       └── ui.js               # UI state management
├── views/
│   ├── Contact.vue             # Contact page
│   ├── CustomList.vue          # Custom list page
│   └── ForeclosureList.vue     # Main foreclosure list page
├── App.vue                     # Root component
└── main.js                     # Application entry point
```

## Architecture & Best Practices

### State Management (Vuex)
- **Modular store**: Organized into `properties`, `filters`, and `ui` modules
- **Getters**: Computed properties for derived state
- **Actions**: Async operations and business logic
- **Mutations**: Synchronous state updates

### Components
- **Composition API**: Modern Vue 3 syntax with `<script setup>`
- **Props validation**: Type-checked props for reliability
- **Scoped styles**: Component-specific styles with SCSS
- **Reusability**: Small, focused, reusable components

### Code Quality
- **DRY principle**: Reusable utilities and services
- **SOLID principles**: Single responsibility, dependency injection
- **Separation of concerns**: Clear boundaries between components, services, and state
- **Type safety**: Proper prop types and validation

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Features in Detail

### Filtering System
- **Basic Filters**: County, Month, List Type
- **Beds & Baths**: Flexible bedroom and bathroom filtering with exact match option
- **Value & Debt**: Filter by estimated value and foreclosure amount
- **More Filters**: Year built, square footage, incomplete data handling

### Property Views
1. **Tile View**: Grid layout with property cards showing images and key details
2. **List View**: Table format with sortable columns
3. **Map View**: Interactive map with property markers and popups

### Map Features
- **Map/Satellite Toggle**: Switch between standard and satellite views
- **Custom Markers**: Price-labeled markers for easy identification
- **Property Popups**: Click markers to see property details
- **Auto-fitting**: Map automatically adjusts to show all properties
- **Fullscreen Mode**: Expand map to fullscreen for better viewing

### Pagination
- **Adjustable Page Size**: Choose 12, 24, 48, or 96 items per page
- **Page Navigation**: Easy navigation between pages
- **Results Count**: Always know how many properties match your filters

## Mock Data

The application uses mock property data located in `src/data/mockProperties.js`. This includes:
- 31 sample properties across Georgia
- Realistic property details (address, price, beds, baths, etc.)
- Geographic coordinates for map display
- Property images from Unsplash

## Customization

### Adding New Filters
1. Add filter state in `src/store/modules/filters.js`
2. Add filter logic in `src/store/modules/properties.js` (applyFilters action)
3. Update UI in `src/components/filters/AdvancedFilters.vue`

### Styling
- Global styles: `src/assets/styles/main.scss`
- Component styles: Use scoped `<style>` blocks
- Theme colors: Modify SCSS variables in main.scss

### Connecting to Real API
Replace the mock service in `src/services/propertyService.js` with actual API calls:



## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


