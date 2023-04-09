/* @refresh reload */
import { render } from 'solid-js/web';

import 'purecss/build/pure-min.css'
import './index.css';
import App from './App';

;(async () => {
    if (!window.NL_PORT) {
        //const config = await import('./auth_info.json') // Make sure you successfully created a symlink for the auth_info (step 6 in README)
        const json_files = import.meta.glob('./auth_info.json')

        if (Object.keys(json_files).length !== 0) {
            const config = await json_files['./auth_info.json']();
            
            window.NL_PORT = config.port
            window.NL_TOKEN = config.accessToken
            window.NL_ARGS = ["--load-dir-res", "--path=.", "--export-auth-info", "--neu-dev-extension", "--window-enable-inspector", "--url=http://localhost:3000"]
        };
    }

    Neutralino.init()
})();

render(() => <App />, document.getElementById('root'));
