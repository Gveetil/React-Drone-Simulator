import React from 'react';
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import Navbar from './components/Navbar';
import { AppProvider } from "./utils/AppContext";

function App() {
  return (
    <AppProvider>
      <Navbar />
      <LayoutGrid />
    </AppProvider>
  );
}

export default App;
