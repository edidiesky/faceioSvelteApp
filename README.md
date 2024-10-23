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

##### 


