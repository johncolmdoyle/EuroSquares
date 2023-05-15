import React from "react";
import Button from "react-bootstrap/Button";
import { API } from 'aws-amplify'
import Form from "react-bootstrap/Form";
const PlayerList = ({ getSquare, squareData, bandData }) => {
  async function postScore() {
    const apiName = 'v1';
    const path = '/score';
    const myInit = {
        body: {},
        headers: {} 
    };

    try {
        await API.post(apiName, path, myInit);
        getSquare();
    } catch (err) { console.log('error calculating scores') }
}

const handleSubmit = (e) => {
  e.preventDefault();
  postScore();
};


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
        <Form
          onSubmit={handleSubmit}
          className=" d-flex justify-content-center flex-column"
        >
          <Form.Group className="mb-1" controlId="formAdd">
            <Button
            style={{
              backgroundColor: "rgb(192 199 224) ",
              color: "white",
              width: "30%",
              textAlign: "center",
            }}
            className="m-auto"
            variant=" btn-lg"
            type="submit"
          >
            Update Scores
          </Button>
          </Form.Group>
        </Form>
      </div>
    );
  } 
  
  return (
    <div> </div>
  );
};

export default PlayerList;