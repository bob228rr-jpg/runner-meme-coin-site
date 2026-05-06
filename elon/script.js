const copyButtons = document.querySelectorAll("[data-copy]");
const toast = document.querySelector(".toast");

if (copyButtons.length && toast) {
  copyButtons.forEach((copyButton) => {
    copyButton.addEventListener("click", async () => {
      const value = copyButton.getAttribute("data-copy");

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = value;
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        fallback.remove();
      }

      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
    });
  });
}
