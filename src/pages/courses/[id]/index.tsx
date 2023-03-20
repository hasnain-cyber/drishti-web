import { useRouter } from "next/router";

const index = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            
        </div>
    );
};

export default index;