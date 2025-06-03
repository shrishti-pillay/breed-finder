
 document.querySelector('#search').addEventListener('click',async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const searchInput = document.querySelector("#prompt")
    console.log("Search input value:", searchInput.value);

    // show loading animation // hide previous results if any
    const loader_container = document.querySelector("#loader-container").style;
    const results_container = document.querySelector("#results-container");
    results_container.style.display = "none";
    loader_container.display = "block";

    // fetch url response
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
        
        loader_container.display = "none"; // Hide the loader
        // Display the results container
        results_container.style.display = "block"; 

        // Set the image source and title
        const title_element = results_container.querySelector("#title");
        title_element.innerHTML=  `${data['breed']} `;
        const img_element = results_container.querySelector("#result-image");
        img_element.src = data['img_url'];
        const image_container = results_container.querySelector("#image-container");
        image_container.appendChild(img_element);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});