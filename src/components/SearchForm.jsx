// src/components/SearchForm.jsx

import React, { useState } from 'react';

function SearchForm({ onSearch }) {
    // Estado local para el campo de texto del input
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene que el formulario recargue la página (comportamiento por defecto)
        
        // Ejecuta el callback del Padre (onSearch) con el término actual.
        // Esto actualizará el estado del Padre y DISPARARÁ el useEffect.
        onSearch(searchTerm.toLowerCase()); 
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca un Pokémon (ej: pikachu)"
                style={{ padding: '10px', width: '250px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Buscar
            </button>
        </form>
    );
}

export default SearchForm;

