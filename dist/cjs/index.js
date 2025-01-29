(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode("#cookie-consent-popup .consent-container-popup{background:#0009;border:1px solid rgba(255,255,255,.2);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);position:fixed;padding:20px;box-shadow:3px 3px 3px #0003;border-radius:12px;z-index:999;bottom:20px;right:20px;color:#fff}#cookie-consent-popup .policy-links{text-align:center}#cookie-consent-popup h2{font-size:1.4em;font-weight:700;border-bottom:1px solid rgba(255,255,255,.2);margin-bottom:.5em;padding-bottom:.5em}#cookie-consent-popup .consent-container-buttons{margin-top:2em;display:flex;align-items:center;justify-content:space-around}#cookie-consent-popup .consent-container-buttons button{padding:10px 15px;border-radius:6px;border:none;font-size:16px;cursor:pointer}#cookie-consent-popup .consent-container-buttons button.cookie-button-all{background:#00a5ea;background:oklch(.685 .169 237.323)}#cookie-consent-popup .consent-container-buttons button.cookie-button-all:hover{background:#61c4ff;background:oklch(.785 .169 237.323)}#cookie-consent-popup .consent-container-buttons button.cookie-button-necessary{background:transparent}#cookie-consent-popup .consent-container-buttons button.cookie-button-necessary:hover{background:#fff3}")),document.head.appendChild(o)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});class n{constructor(e){this.config={heading:"Cookie Preferences",body:"We use cookies to enhance your experience. Manage your preferences below:",privacyPolicy:null,cookiePolicy:null,gtmid:null,...e},this.cookieName="cookie_consent_status",this.init()}init(){this.initDataLayer(),this.injectGTM(),!this.hasConsentPref()&&this.createPopup()}initDataLayer(){window.dataLayer=window.dataLayer||[],window.gtag=function(){dataLayer.push(arguments)},gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"}),this.hasConsentPref()&&this.setConsentPref()}injectGTM(){const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtm.js?id=${this.config.gtmid}`;const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}hasConsentPref(){return localStorage.getItem("consentSettings")}setConsentPref(){const e=JSON.parse(localStorage.getItem("consentSettings"));gtag("consent","update",e)}async isUserInAllowedCountry(){try{const t=await(await fetch("https://ipapi.co/json/")).json();return this.config.allowedCountries.includes(t.country_code)}catch(e){return console.error("Error fetching user location:",e),!1}}createPopup(){const e=document.createElement("div");e.id="cookie-consent-popup",e.className="consent-container";let t="";this.config.privacyPolicy&&(t+=`<a href='${this.config.privacyPolicy}' class=''>Privacy Policy</a> `),this.config.cookiePolicy&&(t+=`<a href='${this.config.cookiePolicy}' class=''>Cookie Policy</a>`),e.innerHTML=`
      <div class="consent-container-popup">
        <h2 class="">${this.config.heading}</h2>
        <p class="">${this.config.body}</p>
        ${t?`<p class='policy-links'>${t}</p>`:""}
        <div class="consent-container-buttons">
          <button id="accept-all" class="cookie-button-all">Accept All</button>
          <button id="necessary-only" class="cookie-button-necessary">Only Necessary</button>
        </div>
      </div>
    `,document.body.appendChild(e),this.addEventListeners()}addEventListeners(){document.getElementById("accept-all").addEventListener("click",()=>{this.updateConsentPref({ad_user_data:"granted",ad_personalization:"granted",ad_storage:"granted",analytics_storage:"granted"})}),document.getElementById("necessary-only").addEventListener("click",()=>{this.updateConsentPref({ad_user_data:"denied",ad_personalization:"denied",ad_storage:"denied",analytics_storage:"denied"})})}updateConsentPref(e){localStorage.setItem("consentGranted",JSON.stringify(e)),gtag("consent","update",e),this.closePopup()}closePopup(){var e;(e=document.getElementById("cookie-consent-popup"))==null||e.remove()}}exports.CookieConsent=n;exports.default=n;
