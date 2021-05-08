import './App.css';
import { useEffect, useState } from 'react';
import { SignIn } from './components/SignIn/SignIn';
import { Dashboard } from './components/Dashboard/Dashboard'
import axios from 'axios';

function App() {

  const [currentUserId, setCurrentUserId] = useState('104045957173342154161');

  return (
    <div className="App">
      {currentUserId !== null ? 
        <Dashboard  setCurrentUserId = {setCurrentUserId} currentUserId = {currentUserId}/> 
        :
        <SignIn setCurrentUserId = {setCurrentUserId} /> }
    </div>
  );
}

export default App;