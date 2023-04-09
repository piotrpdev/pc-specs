import Fa from 'solid-fa'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { createSignal, createResource } from "solid-js";

import styles from './App.module.css';

const getSpecs = async () => {
  const nc = Neutralino.computer
  
  const specs = await Promise.all([
    nc.getArch(),
    nc.getOSInfo(),
    nc.getCPUInfo(),
    nc.getMemoryInfo(),
    nc.getKernelInfo(),
    nc.getDisplays()
  ])

  return {
    arch: specs[0],
    os: specs[1],
    cpu: specs[2],
    memory: specs[3],
    kernel: specs[4],
    displays: specs[5]
  }
}

const handleSaveDialog = (specs) => {
  Neutralino?.os.showSaveDialog('Save Specs', {
    defaultPath: `specs-${safeDate}.json`,
    filters: [
        {name: 'JSON', extensions: ['json']}
    ]
  }).then((filePath) => {
    Neutralino?.filesystem.writeFile(filePath, JSON.stringify(specs(), null, 2));
  }).catch((err) => {
    console.warn(err);
  });
};

const safeDate = (new Date()).toISOString().replaceAll(/[:.]/g, '-')

function App() {
  const [specs] = createResource(getSpecs);

  return (
    <div class={styles.App}>
        {
          specs.loading ? <span>"Loading..."</span> : 
            <table class="pure-table">
              <thead>
                  <tr>
                      <th colSpan={2}>Specs</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Architecture</td>
                      <td>{specs().arch}</td>
                  </tr>
                  <tr>
                      <td>OS</td>
                      <td>{specs().os.description}</td>
                  </tr>
                  <tr>
                      <td>CPU</td>
                      <td>{specs().cpu.model.trim()} {(specs().cpu.frequency / 1e9).toFixed(2)}GHz</td>
                  </tr>
                  <tr>
                      <td>Memory</td>
                      <td>{(specs().memory.physical.total / 1e9).toFixed(0)}GB</td>
                  </tr>
                  <tr>
                      <td>Kernel</td>
                      <td>{specs().kernel.variant} {specs().kernel.version}</td>
                  </tr>
                  <tr>
                      <td>Displays</td>
                      <td>{specs().displays.map((d) => `${d.resolution.width}x${d.resolution.height}@${d.refreshRate}`).join(", ")}</td>
                  </tr>
              </tbody>
          </table>
        }
        <div class={`pure-button-group ${styles.buttons}`} role="group">
          <button class='pure-button pure-button-primary button-xlarge' type='button' onClick={() => handleSaveDialog(specs)}><Fa icon={faFloppyDisk} translateX={-0.3} />Export Specs</button>
        </div>
    </div>
  );
}

export default App;
