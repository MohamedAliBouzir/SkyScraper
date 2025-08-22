# 🌍 Spotter Travels

A modern travel discovery application built with React, TypeScript, and MapBox integration for exploring and spotting amazing travel destinations around the world.

## 🚀 Features

- **Interactive Maps**: Powered by MapBox for seamless navigation and location discovery
- **Modern UI**: Clean and responsive design using Material-UI components
- **TypeScript**: Full type safety and enhanced developer experience
- **Fast Development**: Built with Vite for lightning-fast development and build times
- **Custom Hooks**: Reusable logic with custom React hooks and SWR integration
- **Context Management**: Efficient state management using React Context API

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Maps**: MapBox GL JS
- **Data Fetching**: SWR
- **Styling**: Custom CSS with MUI theming

## 📁 Project Structure

```
spotter-travels/
├── public/                   
├── src/
│   ├── app/                 
│   ├── assets/                
│   │   ├── data/             
│   │   └── icons/            
│   │       └── Material/     
│   ├── components/           
│   │   ├── Map/             
│   │   └── UI/              
│   ├── contexts/            
│   ├── hooks/               
│   │   ├── custom/          
│   │   └── swr/             
│   ├── interfaces/          
│   │   └── interceptors/    
│   ├── layout/              
│   │   └── Header/          
│   ├── pages/               
│   ├── providers/           
│   ├── routes/              
│   ├── services/           
│   ├── styles/              
│   │   ├── components/      
│   │   ├── layout/          
│   │   └── pages/          
│   ├── types/               
│   ├── utils/               
│   ├── main.tsx             
│   ├── menu.ts              
│   └── vite-env.d.ts        
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 16 or higher)
- npm package manager
- MapBox API token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spotter-travels.git
   cd spotter-travels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your MapBox token:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_access_token_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🗺️ MapBox Integration

This project uses MapBox GL JS for interactive maps. Make sure to:

1. Sign up for a MapBox account at [mapbox.com](https://www.mapbox.com)
2. Get your access token from the MapBox dashboard
3. Add the token to your `.env` file as shown above

## 🎨 Styling

The project uses a combination of:
- **Material-UI**: For consistent design system and components
- **Custom CSS**: For specific styling needs organized by:
  - Component-specific styles in `src/styles/components/`
  - Layout styles in `src/styles/layout/`
  - Page-specific styles in `src/styles/pages/`

## 🔄 State Management

The application uses:
- **React Context API**: For global state management
- **SWR**: For server state management and data fetching
- **Custom Hooks**: For reusable stateful logic

## 🌐 API Integration

API services are organized in the `src/services/` directory with:
- HTTP interceptors for request/response handling
- Type-safe interfaces for API responses
- SWR hooks for efficient data fetching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [MapBox](https://www.mapbox.com) for amazing mapping services
- [Material-UI](https://mui.com) for beautiful React components
- [Vite](https://vitejs.dev) for fast development experience
- [SWR](https://swr.vercel.app) for data fetching

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Happy Traveling with Spotter! 🌟**