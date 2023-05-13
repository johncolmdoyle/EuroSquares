import React from "react";

const PlayerList = ({ squareData, bandData }) => {

  if (squareData != null && squareData.length > 0 && squareData[0].hasOwnProperty('players')) {
    let players = squareData[0].players;

    return (
      <div>
        <table>
          <thead>
        <tr>
          <td><b>Player Name</b></td>
          <td><b>Score</b></td>
        </tr>
        </thead>
        <tbody>
        {
          players.map((player)=>{
              return (
                <tr
                  key={player.name}
                  className="row mt-2 d-flex justify-content-between p-2 rounded-2"
                >
                  <td className="col-sm">{player.name}</td>
                  <td className="col-sm">{player.score ? player.score : 0}</td>
                </tr>
              )
            })
        }
        </tbody>
        </table>
      </div>
    );
  } 
  
  return (
    <div> </div>
  );
};

export default PlayerList;