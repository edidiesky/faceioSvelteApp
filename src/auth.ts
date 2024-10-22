// auth.js (or a similar file)

import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
    ],
});
