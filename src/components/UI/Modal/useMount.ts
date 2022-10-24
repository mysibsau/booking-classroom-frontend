import { useEffect, useState } from "react";

const useMount = (opened: boolean, ANIMATION_TIME: number) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (opened && !mounted) {
            setMounted(true);
        } else if (!opened && mounted) {
            setTimeout(() => {
                setMounted(false);
            }, ANIMATION_TIME);
        }
    }, [opened]);

    return {
        mounted
    };
};

export default useMount;