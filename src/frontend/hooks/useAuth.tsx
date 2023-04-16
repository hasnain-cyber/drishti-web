import { useQuery, useMutation, useQueryClient } from 'react-query';
import httpStatusCodes from 'http-status-codes';

export interface ILinkedIn {
    name: string;
    url: string;
}

export interface ILoggedInUser {
    id: string,
    name: string,
    email: string,
    token: string,
    department: string,
    institute: string,
    about: string,
    contactNumber: string;
    linkedIn: ILinkedIn;
}

const getUserFromLocalStorage = () => {
    const tempUser = localStorage.getItem('user');
    if (!tempUser) {
        return null;
    }
    return JSON.parse(tempUser) as ILoggedInUser;
};

export default function () {
    const queryClient = useQueryClient();

    const userData = useQuery('user', getUserFromLocalStorage);

    const signUpMutation = useMutation(async (credentials: {
        name: string,
        email: string,
        password: string
    }) => {
        try {
            const response = await fetch(`/api/auth/signup`, {
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

            if (response.status === httpStatusCodes.BAD_REQUEST) {
                return alert('All fields are required.');
            }
            if (response.status === httpStatusCodes.CONFLICT) {
                return alert('Email already exists.');
            }
            if (response.status === httpStatusCodes.INTERNAL_SERVER_ERROR) {
                return alert('Something went wrong. Please try again later.');
            }
            if (response.status === httpStatusCodes.CREATED) {
                const responseJSON = await response.json();
                return responseJSON;
            }
            return null;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:55 ~ error:", error)
            return null;
        }
    }, {
        onSuccess: (data) => {
            console.log("🚀 ~ file: useAuth.tsx:59 ~ data:", data)
            if (!data) {
                localStorage.removeItem('user');
                queryClient.setQueryData('user', null);
                return;
            }
            localStorage.setItem('user', JSON.stringify(data.user));
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
            if (response.status === httpStatusCodes.BAD_REQUEST) {
                return alert('All fields are required.');
            }
            if (response.status === httpStatusCodes.NOT_FOUND) {
                return alert('Invalid credentials.');
            }
            if (response.status === httpStatusCodes.UNAUTHORIZED) {
                return alert('Invalid credentials.');
            }
            if (response.status === httpStatusCodes.INTERNAL_SERVER_ERROR) {
                return alert('Something went wrong. Please try again later.');
            }
            if (response.status === httpStatusCodes.OK) {
                const responseJSON = await response.json();
                return responseJSON;
            }
            return null;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:52 ~ error:", error)
            return null;
        }
    }, {
        onSuccess(data) {
            if (!data) {
                localStorage.removeItem('user');
                queryClient.setQueryData('user', null);
                return;
            }
            console.log("🚀 ~ file: useAuth.tsx:59 ~ onSuccess ~ data:", data)
            localStorage.setItem('user', JSON.stringify(data.user));
            queryClient.setQueryData('user', data.user);
        },
    });

    const logoutMutation = useMutation(async () => {
        return null;
    }, {
        onSuccess: (data) => {
            localStorage.removeItem('user');
            queryClient.setQueryData('user', data);
        }
    });

    const updateUserProfileMutation = useMutation(async (data: {
        name: string,
        department: string,
        institute: string,
        contactNumber: string,
        linkedIn: ILinkedIn,
        about: string
    }) => {
        if (!userData || !userData.data) {
            return alert('Please login to continue.');
        }

        try {
            const response = await fetch(`/api/users/edit/general`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.data?.token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    department: data.department,
                    institute: data.institute,
                    contactNumber: data.contactNumber,
                    linkedIn: data.linkedIn,
                    about: data.about
                }),
            });
            const responseJSON = await response.json();
            console.log("🚀 ~ file: useAuth.tsx:149 ~ responseJSON:", responseJSON)
            return responseJSON;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:52 ~ error:", error)
            return null;
        }
    }, {
        onSuccess(data) {
            console.log("🚀 ~ file: useAuth.tsx:59 ~ onSuccess ~ data:", data)
            if (!data) {
                localStorage.removeItem('user');
                queryClient.setQueryData('user', null);
                return;
            }
            localStorage.setItem('user', JSON.stringify(data.user));
            queryClient.setQueryData('user', data.user);
        }
    });

    console.log('user.data', userData.data);

    return {
        userData: (userData && userData.data) || null,
        login: loginMutation.mutateAsync,
        signUp: signUpMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        updateUserProfile: updateUserProfileMutation.mutateAsync
    };
};