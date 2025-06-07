function buypass() {


const supportedInstruments = [
  {
            supportedMethods: location.origin + "/pay/manifest.json",
      data:{url:document.querySelector("input").value},
  },
];

const details = {
  total: { label: "Donation", amount: { currency: "USD", value: "65.00" } },

};

const options = { requestShipping: true };


  const request = new PaymentRequest(supportedInstruments, details, options);
  request
    .show()

}
document.querySelector("button").onclick = buypass;
