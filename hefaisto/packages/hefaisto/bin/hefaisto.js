#!/usr/bin/env node
import { run } from '../src/installer.js';
run(process.cwd()).catch(err => { console.error(err.message); process.exit(1); });
