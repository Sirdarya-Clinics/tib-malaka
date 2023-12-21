'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';

export function Logout() {
  const user = useAuth();
  const exit = () => {
    user.logout()
    redirect('/');
  };
  return (
    <>
      <button className='rounded-md text-black hover:bg-red-400 bg-red-300 p-2' onClick={exit}>Admindan chiqish</button>
    </>
  );
}