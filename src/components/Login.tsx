import React, { useState } from 'react';
import { useApp } from '../store';
import { Building2, UserCircle, KeyRound, ArrowRight } from 'lucide-react';
import { AuthUser } from '../types';
import { signInWithGoogle } from '../lib/firebase';

export function Login() {
  const { login, pendingRegistrations, setRegistrationUser, setAuthState, employees } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication logic
    let user: AuthUser | null = null;
    
    if (username === 'admin' && password === '123456') {
      user = { username: 'admin', role: 'ADMIN', name: 'Quản trị hệ thống' };
    } else if (username === 'lanhdao' && password === '123456') {
      user = { username: 'lanhdao', role: 'MANAGER', employeeId: 'e1', name: 'Nguyễn Văn A' };
    } else if (username === 'truongphong' && password === '123456') {
      user = { username: 'truongphong', role: 'MANAGER', employeeId: 'e2', name: 'Trần Thị B' };
    } else if (username === 'chuyenvien' && password === '123456') {
      user = { username: 'chuyenvien', role: 'USER', employeeId: 'e4', name: 'Phạm Thị D' };
    }

    if (user) {
      login(user);
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      if (firebaseUser) {
        // Admin auto-approval
        if (firebaseUser.email === 'sonthkh@gmail.com') {
          login({
            username: firebaseUser.email,
            role: 'ADMIN',
            name: firebaseUser.displayName || 'Quản trị viên',
            employeeId: 'admin'
          });
          return;
        }

        // Check if user is already an approved employee
        const existingEmployee = employees.find(e => e.id === firebaseUser.uid);
        if (existingEmployee) {
           login({
             username: firebaseUser.email || firebaseUser.uid,
             role: 'USER', // We'll default to USER for non-admins for now
             name: existingEmployee.name,
             employeeId: existingEmployee.id
           });
           return;
        }

        const existingRegistration = pendingRegistrations.find(r => r.uid === firebaseUser.uid);
        if (existingRegistration) {
          if (existingRegistration.status === 'APPROVED') {
             login({
               username: firebaseUser.email || firebaseUser.uid,
               role: 'USER',
               name: existingRegistration.name,
               employeeId: existingRegistration.uid
             });
          } else if (existingRegistration.status === 'PENDING') {
             setRegistrationUser(firebaseUser);
             setAuthState('PENDING_APPROVAL');
          } else {
             alert('Tài khoản của bạn đã bị từ chối.');
             // Optional: sign out from firebase here
          }
        } else {
          // No record found, must register
          setRegistrationUser(firebaseUser);
          setAuthState('REGISTERING');
        }
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi đăng nhập qua Google');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-red-600 p-3 rounded-xl shadow-lg">
            <Building2 size={40} className="text-yellow-300" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Đăng nhập hệ thống
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Văn phòng Đoàn ĐBQH & HĐND
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Tên đăng nhập</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text" required
                  value={username} onChange={e => setUsername(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-2 items-center"
              >
                Đăng nhập
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-2 items-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Đăng nhập bằng Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
