import React, { useState, useEffect } from "react";
import AddPlayer from "../components/addPlayer/AddPlayer";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const Home = () => {  
    const [squareId, setSquareId] = useState([]);
    
    if(!uuidValidate(squareId)) {
        setSquareId(uuidv4())
    }

    const getSquare = async () => {
        const data = {id:"123"};
      };

    return (
      <div className="mt-4 d-flex justify-content-center flex-column">
        <AddPlayer getSquare={getSquare} squareId={squareId}/>
      </div>
    );
  };
  
  export default Home;