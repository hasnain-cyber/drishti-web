import { useEffect, useState } from "react";
import useGlobalUsers from "./useGlobalUsers";

// hook to get user from global users after filtering by id
export default function (userId: string) {
    const { users } = useGlobalUsers();
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        if (users && userId) {
            const requiredUser = users.find((user: any) => user.id === userId);
            setUser(requiredUser || null);
        }
    }, [users, userId]);

    return user;
}