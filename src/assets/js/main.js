import { consent } from '@jarijokinen/consent';
import { header } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  const consentOptions = {
    storages: {
      analytics_storage: 'Analytics'
    },
    dialogTitle: 'Privacy Preferences',
    dialogMessage: 'With your permission, we use these cookies to understand how the site is used.',
    dialogMarkup: `
      <h2 class="consent-title"></h2>
      <p>
        <span class="consent-message"></span>
        <a href="/cookies">Learn&nbsp;More</a>
      </p>
      <div class="consent-fields"></div>
      <div class="consent-buttons"></div>
    `
  };

  consent(consentOptions);
  header();
});
