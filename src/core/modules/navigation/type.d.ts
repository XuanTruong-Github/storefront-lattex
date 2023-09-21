export type State = {
  headerMenu: any;
  footerMenu: any;
};
export type Action = {
  getHeaderMenu: (id: string | null) => void;
  getFooterMenu: (id: string | null) => void;
};
