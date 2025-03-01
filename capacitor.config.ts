import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CStad',
  webDir: 'www',
  "server": {
    "androidScheme": "http",
    "cleartext": true,
    "allowNavigation": [
      "https://restcountries.com"
    ]
  }
};

export default config;
