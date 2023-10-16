export default {
    getAllUsers: async () => {
        const response = await fetch(`${window.location.origin}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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