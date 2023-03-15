export default {
    findMatches: async (searchText: string) => {
        return fetch(`api/search?searchText=${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}