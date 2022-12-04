import { readFileSync } from "fs";

const data = readFileSync(__dirname + "/Input-4.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const partOne = data.reduce((acc, line) => {
  const [pairOne, pairTwo] = line.split(",");
  const [pairOneMin, pairOneMax] = pairOne.split("-").map(Number);
  const [pairTwoMin, pairTwoMax] = pairTwo.split("-").map(Number);

  if (pairOneMin <= pairTwoMin && pairOneMax >= pairTwoMax) {
    return acc + 1;
  }
  if (pairTwoMin <= pairOneMin && pairTwoMax >= pairOneMax) {
    return acc + 1;
  }

  return acc;
}, 0);

const partTwo = data.reduce((acc, line) => {
  const [pairOne, pairTwo] = line.split(",");
  const [pairOneMin, pairOneMax] = pairOne.split("-").map(Number);
  const [pairTwoMin, pairTwoMax] = pairTwo.split("-").map(Number);

  if (
    //10-20, 15-25
    //15-25, 10-20
    (pairOneMin <= pairTwoMin && pairOneMax >= pairTwoMin) ||
    (pairTwoMin <= pairOneMin && pairTwoMax >= pairOneMin)
  ) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(partOne);
console.log(partTwo);
