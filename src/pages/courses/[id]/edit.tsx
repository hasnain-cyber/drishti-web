import useAuth from "@/frontend/hooks/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";

const edit = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Users Edit</h1>
            {!user && <p>Not logged in!</p>}
            {user && user.id !== id && <p>You are not authorized to edit this user!</p>}
            {user && <EditComponent />}
        </div>
    );
}

const EditComponent = () => {
    const { user, updateProfile: updateUser } = useAuth();

    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (user) {
            const response = await updateUser({
                id: user.id,
                name,
                email
            });
        }
    }

    return (
        <div>
            {user &&
                <Form onSubmit={handleFormSubmit}>
                    <Form.Control required type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                    <Form.Control required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <button type="submit">Submit</button>
                </Form>
            }
        </div>
    );
}

export default edit;