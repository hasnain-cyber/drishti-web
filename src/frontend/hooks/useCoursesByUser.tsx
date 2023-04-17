import React from "react";
import useGlobalCourses from "./useGlobalCourses";

export default function useCoursesByUser(userId: string) {
    const [userCourses, setUserCourses] = React.useState<any[]>([]);
    const { courses } = useGlobalCourses();


    React.useEffect(() => {
        if (courses) {
            console.log("🚀 ~ file: useCoursesByUser.tsx:9 ~ React.useEffect ~ courses:", courses, userId);
            const filteredCourses = courses.filter(course => course.ownerId === userId);
            setUserCourses(filteredCourses);
        }
    }, [courses, userId])

    return userCourses;
}