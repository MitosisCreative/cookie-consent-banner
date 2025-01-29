import "./style.css";

export class CookieConsent {
  constructor(config) {
    this.config = {
      heading: "Cookie Preferences",
      body: "We use cookies to enhance your experience. Manage your preferences below:",
      privacyPolicy: null,
      cookiePolicy: null,
      gtmid : null,
      ...config,
    };

    this.cookieName = "cookie_consent_status";
    this.init(); 
  }

  init() {
    this.initDataLayer();
    this.injectGTM();

    if (this.hasConsentPref()) {
      return;
    }
    this.createPopup();
  }

  initDataLayer() {
    // Load the GTM Code
    window.dataLayer = window.dataLayer || [];
    // dataLayer.push({'gtm.start': new Date().getTime(), 'event': 'gtm.js'});
    window.gtag = function() {
        dataLayer.push(arguments);
    }

    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });

    if (this.hasConsentPref()) {
      this.setConsentPref()
    }
    
  }

  injectGTM() {
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.gtmid}`;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(gtmScript,firstScript);
  }

  hasConsentPref() {
    return localStorage.getItem("consentSettings");
  }

  setConsentPref() {
    const pref = JSON.parse(localStorage.getItem("consentSettings"));
    gtag('consent', 'update', pref);
  }

  async isUserInAllowedCountry() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return this.config.allowedCountries.includes(data.country_code);
    } catch (error) {
      console.error("Error fetching user location:", error);
      return false;
    }
  }

  createPopup() {
    const popup = document.createElement("div");
    popup.id = "cookie-consent-popup";
    popup.className = "consent-container";

    let policyLinks = "";
    if (this.config.privacyPolicy) {
      policyLinks += `<a href='${this.config.privacyPolicy}' class=''>Privacy Policy</a> `;
    }
    if (this.config.cookiePolicy) {
      policyLinks += `<a href='${this.config.cookiePolicy}' class=''>Cookie Policy</a>`;
    }

    popup.innerHTML = `
      <div class="consent-container-popup">
        <h2 class="">${this.config.heading}</h2>
        <p class="">${this.config.body}</p>
        ${policyLinks ? `<p class='policy-links'>${policyLinks}</p>` : ""}
        <div class="consent-container-buttons">
          <button id="accept-all" class="cookie-button-all">Accept All</button>
          <button id="necessary-only" class="cookie-button-necessary">Only Necessary</button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);
    this.addEventListeners();
  }

  addEventListeners() {
    document.getElementById("accept-all").addEventListener("click", () => {
      this.updateConsentPref({
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted"
      });
    });

    // document.getElementById("save-settings").addEventListener("click", () => {
    //   this.setCookieSettings({ functional: true, analytics: false, marketing: false });
    // });

    document.getElementById("necessary-only").addEventListener("click", () => {
      this.updateConsentPref({
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
        analytics_storage: "denied"
      });
    });
  }

  updateConsentPref(consentSettings: Object) {
    localStorage.setItem("consentGranted", JSON.stringify(consentSettings));
    gtag('consent', 'update', consentSettings);
    this.closePopup();
  }

  closePopup() {
    document.getElementById("cookie-consent-popup")?.remove();
  }
}

export default CookieConsent;