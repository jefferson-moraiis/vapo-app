import { Helmet } from 'react-helmet-async';

import { RegisterView } from '../sections/register';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Cadastra-se </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
