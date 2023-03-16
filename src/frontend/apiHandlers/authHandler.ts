export default {
    signup: async (name: string, email: string, password: string) => {
        const response = await fetch(`api/auth`, {
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
        return response.json();
    },
    login: async(email: string, password: string) => {
        const response = await fetch(`api/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${email}:${password}`
            }
        });
        return response.json();
    },
    updateUser: async (id: string, name: string, email: string) => {
        const response = await fetch(`${window.location.origin}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name,
                email
            })
        });
        return response.json();
    }
}