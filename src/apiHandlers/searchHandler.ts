export default {
    findMatches: async (searchText: string) => {
        if (searchText.length > 0) {
            const results = await fetch(`${window.location.origin}/api/search?searchText=${searchText}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return results.json();
        } else {
            return {
                users: [],
                courses: []
            };
        }
    }
}