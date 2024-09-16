// utils/navigation.ts
import { useNavigate as useReactNavigate } from 'react-router-dom';
import { useRouter as useNextRouter } from 'next/router';

export const useNavigation = () => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/sign-in') || window.location.pathname.includes('/sign-up')) {
        // Next.js environment
        const router = useNextRouter();
        return (path: string) => router.push(path);
    } else {
        // React environment
        const navigate = useReactNavigate();
        return (path: string) => navigate(path);
    }
};