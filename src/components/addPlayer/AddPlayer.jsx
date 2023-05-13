import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddPlayer = ({ getSquare, squareId }) => {
    const [player, setPlayer] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newPlayer = { player, squareId };
      console.log(newPlayer);
      addNewPlayer(newPlayer);
      setPlayer("");
    };
  
    const addNewPlayer = async (newPlayer) => {
      try {
        // add player
      } catch (error) {
        console.log(error);
      }
      getSquare();
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