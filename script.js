const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const original = button.textContent;
    const value = button.getAttribute("data-copy") || "$RUNNER";

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Ticker copied";
    } catch {
      button.textContent = value;
    }

    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
});
