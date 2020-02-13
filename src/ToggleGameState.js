import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import './ToggleGameState.css';

function ToggleGameState({gameState, setGameState}) {

  const [buttonText, setButtonText] = useState("Start a new game!");

  function updateGameState() {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  }

  return (
    <div className="Toggle-game-state">
      <Button onClick={() => updateGameState()} >
        {buttonText}
      </Button>
    </div>
  );
}

export default ToggleGameState;