import React, { useEffect, useState } from 'react';

function Dash() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
    fetch(apiUrl + 'dash')
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

  if (!info) return <div>Carregando...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{info.message}</h2>
      <div>Usuários cadastrados na plataforma: {info.number_users}</div>
    </div>
  );
}

export default Dash;
