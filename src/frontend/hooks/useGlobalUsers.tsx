import usersHandler from '@/frontend/apiHandlers/usersHandler';
import { useQuery } from 'react-query';
import { LoggedInUser } from './useAuth';
export interface UserType extends Omit<LoggedInUser, 'token'> {
}


export default function () {
    const { data, status } = useQuery<UserType[], Error>('users', async () => {
        const users = await usersHandler.getAllUsers();
        return users;
    });

    return { users: data, usersStatus: status };
}