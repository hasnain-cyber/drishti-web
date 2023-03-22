import coursesHandler from '@/frontend/apiHandlers/coursesHandler';
import { useQuery } from 'react-query';

export interface CourseType {
    id: string,
    name: string,
    description: string,
    ownerId: string,
}

export default function useCourses() {
    const { data, status } = useQuery<CourseType[], Error>('courses', async () => {
        const courses = await coursesHandler.getAllCourses();
        return courses;
    });

    return { courses: data, coursesStatus: status };
}