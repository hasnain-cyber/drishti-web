import authHandler from '@/frontend/apiHandlers/authHandler';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import usersHandler from '../apiHandlers/usersHandler';

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

const getUserFromLocalStorage = () => {
    const tempUser = localStorage.getItem('user');
    if (!tempUser) {
        return null;
    }
    return JSON.parse(tempUser) as LoggedInUser;
};

export default function () {
    const queryClient = useQueryClient();

    const userData = useQuery('user', getUserFromLocalStorage);

    const registerMutation = useMutation(async (credentials: {
        name: string,
        email: string,
        password: string
    }) => {
        try {
            const response = await fetch(`api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }),
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:55 ~ error:", error)
        }
    }, {
        onSuccess: (data) => {
            console.log("🚀 ~ file: useAuth.tsx:59 ~ data:", data)
            queryClient.setQueryData('user', data.user);
        }
    });

    const loginMutation = useMutation(async (credentials: {
        email: string,
        password: string
    }) => {
        try {
            const response = await fetch(`api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:52 ~ error:", error)
        }
    }, {
        onSuccess(data) {
            console.log("🚀 ~ file: useAuth.tsx:59 ~ onSuccess ~ data:", data)
            queryClient.setQueryData('user', data.user);
        },
    });

    const logoutMutation = useMutation(async () => {
        localStorage.removeItem('user');
        return null;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData('user', data);
        }
    });

    return {
        userData: (userData && userData.data) || null,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync
    };
};

