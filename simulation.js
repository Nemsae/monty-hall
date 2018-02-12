//  NOTE: Monty Hall Problem
//  1. Generate the game set
//  2. User picks one door
//  3. Host picks (and "shows") one door
//  4. User either swithces or stays.
//  5. Return results

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

  console.log('runMontyHall totalGamesPlayed: ', totalGamesPlayed);
  console.log('runMontyHall switchWins: ', switchWins);
  console.log('runMontyHall stayWins: ', stayWins);

  console.log(`switch win percentage: ${switchWins/totalGamesPlayed * 100}%`);
  console.log(`stay win percentage: ${stayWins/totalGamesPlayed * 100}%`);
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

//  NOTE: User chooses a door which is not the user's original choice, `userChoice`, nor the host's choice, `hostChoice`.
function userSwitches(hostChoice, userChoice) {
  return 3 - (hostChoice + userChoice);
}

runMontyHall(10000);
