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
