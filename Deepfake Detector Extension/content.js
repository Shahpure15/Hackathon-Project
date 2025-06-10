document.addEventListener("DOMContentLoaded", () => {
    let elements = [];
    
    // Detect videos
    document.querySelectorAll("video").forEach((video, index) => {
        elements.push({ type: "video", id: index });
    });

    // Detect Zoom or Meet calls (basic check)
    if (window.location.href.includes("zoom") || window.location.href.includes("meet.google")) {
        elements.push({ type: "call", id: "live" });
    }

    // Detect emails (if Gmail is open)
    if (window.location.href.includes("mail.google.com")) {
        elements.push({ type: "email", id: "inbox" });
    }

    chrome.runtime.sendMessage({ detectedElements: elements });
});