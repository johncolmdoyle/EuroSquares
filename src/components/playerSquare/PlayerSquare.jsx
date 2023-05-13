import React from "react";
import SquareCountry from "../squareCountry/SquareCountry";

const PlayerSquare = ({ squareData, bandData}) => {
  return (
    <div>
      <table>
        <tbody>
            <tr>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={1} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={2} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={3} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={4} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={5} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={6} /></td>
            </tr>
            <tr>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={7} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={8} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={9} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={10} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={11} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={12} /></td>
            </tr>
            <tr>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={13} /></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={14} /></td>
            </tr>
            <tr>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={15} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={16} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={17} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={18} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={19} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={20} /></td>
            </tr>
            <tr>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={21} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={22} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={23} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={24} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={25} /></td>
                <td><SquareCountry squareData={squareData} bandData={bandData} id={26} /></td>
            </tr>
        </tbody>
    </table>
  </div>
  );
};

export default PlayerSquare;