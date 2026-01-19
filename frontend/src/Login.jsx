import React, { useState } from 'react';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

      const response = await fetch(apiUrl + 'signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Erro ao logar');
      }
    } catch {
      setError('Erro de conexão. Verifique o servidor.');
    }
  };

  return (
    <div>
        <h3 className="container mt-4">Login</h3>
        <form className="container mt-4" onSubmit={handleSubmit}>
            <input className="form-control"
            placeholder="Username"
                required
                value={username} onChange={
                    event => setUsername(event.target.value)
                } />

            <input className="form-control" type="password"
                placeholder="Password"
                required
                value={password} onChange={
                    event => setPassword(event.target.value)
                } />

            <button type="submit" className="btn btn-primary mt-3">Entrar</button>
            {error && <div style={{color:'red'}}>{error}</div>}
        </form>
    </div>
  );
}

export default Login;
