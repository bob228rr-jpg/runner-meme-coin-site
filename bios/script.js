const scenes = {
  boot: document.querySelector('[data-scene="boot"]'),
  error: document.querySelector('[data-scene="error"]'),
  bios: document.querySelector('[data-scene="bios"]'),
};

const bootStatus = document.querySelector("[data-boot-status]");
const biosLines = [...document.querySelectorAll("[data-bios-copy] [data-text]")];
const biosCard = document.querySelector("[data-bios-card]");
const biosFooter = document.querySelector("[data-bios-footer]");

const statusLines = [
  "Starting Windows...",
  "Loading system files...",
  "Checking boot sector...",
  "Something went wrong...",
];

let statusIndex = 0;

const showScene = (name) => {
  Object.values(scenes).forEach((scene) => scene.classList.remove("is-active"));
  scenes[name].classList.add("is-active");
};

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const typeLine = async (line) => {
  const text = line.dataset.text;

  line.classList.add("is-typing");

  for (let index = 0; index < text.length; index += 1) {
    line.textContent += text[index];
    await wait(index < 3 ? 18 : 24);
  }

  line.classList.remove("is-typing");
};

const runBiosPost = async () => {
  biosLines.forEach((line) => {
    line.textContent = "";
    line.classList.remove("is-typing");
  });

  biosCard.classList.remove("is-drawing");
  biosFooter.classList.remove("is-visible");

  await wait(260);

  for (const line of biosLines) {
    await typeLine(line);
    await wait(line === biosLines.at(-1) ? 420 : 110);
  }

  biosCard.classList.add("is-drawing");
  await wait(2100);
  biosFooter.classList.add("is-visible");
};

const updateStatus = () => {
  statusIndex = Math.min(statusIndex + 1, statusLines.length - 1);
  bootStatus.textContent = statusLines[statusIndex];
};

const statusTimer = window.setInterval(updateStatus, 780);

window.setTimeout(() => {
  window.clearInterval(statusTimer);
  showScene("error");
}, 3300);

window.setTimeout(() => {
  scenes.error.classList.add("is-glitching");
}, 4700);

window.setTimeout(() => {
  showScene("bios");
  runBiosPost();
}, 5350);
