const contractButton = document.querySelector(".button-contract");

contractButton?.addEventListener("click", async () => {
  const text = contractButton.dataset.copy || "soon";

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard can be blocked when the page is opened as a local file.
  }

  const original = contractButton.textContent;
  contractButton.textContent = "Copied: soon";
  contractButton.classList.add("is-copied");

  window.setTimeout(() => {
    contractButton.textContent = original;
    contractButton.classList.remove("is-copied");
  }, 1400);
});
