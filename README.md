# Rick and Morty Characters Application

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

Sebastiano Silipo's project.

---

## Features

- **Frontend** - Responsive UI built with TypeScript
- **Testing** - Tests made with Jest
- **Code quality** - Used ESLint & Prettier

---

## Quick Start

### Prerequisites

- Node.js 20+

### Installation

**Clone the repository**
```bash
git clone https://github.com/Sebabba/rick-and-morty-web-template.git
```

### Install Dependencies
```bash
cd rick-and-morty-web-template && npm install
```

### Repository Structure
```
/rick-and-morty-web-template
├── /src
│   ├── /components            # UI Components (Card, Characters)
│   │   ├── /__test__          # Tests with Jest
│   │   ├── card.tsx           # Character Card component
│   │   └── characters.tsx     # Characters Grid component
│   ├── /pages                 # App pages (app, documenti, index)
│   ├── /styles                # Global and component styles
│   └── /utils                 # Functions and TypeScript Types
├── .editorconfig              # Settings for the editor
├── .eslintrc.json             # ESLint consifguration
├── .gitignore
├── .node-version              # Exact Node.js required
├── .prettierrc                # Prettier configuration
├── .yarnrc.yml                # Yarn configuration
├── INSTRUCTION.md
├── README.md
├── jest.config.js             # Jest settings
├── jest.setup.ts              # Runs before each test suite
├── next-env.d.ts
├── next.config.ts             # Primary configuration for Next.js
├── package-lock.json
├── package.json
├── tsconfig.json              # TypeScript configuration
└── yarn.lock
```

### Testing
Use Jest for unit testing
```bash
npm run test
```
