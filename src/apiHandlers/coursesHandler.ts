export default {
    getAllCourses: async () => {
        const response = await fetch(`${window.location.origin}/api/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
}