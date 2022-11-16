import { error, json, type RequestHandler } from '@sveltejs/kit';
import { writable } from 'svelte/store';

const storeUserId = () => {
    const { subscribe, set, update } = writable('');
    return {
        subscribe,
        reset: () => update(n => n),
        clear: () => set('')
    };
}

const usersData = [
    {
        user: 'user@admin.com',
        password: 'pass',
        userId: storeUserId
    },
    {
        user: 'user@example.com',
        password: 'pass',
        userId: storeUserId
    }]

export const GET: RequestHandler = async ({ params }) => {
    function filterUsers(userArray: [], val: string) {
        let user, data;
        userArray.forEach((users: { user: string, userId: unknown }) => {
            if (users.user == val || users.userId == val) {
                user = users.user == val || users.userId == val
                data = users
            }
        });
        return { user, data }
    }
    if (filterUsers(usersData as [], params.user as string).user) {
        return json(filterUsers(usersData as [], params.user as string).data)
    }
    throw error(404, 'User not found');
}




export const POST: RequestHandler = async ({ params, request }) => {
    const { postedId } = await request.json()
    function filterUsers(userArray: [], val: string, id: string) {
        let user, data;
        userArray.forEach((users: { user: string, userId: string }) => {
            if (users.user == val || users.userId == val) {
                users.userId = id
                user = (users.user == val || users.userId == val)
                data = users
            }
        });

        return { user, data }
    }

    if (filterUsers(usersData as [], params.user as string, postedId).user) {
        return json(filterUsers(usersData as [], params.user as string, postedId).data)
    }
    throw error(404, 'User not found');
}