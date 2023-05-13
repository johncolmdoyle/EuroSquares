import { Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from './page/Home';
import Square from './page/Square';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/square/:squareId" element={<Square />} />
         </Routes> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;