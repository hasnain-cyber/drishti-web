export default {
    signup: (name: string, email: string, password: string) => {
        return fetch(`api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${email}:${password}`
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
    },
    login: (email: string, password: string) => {
        return fetch(`api/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${email}:${password}`
            }
        });
    }
}