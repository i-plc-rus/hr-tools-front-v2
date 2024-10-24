const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
  name: 'MyAPI',
  output: path.resolve(__dirname, './src/app/api'),
  url: 'https://api.hr-tools.pro/docs/swagger.json',
  templates: path.resolve(__dirname, './node_modules/@archeion/swagger-angular-api/templates/angular'),
  // Currently only modular mode is supported.
  modular: true,
  // Optionally you can add options to personalize angular generation
  angular: {
    generateIndex: true,
  },
  hooks: {
    // Don't forget to add onInit hook
    onInit: () => {
      console.log('init');
    }
  }
})
  .then(() => {
    console.log('Angular services generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating Angular services:', err);
  });
