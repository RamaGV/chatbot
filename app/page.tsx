'use client'

import { ThemeProvider } from '@/context/themeContext';
import ChatAppPage from './chatapp/page';

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <ChatAppPage />
      </ThemeProvider>
    </>
  );
}
