import React, { useState, useEffect } from "react";
import AddPlayer from "../components/addPlayer/AddPlayer";
import PlayerList from "../components/playerList/PlayerList";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { API } from 'aws-amplify'
import { Link } from 'react-router-dom';

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
        } catch (err) { console.log('error creating square') }
    }

    async function getSquare() {
        const apiName = 'v1';
        const path = '/squares?id='+squareId;

        try {
            const data = await API.get(apiName, path);
            setSquareData(data);
        } catch (err) { console.log('error getting square') }
    }


    if(!uuidValidate(squareId)) {
        setSquareId(uuidv4())
        setSquareData([{"id":squareId,"players":[]}])
    }

    return (
      <div className="mt-4 d-flex justify-content-center flex-column">
        <AddPlayer getSquare={getSquare} squareId={squareId}/>
        <PlayerList squareData={squareData} />
        <Link to={`/square/${squareId}`}>
            <button>Generate Square</button>
        </Link>
      </div>
    );
  };
  
  export default Home;