import React from "react";
import useGlobalCourses from "./useGlobalCourses";

export default function useCoursesByUser(userId: string | null) {
    const [userCourses, setUserCourses] = React.useState<any[]>([]);
    const { courses } = useGlobalCourses();

    React.useEffect(() => {
        if (courses && userId) {
            const filteredCourses = courses.filter(course => course.ownerId === userId);
            setUserCourses(filteredCourses);
        }
    }, [courses, userId])

    return userCourses;
}