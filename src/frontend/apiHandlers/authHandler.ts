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
    }
}