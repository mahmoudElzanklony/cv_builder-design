export default ({ app }) => {
  const ReploadCaptchaApi = () => {
    // Check if we are in a browser environment
    if (process.client) {
      // Replace 'YOUR_CDN_SCRIPT_URL' with your actual CDN script URL
      const scriptUrl = 'https://www.google.com/recaptcha/api.js';

      // Create a new script element
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;

      // Remove existing script elements with the same URL
      document.querySelectorAll(`script[src="${scriptUrl}"]`).forEach((el) => {
        el.remove();
      });

      // Append the new script element to the document head
      document.head.appendChild(script);
    }
  };

  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    ReploadCaptchaApi();
    // Do something to validate
  });
};
