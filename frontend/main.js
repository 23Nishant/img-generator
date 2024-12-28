const generateBtn = document.querySelector(".generate-btn");
const promptInput = document.querySelector(".prompt-input");
const generatedImage = document.querySelector(".generated-image");
const downloadBtn = document.querySelector(".download-btn");

const API_URL = "http://localhost:4000/generateImage";

const showNotification = (message) => {
  alert(message);
};

const generateImage = async () => {
  const prompt = promptInput.value.trim();
  
  if (!prompt) {
    showNotification("Please enter a prompt");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  try {
    console.log('Sending request with prompt:', prompt);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate image');
    }

    if (!data.image) {
      throw new Error('No image data received');
    }

    console.log('Image data received successfully');
    const imageUrl = `data:image/jpeg;base64,${data.image}`;
    generatedImage.src = imageUrl;
    generatedImage.classList.add("active");
    downloadBtn.href = imageUrl;

  } catch (error) {
    console.error('Error generating image:', error);
    showNotification(`Error: ${error.message}`);
    generatedImage.classList.remove("active");
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Image";
  }
};

generateBtn.addEventListener("click", generateImage);

// Checking backend connection on page load
fetch(API_URL.replace('/generateImage', ''))
  .then(() => console.log('✅ Backend connection successful'))
  .catch(error => console.error('❌ Backend connection failed:', error));