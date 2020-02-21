import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {CHALLENGE_STATE} from './challenge_state_enum';
import {GRID_STATE} from './grid_state_enum'; 

export default function SimpleMenu({challengeState, setChallengeState, grridstate, setgrridstate}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buttonText, setButtonText] = useState("Start a new game!");

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function updateChallengeState(grid) {
    if (challengeState === CHALLENGE_STATE.BEFORE || challengeState === CHALLENGE_STATE.ENDED) {
      setChallengeState(CHALLENGE_STATE.IN_PROGRESS);
      if(grridstate === GRID_STATE.OFF_ALL && grid === "grid1")
      {
        setgrridstate(GRID_STATE.ON_GRID_1);
      }
      else if(grridstate === GRID_STATE.OFF_GRID_1 && grid === "grid1")
      {
        setgrridstate(GRID_STATE.ON_GRID_1);
      }
      else if(grridstate === GRID_STATE.OFF_ALL && grid === "grid2")
      {
        setgrridstate(GRID_STATE.ON_GRID_2);
      }
      else if(grridstate === GRID_STATE.OFF_GRID_2 && grid === "grid2")
      {
        setgrridstate(GRID_STATE.ON_GRID_2);
      }
      setButtonText("End game");
    } 
    else if (challengeState === CHALLENGE_STATE.IN_PROGRESS) {
      setChallengeState(CHALLENGE_STATE.ENDED);
      setButtonText("Start a new game!");
      if(grridstate === GRID_STATE.ON_GRID_2 && grid === "grid2")
      {
        setgrridstate(GRID_STATE.OFF_GRID_2);
      }
      else if(grridstate === GRID_STATE.ON_GRID_1 && grid === "grid1")
      {
        setgrridstate(GRID_STATE.OFF_GRID_1);
      }
    }
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="primary">
        Change Challenge
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {updateChallengeState("grid1"); handleClose();}} {...buttonText}>Challenge 1</MenuItem>
        <MenuItem onClick={() => {updateChallengeState("grid2"); handleClose();}} {...buttonText}>Challenge 2</MenuItem>
      </Menu>
    </div>
  );
}
