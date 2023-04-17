import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpStatusCodes from 'http-status-codes';
import useAuth from './useAuth';

export default function () {
    const queryClient = useQueryClient();

    const { data, status } = useQuery<any[], Error>('courses', async () => {
        try {
            const response = await fetch(`/api/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJSON = await response.json();
            return responseJSON['courses'];;
        } catch (error) {
            console.log("🚀 ~ file: useGlobalCourses.tsx:19 ~ const{data,status}=useQuery<any[],Error> ~ error:", error)
            return [];
        }
    });

    const { userData } = useAuth();

    const addCourseMutation = useMutation(async (course: {
        title: string,
        description: string
    }) => {
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
                body: JSON.stringify(course)
            });
            if (response.status === httpStatusCodes.UNAUTHORIZED) {
                return alert('Please login to add a course.');
            }
            if (response.status === httpStatusCodes.BAD_REQUEST) {
                return alert('All fields are required.');
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
            console.log("🚀 ~ file: useAuth.tsx:55 ~ error:", error);
            return null;
        }
    }, {
        onSuccess: (data) => {
            if (!data) {
                queryClient.setQueryData('courses', []);
            }
            queryClient.invalidateQueries('courses');
        }
    });

    const deleteCourseMutation = useMutation(async (courseId: string) => {
        if (!userData) {
            alert('Please login to delete a course.');
            return null;
        }

        try {
            const response = await fetch(`/api/courses`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    courseId
                })
            });

            if (response.status === httpStatusCodes.UNAUTHORIZED) {
                return alert('You are not authorized to delete this course.');
            }
            if (response.status === httpStatusCodes.BAD_REQUEST) {
                return alert('All fields are required.');
            }
            if (response.status === httpStatusCodes.NOT_FOUND) {
                return alert('Course not found.');
            }
            if (response.status === httpStatusCodes.INTERNAL_SERVER_ERROR) {
                return alert('Something went wrong. Please try again later.');
            }
            if (response.status === httpStatusCodes.OK) {
                const responseJSON = await response.json();
                console.log("🚀 ~ file: useGlobalCourses.tsx:103 ~ deleteCourseMutation ~ responseJSON:", responseJSON)
                return responseJSON;
            }

            return null;
        } catch (error) {
            console.log("🚀 ~ file: useAuth.tsx:55 ~ error:", error);
            return null;
        }
    }, {
        onSuccess: (data) => {
            if (!data) {
                return;
            }
            queryClient.invalidateQueries('courses');
        }
    });

    return {
        courses: data,
        coursesStatus: status,
        addCourse: addCourseMutation.mutateAsync,
        deleteCourse: deleteCourseMutation.mutateAsync
    };
}