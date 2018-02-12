//  NOTE: Run 10,000 times
//  NOTE: results.jpg

//  1. Generate the game set
//  2. User picks one door
//  3. Host picks (and shows) one door
//  4. User either swithces or stays.
//  5. Record result

let games = 5;

while (games > 0) {
  //  1. Generate the game set
  const { doors, carInd } = generateGame();
  console.log(games, 'doors: ', doors);
  console.log(games, 'carInd: ', carInd);

  //  2. User picks one door
  const userChoice = userChooses();
  console.log(games, 'userChoice: ', userChoice);

  //  3. Host picks (and shows) one door
  const hostChoice = hostChooses(doors, carInd, userChoice);
  console.log(games, 'hostChoice: ', hostChoice);

  //  4. User either swithces or stays.


  games--;
}

//  1. Generate the game set
function generateGame() {
  //  random number from 1 - 3 ===> is the index of the Car.
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

//  2. User picks one door
function userChooses() {
  return Math.floor(Math.random() * 3)
}

//  3. Host picks (and shows) one door
function hostChooses(doors, carInd, userChoice) {
  if (userChoice === carInd) {
    // the door is correct, host picks (randomly) one of the other two doors.
    // console.log('Sanity:USER is CORRECT');
    // console.log('doors: ', doors);
    // console.log('carInd: ', carInd);
    // console.log('userChoice: ', userChoice);

    let hostChoices = [];
    for (let i = 0; i < 3; i++) {
      if (i === userChoice) continue;
      hostChoices.push(i);
    }
    return hostChoices[Math.floor(Math.random() * 2)];
  } else {
    //  [1, 0, 0]
    //      U  H
    //  door is incorrect, therefore the other two has the car. Default to the other (unpicked) goat

    // console.log('Sanity:USER is WRONG ', userChoice);
    // console.log('doors: ', doors);
    // console.log('carInd: ', carInd);

    for (let i = 0; i < 3; i++) {
      if (i === userChoice) continue;
      if (!doors[i]) return i;
    }
  }
}
