const toast = document.querySelector("#toast");
const tickerButton = document.querySelector("#copyTicker");
const postButton = document.querySelector("#copyPost");
const phraseButtons = document.querySelectorAll(".phrases button");

const xPost = `Name: UFO UFO UFO SAHULIEN
Ticker: $SAHULIEN

They told us Tung Tung Sahur was just a meme.

Then the documents dropped.

Now we know the truth:
SAHULIEN was never from Earth.

$SAHULIEN is waking up the universe.`;

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
postButton.addEventListener("click", () => copyText(xPost, "X post copied"));

phraseButtons.forEach((button) => {
  button.addEventListener("click", () => copyText(button.textContent.trim(), "Meme copied"));
});
