(function () {
  "use strict";

  const cards = document.querySelectorAll(".card");
  const overlay = document.getElementById("transitionOverlay");
  const transitionTitle = document.getElementById("transitionTitle");
  const transitionText = document.getElementById("transitionText");

  function buildLaunchUrl(targetUrl, title, description) {
    const params = new URLSearchParams({
      target: targetUrl,
      title: title || "FIAP Collection",
      description: description || "Opening archive..."
    });
    return `launch.html?${params.toString()}`;
  }

  function showTransition(title, description) {
    transitionTitle.textContent = title ? `Opening ${title}…` : "Opening archive…";
    transitionText.textContent =
      description || "Please wait while the FIAP collection is being prepared.";

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      overlay.classList.add("visible");
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const href = card.getAttribute("href");
      const title = card.dataset.title || "FIAP Collection";
      const description = card.dataset.description || "Opening archive...";

      if (!href || href === "#" || card.classList.contains("disabled")) {
        event.preventDefault();
        alert("This section does not have a public link yet.");
        return;
      }

      event.preventDefault();
      showTransition(title, description);

      const launchUrl = buildLaunchUrl(href, title, description);

      setTimeout(() => {
        window.location.href = launchUrl;
      }, 850);
    });
  });
})();
