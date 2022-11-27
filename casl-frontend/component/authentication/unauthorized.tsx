import { AppProps } from 'next/app';
import { BoxCenterV } from '../ui/Box';

export default function Unauthorized() {
  return (
    <BoxCenterV styles={{ height: '100vh' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '300' }}>Unauthorized</h1>
      <p>If you think this is by mistake, please reach out to admin</p>
    </BoxCenterV>
  );
}
