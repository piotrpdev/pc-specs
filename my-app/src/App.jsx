import logo from './logo.svg';
import styles from './App.module.css';

import { createSignal, createResource } from "solid-js";

const getCpu = async () => await Neutralino.computer.getCPUInfo();

const handleFileChosen = async (imgPath) => {
  const imgData = await Neutralino.filesystem.readBinaryFile(imgPath);

  const ext = imgPath.split('.').pop();

  const blob = new Blob( [ imgData ], { type: `image/${ext}` } );
  const objectUrl = URL.createObjectURL(blob);
  
  return objectUrl;
};

function App() {
  const [chosenFile, setChosenFile] = createSignal();
  const [img] = createResource(chosenFile, handleFileChosen);
  const [cpu] = createResource(getCpu);

  const handleFileDialog = () => {
    Neutralino?.os.showOpenDialog('Select Image', {
      filters: [
          {name: 'Images', extensions: ['jpg', 'png']}
      ]
    }).then((imgPaths) => {
      setChosenFile(imgPaths[0]);
    }).catch((err) => {
      console.warn(err);
    });
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={img() || logo} class={styles.logo} alt="logo" />
        { img.loading && <span>"Loading..."</span> }
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        {
          cpu.loading ? <span>"Loading..."</span> : <p>
            <b>CPU:</b> {cpu().model.trim()} {cpu().frequency / 1e9}GHz
          </p>
        }
        <button type='button' onClick={handleFileDialog}>Choose Image</button>
      </header>
    </div>
  );
}

export default App;
