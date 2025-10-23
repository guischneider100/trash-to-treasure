//import 'dotenv/config';

export default {
  expo: {
    name: 'trash-to-treasure',
    slug: 'trash-to-treasure',
    version: '1.0.0',
    sdkVersion: '54.0.0',
    platforms: ['android', 'ios'],
    extra: {
      eas: {
        projectId: "8d71105e-e814-4049-bbd1-7346fc264079"
      },
      GOOGLE_MAPS_API_KEY: "A",
    },
    android: {
      permissions: ["ACCESS_FINE_LOCATION", "INTERNET"],
      package: "com.guilhermeschneider.trashtotreasure",
      config: {
        googleMaps: {
          apiKey: "A",
        },
      },
    },
  },
};