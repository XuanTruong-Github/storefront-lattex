'use client';
import { type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import configThemeStore from '@default/modules/config-theme/store';
import generalStore from '@/core/modules/general/store';
import navigationStore from '@/core/modules/navigation/store';

type Props = {
  children: ReactNode;
};
export default function BootstrapProvider({ children }: Props) {
  const [loadGeneral, loadPreference] = generalStore((state) => [
    state.loadGeneral,
    state.loadPreference,
  ]);
  const loadConfigTheme = configThemeStore((state) => state.loadConfigTheme);
  const [getHeaderMenu, getFooterMenu] = navigationStore((state) => [
    state.getHeaderMenu,
    state.getFooterMenu,
  ]);

  useQueries({
    queries: [
      {
        queryKey: ['config-theme'],
        queryFn: loadConfigTheme,
        async onSuccess(data: any) {
          if (data?.theme[0]) {
            const themeSettings = data?.theme[0];
            const menu = {
              header:
                themeSettings.pages?.fixed?.header?.block[2]?.config[0]?.value,
              footer:
                themeSettings.pages?.fixed?.footer?.block[1]?.config[0]?.value,
            };
            await Promise.all([
              getFooterMenu(menu.footer),
              getHeaderMenu(menu.header),
            ]);
          }
        },
        staleTime: 60 * 10000,
      },
      {
        queryKey: ['general'],
        queryFn: loadGeneral,
        staleTime: 60 * 10000,
      },
      {
        queryKey: ['preference'],
        queryFn: loadPreference,
        staleTime: 60 * 10000,
      },
    ],
  });

  return children;
}
