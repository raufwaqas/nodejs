const { appendFile, readFile, writeFile } = require("fs");
const { promisify } = require("util");

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_FILE = "todo.json";

async function main() {
  const [, , cmd, ...argm] = process.argv;

  switch (cmd) {
    case "add": {
      const data = await readFileWithPromise(TODO_FILE, "utf8").catch(
        () => "[]"
      );
      const toDoList = JSON.parse(data);
      const newTodo = argm.join(" ");
      toDoList.push(newTodo);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(toDoList));
      break;
    }
    case "list": {
      const data = await readFileWithPromise(TODO_FILE, "utf8").catch(
        () => "[]"
      );
      const toDoList = JSON.parse(data);
      console.info(toDoList);
      break;
    }
    case "reset": {
      await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
      const data = await readFileWithPromise(TODO_FILE, "utf8").catch(
        () => "[]"
      );
      const toDoList = JSON.parse(data);
      console.info("To-dos:", toDoList);
      break;
    }
    case "remove": {
      const data = await readFileWithPromise(TODO_FILE, "utf8").catch(
        () => "[]"
      );
      const toDoList = JSON.parse(data);
      const value = argm - 1;
      if (typeof value === "number") {
        if (value > -1) {
          toDoList.splice(value, 1);
          await writeFileWithPromise(TODO_FILE, JSON.stringify(toDoList));
        } else if (value < 0 || value == null) {
          console.info("Type a number after the command ");
        }
      }
      break;
    }
    case "update": {
      const data = await readFileWithPromise(TODO_FILE, "utf8").catch(
        () => "[]"
      );
      const toDoList = JSON.parse(data);
      const value = argm[0] - 1;
      toDoList.splice(value, 1, argm[1]);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(toDoList));
      break;
    }
    case "help":
    default:
      console.info(`\n      Featured help :\n
      To Add / Remove / View / Update / Reset the data simply type 'node index.js 'add' anything  :\n 
            list : Shows/View current to-dos .\n
            add : Add a to-do item. .\n
            reset : Removes all to-do items from the list .\n
            remove: Removes single item from to -do list by using number from 1 - ∞ index.\n
            update : Updates a to-do item with new text: \n`);
      break;
  }
}

main();
