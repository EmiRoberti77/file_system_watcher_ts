import * as fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import * as chokidar from 'chokidar';
dotenv.config();

const _watch_dir = path.join(__dirname, '..', process.env.WATCH_DIR!);
console.log('monitoring', _watch_dir);

if (!fs.existsSync(_watch_dir)) {
  console.log('Error:Not found', _watch_dir);
} else {
  const watcher = chokidar.watch(_watch_dir, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    usePolling: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 200,
    },
    ignoreInitial: true,
  });

  watcher.on('add', (path) => console.log(`File ${path} has been added`));
  watcher.on('change', (path) => console.log(`File ${path} has been changed`));
  watcher.on('unlink', (path) => console.log(`File ${path} has been removed`));
}
