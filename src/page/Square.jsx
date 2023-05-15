import React, { useState } from "react";
import PlayerSquare from "../components/playerSquare/PlayerSquare";
import PlayerList from "../components/playerList/PlayerList";
import { API } from 'aws-amplify'
import { useParams } from 'react-router-dom';

const Square = () => {  
    const [squareData, setSquareData] = useState([]);
    const [bandData, setBandData] = useState([]);
    let { squareId } = useParams();

    async function getSquare() {
        const apiName = 'v1';
        const path = '/squares?id='+squareId;

        try {
            const data = await API.get(apiName, path);
            setSquareData(data);
        } catch (err) { console.log('error getting square') }
    }

    async function getBands() {
      const apiName = 'v1';
      const path = '/bands';

      try {
          const data = await API.get(apiName, path);
          setBandData(data);
      } catch (err) { console.log('error gettings bands') }
  }

    if (squareData.length < 1) {
      getSquare();
    } 

    if (bandData.length < 1) {
      getBands();
    } 

    return (
      <div className="mt-4 d-flex justify-content-center flex-column">
        <PlayerList getSquare={getSquare} squareData={squareData} bandData={bandData} />
        <hr />
        <PlayerSquare squareData={squareData} bandData={bandData} />
      </div>
    );
  };
  
  export default Square;