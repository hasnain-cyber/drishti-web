import usersHandler from '@/frontend/apiHandlers/usersHandler';
import { useQuery } from 'react-query';


export default function () {
    const { data, status } = useQuery<any[], Error>('users', async () => {
        const response = await usersHandler.getAllUsers();
        console.log("🚀 ~ file: useGlobalUsers.tsx:11 ~ const{data,status}=useQuery<UserType[],Error> ~ users:", response)
        return response['users'];
    });

    return { users: data, usersStatus: status };
}