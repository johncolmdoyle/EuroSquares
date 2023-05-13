import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from 'aws-amplify'

const AddPlayer = ({ getSquare, squareId }) => {
    const [player, setPlayer] = useState("");
  
    async function addPlayerToSquare(newPlayer) {
        const apiName = 'v1';
        const path = '/squares';
        const myInit = {
            body: {
                body: newPlayer,
                queryStringParameters: {
                    id: squareId,
                },
            },
            headers: {} 
        };

        try {
            const data = await API.put(apiName, path, myInit);
            getSquare();
        } catch (err) { console.log('error adding player') }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const newPlayer = { 
        "name": player 
      };
      console.log(newPlayer);
      addPlayerToSquare(newPlayer);
      setPlayer("");
    };
  
    return (
      <div>
        <Form
          onSubmit={handleSubmit}
          className=" d-flex justify-content-center flex-column"
        >
          <Form.Group className="mb-1" controlId="formAdd">
            <Form.Label style={{
                width:"15%"
            }}>Player</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setPlayer(e.target.value)}
              value={player}
              required
            />
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
            Add
          </Button>
          </Form.Group>
        </Form>
      </div>
    );
  };
  
  export default AddPlayer;