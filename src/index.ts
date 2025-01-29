import "./style.css";

interface CookieSettings {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function initializeCookieConsentPopup() {
  const popup = document.createElement("div");
  popup.id = "cookie-consent-popup";
  popup.className = "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  popup.innerHTML = `
    <div class="popupcookie">
      <h2 class="text-lg font-bold mb-4">Cookie Preferences</h2>
      <p class="text-sm text-gray-600 mb-4">We use cookies to enhance your experience. Manage your preferences below:</p>
      <form id="cookie-consent-form">
        <label class="flex items-center mb-2">
          <input type="checkbox" name="functional" class="mr-2"> Functional Cookies
        </label>
        <label class="flex items-center mb-2">
          <input type="checkbox" name="analytics" class="mr-2"> Analytics Cookies
        </label>
        <label class="flex items-center mb-2">
          <input type="checkbox" name="marketing" class="mr-2"> Marketing Cookies
        </label>
        <div class="flex justify-end mt-4">
          <button type="button" id="accept-all" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept All</button>
          <button type="button" id="save-settings" class="bg-blue-500 text-white px-4 py-2 rounded">Save Preferences</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("accept-all")?.addEventListener("click", () => {
    setCookieSettings({ functional: true, analytics: true, marketing: true });
    closePopup();
  });

  document.getElementById("save-settings")?.addEventListener("click", () => {
    const form = document.getElementById("cookie-consent-form") as HTMLFormElement;
    const settings: CookieSettings = {
      functional: form.functional.checked,
      analytics: form.analytics.checked,
      marketing: form.marketing.checked,
    };
    setCookieSettings(settings);
    closePopup();
  });
}

function setCookieSettings(settings: CookieSettings) {
  console.log("Cookie settings saved:", settings);
  // TODO: Update GTM data layer here
}

function closePopup() {
  const popup = document.getElementById("cookie-consent-popup");
  popup?.remove();
}
