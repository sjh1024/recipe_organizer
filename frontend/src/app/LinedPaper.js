"use client";
import './papers.css';
import React, { useState, Component } from 'react';


const LinedPaper = ({ section_title, contents, col_names}) => {
   
   //test state in comment below: 
   //[{name: "test", required: 0, thirdone: 123}, {name: "another", required: 1, thirdone: 12459}]

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
          {ingredient[column.field]}
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


