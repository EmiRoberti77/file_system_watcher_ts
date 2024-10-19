# File Watcher with Chokidar

This project provides a simple file monitoring solution using TypeScript and Chokidar. It watches a specified directory for changes and logs when files are added, modified, or removed.

## Prerequisites

- Node.js (v20 or higher recommended)
- TypeScript
- dotenv for environment variable management
- Chokidar for file system watching

```bash
npm install
```

## Create an .env File

Create an .env file in the root of your project directory to specify the directory you want to monitor. The .env file should look like this:

```bash
WATCH_DIR=watch_dir
```

# Features

- Monitors Directory for Changes: Automatically watches for new files, changes to existing files, and deletions.

- Uses Polling for Reliability: Utilizes usePolling to ensure that changes are detected, even on systems where native file system events might be less reliable.

- Handles Large Files Gracefully: The awaitWriteFinish option helps to ensure that large files are fully written before events are triggered.

# Configuration Options

The file watcher is configured with the following options:

- ignored: Ignores dotfiles and hidden files.
- persistent: Ensures the watcher remains active and running.
- usePolling: Forces polling for change detection (more reliable but can be less efficient).
- awaitWriteFinish: Helps wait until files are completely written before triggering events.
- stabilityThreshold: Time (in milliseconds) that the file should be stable before triggering an event.
- pollInterval: How often (in milliseconds) to poll for changes while waiting for file write completion.
- ignoreInitial: Prevents initial add events for existing files when the watcher starts.

```typescript
import * as fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import * as chokidar from 'chokidar';
dotenv.config();

const _watch_dir = path.join(__dirname, '..', process.env.WATCH_DIR!);
console.log('monitoring', _watch_dir);

if (!fs.existsSync(_watch_dir)) {
  console.log('Error: Not found', _watch_dir);
} else {
  const watcher = chokidar.watch(_watch_dir, {
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    persistent: true,
    usePolling: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000, // Wait until a file is stable for 1 second
      pollInterval: 200, // Polling interval for awaiting write finish
    },
    ignoreInitial: true, // Ignore initial add events
  });

  watcher.on('add', (path) => console.log(`File ${path} has been added`));
  watcher.on('change', (path) => console.log(`File ${path} has been changed`));
  watcher.on('unlink', (path) => console.log(`File ${path} has been removed`));
}
```
