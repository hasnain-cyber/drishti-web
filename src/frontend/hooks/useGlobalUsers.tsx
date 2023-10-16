import usersHandler from '@/frontend/apiHandlers/usersHandler';
import { useQuery } from 'react-query';


export default function () {
    const { data, status } = useQuery<any[], Error>('users', async () => {
        const response = await usersHandler.getAllUsers();
        return response['users'];
    });

    return { users: data, usersStatus: status };
}