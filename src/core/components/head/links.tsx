'use client';
import { Fragment } from 'react';
import generalStore from '@/core/modules/general/store';
import helpers from '@/core/utils/helpers';

export default function Links() {
  const [favicons] = generalStore((state) => {
    const favicons = {
      favicon32: '/images/favicon-32x32.png',
      favicon16: '/images/favicon-16x16.png',
    };
    if (state.preference?.favIcon) {
      favicons.favicon32 = helpers.parseImageUrl(state.preference.favIcon, {
        width: 32,
        height: 32,
      });
      favicons.favicon16 = helpers.parseImageUrl(state.preference.favIcon, {
        width: 16,
        height: 16,
      });
    }
    return [favicons];
  });

  return (
    <Fragment>
      <link rel='icon' href={favicons.favicon32} />
      <link rel='shortcut icon' href={favicons.favicon16} type='image/x-icon' />
    </Fragment>
  );
}
