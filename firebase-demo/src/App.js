import logo from './logo.svg';
import './App.css';
import Authorization from './Components/Authorization';
import Firestore from './Components/Firestore';
import Firestorage from './Components/Firestorage';
function App() {
  return (
    <>
      <Firestorage></Firestorage>
      <Firestore></Firestore>
      <Authorization></Authorization>
    </> 
  );
}

export default App;
