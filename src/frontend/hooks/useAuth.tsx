import authHandler from '@/frontend/apiHandlers/authHandler';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export interface LoggedInUser {
    id: string,
    name: string,
    email: string,
    token: string,
}

export default function () {
    const queryClient = useQueryClient();

    const userData = useQuery('user', () => {
        const tempUser = localStorage.getItem('user');
        if (tempUser) {
            return JSON.parse(tempUser) as LoggedInUser;
        }
        return null;
    });


    const loginMutation = useMutation(async (credentials: {
        email: string,
        password: string
    }) => {
        const response = await authHandler.login(credentials.email, credentials.password);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });

    const logoutMutation = useMutation(async () => {
        localStorage.removeItem('user');
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });

    const updateUserMutation = useMutation(async (user: {
        id: string,
        name: string,
        email: string
    }) => {
        const response = await authHandler.updateUser(user.id, user.name, user.email);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });
    
    console.log("🚀 ~ file: useAuth.tsx:68 ~ userData.data:", userData.data)

    return {
        userData: (userData && userData.data) || null,
        userLoggedIn: userData && userData.data,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        updateUser: updateUserMutation.mutateAsync,
    };
};
    
