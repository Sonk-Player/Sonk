import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sonk.app',
  appName: 'Sonk',
  webDir: 'dist/sonk/browser',
  bundledWebRuntime: false,
  server:{
    androidScheme: 'http'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
