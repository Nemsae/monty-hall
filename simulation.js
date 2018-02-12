var fs = require('fs');
const { createCanvas } = require('canvas');
const canvas = createCanvas(300, 300);
const ctx = canvas.getContext('2d');

//  NOTE: Monty Hall Problem
//  1. Generate the game set
//  2. User picks one door
//  3. Host picks (and "shows") one door
//  4. User either swithces or stays.
//  5. Write results to "/results.jpg"

function runMontyHall(games) {
  const totalGamesPlayed = games;
  let switchWins = 0;
  let stayWins = 0;

  while (games > 0) {
    //  1. Generate the game set
    const { doors, carInd } = generateGame();

    //  2. User picks one door
    const userChoice = userChooses();

    //  3. Host picks (and "shows") one door
    const hostChoice = hostChooses(doors, carInd, userChoice);

    //  4. User either switches or stays.
    const userSwitchedChoice = userSwitches(hostChoice, userChoice);

    if (userSwitchedChoice === carInd) switchWins++;
    if (userChoice === carInd) stayWins++;

    games--;
  }

  const switchWinsPecentage = (switchWins/totalGamesPlayed * 100).toFixed(2);
  const stayWinsPecentage = (stayWins/totalGamesPlayed * 100).toFixed(2);

  // 5. Write results to "/results.jpg"
  writeToJPG(totalGamesPlayed, switchWins, stayWins, switchWinsPecentage, stayWinsPecentage);
}

//  NOTE: generateGame() creates an Array 'doors', generates the door index that will be the car,
//        fills the rest of the array with goats, and returns the doors[] along with car door/index
function generateGame() {
  const doors = [];
  const carInd = Math.floor(Math.random() * 3);
  doors[carInd] = 1;

  for (let i = 0; i < 3; i++) {
    let door = doors[i];
    if (door === undefined) {
      doors[i] = 0;
    }
  }

  return {
    doors,
    carInd,
  }
}

//  NOTE: userChooses() returns a random number that will be the index corresponding to the door the user chooses
function userChooses() {
  return Math.floor(Math.random() * 3)
}

//  NOTE: hostChooses() returns the index (door) that the host will choose, dependent on `usersChoice`
function hostChooses(doors, carInd, userChoice) {
  if (userChoice === carInd) {
    //  User chooses the correct door, host picks (randomly) one of the other two doors.
    let hostChoices = [];
    for (let i = 0; i < 3; i++) {
      if (i === userChoice) continue;
      hostChoices.push(i);
    }
    return hostChoices[Math.floor(Math.random() * 2)];
  } else {
    //  User chooses the incorrect door, therefore the other two has the car. Default to the other (unpicked) goat.
    for (let i = 0; i < 3; i++) {
      if (i === userChoice) continue;
      if (!doors[i]) return i;
    }
  }
}

//  NOTE: userSwitches() chooses a door which is not the user's original choice, `userChoice`, nor the host's choice, `hostChoice`.
function userSwitches(hostChoice, userChoice) {
  return 3 - (hostChoice + userChoice);
}

//  NOTE: writeToJPGO() writes text to jpg file, "results.jpg"
function writeToJPG(totalGamesPlayed, switchWins, stayWins, switchWinsPecentage, stayWinsPecentage) {
  ctx.font = '22px Impact'
  ctx.fillText('Monty Hall Simulation ', 0, 40);
  ctx.font = '10px Impact'
  ctx.fillText(`Ran on ${new Date}`, 0, 60);
  ctx.font = '16px Impact'
  ctx.fillText('Results: ', 0, 100);
  ctx.font = '12px Impact'
  ctx.fillText(`Total amount of games played: ${totalGamesPlayed}.`, 0, 120);
  ctx.fillText(`Total amount of switch wins: ${switchWins}.`, 0, 140);
  ctx.fillText(`Total amount of stay wins: ${stayWins}.`, 0, 160);
  ctx.fillText(`Switch win percentage: ${switchWinsPecentage}%.`, 0, 180);
  ctx.fillText(`Stay win percentage: ${stayWinsPecentage}%.`, 0, 200);
  fs.writeFile('results.jpg', canvas.toBuffer());
}

runMontyHall(10000);
