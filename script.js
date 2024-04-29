function buypass() {
    new PaymentRequest(
        [
            {
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
