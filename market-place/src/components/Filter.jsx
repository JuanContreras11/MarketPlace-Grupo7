import React from 'react';

const Filter = ({ onSortChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Ordenar por precio:</label>
      <select
        id="sort"
        className="border border-gray-300 rounded p-2"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Seleccionar</option>
        <option value="asc">Menor a Mayor</option>
        <option value="desc">Mayor a Menor</option>
      </select>
    </div>
  );
};

export default Filter;