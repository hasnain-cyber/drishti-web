export default {
    getAllUsers: async () => {
        const response = await fetch(`api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
}