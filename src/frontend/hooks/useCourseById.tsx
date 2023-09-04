import { useEffect, useState } from "react";
import useGlobalCourses from "./useGlobalCourses";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "./useAuth";
import httpStatusCodes from 'http-status-codes';

export const useCourseById = (id: string | null) => {
    const queryClient = useQueryClient();

    const { courses } = useGlobalCourses();
    const [course, setCourse] = useState<any | null>(null);
    const { userData } = useAuth();

    useEffect(() => {
        if (courses && id) {
            const requiredCourse = courses.find((course: any) => course['id'] === id);
            setCourse(requiredCourse);
        }
    }, [courses, id]);

    const updateCourseMutation = useMutation(async (data: {
        name: string, description: string, topics: any[]
    }) => {
        if (!userData) {
            alert('Please login to delete a course.');
            return null;
        }
        if (!id) {
            alert('Not a valid course id.');
            return null;
        }

        try {
            console.log(`/api/courses/${id}/edit`);
            const response = await fetch(`/api/courses/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    id,
                    name: data.name,
                    description: data.description,
                    topics: data.topics
                })
            });

            if (response.status === httpStatusCodes.UNAUTHORIZED) {
                alert('You are not authorized to delete this course.');
                return null;
            }
            if (response.status === httpStatusCodes.BAD_REQUEST) {
                alert('All fields are required.');
                return
            }
            if (response.status === httpStatusCodes.NOT_FOUND) {
                alert('Course not found.');
                return
            }
            if (response.status === httpStatusCodes.INTERNAL_SERVER_ERROR) {
                alert('Something went wrong. Please try again later.');
                return;
            }
            if (response.status === httpStatusCodes.OK) {
                alert('Course has been updated.')
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
                return;
            }
            queryClient.invalidateQueries('courses');
        }
    });

    return {
        course,
        updateCourse: updateCourseMutation.mutateAsync,
    };
}