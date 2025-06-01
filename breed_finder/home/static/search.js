
 const search = async () => {
    const searchInput = document.querySelector("#prompt")
    const search_url = "/home/search?prompt="+ searchInput.value;
    await fetch(search_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Read the response body as JSON, text, blob, etc.
      return response.json()
    })
    .then(data => {
        // Process the data
        const results_container = document.querySelector("#results-container");
        const img_element = document.createElement("img");
        img_element.src = data['img_url'];
        results_container.appendChild(img_element);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};