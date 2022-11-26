import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ApiMap } from '../api/apiMap';
import { api, TMethod } from '../api/useApi';
import Button from '../component/ui/Button';
import { BoxCenterV } from '../component/ui/layouts/Box';
import { ILoginResponse } from '../dto/auth.dto';

export default function Home() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  function handleOnChange(evt: any) {
    setFormData((prev) => {
      return {
        ...Object.assign(prev, { [evt.target.name]: evt.target.value }),
      };
    });
  }

  async function handleLogin() {
    const { LOGIN } = ApiMap.AUTH;
    try {
      const result = await api(LOGIN.url, LOGIN.method as TMethod, {
        body: formData,
      });
      const userData: ILoginResponse = result.data;
      const { permissions, ...rest } = userData;
      localStorage.setItem('permissions', JSON.stringify(permissions));
      localStorage.setItem('userdata', JSON.stringify(rest));
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login Page' />
      </Head>
      <BoxCenterV styles={{ height: '100vh', width: '100vw' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '300' }}>Login</h1>
        <section style={{ width: '400px' }}>
          <input
            type='text'
            placeholder='Enter email'
            name='email'
            value={formData.email}
            onChange={handleOnChange}
          />
          <input
            type='password'
            placeholder='Enter password'
            name='password'
            value={formData.password}
            onChange={handleOnChange}
          />
          <Button
            type={'secondary'}
            text='Login'
            css={{ width: '100%', padding: '8px', borderRadius: '10px' }}
            onClick={handleLogin}
          />
        </section>
      </BoxCenterV>
    </div>
  );
}
