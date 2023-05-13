import React from "react";

const PlayerList = ({ squareData }) => {
  console.log("PlayerList: " + JSON.stringify(squareData));

  return (
    <div>
    {
      squareData.map((square)=>{
        const {id, players} = square;
        console.log("Players: " + players)
        return players.map((player)=>{
          console.log("Player: " + player)
          return (
            <div
              key={player}
              className="tasklist mt-2 d-flex justify-content-between p-2 rounded-2"
            >
              <div>
                <h4>{player}</h4>
              </div>
            </div>
          )
        })
      })
    }
  </div>
  );
};

export default PlayerList;