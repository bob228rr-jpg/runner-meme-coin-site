const toast = document.querySelector("#toast");
const tickerButton = document.querySelector("#copyTicker");
const phraseButtons = document.querySelectorAll(".phrases button");

function showToast(message = "Copied") {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1500);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    showToast(text);
  }
}

tickerButton.addEventListener("click", () => copyText("$SAHULIEN", "Ticker copied"));

phraseButtons.forEach((button) => {
  button.addEventListener("click", () => copyText(button.textContent.trim(), "Meme copied"));
});
