import React, { useState, useEffect } from "react";
import AddPlayer from "../components/addPlayer/AddPlayer";
import PlayerList from "../components/playerList/PlayerList";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { API } from 'aws-amplify'
import { useParams } from 'react-router-dom';

const Square = () => {  
    const [squareData, setSquareData] = useState([]);
    let { squareId } = useParams();

    console.log("Inside Square");

    async function getSquare() {
        const apiName = 'v1';
        const path = '/squares?id='+squareId;

        try {
            const data = await API.get(apiName, path);
            setSquareData(data);
        } catch (err) { console.log('error getting square') }
    }

    if (squareData.length < 1) {
      getSquare();
    } 

    return (
      <div className="mt-4 d-flex justify-content-center flex-column">
        <AddPlayer getSquare={getSquare} squareId={squareId}/>
        <PlayerList squareData={squareData} />
      </div>
    );
  };
  
  export default Square;