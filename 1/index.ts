import { readFileSync } from "fs";

const calories = readFileSync(__dirname + "/Input-1.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => Number(line))
  .reduce(
    (acc, cur) => {
      if (cur > 0) {
        acc[acc.length - 1] = acc[acc.length - 1] + cur;
      } else {
        acc.push(0);
      }
      return acc;
    },
    [0]
  )
  .sort((a, b) => b - a);

const getTopCalories = (calories: number[], top: number) => {
  const topCalories = calories.slice(0, top);
  const totalCalories = topCalories.reduce((acc, cur) => acc + cur, 0);
  return totalCalories;
};

console.log(calories[0]); // The highest number of calories
console.log(getTopCalories(calories, 3)); // The highest number of calories in the top 3
