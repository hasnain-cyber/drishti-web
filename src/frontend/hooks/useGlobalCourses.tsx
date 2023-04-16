import coursesHandler from '@/frontend/apiHandlers/coursesHandler';
import { useQuery } from 'react-query';

export default function useCourses() {
    const { data, status } = useQuery<any[], Error>('courses', async () => {
        const response = await coursesHandler.getAllCourses();
        if (!response['courses']) {
            return [];
        }
        return response['courses'];
    });

    return { courses: data, coursesStatus: status };
}