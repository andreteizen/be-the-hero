import React from 'react';

import './global.css';

import Routes from './routes';

/**
 * Componente no react nada mais é do que uma FUNÇÃO que retorna um HTML
 */
function App() {

  // useState retorna um array [valor, função de atualização]

  return (
    <Routes />
  );
}

export default App;
