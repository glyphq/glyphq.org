/// <reference lib="dom" />
/// <reference lib="es2020" />

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) throw new Error("Copy failed");
};

const initialize = () => {
  for (const pre of document.querySelectorAll<HTMLElement>("pre:not([data-copy-ready])")) {
    const code = pre.querySelector("code");
    if (!code) continue;

    pre.dataset.copyReady = "true";
    pre.style.position = "relative";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    button.setAttribute("aria-live", "polite");

    button.addEventListener("click", async () => {
      try {
        await copyText((code.textContent ?? "").replace(/\n$/, ""));
        button.textContent = "Copied";
        button.dataset.copied = "true";
        window.setTimeout(() => {
          button.textContent = "Copy";
          delete button.dataset.copied;
        }, 1600);
      } catch {
        button.textContent = "Failed";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1600);
      }
    });

    pre.appendChild(button);
  }
};

initialize();
document.addEventListener("astro:page-load", initialize);
