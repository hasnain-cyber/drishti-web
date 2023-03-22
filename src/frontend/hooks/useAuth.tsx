import authHandler from '@/frontend/apiHandlers/authHandler';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export interface LinkedInType {
    name: string;
    url: string;
}

export interface LoggedInUser {
    id: string,
    name: string,
    email: string,
    token: string,
    department: string,
    institute: string,
    about: string,
    contactNumber: string;
    linkedIn: LinkedInType;
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

    const updateUserMutation = useMutation(async (user: LoggedInUser) => {
        const response = await authHandler.updateProfile(user.token, user.name, user.email, user.department, user.institute, user.contactNumber, user.linkedIn, user.about);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });

    return {
        userData: (userData && userData.data) || null,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        updateProfile: updateUserMutation.mutateAsync,
    };
};

