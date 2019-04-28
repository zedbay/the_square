import app from './app';
import * as config from '../config.json';

process.setMaxListeners(100);
app.listen(config['port'], () => {
    console.log(`Server running on port ${config['port']}`);
});