import { useEffect, useState } from "react";
import useGlobalUsers from "./useGlobalUsers";

// hook to get user from global users after filtering by id
export default function (userId: string | null) {
    const { users } = useGlobalUsers();
    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        if (users && userId) {
            const requiredUser = users.find((user: any) => user.id === userId);
            setUserData(requiredUser);
        }
    }, [users, userId]);

    return { userData };
}