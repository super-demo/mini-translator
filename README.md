# Style Guides

## Getting Started

In order to run this app locally, you should have the following programs installed on your computer:

- [Node.js](https://nodejs.org/) version 20.0.0 or higher
- [pnpm](https://yarnpkg.com/) version 9.0.0 or higher

##### Clone this repository

```
git clone https://github.com/super-demo/mini-translator.git
cd mini-translator
```

##### Install dependencies

```
pnpm install
```

##### Start the server

```
pnpm run dev
```

## Components

```
/src/components
```

##### Api

```
/src/api
```

## Prerequisites

- Follow all folder and file structure formats
- Use the provided global alias for all imports, `@/*` representing `./src/*`
- Use the provided global alias for all imports, `@ui/*` representing `./src/components/ui/*`
  ```
  "paths": {
    "@/*": [
      "./src/*"
    ],
    "@ui/*": ["./src/components/ui/*"]
  },
  ```
- Use Tailwind CSS exclusively.
- UI components should be stored in `~/components/ui`

## Contributing

Please read the [CONTRIBUTING](./CONTRIBUTING.md) file before making any contributions.
