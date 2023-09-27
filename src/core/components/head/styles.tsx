'use client';
import { useMemo } from 'react';
import htmlParse from 'html-react-parser';
import configThemeStore from '@default/modules/config-theme/store';
export default function Styles() {
  const settings = configThemeStore((state) => state.settings);

  const customColor = useMemo(() => {
    const colorsDefault = {
      color_announcement_bar_background: '#000000',
      color_title_product: '#000000',
      color_product_icon: '#eb5757',
      color_price: '#0d9ef2',
      color_sale_price: '#0d9ef2',
      color_top_bar_background: '#000000',
      color_cart_button: '#f29e0d',
      color_cart_button_label: '#ffffff',
      color_compare_at_price: '#bdbdbd',
      footer_background: `#ffffff`,
      color_announcement_bar_text: `#ffffff`,
      color_footer_text: `#242424`,
    };
    const colorsSetting =
      Object.assign(colorsDefault, settings?.settings?.colors) || colorsDefault;
    // console.log("colorsSetting: ", colorsSetting);
    let colors = `
        :root{
        }
        .top-bar{
          background-color: ${colorsSetting.color_announcement_bar_background};
          color: ${colorsSetting.color_announcement_bar_text};
        }
        .footer{}
    `;
    return `<style>${colors.trim()}</style>`;
  }, [settings]);

  const customFont = useMemo(() => {
    const typography = settings?.settings?.typography;
    if (typography) {
      let font = '';
      if (typography?.type_base_family && typography?.type_base_family.url) {
        font += `
        <style>
          @font-face { 
            font-family:'base_family'; 
            src: url(${typography.type_base_family.url.replace(
              'http://',
              'https://'
            )});
          };
        </style>`;
      }
      let overwrite = '';
      overwrite += `
      <style>
        body{font-family:'base_family' !important;}
      </style>`;
      return '';
      return `${font.trim()}${overwrite.trim()}`;
    }
    return '';
  }, [settings]);

  return htmlParse(customFont + customColor);
}
