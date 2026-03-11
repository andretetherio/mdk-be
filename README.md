# MDK Core

## Quick start

### 1. Clone the repo

```bash
git clone https://github.com/tetherto/mdk-be.git
cd mdk-be
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run a sample

Use the miner client sample to start the API and register WM56, S19XP, and A1346 miners:

```bash
node samples/mdk.client.miners.js
```

The sample starts an API server on port 3000 and registers miners with example config. See `samples/mdk.client.miners.js` for the full reference implementation.
