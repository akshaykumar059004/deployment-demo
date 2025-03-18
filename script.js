const API_URL = "http://34.93.153.128:5600"; // Backend URL

document.getElementById("dataForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInput = document.getElementById("userInput").value.trim();
    if (userInput === "") return;

    try {
        // Send data to backend
        const response = await fetch(`${API_URL}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: userInput })
        });

        const result = await response.json();
        console.log("Server response:", result);
        loadStoredData(); // Refresh data after submission
    } catch (error) {
        console.error("Error submitting data:", error);
    }

    document.getElementById("userInput").value = ""; // Clear input field
});

// Fetch and display stored data
async function loadStoredData() {
    try {
        const response = await fetch(`${API_URL}/data`);
        const result = await response.json();

        console.log("API Response:", result); // Debugging log

        const dataList = document.getElementById("dataList");
        if (!dataList) {
            console.error("Error: dataList element not found!");
            return;
        }

        dataList.innerHTML = ""; // Clear existing list

        const dataArray = Array.isArray(result) ? result : result.storedData || []; // Handle different response formats

        if (dataArray.length === 0) {
            dataList.innerHTML = "<li>No data available</li>";
            return;
        }

        dataArray.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item.content;
            dataList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Load stored data on page load
loadStoredData();
