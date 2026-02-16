import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import AdminLayout from '@/components/AdminLayout';
import BrandLayout from '@/components/BrandLayout';

//const PUBLIC_ROUTES = ['/','/register','/brands-job','/for-creators','/blog','/fake-followers-checker','/login','/403','/404','/verify-email','/influencer/dashboard'];

const PUBLIC_ROUTES = [
  '/',
  '/register',
  '/login',
  '/403',
  '/404',
  '/verify-email',
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname;

  // 1️⃣ Public pages (NO layout)
  if (
    PUBLIC_ROUTES.includes(path) ||
    path.startsWith('/blog') ||
    path.startsWith('/brands-job') ||
    path.startsWith('/fake-followers-checker') ||
    path.startsWith('/for-brands') ||
     path.startsWith('/about-us') ||
    path.startsWith('/for-creators')
  ) {
    return <Component {...pageProps} />;
  }

  // 2️⃣ Brand pages
  if (path.startsWith('/brand/')) {
    return (
      <BrandLayout>
        <Component {...pageProps} />
      </BrandLayout>
    );
  }

  // 3️⃣ Admin pages (default)
  if (path.startsWith('/admin/')) {
    return(
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

  if (path.startsWith('/dashboard/')) {
    return(
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

}
