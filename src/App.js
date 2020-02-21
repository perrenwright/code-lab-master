import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import LoginButton from './LoginButton.js';
import './App.css';
import firebase from 'firebase'; 
import 'firebase/firestore';
// import AddTripButton from './add_Trip_Button';
// import AutoGrid from "./whole_Grid.js"
// import TextInput from './TextInput.js';
import SimpleMenu from './menuButton.js';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ToggleGameState from './ToggleGameState.js';
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGE_STATE} from './challenge_state_enum';
import {GRID_STATE} from './grid_state_enum';
import {RandomGrid} from './random_grid.js';
// import {firedb} from './test_firestore.js';
// import { app } from 'firebase';
import Button from "@material-ui/core/Button";
import TheGrid from './grid_Trip.js';

function App() {
  const [user, setUser] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [challengeState, setChallengeState] = useState(CHALLENGE_STATE.BEFORE);
  const [challengeGrid, setChallengeGrid] = useState([]);
  const [grridstate, setgrridstate] = useState(GRID_STATE.OFF_ALL);
  const [Obj] = useState([]);
  let grid1 = []; 
  let grid2 = [];
  let grid1s = [];
  let grid2s = [];
// Add middleware to authenticate requests
  
  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions

  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid());
      setFoundSolutions([]);
    }
  }, [gameState]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('boogle_grid').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            Obj.push(doc.data());
        });
    });
  })

  useEffect(() => {
    for(let i = 0; i < Obj.length; i++){
        for (var key of Object.keys(Obj[i])){
          console.log(Object.keys(Obj[i]));
  
            if(key === 'grid1'){
              grid1.push(Obj[i][key]); 
            }
            else if(key === 'grid2'){
              grid2.push(Obj[i][key]);
            }
        }
    }

    if (!(grid1 && grid2 && grid1[0] && grid2[0])){
      console.log("return");
      return;
    }

    const g1 = grid1[0];
    const g2 = grid2[0];

    if(!(g1 && g2)){
      return;
    }
    const SIZE = 5;
    for (let row = 0; row < SIZE; row++) {
      grid1s[row] = [];
      for (let col = 0; col < SIZE; ++col) {
        grid1s[row][col] = g1[SIZE * row + col];
        if (grid1s[row][col] === "Q") grid1s[row][col] = "Qu";
      }
    }

    if(!(grid1s)){
      return;
    }

    
    for (let row = 0; row < SIZE; row++) {
      grid2s[row] = [];
      for (let col = 0; col < SIZE; ++col) {
        grid2s[row][col] = g2[SIZE * row + col];
        if (grid2s[row][col] === "Q") grid2s[row][col] = "Qu";
      }
    }
    if(!(grid2s)){
      return;
    }
    if(!(grid1s && grid2s)){
      return;
    }
  }, [Obj, grid1, grid2, grid1s, grid2s]);

  useEffect(() => {
    if (challengeState === CHALLENGE_STATE.IN_PROGRESS && grridstate === GRID_STATE.ON_GRID_1) {
      setChallengeGrid(grid1s);
      // setFoundSolutions([]);
    }
    else if(challengeState === CHALLENGE_STATE.IN_PROGRESS && grridstate === GRID_STATE.ON_GRID_2)
    {
      setChallengeGrid(grid2s);
      // setFoundSolutions([]);
    }
    if(!(challengeGrid)){
      return;
    }
  }, [challengeState, challengeGrid]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <div>
      <LoginButton setUser={(user) => setUser(user)} />
      {user != null && <p>Welcome, {user.displayName} ({user.email})</p> }
      </div>
      <div>
      <SimpleMenu challengeState={challengeState} setChallengeState={(state) => setChallengeState(state)}
      grridstate = {grridstate} setgrridstate = {(state) => setgrridstate(state)} />
      { challengeState === CHALLENGE_STATE.IN_PROGRESS &&
        <div>
          <Board board={challengeGrid} />
        </div>
      }
      { challengeState === CHALLENGE_STATE.ENDED && 
        <div>
          <Board board={challengeGrid} />
        </div>
      }
      </div>
      <div>
      <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)} />
      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </div>
      }    
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <FoundSolutions headerText="All possible solutions" words={allSolutions} />
        </div>
      }
      </div>
    </div>
  );
}
export default App;