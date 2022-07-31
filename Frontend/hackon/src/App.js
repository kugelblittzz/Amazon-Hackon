import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRpage from './Pages/QRgen'; 
import QRverify from './Pages/QRverify';

function App() {
  return (
    <div className="App">
    <Router>
   
      <Routes>
        <Route path="/" element={<QRpage/>}/>
        <Route path="/verify" element={<QRverify/>}/>
        //add your page inside "element " to see it on the browser


      </Routes>
    
    </Router>

    </div>
  );
}

export default App;
