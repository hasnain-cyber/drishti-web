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
    login: async (email: string, password: string) => {
        const response = await fetch(`api/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${email}:${password}`
            }
        });
        return response.json();
    },
    updateProfile: async (token: string, name: string, email: string, department: string, institute: string, contactNumber: string, linkedIn: {
        name: string, 
        url: string
    }, about: string) => {
        const response = await fetch(`${window.location.origin}/api/users/edit/general`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                email,
                department,
                institute,
                contactNumber,
                linkedIn,
                about
            })
        });
        return response.json();
    }
}