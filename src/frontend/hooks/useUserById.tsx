import { useEffect, useState } from "react";
import useGlobalUsers, { UserType } from "./useGlobalUsers";

// hook to get user from global users after filtering by id
export default function (userId: string) {
    const { users } = useGlobalUsers();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        if (users && userId) {
            const requiredUser = users.find((element) => element.id === userId);
            setUser(requiredUser || null);
        }
    }, [users, userId]);

    return user;
}