import logo from './logo.svg';
import './App.css';
import './Componenets/Us'
import Us from './Componenets/Us';
import Ue1 from './Componenets/Ue1';
import Ue2 from './Componenets/Ue2';
import Ue3 from './Componenets/Ue3';
import context from "./Componenets/Context"
import {useState} from 'react';
import NavBar from './Componenets/NavBar';
import Parent1 from './Componenets/Parent1';
import Parent2 from './Componenets/Parent2';

function App() {
  const [theme,setTheme]= useState(false);
  return (
    <context.Provider value={theme}>
      <button onClick={()=>setTheme(!theme)}>Toggle theme</button>
      <NavBar />
      <Parent1 />
      <Parent2 />
    { //<Ue3 />
      // <Ue2 />
      // <Ue1 />
      // <Us></Us>
     }
    </context.Provider>
  );
}

export default App;
