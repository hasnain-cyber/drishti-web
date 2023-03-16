export default {
    getAllCourses: async () => {
        const response = await fetch(`api/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
}