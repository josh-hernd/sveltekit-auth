import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session')

    if (!session) {
        return await resolve(event)
    }

    const activeUser = await (await fetch(event.url.origin + `/api/${session}`, {
        method: 'GET',
        headers: { Accept: '*/*' }
    })).json()
    const userName = await activeUser.user
    const userSession = session == await activeUser.userId

    if (userSession) {
        event.locals.active = {
            user: userName,
            id: session
        }
    }
    return await resolve(event)
}