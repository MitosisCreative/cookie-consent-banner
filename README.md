## Cookie Consent banner

A simplified library to initialize google tag manager with default consent settings. It creates a modal asking users to consent before updating the consent settings and storing them in local storage. 

You still *must* configure your constent settings on your tags inside of google tag manager.

### Usage

#### As ESModule
```html
<script type="module">
  import CookieConsent from '@zmsaunders/cookie-consent';
  new CookieConsent({
      heading: "Your Privacy Matters",
      body: "We use cookies for personalization and analytics. Choose your preferences:",
      privacyPolicy: "/privacy-policy.html", // optional
      cookiePolicy: "/cookie-policy.html", // Optional
      gtmid : "GTM-XXXXXX"
  });
</script>
```

#### 'Vanilla' JS:
```html
<script src="//www.unpkg.com/@zmsaunders/cookie-consent/dist/umd/index.js" type="text/javascript"></script>
<script>
    new CookieConsentPopup.CookieConsent({
      heading: "Your Privacy Matters",
      body: "We use cookies for personalization and analytics. Choose your preferences:",
      privacyPolicy: "/privacy-policy.html", // optional
      cookiePolicy: "/cookie-policy.html", // Optional
      gtmid : "GTM-XXXXXX"
    });        
</script>
```

### Workflow

The `CookieConsent` Object first initializes the gtag object with consent denied. It then checks localstorage to see if consent was previously granted. If so, it fires a consent update to set the appropriate consent flags. After this setup, it then injects the GTM code into the dom.

If localstorage did not have a stored consent setting, it then injects a styled modal to appear in the bottom right corner. You can add custom CSS to your stylesheet to override the styles. The markup for the box follows this structure:

```html
<div class="consent-container-popup">
  <h2>[[HEADING]]</h2>
  <p class="consent-body">[[BODY]]</p>
  <div class="consent-container-buttons">
    <button id="accept-all" class="cookie-button-all">Accept All</button>
    <button id="necessary-only" class="cookie-button-necessary">Only Necessary</button>
  </div>
  <!-- Only present if one of these was set -->
  <div class="policy-links">
    <a href="[[privacyPolicy]]">Privacy Policy</a>
    <a href="[[cookiePolicy]]">Cookie Policy</a>
  </div>
</div>
```