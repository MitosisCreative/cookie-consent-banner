function l() {
  var n, o;
  const e = document.createElement("div");
  e.id = "cookie-consent-popup", e.className = "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50", e.innerHTML = `
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
  `, document.body.appendChild(e), (n = document.getElementById("accept-all")) == null || n.addEventListener("click", () => {
    c({ functional: !0, analytics: !0, marketing: !0 }), s();
  }), (o = document.getElementById("save-settings")) == null || o.addEventListener("click", () => {
    const t = document.getElementById("cookie-consent-form"), i = {
      functional: t.functional.checked,
      analytics: t.analytics.checked,
      marketing: t.marketing.checked
    };
    c(i), s();
  });
}
function c(e) {
  console.log("Cookie settings saved:", e);
}
function s() {
  const e = document.getElementById("cookie-consent-popup");
  e == null || e.remove();
}
export {
  l as initializeCookieConsentPopup
};
