import authHandler from '@/frontend/apiHandlers/authHandler';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export interface LoggedInUser {
    id: string,
    name: string,
    email: string,
    role: string,
}

export default function () {
    const queryClient = useQueryClient();

    const user = useQuery('user', () => {
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

    return {
        user: (user && user.data) || null,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        updateUser: updateUserMutation.mutateAsync,
    };
};