import React, { useState } from 'react';

import Login from './Login';
import Profile from './Profile';
import Dash from './Dash';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="container">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Profile token={token} />
          <Dash />
        </>
      )}
    </div>
  );
}

export default App;
