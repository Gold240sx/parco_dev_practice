# Parco Dev Practice

This is a component test for Parco's React / Next.js developer position.

Note: A breakdown of all developer notes can be found in the [`DevReadme.md`](https://github.com/Gold240sx/parco_dev_practice/blob/main/DevReadme.md) file.

## Getting Started

First, add copy the `.env.example` file twice and rename them to `.env.development` and `.env.production`.

Add the contents to the files as shown below:

```bash
# .env.development
REACT_APP_IS_UNDER_DEVELOPMENT=true
```

```bash
# .env.production
REACT_APP_IS_UNDER_DEVELOPMENT=false
```

<!-- PNPM -->

If you prefer using pnpm, you can simply run

```bash
pnpm i,
```

and then

```bash
pnpm dev
```

to start the development server.

<!-- NPM -->

Delete the

```bash
  pnpm-lock.yaml
```

file and run the associated bash command
below in the terminal.

First, run the development server:

```bash
npm i
npm run dev
# or
yarn install
yarn dev
# or
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
to see the result.

## Technologies Used

-   Next.js
-   Tailwind CSS
-   React-icons
-   Shadcn / OriginUI
-   React-hook-form
-   React-aria
-   Date-fns
-   Zod
-   SweetAlert2
