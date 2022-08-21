const { spawn } = require('child_process');
const ls = spawn('docker', ['exec', '-it', '9a802d2d0b68', '/bin/bash']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});