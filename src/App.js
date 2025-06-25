
import UserRegister from "./Component/UserRegister";
import UserLogin from "./Component/UserLogin";
import UserPanel from "./Component/UserPanel";
import {BrowserRouter as
      Router,
  Routes,
  Route} from 'react-router-dom';
import AddUser from "./Component/AddUser";
export default function App() {
  return (
      <div className="App">
        <Router>
              <Routes>
                <Route exact path="/" element={<UserRegister/>}></Route>
                <Route exact path="/login" element={<UserLogin/>}></Route>
                  <Route exact path="/userpanel" element={<UserPanel/>}></Route>
                  <Route exact path="/addUser" element={<AddUser/>}></Route>
              </Routes>
        </Router>
      </div>
  )
}
