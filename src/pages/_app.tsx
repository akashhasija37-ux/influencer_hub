import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// 1. Import BOTH layouts
import AdminLayout from '@/components/AdminLayout';
import BrandLayout from '@/components/BrandLayout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname;

  // 2. This is the logic to choose the layout.
  // If the URL is http://.../brand/dashboard, path is "/brand/dashboard"
  if (path.startsWith('/brand/')) {
    return (
      <BrandLayout>
        <Component {...pageProps} />
      </BrandLayout>
    );
  }

  // 3. Add logic for any public pages (like a login page)
  if (path === '/') {
    return <Component {...pageProps} />;
  }

  // 4. Default to the AdminLayout for all other pages
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}