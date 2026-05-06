const toast = document.querySelector(".toast");
const copyButtons = document.querySelectorAll("[data-copy]");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1500);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied: " + text);
  } catch {
    showToast(text);
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    copyText(button.dataset.copy);
  });
});
