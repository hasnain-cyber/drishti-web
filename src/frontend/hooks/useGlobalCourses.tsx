import coursesHandler from '@/frontend/apiHandlers/coursesHandler';
import { useMutation, useQuery } from 'react-query';

export default function useCourses() {
    const { data, status } = useQuery<any[], Error>('courses', async () => {
        const response = await coursesHandler.getAllCourses();
        if (!response['courses']) {
            return [];
        }
        return response['courses'];
    });

    const addCourseMutation = useMutation(async (course: any) => {

    });

    return {
        courses: data,
        coursesStatus: status,
        add: addCourseMutation.mutateAsync
    };
}