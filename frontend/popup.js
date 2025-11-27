document.getElementById('scrapeBtn').addEventListener('click', () => {
    const text = document.getElementById('urls').value;
    const urls = text.split('\n').map(u => u.trim()).filter(u => u.length > 0);

    if (urls.length < 3) {
        document.getElementById('status').innerText = "Please enter at least 3 URLs.";
        return;
    }

    document.getElementById('status').innerText = "Starting check background console.";

    chrome.runtime.sendMessage({
        action: "START_SCRAPING",
        urls: urls
    });
});