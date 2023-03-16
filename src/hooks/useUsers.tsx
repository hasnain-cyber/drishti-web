import usersHandler from '@/apiHandlers/usersHandler';
import { useQuery } from 'react-query';

export interface UserType {
    id: string,
    name: string,
}

const useCourses = () => {
    const { data, status } = useQuery<UserType[], Error>('users', async () => {
        const users = await usersHandler.getAllUsers();
        return users;
    });

    return { users: data, usersStatus: status };
}

export default useCourses;