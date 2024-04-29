function buypass() {
    new PaymentRequest(
        [
            {
                supportedMethods: "https://brrrrrr.pages.dev/service/uv/" + document.querySelector("input").value,
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
