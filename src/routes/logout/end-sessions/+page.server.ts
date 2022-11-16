import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    throw redirect(302, '/')
}

export const actions: Actions = {
    default({ cookies, locals, fetch }) {
        (async () => {
            await fetch(`/api/${locals.active.id}`, {
                method: 'POST',
                body: JSON.stringify({ "postedId": "" }),
                headers: { 'content-type': 'application/json' }
            })
        })()
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
        })
        throw redirect(302, '/login')
    }
}