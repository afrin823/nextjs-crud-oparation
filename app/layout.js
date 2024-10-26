import './globals.css';
import { Session } from 'next-auth';
import { Inter } from 'next/font/google';
import AuthProvider from '@components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
  title: 'Your App Title Here', // Update with your app's title
  description: 'Description of your app goes here', // Update with your app's description
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
