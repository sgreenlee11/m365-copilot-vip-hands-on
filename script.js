const buttons = document.querySelectorAll(".copy-btn");

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    const text = target.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});

const stepPanels = Array.from(document.querySelectorAll(".step-panel"));
const exerciseSection = document.getElementById("exercises");
const exerciseCards = Array.from(document.querySelectorAll(".exercise"));
const controls = document.querySelector(".guide-controls");
const prevButton = document.querySelector("[data-guide-prev]");
const nextButton = document.querySelector("[data-guide-continue]");
const stepCount = document.querySelector(".guide-step-count");
const stepTitle = document.querySelector(".guide-step-title");

const steps = [
  { panel: document.getElementById("hero"), title: "Welcome" },
  { panel: document.querySelector(".intro"), title: "Objectives" },
  { panel: document.querySelector(".pattern"), title: "Prompting pattern" },
  ...exerciseCards.map((card) => ({
    panel: exerciseSection,
    card,
    title: card.dataset.exerciseTitle || card.querySelector("h3")?.textContent || "Exercise",
  })),
  { panel: document.getElementById("roles"), title: "Role-based prompts" },
  { panel: document.getElementById("downloads"), title: "Downloads" },
  { panel: document.getElementById("responsible-use"), title: "Responsible use" },
].filter((step) => step.panel);

let activeStep = 0;

function showStep(index, pushHash = true) {
  activeStep = Math.max(0, Math.min(index, steps.length - 1));
  const current = steps[activeStep];

  controls.hidden = false;

  stepPanels.forEach((panel) => panel.classList.remove("is-current-step"));
  exerciseCards.forEach((card) => card.classList.remove("is-current-step"));

  current.panel.classList.add("is-current-step");
  if (current.card) current.card.classList.add("is-current-step");

  const target = current.card || current.panel;
  target.appendChild(controls);

  prevButton.disabled = activeStep === 0;
  nextButton.textContent = activeStep === steps.length - 1 ? "Finish" : "Continue";
  stepCount.textContent = `Step ${activeStep + 1} of ${steps.length}`;
  stepTitle.textContent = current.title;

  const hash = current.card ? "#exercises" : `#${current.panel.id || "hero"}`;
  if (pushHash && window.location.hash !== hash) {
    history.replaceState(null, "", hash);
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function findStepByHash(hash) {
  if (!hash || hash === "#hero") return 0;
  if (hash === "#exercises") return steps.findIndex((step) => step.card);
  const match = steps.findIndex((step) => step.panel && `#${step.panel.id}` === hash);
  return match === -1 ? 0 : match;
}

prevButton?.addEventListener("click", () => showStep(activeStep - 1));
nextButton?.addEventListener("click", () => {
  if (activeStep === steps.length - 1) {
    showStep(0);
    return;
  }
  showStep(activeStep + 1);
});

document.querySelector("[data-guide-next]")?.addEventListener("click", (event) => {
  event.preventDefault();
  showStep(activeStep + 1);
});

document.querySelectorAll(".nav-links a, .footer a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href?.startsWith("#")) return;
    event.preventDefault();
    showStep(findStepByHash(href));
  });
});

window.addEventListener("keydown", (event) => {
  if (event.target.closest("pre, button, a, input, textarea, select")) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") showStep(activeStep + 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") showStep(activeStep - 1);
});

showStep(findStepByHash(window.location.hash), false);
