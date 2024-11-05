"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const xssCheckbox = document.getElementById("xss");
    xssCheckbox === null || xssCheckbox === void 0 ? void 0 : xssCheckbox.addEventListener("change", () => {
        const isChecked = xssCheckbox.checked;
        fetch('/home/xssToggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `xss=${isChecked ? 'on' : 'off'}`,
        }).then(() => {
        }).catch(error => console.error("Greška:", error));
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const sdeCheckbox = document.getElementById("sde");
    sdeCheckbox === null || sdeCheckbox === void 0 ? void 0 : sdeCheckbox.addEventListener("change", () => {
        const isChecked = sdeCheckbox.checked;
        fetch('/home/sdeToggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `sde=${isChecked ? 'on' : 'off'}`,
        }).then(() => {
        }).catch(error => console.error("Greška:", error));
    });
});
