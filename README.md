# FaceIO Svelte App

This project is a SvelteKit application that integrates FaceIO for facial recognition-based authentication. The app uses FaceIO's SDK to enable biometric login functionality alongside OAuth providers like GitHub and Google.

## Main Idea around the App

The App makes use of svelte toolkit due to its dynamic routing cappabilites, Tailwind CSS for styling , Google Oauth for authentication, and Faceio for biometric authorization.

### Tailwind CSS SETUP

#### Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Enabling use of PostCSS in <style> blocks

```javascript
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};
export default config;
```

#### Adding the Tailwind directives to your CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Importing the CSS file To Layout.svelte

```javascript
<script>
  import "../app.css";
</script>

<slot />
```

### GOOGLE OAUTH AND FACEIO ID

Go to google cloud developer accounts to get your credentials for your app then add to it this environment variables

```bash
PUBLIC_FACEIO_PUBLIC_ID=your-faceio-public-id
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

#### INSTALLING THE PRE-REQUISITE PACKAGES

This packages will be responsible for our google oauth

```bash
        "@auth/core": "^0.37.2",
		"@auth/sveltekit": "^1.7.2",
```

#### SETTING UP THE auth.ts FILE

This file is responsible for handling the svelteKit Authentication that is responsible for provide social authentication Providers

```javascript
import { SvelteKitAuth } from "@auth/sveltekit";
import GoogleProvider from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
  ],
});
```

#### SETTING UP THE hooks.server.ts FILE

This file is responsible for exporting the handler function from the svelteKit Authentication that is also responsible for provide social authentication Providers

```javascript
import { handle } from "./auth";
export { handle };
```

#### CREATING THE layout.server.ts FILE in the app folder

This file is responsible for handling the session result from our Google or Social Authenttication from the svelteApp toolkit

```javascript
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

### MAIN APP DEVELOPMENT

#### LANDING PAGE
So we had to get the app store state which is page which gives us access to the session of the user
```javascript
<script>
  import "../app.css";
  import { page } from "$app/stores";
  // This will call the sign-in route that is provided by SvelteKitAuth
  async function loginWithGoogle() {
    window.location.href = "/auth/signin";
  }

  function HandleNavigateToDahboard() {
    window.location.href = "/dashboard";
  }
</script>
```

#### PROTECTING THE DASHBOARD
We have to create a folder called dashboard in the routes folder automatic we have created aroute called /dashboard. In this folder we have to get access to the session of the user authenticated. We obviously have to create a +page.ts file that will handle it

##### +Page.ts
```javascript
// src/routes/dashboard/+page.ts
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
    const { session } = await parent();  // Access parent layout data (session)

    if (!session) {
        // Redirect if the user is not signed in
        throw redirect(303, '/');
    }

    // Return any data you need for the dashboard
    return {
        user: session.user
    };
};

```

##### +page.svelte
So we use the ``export let data;`` to get the props from the parent which is the user session. So we have to perfrom a logic if the user has no session he is not allowed to view the dashboard


```javascript
<script lang="ts">

  export let data;
</script>

{#if data.session}
  <!-- Render child routes when session is available -->
  <main class="bg-[#F4F4F9] pb-20 min-h-[100vh]">
    {#if showTransferModal}
      <TransferModal
        {transactions}
        modal={showTransferModal}
        {OffTransferModal}
      />
    {/if}
    {#if showAuthModal}
      <FacialAuthenticationModal
        {authenticateNewUser}
        modal={showAuthModal}
        {offAuthModal}
      />
    {/if}
    <!-- FacialAuthenticationModal -->
    <Header />
    <div
      class="w-full max-w-[1200px] px-4 md:px-8 mx-auto mt-4 min-h-[600px] flex gap-12 flex-col md:items-center justify-center"
    >
      <div
        class="w-full flex flex-col gap-8 items-start p-8 rounded-lg bg-[#1A2E5A] text-white"
      >
        <h3 class="text-xl font-semibold md:text-2xl">Account Balance</h3>
        <!-- <h2 class="text-2xl font-semibold md:text-4xl">${amount}</h2> -->
        <button
          on:click={OnAuthenticationModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-sm md:text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><EyeIcon size={20} />View Balance</button
        >
      </div>

      <!-- <div class="flex w-full items-center justify-center gap-8">
        <button
          on:click={OnTransferModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><SendIcon height={2} width={2} /> Send Money</button
        >
        <button
          on:click={OnAuthenticationModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#fff] border text-dark flex items-center justify-center gap-4"
          ><UserIcon height={2} width={2} /> Request Money</button
        >
      </div> -->
      <div
        class="w-full flex flex-col gap-6 p-8 rounded-lg items-start bg-[#fff] shadow text-dark"
      >
        <h2 class="text-xl font-semibold md:text-2xl">
          Swift Transfer with Milzbank
          <span class="text-base block pt-3 max-w-[450px] font-normal">
            Send money across borders instantly with our cutting-edge currency
            exchange platform.
          </span>
        </h2>

        <button
          on:click={OnTransferModal}
          class="px-8 py-3 hover:opacity-40 font-semibold text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><SendIcon font-size={"12px"} size={20} /> Start Swift Transfer</button
        >
      </div>
      <div
        class="w-full flex flex-col gap-8 p-8 rounded-lg bg-[#fff] shadow text-dark"
      >
        <h2 class="text-xl font-semibold md:text-2xl">
          {#if transactions?.length !== 0}
            Recent Transactions
          {:else}
            No Transactions
          {/if}
        </h2>
        {#if transactions?.length !== 0}
          <ul class="space-y-4">
            {#each transactions as transaction (transaction.id)}
              <li class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  {#if transaction.type === "received"}
                    <ArrowDownIcon class="h-6 w-6 text-green-500" />
                  {:else}
                    <ArrowUpIcon class="h-6 w-6 text-red-500" />
                  {/if}
                  <div>
                    <p class="font-medium text-lg md:text-xl">
                      {transaction.type === "received"
                        ? transaction.from
                        : transaction.to}
                    </p>
                    <p class="text-sm md:text-base text-gray-500">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <p
                  class={`font-medium md:text-xl text-lg ${transaction.type === "received" ? "text-green-500" : "text-red-500"}`}
                >
                  {transaction.type === "received"
                    ? "+"
                    : "-"}${transaction.amount.toFixed(2)}
                </p>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </main>
{:else}
  <!-- Optionally show a message or something else before redirection -->
  <p>Redirecting...</p>
{/if}
```



