# Sveltekit 🍪 Authentication
The only features implemented are as fallow.
- Login
- Logout

## Let's get started

```bash
# cloning
git clone https://github.com/josh-hernd/sveltekit-auth
```

## Developing

Once cloned, install all dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --host --open
```

## Building

To create a production version of your app:

```bash
npm run build

# or start the server and open the app in a new browser tab
npm run preview -- --host --open
```

## Login Credentials

```javascript
// src/routes/api/[user]/+server.ts
const usersData = [
    {
        user: 'user@admin.com',
        password: 'pass',
        userId: storeUserId // unique session
    },
    {
        user: 'user@example.com',
        password: 'pass',
        userId: storeUserId // unique session
    }]

```
# Main Issue
For some reason cookie expirations are not resetting (logout endpoint) on mobile devices. 

```html
<!-- src/lib/Nav.svelte -->
<form
    action="/logout"
    method="POST"
    use:enhance={() => {
        return async ({ result }) => {
            invalidateAll();
            await applyAction(result);
        };
    }}
>
    <button type="submit">Logout</button>
</form>
```

```javascript
// src/routes/logout/+page.server.ts

export const actions: Actions = {
    default({ cookies }) {
        // cookies expirations are not trigering on mobile
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
          })
        throw redirect(302, '/login')
    }
}
```

## Possible Work Around
Since cookie sessions cannot be reset, we can bring the session and store **('svelte/store')** it on login for each user. In the real wolrd, it would be stored in a database.

```javascript
// src/routes/login/+page.server.ts

    // ssid = crypto.randomUUID()
    const postSession = async (ssid: string) => {
        await fetch(`/api/${email}`, {
            method: 'POST',
            body: JSON.stringify({ "postedId": `${ssid}` }),
            headers: { 'content-type': 'application/json' }
        })
    }
```
And remove it on logout by replacing the session value. Athough this is not ideal beacuse it would logout all users by removing the session.

```javascript
// src/routes/logout/end-sessions/+page.server.ts

        (async () => {
            await fetch(`/api/${locals.active.id}`, {
                method: 'POST',
                body: JSON.stringify({ "postedId": "" }),
                headers: { 'content-type': 'application/json' }
            })
        })()
```