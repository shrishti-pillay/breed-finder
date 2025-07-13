const convertAndCompressBase64 = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Create a FileReader to read the image
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onerror = (err) => reject(err);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // Force JPEG to compress better
      resolve(compressedBase64);
    };
  });
};


// Get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const csrftoken = getCookie('csrftoken');

// DOM Elements
const searchButton = document.querySelector('#search');
const nextSearchButton = document.querySelector('#next-search');
const promptInput = document.querySelector('#prompt');
const imageInputEl = document.querySelector('#image-prompt');
const loader = document.querySelector('#loader-container');
const results = document.querySelector('#results-container');
const searchBox = document.querySelector('#search-container');

// Reset UI state
const toggleState = (state) => {
  if (state === 'loading') {
    loader.style.display = 'block';
    searchBox.style.display = 'none';
    results.style.display = 'none';
  } else if (state === 'results') {
    loader.style.display = 'none';
    results.style.display = 'block';
  } else {
    loader.style.display = 'none';
    searchBox.style.display = 'block';
    results.style.display = 'none';
  }
};

// Handle fetch and display
const handleSearch = async () => {
  const text = promptInput.value.trim();
  const imageFile = imageInputEl.files[0];

  if (!text && !imageFile) {
    alert("Please enter a prompt or upload an image.");
    return;
  }

  const formData = new FormData();

  if (text) {
    formData.append("type", "text");
    formData.append("data", text);
  } else {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff'];
    if (!allowedTypes.includes(imageFile.type)) {
      alert("Unsupported image type.");
      return;
    }

    const base64 = await convertAndCompressBase64(imageFile);
    formData.append("type", "image");
    formData.append("data", base64);
  }

  toggleState('loading');

  try {
    const response = await fetch("/home/search", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": csrftoken
      },
      credentials: "same-origin"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    alert("Something went wrong. Please try again.");
    toggleState('search');
  }
};

// Display breed + image
const displayResults = (data) => {
  const title = results.querySelector("#title");
  const img = results.querySelector("#result-image");
  const imgContainer = results.querySelector("#image-container");

  title.innerText = data.breed || "Unknown breed";
  img.src = data.img_url || "";
  imgContainer.innerHTML = '';
  imgContainer.appendChild(img);
  toggleState('results');
};

// Event listeners
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleSearch();
});

nextSearchButton.addEventListener("click", () => {
  promptInput.value = '';
  imageInputEl.value = '';
  toggleState('search');
});
