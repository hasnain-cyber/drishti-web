import coursesHandler from '@/frontend/apiHandlers/coursesHandler';
import { useMutation, useQuery } from 'react-query';
import httpStatusCodes from 'http-status-codes';
import useAuth from './useAuth';

export default function useCourses() {
    const { data, status } = useQuery<any[], Error>('courses', async () => {
        const response = await coursesHandler.getAllCourses();
        if (!response['courses']) {
            return [];
        }
        return response['courses'];
    });

    const { userData } = useAuth();

    const addCourseMutation = useMutation(async (course: any) => {
        if (!userData) {
            alert('Please login to add a course.');
            return null;
        }

        try {
            const response = await fetch(`/api/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
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
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:55 ~ error:", error)
            return null;
        }
    });

    return {
        courses: data,
        coursesStatus: status,
        add: addCourseMutation.mutateAsync
    };
}