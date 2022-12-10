import { readFileSync } from "fs";

type Movements = {
  quantity: number;
  from: number;
  to: number;
};

const data = readFileSync(__dirname + "/Input-5.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const inicialCargo = {
  "1": ["R", "N", "P", "G"],
  "2": ["T", "J", "B", "L", "C", "S", "V", "H"],
  "3": ["T", "D", "B", "M", "N", "L"],
  "4": ["R", "V", "P", "S", "B"],
  "5": ["G", "C", "Q", "S", "W", "M", "V", "H"],
  "6": ["W", "Q", "S", "C", "D", "B", "J"],
  "7": ["F", "Q", "L"],
  "8": ["W", "M", "H", "T", "D", "L", "F", "V"],
  "9": ["L", "P", "B", "V", "M", "J", "F"],
};

const partOne = (data: string[]) => {
  const inicialCargo = {
    "1": ["R", "N", "P", "G"],
    "2": ["T", "J", "B", "L", "C", "S", "V", "H"],
    "3": ["T", "D", "B", "M", "N", "L"],
    "4": ["R", "V", "P", "S", "B"],
    "5": ["G", "C", "Q", "S", "W", "M", "V", "H"],
    "6": ["W", "Q", "S", "C", "D", "B", "J"],
    "7": ["F", "Q", "L"],
    "8": ["W", "M", "H", "T", "D", "L", "F", "V"],
    "9": ["L", "P", "B", "V", "M", "J", "F"],
  };
  const movements: Movements[] = data.reduce(
    (acc, line) => {
      const movements = line
        .split("")
        .filter((char) => !isNaN(Number(char)) && char !== " ")
        .map((char) => Number(char));

      if (movements.length > 3) {
        let quantity: string | number = "" + movements[0] + movements[1];
        quantity = Number(quantity);
        const from = movements[2];
        const to = movements[3];
        acc.push({ quantity, from, to });
      } else {
        const quantity = movements[0];
        const from = movements[1];
        const to = movements[2];
        acc.push({ quantity, from, to });
      }
      return acc;
    },

    [] as Movements[]
  );

  const cargo = movements.reduce((acc, movement) => {
    const { quantity, from, to } = movement;
    acc = movingCargo(acc, quantity, `${from}` as any, `${to}` as any);

    return acc;
  }, inicialCargo);

  function movingCargo(
    cargo: typeof inicialCargo,
    quantity: number,
    from: keyof typeof inicialCargo,
    to: keyof typeof inicialCargo
  ) {
    const fromCargo = cargo[from];
    const toCargo = cargo[to];
    while (quantity > 0) {
      const item = fromCargo.pop();
      toCargo.push(item as string);
      quantity--;
    }

    return cargo;
  }

  const result = Object.values(cargo).reduce((acc, value) => {
    acc += value[value.length - 1];
    return acc;
  }, "");

  return result;
};

const partTwo = (data: string[]) => {
  const inicialCargo = {
    "1": ["R", "N", "P", "G"],
    "2": ["T", "J", "B", "L", "C", "S", "V", "H"],
    "3": ["T", "D", "B", "M", "N", "L"],
    "4": ["R", "V", "P", "S", "B"],
    "5": ["G", "C", "Q", "S", "W", "M", "V", "H"],
    "6": ["W", "Q", "S", "C", "D", "B", "J"],
    "7": ["F", "Q", "L"],
    "8": ["W", "M", "H", "T", "D", "L", "F", "V"],
    "9": ["L", "P", "B", "V", "M", "J", "F"],
  };

  const movements: Movements[] = data.reduce(
    (acc, line) => {
      const movements = line
        .split("")
        .filter((char) => !isNaN(Number(char)) && char !== " ")
        .map((char) => Number(char));

      if (movements.length > 3) {
        let quantity: string | number = "" + movements[0] + movements[1];
        quantity = Number(quantity);
        const from = movements[2];
        const to = movements[3];
        acc.push({ quantity, from, to });
      } else {
        const quantity = movements[0];
        const from = movements[1];
        const to = movements[2];
        acc.push({ quantity, from, to });
      }
      return acc;
    },

    [] as Movements[]
  );

  const cargo = movements.reduce((acc, movement) => {
    const { quantity, from, to } = movement;
    acc = movingCargo(acc, quantity, `${from}` as any, `${to}` as any);

    return acc;
  }, inicialCargo);

  function movingCargo(
    cargo: typeof inicialCargo,
    quantity: number,
    from: keyof typeof inicialCargo,
    to: keyof typeof inicialCargo
  ) {
    const fromCargo = cargo[from];
    const toCargo = cargo[to];
    while (quantity > 0) {
      if (quantity > 1 && quantity <= fromCargo.length) {
        const items = fromCargo.splice(fromCargo.length - quantity);
        toCargo.push(...items);
        quantity = 0;
      } else {
        const item = fromCargo.pop();
        toCargo.push(item as string);
        quantity--;
      }
    }

    return cargo;
  }

  const result = Object.values(cargo).reduce((acc, value) => {
    acc += value[value.length - 1];
    return acc;
  }, "");

  return result;
};

console.log(partOne(data));
console.log(partTwo(data));
