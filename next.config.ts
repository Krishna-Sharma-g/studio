import type {NextConfig} from 'next';

// Ensure server process does not expose a broken `localStorage` global.
// Some environments or flags can create a `localStorage` object in Node
// that lacks the expected methods; Next's server code checks
// `typeof localStorage !== 'undefined'` and will call `getItem` if present.
// Remove it here so server-side code treats it as undefined.
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof global !== 'undefined' && (global as any).localStorage) {
    try {
      // Attempt to delete the property
      // @ts-ignore
      delete (global as any).localStorage;
    } catch (_) {
      // Fallback: set to undefined
      // @ts-ignore
      (global as any).localStorage = undefined;
    }
  }
} catch (_) {}

// Ensure a safe stub exists so server-side code that (incorrectly) expects
// `localStorage.getItem` won't throw during dev. This is a harmless no-op
// shim for server execution.
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof global !== 'undefined') {
    // Only set a stub if there's no valid getItem function.
    // @ts-ignore
    const ls = (global as any).localStorage;
    if (!ls || typeof ls.getItem !== 'function') {
      // @ts-ignore
      (global as any).localStorage = {
        getItem: (_key: string) => null,
        setItem: (_key: string, _value: string) => {},
        removeItem: (_key: string) => {},
        clear: () => {},
        key: (_index: number) => null,
        length: 0,
      };
    }
  }
} catch (_) {}

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https'
        ,
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.iconfinder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.iconscout.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
