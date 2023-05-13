import React from "react";

const PlayerList = ({ squareData }) => {
  console.log("PlayerList: " + JSON.stringify(squareData));

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
      squareData.map((square)=>{
        const {id, players} = square;
        return players.map((player)=>{
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
      })
    }
     </tbody>
    </table>
  </div>
  );
};

export default PlayerList;