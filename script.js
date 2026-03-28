const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const mobileView = document.getElementById("mobileView");

const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const mobileViewerTitle = document.getElementById("mobileViewerTitle");

const backButton = document.getElementById("backButton");
const mobileBackButton = document.getElementById("mobileBackButton");

const openExternalNotice = document.getElementById("openExternalNotice");
const mobileOpenExternal = document.getElementById("mobileOpenExternal");

const iframeNotice = document.getElementById("iframeNotice");
const loadingOverlay = document.getElementById("loadingOverlay");

const cards = document.querySelectorAll(".card");

let iframeLoaded = false;
let iframeTimeout = null;

function isMobileDevice() {
  return window.innerWidth <= 700;
}

function getViewerLabel(title) {
  if (title === "PFIAP") return "PFIAP - FIAP Portfolio and levels";
  if (title === "MFIAP") return "MFIAP - Master FIAP";
  if (title === "FIAP World Cup") return "FIAP World Cups for Clubs";
  if (title === "FIAP Distinctions") return "FIAP Distinctions and levels";
  return title;
}

function hideAllViews() {
  homeView.classList.remove("active");
  viewerView.classList.remove("active");
  mobileView.classList.remove("active");
}

function showHome() {
  hideAllViews();
  homeView.classList.add("active");

  viewerFrame.src = "about:blank";
  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.add("hidden");
  iframeLoaded = false;

  localStorage.removeItem("fiapLastTitle");
  localStorage.removeItem("fiapLastUrl");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDesktopViewer(title, url) {
  hideAllViews();
  viewerView.classList.add("active");

  viewerTitle.textContent = getViewerLabel(title);
  openExternalNotice.href = url;

  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.remove("hidden");
  iframeLoaded = false;

  viewerFrame.src = url;

  clearTimeout(iframeTimeout);
  iframeTimeout = setTimeout(() => {
    if (!iframeLoaded) {
      loadingOverlay.classList.add("hidden");
      iframeNotice.classList.remove("hidden");
    }
  }, 3500);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMobileViewer(title, url) {
  hideAllViews();
  mobileView.classList.add("active");

  mobileViewerTitle.textContent = getViewerLabel(title);
  mobileOpenExternal.href = url;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSection(title, url, remember = true) {
  if (!url || url === "#") {
    alert("This section does not have a public link yet.");
    return;
  }

  if (remember) {
    localStorage.setItem("fiapLastTitle", title);
    localStorage.setItem("fiapLastUrl", url);
  }

  if (isMobileDevice()) {
    showMobileViewer(title, url);
  } else {
    showDesktopViewer(title, url);
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const url = card.dataset.url;
    openSection(title, url);
  });
});

backButton.addEventListener("click", showHome);
mobileBackButton.addEventListener("click", showHome);

viewerFrame.addEventListener("load", () => {
  iframeLoaded = true;
  loadingOverlay.classList.add("hidden");
  iframeNotice.classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  const lastTitle = localStorage.getItem("fiapLastTitle");
  const lastUrl = localStorage.getItem("fiapLastUrl");

  if (lastTitle && lastUrl) {
    openSection(lastTitle, lastUrl, false);
  }
});

window.addEventListener("resize", () => {
  const lastTitle = localStorage.getItem("fiapLastTitle");
  const lastUrl = localStorage.getItem("fiapLastUrl");

  if (!lastTitle || !lastUrl) return;
  if (homeView.classList.contains("active")) return;

  openSection(lastTitle, lastUrl, false);
});
