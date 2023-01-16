import { useState } from "react";
import "./Instruction.css";
const Instruction = ({ closeInstruction }) => {
  return (
    <div className="Instruction">
      <div>
        <div className="section-title">Reminders:</div>
        <div className="section-content">
          <ul>
            <li>If you are playing on mobile, kindly zoom out.</li>
            <li>Do not play on the Selection Map Menu.</li>
            <li>Just enjoy the game, not competitively.</li>
            <li>
              This game is easy to cheat on, but do not be pathetic to do it.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="section-title">Task</div>
        <div className="section-content">
          On each map, a list of pokemon will be given out. It is your job to
          find those pokemons. If you found them on the map, just click them and
          click their icon on the menu besides the circle where you click them.
        </div>
      </div>
      <div
        className="button-close-instruction"
        onClick={() => {
          closeInstruction();
        }}
      >
        I understand.
      </div>
    </div>
  );
};

export default Instruction;
