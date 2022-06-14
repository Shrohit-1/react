
import './App.css';
import Ball from './Components/Ball';
import Bat from './Components/Bat';
import {Provider} from "react-redux";
import store from './redux/store';
function App() {
  return (
      <>
      <Provider store={store}>
        <Bat></Bat>
        <Ball></Ball>
      </Provider>
      </>
  );
}

export default App;
