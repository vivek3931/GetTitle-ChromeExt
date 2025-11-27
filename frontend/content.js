window.onload = () => {
    
    setTimeout(scrapeProfile, 8000); 
};

function scrapeProfile() {
    console.log("Scraping profile");

    // HELPERS
    const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : null;
    };
    
    const getCount = (text) => {
        const allSpans = Array.from(document.querySelectorAll('span'));
        const targetSpan = allSpans.find(span => 
            span.innerText.toLowerCase().includes(text.toLowerCase())
        );
        return targetSpan ? targetSpan.innerText.trim() : null;
    };

    
    let name = null;
    let bio = null;
    let location = null;
    let about = "";

    const profileParagraphs = Array.from(document.querySelectorAll('p.f006b8b2'));
    
    console.log(`Found ${profileParagraphs.length} profile paragraphs`);

    if (profileParagraphs.length >= 1) {
        name = profileParagraphs[0].innerText.trim();
    }
    
    if (profileParagraphs.length >= 2) {
        bio = profileParagraphs[1].innerText.trim();
    }
    
    if (profileParagraphs.length >= 3) {
        location = profileParagraphs[2].innerText.trim();
    }

    // Fallback if the above didn't work
    if (!name) {
        const nameSelectors = [
            'h1.text-heading-xlarge',
            'h1[data-test-id="name"]',
            'main h1'
        ];
        for (const selector of nameSelectors) {
            name = getText(selector);
            if (name) break;
        }
    }

    console.log("Extracted name:", name);
    console.log("Extracted bio:", bio);
    console.log("Extracted location:", location);

    // 4. ABOUT SECTION
    const aboutSectionContainer = document.querySelector(
        '.pvs-profile-section-section[id="about"]'
    );
    if (aboutSectionContainer) {
        const textElement = 
            aboutSectionContainer.querySelector('.pv-shared-text-with-see-more > div > span') ||
            aboutSectionContainer.querySelector('.lt-line-clamp__line') ||
            aboutSectionContainer.querySelector('.text-body-medium');

        if (textElement) {
            about = textElement.innerText.trim();
        }
    }

    console.log("Extracted about:", about);

    const connectionCount = getCount('connection'); 
    const followerCount = getCount('follower'); 

    console.log("Connection count:", connectionCount);
    console.log("Follower count:", followerCount);

    const data = {
        url: window.location.href,
        name: name || "Unknown Name",
        bio: bio || "",
        location: location || "",
        about: about || "",
        connectionCount: connectionCount || "N/A",
        followerCount: followerCount || "N/A"
    };

    console.log("Final Scraped Data:", data);

    chrome.runtime.sendMessage({
        action: "DATA_SCRAPED",
        data: data
    });
}