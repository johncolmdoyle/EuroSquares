import React from "react";

const SquareCountry = ({ squareData, bandData, id }) => {
    
    if (squareData !== [] && squareData.length > 0 && squareData[0].hasOwnProperty('players')){
        let players = squareData[0].players;
        let countryPlayer = {};
        let countryBand = {};

        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[i].countries.length; j++) {
                if (players[i].countries[j] === id) {
                    countryPlayer = players[i];
                }
            }
        }

        for (let i = 0; i < bandData.length; i++) {
            if (Number(bandData[i].id)=== id) {
                countryBand = bandData[i];
            }
        }
        return (
            <div className="square"
            style={{
                background: `center no-repeat url("/flags/${countryBand.flag}")`,
                
            }}>
            <div style={{
                padding: "20",
                background: "#FFF",
                opacity: 0.5,
                color: "#000"
            }}>
                <div>Player: {countryPlayer.name}</div>
                <div>Country: {countryBand.country}</div>
                <div>Points: {countryBand.score?countryBand.score:0}</div>
            </div>
            </div>
        );
    }
  
};

export default SquareCountry;