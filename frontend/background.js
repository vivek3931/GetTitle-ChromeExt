let scrapingQueue = [];
let isScraping = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "START_SCRAPING") {
        scrapingQueue = request.urls;
        processQueue();
    }
    if (request.action === "DATA_SCRAPED") {
        console.log("Data received from content script:", request.data);
        sendToBackend(request.data);
        
        if (sender.tab && sender.tab.id) {
            chrome.tabs.remove(sender.tab.id);
        }

        setTimeout(() => {
            processQueue();
        }, 3000); 
    }
});

function processQueue() {
    if (scrapingQueue.length === 0) {
        console.log("Queue finished.");
        return;
    }

    const nextUrl = scrapingQueue.shift();
    
    chrome.tabs.create({ url: nextUrl, active: true }, (tab) => {
    });
}

async function sendToBackend(data) {
    try {
        const response = await fetch('http://localhost:3000/api/profiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log("Backend response:", result);
    } catch (error) {
        console.error("Error sending to backend:", error);
    }
}