import { Helmet } from 'react-helmet-async';

import { AdvertView } from '../sections/adverts/view';

export default function AdvertPage() {
  return (
    <>
      <Helmet>
        <title> Anúncios </title>
      </Helmet>

      <AdvertView />
    </>
  );
}
