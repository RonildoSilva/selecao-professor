import React, { useEffect, useState } from 'react';

function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

    fetch(apiUrl + 'me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(() => setError('Erro ao buscar perfil'));
  }, [token]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Carregando...</div>;

  return (
    <div>
        <h2 className="container mt-4">Perfil</h2>
        <div className="container mt-4">
        <div>
            <span>Olá, </span>{user.username} !
        </div>
        <button onClick={handleLogout}
          className="btn btn-primary mt-3">Sair
        </button>
        </div>
    </div>
  );
}

export default Profile;
