import { Helmet } from 'react-helmet-async';

import { AddAdvertsView } from '../sections/adverts/view';

export default function AdvertsPage() {
  return (
    <>
      <Helmet>
        <title> Inserir Anúncio </title>
      </Helmet>

      <AddAdvertsView />
    </>
  );
}
