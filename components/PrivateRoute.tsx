import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/store/store';

// @ts-ignore
export function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return children;
}