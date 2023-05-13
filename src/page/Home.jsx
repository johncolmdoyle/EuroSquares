import React, { useState, useEffect } from "react";
import AddPlayer from "../components/addPlayer/AddPlayer";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { API } from 'aws-amplify'

const Home = () => {  
    const [squareData, setSquareData] = useState([]);
    const [squareId, setSquareId] = useState([]);
    
    useEffect(() => {
        createSquare()
      }, [squareId])
    
    async function createSquare() {
        const apiName = 'v1';
        const path = '/squares';
        const myInit = {
            body: {id: squareId},
            headers: {} 
        };

        try {
            const data = await API.post(apiName, path, myInit);
            setSquareData(data);
        } catch (err) { console.log('error creating square') }
    }

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