export default {
    getAllUsers: async () => {
        const response = await fetch(`${window.location.origin}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
}