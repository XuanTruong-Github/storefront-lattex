export type State = {
  headerMenu: any;
  footerMenu: any;
};
export type Action = {
  getHeaderMenu: (id: string) => void;
  getFooterMenu: (id: string) => void;
};
