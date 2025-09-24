import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.38e09b35f25e43eca1593cb0afde2df5',
  appName: 'SinaisVIP',
  webDir: 'dist',
  server: {
    url: 'https://38e09b35-f25e-43ec-a159-3cb0afde2df5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#1C1C1E',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  }
};

export default config;