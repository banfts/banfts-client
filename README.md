# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Licensing
`banfts-client` is licensed under the AGPLv3. See the LICENSE file for more information. Obviously, we do not hold the copyright to the third party modules `src/static/modules/b58.js` and `src/static/modules/banano.js`, which are licensed under their respective licenses, (DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE for [b58.js](https://gist.github.com/diafygi/90a3e80ca1c2793220e5) and the MIT license for banano.js).

## Contributing

Please make sure to test any PRs - and also run `npm run build` to make sure the site will be able to be built and deployed. Since the client is meant to deployed as a static site, some Sveltekit features, namely anything requiring a server, obviously will not be able to be used.

(todo: write this section)

(todo: write something about issues)
