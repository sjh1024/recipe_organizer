"use client";
import './papers.css';
import React, { useState, Component } from 'react';


const LinedPaper = ({ section_title, contents, col_names}) => {

    return (
      <div className='lined-paper'>
      <h2>{section_title}</h2>
      <table style={{ borderCollapse: 'collapse' }}>
      <thead>
  <tr>
    {col_names.map((column, index) => (
      <th
        style={{
          borderRight: index === col_names.length - 1 ? 'none' : '2px solid #800f2f',
          padding: 'auto'
        }}
        key={index}
      >
        {column.label}
      </th>
    ))}
  </tr>
</thead>

<tbody>
  {contents.map((ingredient, index) => (
    <tr key={index}>
      {col_names.map((column, colIndex) => (
        <td
          style={{
            borderRight: colIndex === col_names.length - 1 ? 'none' : '2px solid #800f2f',
            padding: 'auto'
          }}
          key={colIndex}
        >
          {/*TODO: Move this logic elsewhere, since it's specific to a specific use of LinedPaper.*/}
           {column.field === 'ing_type_required' ?
                  (ingredient[column.field] === 'true' ? '✓' : '✗') :
                  ingredient[column.field]}
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

  export default LinedPaper;


