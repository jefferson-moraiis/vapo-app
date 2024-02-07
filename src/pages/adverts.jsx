import { Helmet } from 'react-helmet-async';

import { AdvertsView } from '../sections/adverts/view';

export default function AdvertsPage() {
  return (
    <>
      <Helmet>
        <title> Anúncios </title>
      </Helmet>

      <AdvertsView />
    </>
  );
}
