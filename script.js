const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.getAttribute("data-copy-target"));
    if (!target) return;
    const text = target.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => { button.textContent = original; }, 1400);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});

const panels = Array.from(document.querySelectorAll("[data-activity]"));
const links = Array.from(document.querySelectorAll("[data-activity-link]"));
const prev = document.querySelector("[data-guide-prev]");
const next = document.querySelector("[data-guide-continue]");
const statusText = document.getElementById("activity-status-text");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
let current = 0;

function setActivity(index, updateHash = true) {
  current = Math.max(0, Math.min(index, panels.length - 1));
  panels.forEach((panel, i) => panel.classList.toggle("is-active", i === current));
  links.forEach((link, i) => link.classList.toggle("is-active", i === current));
  const label = `Activity ${current + 1} of ${panels.length}`;
  statusText.textContent = label;
  progressLabel.textContent = label;
  progressFill.style.width = `${((current + 1) / panels.length) * 100}%`;
  prev.disabled = current === 0;
  next.textContent = current === panels.length - 1 ? "Restart" : "Continue";
  if (updateHash) history.replaceState(null, "", `#activity-${current + 1}`);
  document.querySelector(".activity-stage").scrollIntoView({ behavior: "smooth", block: "start" });
}

links.forEach((link) => {
  link.addEventListener("click", () => setActivity(Number(link.dataset.activityLink)));
});

prev.addEventListener("click", () => setActivity(current - 1));
next.addEventListener("click", () => {
  if (current === panels.length - 1) setActivity(0);
  else setActivity(current + 1);
});

window.addEventListener("keydown", (event) => {
  if (event.target.closest("pre, button, a, input, textarea, select")) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") setActivity(current + 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") setActivity(current - 1);
});

const hashMatch = window.location.hash.match(/activity-(\d+)/);
setActivity(hashMatch ? Number(hashMatch[1]) - 1 : 0, false);
