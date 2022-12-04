import { readFileSync } from "fs";

const data = readFileSync(__dirname + "/Input-3.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map(
    (line) =>
      line.slice(0, Math.floor(line.length / 2)) +
      " " +
      line.slice(Math.floor(line.length / 2))
  );

const partOne = data
  .map((line) => {
    const [comparmentOne, comparmentTwo] = line.split(" ");
    const match = comparmentOne
      .split("")
      .filter((char) => {
        return comparmentTwo.includes(char);
      })
      .join("");

    if (match.toUpperCase() === match) {
      return match.charCodeAt(0) - 64 + 26;
    } else {
      return match.toUpperCase().charCodeAt(0) - 64;
    }
  })
  .reduce((acc, typePriority) => acc + typePriority, 0);

const partTwo = () => {
  const matches = [] as number[];

  for (let i = 0; i < data.length; i += 3) {
    const current = data[i].replace(/\s/g, "");
    const next = data[i + 1].replace(/\s/g, "");
    const nextNext = data[i + 2].replace(/\s/g, "");

    const match = current
      .split("")
      .filter((char) => {
        return next.includes(char) && nextNext.includes(char);
      })
      .join("");
    if (match.toUpperCase() === match) {
      matches.push(match.charCodeAt(0) - 64 + 26);
    } else {
      matches.push(match.toUpperCase().charCodeAt(0) - 64);
    }
  }

  return matches.reduce((acc, typePriority) => acc + typePriority, 0);
};

console.log(partOne);
console.log(partTwo());
