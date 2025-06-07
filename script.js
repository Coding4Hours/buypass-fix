function buypass() {


const supportedInstruments = [
  {
            supportedMethods: location.origin + "/main.json",
      data:{url:document.querySelector("input").value},
  },
];

const details = {
  total: { label: "Donation", amount: { currency: "USD", value: "65.00" } },

};

const options = { requestShipping: true };


  const request = new PaymentRequest(    [
      {
        supportedMethods: location.origin + "/payment-manifest.json",
        data: {
          url: document.querySelector("input").value
        },
      },
    ],
    {
      total: {
        label: "_",
        amount: {
          value: "1", currency: "USD"
        },
      },
    });
  request
    .show()

}
document.querySelector("button").onclick = buypass;
