export default function setDarkMode(value: boolean) {
    let html = document.querySelector("html");
    if (!html) return value;
    // setting dark mode
    if (value) {
        html.classList.add("dark");
    }

    // setting light mode
    if (!value) {
        html.classList.remove("dark");
    }

    return value;
}