import { readFileSync } from "fs";

type Directory = {
  name: string;
  files: File[];
  subdirectories: Directory[];
};

type File = {
  name: string;
  size: number;
};

const data = readFileSync(__dirname + "/Input-7.txt", {
  encoding: "utf-8",
})
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const partOne = (data: string[]) => {
  const commands = data.map((line) => {
    if (line.startsWith("$")) {
      const [_, ...command] = line.split(" ");
      return command;
    }
    return line;
  });

  console.log(commands);

  const directories: Directory[] = [];

  let currentDirectory: Directory;

  commands.forEach((command) => {
    if (Array.isArray(command)) {
      if (command[0] === "cd" && command[1] !== "..") {
        if (
          currentDirectory?.subdirectories &&
          currentDirectory.subdirectories.length > 0
        ) {
          const subdirectory = currentDirectory.subdirectories?.find(
            (directory) => directory.name === command[1]
          );
          currentDirectory = subdirectory ? subdirectory : currentDirectory;
          return;
        }
        const directory = directories.find(
          (directory) => directory.name === command[1]
        );
        if (directory) {
          currentDirectory = directory;
          return;
        }

        directories.push({
          name: command[1],
          files: [],
          subdirectories: [],
        });
        currentDirectory = directories[directories.length - 1];
      } else if (command[0] === "cd" && command[1] === "..") {
        currentDirectory = directories[directories.length - 2];
      }
    }
    if (typeof command === "string") {
      if (command.startsWith("dir")) {
        if (currentDirectory.subdirectories) {
          currentDirectory.subdirectories.push({
            name: command.split(" ")[1],
            files: [],
            subdirectories: [],
          });
        } else {
          currentDirectory.subdirectories = [
            {
              name: command.split(" ")[1],
              files: [],
              subdirectories: [],
            },
          ];
        }
      } else {
        const [size, name] = command.split(" ");
        currentDirectory.files.push({
          name,
          size: Number(size),
        });
      }
    }
  });

  return filterDirectoriesWithLessThan100Mb(directories).reduce(
    (acc, val) => acc + val,
    0
  );
};

const filterDirectoriesWithLessThan100Mb = (
  directories: Directory[],
  totalSize: number | undefined = 0
): number[] => {
  const directoriesWithLessThan100Mb: number[] = [];

  directories.forEach((directory) => {
    const totalSize = directory.files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize < 100000 && totalSize > 0) {
      directoriesWithLessThan100Mb.push(totalSize);
    }
    if (directory.subdirectories) {
      const subdirectories = filterDirectoriesWithLessThan100Mb(
        directory.subdirectories,
        totalSize
      );
      directoriesWithLessThan100Mb.push(...subdirectories);
    }
  });

  return directoriesWithLessThan100Mb;
};

console.log(partOne(data));
