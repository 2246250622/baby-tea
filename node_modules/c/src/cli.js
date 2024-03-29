#!/usr/bin/env node

/**
 * c
 * https://github.com/rumpl/c
 *
 * Copyright (c) 2012 Djordje Lukic
 * Licensed under the MIT license.
 */

"use strict";
const commandFunctions = require("./commands");
const colors = require("colors/safe");

const [, , ...arg] = process.argv; //Gets command line arguments

/** Creates objects - commands - which can be called from the command line. */
class Command {
  /**
   * @param {string} shortFlag a short-form identifier for a command,
   * beginning with '-'.
   * @param {string} action a long-form identifier for a command.
   * @param {number} argCount the number of arguments the command takes.
   * @param {{ (): void; }} method the function, from the file `commands.js`,
   * which executes this commands main logic.
   * @param {{ (): void; (): never;  }} fallback a fallback function which is
   * used if the number of arguments is equal to argCount - 1.
   */
  constructor(shortFlag, action, argCount, method, fallback) {
    /** @property {string} shortFlag a short-form identifier for a command,
     * beginning with '-'. */
    this.shortFlag = shortFlag;

    /** @property {string} action a long-form identifier for a command. */
    this.action = action;

    /** @property {number} argCount the number
     * of arguments the command takes.*/
    this.argCount = argCount;

    /** @property {{ (): void; }} method the function, from the file
     * `commands.js`, which executes this commands main logic. */
    this.method = method;

    /** @property {{ (): void; (): never;  }} fallback a fallback function
     * which is used if the number of arguments is equal to argCount - 1. */
    this.fallback = fallback;
  }
}

/**An array storing all command objects.*/
const commands = [
  new Command( //Help command
    "-h",
    "help",
    1,
    () => {
      commandFunctions.help();
      process.exit(0);
    },
    () => {
      error();
      process.exit(1);
    }
  ),

  new Command( //list command
    "-l",
    "list",
    2,
    () => {
      commandFunctions.list(arg[1]);
      process.exit(0);
    },
    () => {
      commandFunctions.list(".");
      process.exit(0);
    }
  ),

  new Command( //remove command
    "-rm",
    "remove",
    2,
    () => {
      commandFunctions.delete(arg[1]);
      process.exit(0);
    },
    () => {
      error();
      process.exit(1);
    }
  ),

  new Command( //set command
    "-s",
    "set",
    3,
    () => {
      commandFunctions.set(arg[1], arg[2]);
      process.exit(0);
    },
    () => {
      error();
      process.exit(1);
    }
  ),

  new Command( //Version command
    "-v",
    "version",
    1,
    () => {
      commandFunctions.version();
      process.exit(0);
    },
    () => {
      error();
      process.exit(1);
    }
  ),
];

/*Loops through each element of `commands` to 
find what command was provided at the command line*/
for (const command of commands) {
  if (arg[0] == command.action || arg[0] == command.shortFlag) {
    switch (arg.length) {
      case command.argCount: //The number of arguments specified
        command.method();
        break;

      case command.argCount - 1: //The number of arguments specified -1
        command.fallback();
        break;

      default:
        error();
    }
  }
}

error();

/**Called if the provided command fails.
 * @returns {number} error code 1.
 */
function error() {
  console.error(colors.red("\nInvalid flag, please try the following:\n"));
  //Show how to use `c`
  commandFunctions.help();

  return 1;
}
