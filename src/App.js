import React, {useState} from 'react';
import logo from './logo.svg';
import LoginButton from './LoginButton.js';
import './App.css';
import TextInput from './TextInput.js';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My codelab app!
        </p>
        <LoginButton setUser={(user) => setUser(user)} />
        {user != null &&
        <p>Welcome, {user.displayName} ({user.email})</p> 
        } 
        <TextInput promptText="Name?"/>
        <TextInput promptText="Hometown?"/>
      </header>
    </div>
  );
}

export default App;
