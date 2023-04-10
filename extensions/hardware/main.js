import minimist from 'minimist';
import ws from 'websocket';
import { randomUUID as uuidv4 } from 'crypto';
import chalk from 'chalk';
import si from 'systeminformation';

// Obtain required params to start a WS connection from CLI args.
const argv = minimist(process.argv.slice(2));
const NL_PORT = argv['nl-port'];
const NL_TOKEN = argv['nl-token'];
const NL_EXTID = argv['nl-extension-id'];

const WS = ws.w3cwebsocket;
let client = new WS(`ws://localhost:${NL_PORT}?extensionId=${NL_EXTID}`);

async function getHardwareInfo() {
  const hw = await Promise.all([
    si.system(),
    si.bios(),
    si.baseboard(),
    si.chassis(),
    si.cpu(),
    si.mem(),
    si.memLayout(),
    si.graphics(),
    si.osInfo(),
    si.diskLayout(),
  ])

  return {
    system: hw[0],
    bios: hw[1],
    baseboard: hw[2],
    chassis: hw[3],
    cpu: hw[4],
    mem: hw[5],
    memLayout: hw[6],
    graphics: hw[7],
    osInfo: hw[8],
    diskLayout: hw[9],
  }
}

client.onerror = function() {
    log('Connection error!', 'ERROR');
};

client.onopen = function() {
    log('Connected');
};

client.onclose = function() {
    log('Connection closed');
    // Make sure to exit the extension process when WS extension is closed (when Neutralino app exits)
    process.exit();
};

client.onmessage = function(e) {
  //log('Received websocket message')

    if(typeof e.data === 'string') {
        let message = JSON.parse(e.data);

        // Use extensions.dispatch or extensions.broadcast from the app,
        // to send an event here
        switch(message.event) {
            case 'eventToExtension':
                log(message.data);
                // Use Neutralinojs server's messaging protocol to trigger native API functions
                // Use app.broadcast method to send an event to all app instances
                client.send(JSON.stringify({
                    id: uuidv4(),
                    method: 'app.broadcast',
                    accessToken: NL_TOKEN,
                    data: {
                        event: 'eventFromExtension',
                        data: 'Hello app!'
                    }
                }));
                break;
            case 'getHardwareInfo':
              log('Received "getHardwareInfo" message')

              log('Sending back hardware info...')
              getHardwareInfo().then((hardwareInfo) => 
                client.send(JSON.stringify({
                  id: uuidv4(),
                  method: 'app.broadcast',
                  accessToken: NL_TOKEN,
                  data: {
                      event: 'hardwareInfoEvent',
                      data: hardwareInfo
                  }
                }))
              )
              break;
        }
    }
};

// Always good to log some useful things from extension
// You also can write to neutralinojs.log by calling debug.log
// But, don't try to manipulate the log file directly via the extension process.
function log(message, type = 'INFO') {
    let logLine = `[${NL_EXTID}]: `;
    switch(type) {
        case 'INFO':
            logLine += chalk.green(type);
            logLine += ' ' + message;
            console.log(logLine);
            break;
        case 'ERROR':
            logLine += chalk.red(type);
            logLine += ' ' + message;
            console.error(logLine);
            break;
    }
}