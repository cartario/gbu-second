import React from 'react';

export default function ({title}) {
  return (
    <header className="title-header">
      <h1 className="title-top"><span>{title}</span></h1>
    </header>
  );
};

