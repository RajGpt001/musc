export const config = {
  // Base URLs for assets and APIs
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  assetBaseUrl: import.meta.env.VITE_ASSET_BASE_URL || '',

  // Feature Toggles
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // App Metadata
  appName: 'FORGE',
  contactEmail: 'support@forgeapparel.com',

  // Asset paths (using the assetBaseUrl)
  paths: {
    models: (filename: string) => `${import.meta.env.VITE_ASSET_BASE_URL || ''}/assets/models/${filename}`,
    textures: (filename: string) => `${import.meta.env.VITE_ASSET_BASE_URL || ''}/assets/textures/${filename}`,
  }
};
