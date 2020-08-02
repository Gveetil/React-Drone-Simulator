import React from 'react';
import './App.css';
import LayoutGrid from './components/LayoutGrid';
import { AppProvider } from "./utils/AppContext";

function App() {
  return (
    <AppProvider>
      <LayoutGrid />
    </AppProvider>
  );
}

export default App;
