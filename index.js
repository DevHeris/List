#!/usr/bin/env node

// const fs = require("fs");
import fs from "fs";
// const util = require("util");
import utils from "util";
import chalk from "chalk";

// ================== CALLBACK ERROR HANDLING

// // This is a function
// fs.readdir(process.cwd(), (err, filenames) => {
//   // EITHER
//   // err === an error object, which means something went wrong
//   // OR
//   // err === null, which means everything is OK

//   if (err) {
//     // error handling code if there is an error and everything is not okay
//     console.log(err);
//     // throw new Error(err);
//   }
// });

// -------------------------------------------------
// =================== WORKING WITH lstat() FUNCTION
// -------------------------------------------------

//   -------------------------SOLUTION #1 - Callback based solution
// fs.readdir(process.cwd(), (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

//   const allStats = Array(filenames.length).fill(null);

//   for (let filename of filenames) {
//     const index = filenames.indexOf(filename);

//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         console.log(err);
//       }

//       allStats[index] = stats;

//       const ready = allStats.every((stats) => {
//         return stats;
//       });

//       if (ready) {
//         allStats.forEach((stats, index) => {
//           console.log(filenames[index], stats.isFile());
//         });
//       }
//     });
//   }
// });

//   -------------------------SOLUTION #2 - Callback based functions using Promises

// This stats implememtaion method isn't the best option just like the Solution 1 also isn't the best. The best is the solution #3 which you will see after this solution

// fs.readdir(process.cwd(), async (err, filenames) => {
//   if (err) console.log(err);

//   for (const filename of filenames) {
//     try {
//       const stats = await lstat(filename);
//       console.log(filename, stats.isFile());
//     } catch (error) {
//       error;
//     }
//   }
// });

// METHOD #1 OF WRAPPING lsat() INSIDE A PROMISE

// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) reject(err);
//       resolve(stats);
//     });
//   });
// };

// METHOD #2 OF WRAPPING lsat() INSIDE A PROMISE - (Promisify Function automatically) - Using a module called "Utils"

// const lstat = util.promisify(fs.lstat);

// METHOD #3 OF WRAPPING lsat() INSIDE A PROMISE
const { lstat } = fs.promises;

//   -------------------------SOLUTION #3 - wrap the lstat call with a promise, use async/await + the Promise.all helper method to process lstat calls all at once

// Kind of a combination of method 1 and 2

// THE RIGHT WAY
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) console.log(err);

  const statPromises = filenames.map((filename) => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromises);

  for (const stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.blue(filenames[index]));
    } else {
      console.log(chalk.red(filenames[index]) + "/");
    }
  }
});
