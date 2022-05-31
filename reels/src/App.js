import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {AuthProvider} from "./Context/AuthContext"
import Feed from './Components/Feed';
import Privateroute from './Components/Privateroute';
import ForgetPass from './Components/ForgetPass';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route
              path="/"
              element={
                <Privateroute>
                  <Feed />
                </Privateroute>
              }
          />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/forgetpassword' element={<ForgetPass></ForgetPass>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
   
  );
}

export default App;
