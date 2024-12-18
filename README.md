# Parco Dev Practice
<img src="https://i.ibb.co/0cPzFSS/Property-1-Dark.png" alt="Property-1-Dark" border="0"> 

This is a component test for Parco's React / Next.js developer position.

Note: A breakdown of all developer notes can be found in the [`DevReadme.md`](https://github.com/Gold240sx/parco_dev_practice/blob/main/DevReadme.md) file.

## Getting Started

First, add copy the `.env.example` file twice and rename them to `.env.development` and `.env.production`. An example of how everything should be set up can also be found in the .env.sample file.

Add the contents to the files as shown below:

```bash
# .env
NEXT_RESEND_API_KEY=re_resend_api_key
EMAIL_FROM="Your Name <yourEmailConnectedTo@YourResendApiKey.com>"
```

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
-   React-Email
-   Resend API
-   React-aria
-   Date-fns
-   Zod
-   SweetAlert2
