'use client';
import { useMemo } from 'react';
import htmlParse from 'html-react-parser';
import configThemeStore from '@default/modules/config-theme/store';
export default function Styles() {
  const settings = configThemeStore((state) => state.settings);

  const customColor = useMemo(() => {
    const colorsDefault = {
      color_announcement_bar_background: '#18181b',
      color_announcement_bar_text: '#fafafa',
      color_top_bar_background: '#09090b',
      color_title_product: '#09090b',
      color_product_icon: '#eb5757',
      color_price: '#0d9ef2',
      color_sale_price: '#0d9ef2',
      color_cart_button: '#18181b',
      color_cart_button_label: '#fafafa',
      color_compare_at_price: '#bdbdbd',
      footer_background: '#f5f5f4',
      color_footer_text: '#09090b',
    };
    const colorsSetting =
      Object.assign(colorsDefault, settings?.settings?.colors) || colorsDefault;
    // console.log("colorsSetting: ", colorsSetting);
    let colors = `
        :root{
          --primary: ${colorsSetting.color_cart_button};
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
