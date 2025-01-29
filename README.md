## Cookie Consent banner

### Usage
```html
  <script type="module">
        import CookieConsent from 'cookie-consent-banner';
        const banner = new CookieConsent({
          heading: "Your Privacy Matters",
          body: "We use cookies for personalization and analytics. Choose your preferences:",
          privacyPolicy: "/privacy-policy.html", // optional
          cookiePolicy: "/cookie-policy.html", // Optional
          gtmid : "GTM-XXXXXX"
        });        
    </script>
```