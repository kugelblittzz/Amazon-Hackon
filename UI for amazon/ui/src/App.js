import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Header from './pages/Header'


function App() {


  


 
  return (
   <div className="App">
    <Router>
   
      <Routes>
        
      { <Route path="/" element={<Home/> }/>   }
    
        {/* <Route path="/" element={<Header/> }/> */}
       

      </Routes>
      
    </Router>

    </div>
     
   
  );
}

export default App;