import { invalid, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Action, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.active) {
        throw redirect(302, '/admin')
    }
}

const login: Action = async ({ cookies, request, fetch }) => {
    const form = await request.formData()
    const email = form.get('email')
    const passwordInput = form.get('password')

    if (
        typeof email !== 'string' ||
        typeof passwordInput !== 'string' ||
        !email ||
        !passwordInput
    ) {
        return invalid(400, { error: 'Provide and an Email and password!' })
    }

    if (!email || !passwordInput) {
        return invalid(400, { error: 'Email and password is required!' })
    }

    const getUsers = await (await fetch(`/api/${email}`, {
        method: 'GET',
        headers: { Accept: '*/*' }
    })).json()
    const userName = getUsers.user
    const userPassword = getUsers.password
    const userSession = getUsers.userId

    const authUser = email == userName && passwordInput == userPassword

    if (!authUser) {
        return invalid(400, { error: 'You entered the wrong email or password.' })
    }

    const postSession = async (ssid: string) => {
        await fetch(`/api/${email}`, {
            method: 'POST',
            body: JSON.stringify({ "postedId": `${ssid}` }),
            headers: { 'content-type': 'application/json' }
        })
    }
    const isSession = () => {
        if (userSession == undefined || userSession == '' || Object.keys(userSession).length == 0) {
            const cryptic = crypto.randomUUID()
            postSession(cryptic)
            return cryptic
        }
        return userSession
    }
    cookies.set('session', isSession(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30
    })
    throw redirect(302, '/admin')
}

export const actions: Actions = { login }