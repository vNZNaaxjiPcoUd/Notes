let paths = document.querySelectorAll("#svg path");
let card = document.querySelector("#card");
let svg = document.querySelector("#svg");
let cardWidth = card.getBoundingClientRect().width;
let cardHeight = card.getBoundingClientRect().height;

let tooltipVisible = false;
let activePath = null; // Track the currently active path

function isTouchDevice() {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

// Handle paths
paths.forEach((p) => {
  if (!isTouchDevice()) {
    // Hover devices: handle mousemove and mouseleave
    p.addEventListener("mouseleave", () => {
      card.style.visibility = "hidden";
    });

    p.addEventListener("mousemove", (evt) => {
      let pos = oMousePos(svg, evt);
      let text = p.dataset.text;
      card.style.visibility = "visible";
      card.style.top = pos.y + "px";
      card.style.left = pos.x + "px";
      card.innerHTML = text;
    });
  } else {
    // Touch devices: handle touchstart
    p.addEventListener("touchstart", (evt) => {
      evt.preventDefault(); // Prevent default navigation behavior
      evt.stopPropagation(); // Stop event from propagating further

      if (tooltipVisible && activePath === p) {
        // Hide the tooltip if the same path is clicked again
        card.style.visibility = "hidden";
        tooltipVisible = false;
        activePath = null;
      } else {
        // Show the tooltip
        let text = p.dataset.text; // Get tooltip text from data attribute
        let touchX = evt.touches[0].clientX;
        let touchY = evt.touches[0].clientY;

        // Adjust position to prevent going outside the SVG bounds
        let svgRect = svg.getBoundingClientRect();
        let tooltipRight = touchX + cardWidth;
        let adjustedLeft = touchX;

        if (tooltipRight > svgRect.right) {
          adjustedLeft = svgRect.right - cardWidth;
        }

        card.style.visibility = "visible";
        card.style.left = `${adjustedLeft}px`;
        card.style.top = `${touchY}px`;
        card.innerHTML = text;
        tooltipVisible = true;
        activePath = p; // Update the active path
      }
    });
  }
});

// Handle clicks anywhere on the SVG to hide the tooltip
svg.addEventListener("touchstart", (evt) => {
  if (isTouchDevice()) {
    let target = evt.target;
    if (!target.closest("path")) {
      // Hide the tooltip if the touch is not on a path
      card.style.visibility = "hidden";
      tooltipVisible = false;
      activePath = null; // Reset the active path
    }
  }
});

// Prevent navigation on anchor clicks for touch devices
document.querySelectorAll("#svg a").forEach((anchor) => {
  anchor.addEventListener("click", (evt) => {
    if (isTouchDevice()) {
      evt.preventDefault(); // Block navigation
    }
  });
});

function oMousePos(element, evt) {
  let ClientRect = element.getBoundingClientRect();
  let currentX = Math.round(evt.clientX - ClientRect.left);
  let currentY = Math.round(evt.clientY - ClientRect.top);

  // Adjust for tooltip near the right edge
  if (evt.clientX + cardWidth >= ClientRect.right) {
    currentX = Math.round(evt.clientX - ClientRect.left - cardWidth);
  }
  // Adjust for tooltip near the bottom edge
  if (evt.clientY + cardHeight >= ClientRect.bottom) {
    currentY = Math.round(evt.clientY - ClientRect.top - cardHeight);
  }

  return {
    x: currentX,
    y: currentY
  };
}
