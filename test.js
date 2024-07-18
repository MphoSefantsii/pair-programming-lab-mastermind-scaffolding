const { exec } = require("child_process");

exec("node mastermind.js 1492 5 2013 1865 1234 4321 7491", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  console.log("Example 1 Output:");
  console.log(stdout.trim());
});

