import { readFileSync } from "fs";

const data = readFileSync(__dirname + "/Input-6.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim();

const partOne = (data: string) => {
  const characters = data.split("");
  let helper = "";
  for (let i = 0; i < characters.length; i++) {
    if (new Set(helper).size === 14) {
      console.log(helper);
      return i;
    }

    if (helper.includes(characters[i])) {
      helper = characters[i];
    }

    helper += characters[i];
  }
};

const partTwo = (data: string) => {
  const checkForUniqueCharacters = (vals: string[]) => {
    const m = new Map();
    for (let val of vals) {
      if (m.has(val)) {
        return false;
      }
      m.set(val, true);
    }
    return true;
  };

  const parseInput2 = (input: string) => {
    for (let i = 13; i < input.length; i++) {
      // could have used a loop to create a map that works similar to checkForUniqueCharacters but Github copilot did this for me lol.
      let first = input[i - 13];
      let second = input[i - 12];
      let third = input[i - 11];
      let fourth = input[i - 10];
      let fifth = input[i - 9];
      let sixth = input[i - 8];
      let seventh = input[i - 7];
      let eighth = input[i - 6];
      let ninth = input[i - 5];
      let tenth = input[i - 4];
      let eleventh = input[i - 3];
      let twelfth = input[i - 2];
      let thirteenth = input[i - 1];
      let fourteenth = input[i];

      // if first, second, third, and fourth are all different characters return true
      let isUnique = checkForUniqueCharacters([
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
        seventh,
        eighth,
        ninth,
        tenth,
        eleventh,
        twelfth,
        thirteenth,
        fourteenth,
      ]);
      if (isUnique) {
        //console.log({ first, second, third, fourth });
        console.log("index: ", i + 1);
        return;
      }
    }
  };

  return parseInput2(data);
};

console.log(partOne(data));
console.log(partTwo(data));
