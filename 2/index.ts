import { readFileSync } from "fs";

const aux = {
  A: 1,
  B: 2,
  C: 3,
  Y: 2,
  X: 1,
  Z: 3,
};

const data = readFileSync(__dirname + "/Input-2.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const partOne = data.reduce((acc, line) => {
  const [rival, player] = line.split(" ") as [
    keyof typeof aux,
    keyof typeof aux
  ];
  let playerScore = 0;
  if (
    (aux[rival] < aux[player] && aux[rival] - aux[player] !== -2) ||
    (aux[rival] === 3 && aux[player] === 1)
  ) {
    playerScore += aux[player] + 6;
    return acc + playerScore;
  }
  if (aux[rival] === aux[player]) {
    playerScore += aux[player] + 3;
    return acc + playerScore;
  }

  playerScore += aux[player];
  return acc + playerScore;
}, 0);

const generateScore = (instruction: string, rivalScore: number): number => {
  if (instruction === "Z" && rivalScore === 1) {
    return 8;
  }
  if (instruction === "Z" && rivalScore === 2) {
    return 9;
  }
  if (instruction === "Z" && rivalScore === 3) {
    return 7;
  }

  if (instruction === "Y") {
    return rivalScore + 3;
  }

  if (instruction === "X" && rivalScore === 1) {
    return 3;
  }
  if (instruction === "X" && rivalScore === 2) {
    return 1;
  }
  if (instruction === "X" && rivalScore === 3) {
    return 2;
  }

  return 0;
};

const partTwo = data.reduce((acc, line) => {
  const [rival, player] = line.split(" ") as [
    keyof typeof aux,
    keyof typeof aux
  ];
  const roundScore = generateScore(player, aux[rival]);
  return acc + roundScore;
}, 0);

console.log(partOne);
console.log(partTwo);
