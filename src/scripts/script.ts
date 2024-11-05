document.addEventListener("DOMContentLoaded", () => {
    const xssCheckbox = document.getElementById("xss") as HTMLInputElement;

    xssCheckbox?.addEventListener("change", () => {
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
    const sdeCheckbox = document.getElementById("sde") as HTMLInputElement;

    sdeCheckbox?.addEventListener("change", () => {
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