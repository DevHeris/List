const fs = require("fs");

// This is a function
fs.readdir(process.cwd(), (err, filenames) => {
  // EITHER
  // err === an error object, which means something went wrong
  // OR
  // err === null, which means everything is OK

  if (err) {
    // error handling code if there is an error and everything is not okay
    console.log(err);
    // throw new Error(err);
  }
  console.log(filenames);
});
