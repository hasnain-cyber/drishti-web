import React from "react";
import useGlobalCourses from "./useGlobalCourses";

export default function useCoursesByUser(userId: string) {
    const [courses, setCourses] = React.useState<any[]>([]);
    const globalCourses = useGlobalCourses();
    React.useEffect(() => {
        if (globalCourses.courses) {
            const filteredCourses = globalCourses.courses.filter(course => course.ownerId === userId);
            setCourses(filteredCourses);
        }
    }, [globalCourses.courses, userId])

    return courses;
}