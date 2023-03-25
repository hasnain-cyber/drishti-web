import React from "react";
import useGlobalCourses, { CourseType } from "./useGlobalCourses";

export default function useCoursesByUser(userId: string) {
    const [courses, setCourses] = React.useState<CourseType[]>([]);
    const globalCourses = useGlobalCourses();
    React.useEffect(() => {
        if (globalCourses.courses) {
            const filteredCourses = globalCourses.courses.filter(course => course.ownerId === userId);
            setCourses(filteredCourses);
        }
    }, [globalCourses.courses, userId])

    return courses;
}