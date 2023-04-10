import Fa from 'solid-fa'
import { faFloppyDisk, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { createSignal, onMount, onCleanup } from "solid-js";

import styles from './App.module.css';
import Navbar from './components/Navbar';
import { useSpecs } from './contexts/SpecsContext';
import TabRouter from './components/TabRouter';

const handleSaveDialog = (specs) => {
  Neutralino?.os.showSaveDialog('Save Specs', {
    defaultPath: `specs-${safeDate}.json`,
    filters: [
        {name: 'JSON', extensions: ['json']}
    ]
  }).then((filePath) => {
    Neutralino?.filesystem.writeFile(filePath, JSON.stringify(specs, null, 2));
  }).catch((err) => {
    console.warn(err);
  });
};

const safeDate = (new Date()).toISOString().replaceAll(/[:.]/g, '-')

const handleGetHardwareInfo = () => {
  Neutralino.extensions.dispatch('dev.piotrp.pcspecs.hardware', 'getHardwareInfo', { "bruh": "bruh" });
}

function App() {
  const tabSignal = createSignal("General");
  const [selectedTab, setSelectedTab] = tabSignal;

  const [specs, setSpecs] = useSpecs();
  const isSpecsSet = () => Object.keys(specs).length !== 0;

  const handleHardwareInfoEvent = (event) => {
    console.dir(event.detail)
    setSpecs(event.detail);
  }

  onMount(() => Neutralino.events.on("hardwareInfoEvent", handleHardwareInfoEvent));
  onCleanup(() => Neutralino.events.off("hardwareInfoEvent", handleHardwareInfoEvent));

  return (
      <div class={styles.App}>
        <header>
          <Navbar styles={styles.navbar} tabSignal={tabSignal} />
        </header>
          <main class={styles.main}>
            { isSpecsSet() ? <TabRouter tab={selectedTab} /> : <p>Click the button to get hardware info.</p>}
            <div class={`pure-button-group ${styles.buttons}`} role="group">
              { isSpecsSet() ? <button class='pure-button pure-button-primary button-xlarge' type='button' onClick={() => handleSaveDialog(specs)}><Fa icon={faFloppyDisk} translateX={-0.3} />Export Specs</button> : <button class='pure-button pure-button-primary button-xlarge' type='button' onClick={() => handleGetHardwareInfo()}><Fa icon={faMagnifyingGlass} translateX={-0.3} />Get HW Info</button> }
            </div>
          </main>
      </div>
  );
}

export default App;
