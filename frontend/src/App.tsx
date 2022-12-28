import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:5000/echo");

    ws.onopen = (event) => {
      ws.send("test");
    };
  
    ws.onmessage = function (event) {
      try {
        setCurrentTime(event.data);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {currentTime}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
