import useAuth from "@/frontend/hooks/useAuth";
import useUsers, { UserType } from "@/frontend/hooks/useUsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
    const router = useRouter();
    const { id: userId } = router.query;
    const [user, setUser] = useState<UserType | null>(null);
    const { users, usersStatus } = useUsers();
    useEffect(() => {
        if (users && userId) {
            const requiredUser = users.find((element) => element.id === userId);
            setUser(requiredUser || null);
        }
    }, [users, userId]);

    const { user: loggedInUser } = useAuth();

    return (
        <div>
            <h1>{user && user['name']}</h1>
            {loggedInUser && loggedInUser['id'] === userId && <button>Edit</button>}
            <button>Edit2</button>
        </div>
    );
};

export default index;