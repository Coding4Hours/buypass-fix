self.addEventListener("canmakepayment", (e) => e.respondWith(true));

self.addEventListener("paymentrequest", async (event) => {
    let reject;
    let promise = new Promise((_, reject_) => {
        reject = reject_;
    });

    event.respondWith(promise);

    let client = await event.openWindow("/buypass-fix/navigate.html");
    if (!client) {
        return reject("Failed to open window.");
    }

    let data = event.methodData[0].data;
    let urlToOpen = data ? data.url : "https://google.com";

    if (!urlToOpen.startsWith("http")) {
        return reject("Not a valid URL to open.")
    }

    client.postMessage({ url: urlToOpen });
});














/**
 * Builds PaymentRequest for the BobBucks payment method, but does not show any UI yet.
 *
 * @return {PaymentRequest} The PaymentRequest oject.
 */
function initPaymentRequest() {
  let supportedInstruments = [{
    supportedMethods: 'https://bobbucks.dev/pay',
  }];

  let details = {
    total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'USD', value: '65.00'},
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'USD', value: '-10.00'},
      },
    ],
  };

  return new PaymentRequest(supportedInstruments, details);
}

/**
 * Invokes PaymentRequest for the BobBucks payment method.
 *
 * @param {PaymentRequest} request The PaymentRequest object.
 */
function onBuyClicked(request) {
  request.show().then(function(instrumentResponse) {
    sendPaymentToServer(instrumentResponse);
  })
  .catch(function(err) {
    ChromeSamples.setStatus(err);
  });
}

/**
 * Simulates processing the payment data on the server.
 *
 * @param {PaymentResponse} instrumentResponse The payment information to
 * process.
 */
function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  window.setTimeout(function() {
    instrumentResponse.complete('success')
        .then(function() {
          document.getElementById('result').innerHTML =
              instrumentToJsonString(instrumentResponse);
        })
        .catch(function(err) {
          ChromeSamples.setStatus(err);
        });
  }, 2000);
}

/**
 * Converts the payment instrument into a JSON string.
 *
 * @private
 * @param {PaymentResponse} instrument The instrument to convert.
 * @return {string} The JSON string representation of the instrument.
 */
function instrumentToJsonString(instrument) {
  let details = instrument.details;

  return JSON.stringify({
    methodName: instrument.methodName,
    details: details,
  }, undefined, 2);
}

const payButton = document.getElementById('buyButton');
payButton.setAttribute('style', 'display: none;');
if (window.PaymentRequest) {
  let request = initPaymentRequest();
  payButton.setAttribute('style', 'display: inline;');
  payButton.addEventListener('click', function() {
    onBuyClicked(request);
    request = initPaymentRequest();
  });
} else {
  ChromeSamples.setStatus('This browser does not support web payments');
}
