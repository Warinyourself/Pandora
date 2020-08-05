import is from 'electron-is'

function getCommandOutput(): HTMLElement { return document.getElementById("command-output") as HTMLElement  }
function appendOutput(msg: string) { 
  console.log({ msg })
  // getCommandOutput().value += (msg+'\n');
}

function setStatus(msg: string) {
  console.log({ msg })
  // getStatus().innerHTML = msg
}


function showOS() {
  if (is.windows())
    appendOutput("Windows Detected.")
  if (is.macOS())
    appendOutput("Apple OS Detected.")
  if (is.linux())
    appendOutput("Linux Detected.")
}

export function backgroundProcess({ command, attrs }: { command: string, attrs: string[] }) {
  console.log(`Start command: ${command} ${attrs.join(' ')}`)
  const childProcess = require('child_process');

  showOS();

  // const pathImage = '~/Pictures/3d_letter_v_lg.jpg'.replace('~', `/home/${process.env.USER}`)
  const child = childProcess.spawn(command, attrs); 
  // const child = process.spawn('./test.sh'); 

  child.on('error', function(err: any) {
    console.log(`Get error ${Buffer.from(err, 'utf8')}`)
  });

  child.stdout.on('data', function (data: any) {
    console.log(`Get data ${Buffer.from(data, 'utf8')}`)
  });

  child.stderr.on('data', function (data: any) {
    console.log(`Get error ${Buffer.from(data, 'utf8')}`)
  });

  child.on('close', function (code: any) {
      if (code == 0) {
        setStatus('child process complete.');
      }
      else {
        setStatus('child process exited with code ' + code);
      }
  });
}