function buypass() {
    new PaymentRequest(
        [
            {
                supportedMethods: "pay/main.json",
                data: { url: "https://brrrrrr.pages.dev/service/dynamic/" + document.querySelector("input").value },
            },
        ],
        {
            total: {
                label: "_",
                amount: { value: "1", currency: "USD" },
            },
        }
    ).show();
}

document.querySelector("button").onclick = buypass;
