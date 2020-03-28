import React from 'react';

import './global.css';
import Logon from './pages/Logon'; //Ele sempre busca o arquivo index dentro da pasta, caso nao seja passado um arquivo para ele

/**
 * Componente no react nada mais é do que uma FUNÇÃO que retorna um HTML
 */
function App() {

  // useState retorna um array [valor, função de atualização]

  return (
    <Logon />
  );
}

export default App;
