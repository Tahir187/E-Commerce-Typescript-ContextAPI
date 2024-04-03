import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
const App =()=> {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
