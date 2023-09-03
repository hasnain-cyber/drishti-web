import { useEffect, useState } from "react";
import useGlobalCourses from "./useGlobalCourses";

export const useCourseById = (id: string | null) => {
    const { courses } = useGlobalCourses();
    const [course, setCourse] = useState<any | null>(null);
    useEffect(() => {
        if (courses && id) {
            const requiredCourse = courses.find((course: any) => course['id'] === id);
            setCourse(requiredCourse);
        }
    }, [courses, id]);

    return course;
}