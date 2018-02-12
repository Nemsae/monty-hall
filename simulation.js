//  NOTE: Run 10,000 times
//  NOTE: results.jpg

//  1. Generate the game set
//  2. User picks one door
//  3. Host picks (and shows) one door
//  4. User either swithces or stays.
//  5. Record result

let games = 10;

while (games > 0) {
  const { doors, carInd } = generateGame();
  // console.log('doors: ', doors);
  // console.log('carInd: ', carInd);

  //  2. User picks one door
  //  Contestant picks random number (index)
  const userChoice = Math.floor(Math.random() * 3);
  //  [1, 0, 0]
  //      U

  //  3. Host picks (and shows) one door
  const hostChoice = ;
  //  did contestant pick the car? if so that leaves the other two as goats.
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
    hostChoice = hostChoices[Math.floor(Math.random() * 2)];
  } else {
    //  [1, 0, 0]
    //      U  H
    //  door is incorrect, therefore the other two has the car. Default to the other (unpicked) goat

    // console.log('Sanity:USER is WRONG ', userChoice);
    // console.log('doors: ', doors);
    // console.log('carInd: ', carInd);

    for (let i = 0; i < 3; i++) {
      if (i === userChoice) continue;
      if (!doors[i]) hostChoice = i;
    }
  }
  // console.log('hostChoice: ', hostChoice);

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

function hostChooses() {

}
