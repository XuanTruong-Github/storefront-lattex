export type State = {
  general: any;
  preference: Preference | null;
};

export type Action = {
  loadGeneral: () => any;
  loadPreference: () => any;
};
export type Preference = {
  favIcon: string;
  homePageTitle: string;
  homePageDescription: string;
  googleAnalyticsIds: string;
  googleAdsConversionTrack: string;
  facebookPixel: string;
  klaviyoApiKey: string;
  addionalScriptHead: string;
  addionalScriptBody: string;
  passwordProtectedEnable: string;
  passwordProtected: string;
  personalizePreview: string;
  personalizePreviewOption: string;
};
