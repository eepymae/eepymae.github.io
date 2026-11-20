const quotes = [
        "blehh.",
        "mlem.",
        "afk in my head",
        "what is a JOB?!?",
        "a",
        "drawing bugs in c major scale & 300dpi",
        "ctrl+z is my best friend",
        "do the dew!",
        "spaghetti code, mastered badly",
        "sleepy cat, loud synth",
        ":3",
        "compiling thoughts... please wait",
        "public static void",
        `std::cout << "i have " << moneys << " moneyss!" << std::endl;`,
        `System.out.print("enter moneys that u will give to me: ");`,
        `import java.util.*;`,
        `import various type sh;`,
        "my favorite key signature is e minor",
        "i actually don't know how to play any instruments well",
        "i hate milk tho",
        "i like mountain dew irl",
];
const status_text = {
        open: "Open for Work",
        limited: "Limited Availability",
        closed: "Commissions Closed",
};      

//--
const quote = document.getElementById("quote");
const index = Math.floor(Math.random() * quotes.length);
quote.textContent = `"${quotes[index] || "wow error quote!"}"`;

//--
const gist_url = "https://gist.githubusercontent.com/eepymae/586892932b43d8b5fff1efe4a456259b/raw/status.json";

async function loadStatus() {
        try {
                const response = await fetch(`${gist_url}?t=${Date.now()}`);
                const data = await response.json();

                const status = document.querySelector("#status");
                status.className = data.status || "closed";
                status.textContent = status_text[data.status] || "Error Status??";
        } catch (error) {
                console.error(error);
        }
}
loadStatus();