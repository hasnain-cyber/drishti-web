import usersHandler from '@/frontend/apiHandlers/usersHandler';
import { useQuery } from 'react-query';

export interface UserType {
    id: string,
    name: string,
    email: string,
    department: string,
    about: [],
}

export default function () {
    const { data, status } = useQuery<UserType[], Error>('users', async () => {
        const users = await usersHandler.getAllUsers();
        return users;
    });

    return { users: data, usersStatus: status };
}