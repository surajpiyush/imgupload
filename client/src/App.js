import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import { Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
    <Header/>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
