# Peinau TypeScript Seed

Starting point to create projects based on typescript

## Steps to start easily

Follow the instructions to start using the seed in the simplest way possible

2. Install dependencies and typescript definitions

```bash
# Install by running:
npm install && tsd install
# Note: if you don't have TypeScript Definition manager (TSD), please install by running:
npm install tsd -g
```

3. Look seed structure (Directory structure)

```
.
├── LICENSE
├── README.md
├── config
│	└── default.js
├── gulp
│   ├── clean.js
│   ├── doc.js
│   ├── scripts.js
│	└── test.js
├── src
│   ├── classExample.ts
│   └── collections.ts
├── test
│   ├── log4js.json
│   └── testExample.spec.js
├── dist
├── typings
│
├── .gitignore
├── gulpfile.js
├── index.js
├── package.json
└── tsd.json
```

- `src` Typescript source files for your project
- `dist` Used for the production build

4. Compile typescript project

```bash
gulp default
```

## Additional options

- Generate documentation under `doc`

```bash
gulp doc
```

- run tests under `test`

```bash
gulp test
```

## typescript compiler configuration

The configuration options are under `config`

```javascript
cfg.tsConfig = {
	sortOutput: true,
	module: "commonjs",
	removeComments: true,
	target:'ES5'
};
```

## License

MIT