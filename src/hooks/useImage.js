import { useEffect, useState } from "react";
import { generateImage } from "../services/imageService";
import { enhancePrompt } from "../services/promptService";
import randomPrompts from "../data/randomPrompts";
import promptTemplates from "../data/promptTemplates";

export default function useImage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
 const [images, setImages] = useState(() => {
  const saved = localStorage.getItem("nox-images");

  return saved ? JSON.parse(saved) : [];
});

  const [style, setStyle] = useState("Realistic");
  const [ratio, setRatio] = useState("1:1");
  const [count, setCount] = useState(1);

  const [selectedImage, setSelectedImage] = useState(null);

const [viewerOpen, setViewerOpen] = useState(false);

const [historyOpen, setHistoryOpen] = useState(false);

useEffect(() => {
  localStorage.setItem(
    "nox-images",
    JSON.stringify(images)
  );
}, [images]);

function openViewer(image) {
  setViewerOpen(false);

  setTimeout(() => {
    setSelectedImage(image);
    setViewerOpen(true);
  }, 10);
}

function closeViewer() {
  setViewerOpen(false);

  setTimeout(() => {
    setSelectedImage(null);
  }, 150);
}

function deleteImage(id) {
  setImages((prev) =>
    prev.filter((img) => img.id !== id)
  );
}

function useTemplate(prompt) {
  setPrompt(prompt);
}

function surpriseMe() {
  const random =
    randomPrompts[
      Math.floor(Math.random() * randomPrompts.length)
    ];

  setPrompt(random);
}

function toggleFavorite(id) {
  setImages((prev) =>
    prev.map((img) =>
      img.id === id
        ? {
            ...img,
            favorite: !img.favorite,
          }
        : img
    )
  );
}

function openHistory() {
  setHistoryOpen(true);
}

function closeHistory() {
  setHistoryOpen(false);
}

function clearImages() {
  if (
    window.confirm(
      "Delete all generated images?"
    )
  ) {
    setImages([]);
  }
}


  async function generateAIImage() {
  if (!prompt.trim()) {
    alert("Please enter a prompt.");
    return;
  }

  setLoading(true);

  try {
    const newImages = [];

    for (let i = 0; i < count; i++) {
      const url = await generateImage(prompt);

     newImages.push({
  id: Date.now() + i,
  url,
  prompt,
  style,
  ratio,
  favorite: false,
});
    }

    setImages((prev) => [...newImages, ...prev]);
  } catch (error) {
    console.error(error);
    alert("Failed to generate image.");
  } finally {
    setLoading(false);
  }
}

async function enhanceCurrentPrompt() {
  if (!prompt.trim()) return;

  try {
    setLoading(true);

    const improved = await enhancePrompt(
      prompt,
      "auto"
    );

    setPrompt(improved);

  } catch (error) {
    console.error(error);

    alert("Failed to enhance prompt.");
  } finally {
    setLoading(false);
  }
}

  return {
    // Prompt
    prompt,
    setPrompt,

    // Loading
    loading,

    // Images
    images,
    setImages,

    // Settings
    style,
    setStyle,

    ratio,
    setRatio,

    count,
    setCount,

    // Actions
    generateAIImage,
    deleteImage,
    clearImages,
    toggleFavorite,
    enhanceCurrentPrompt,

selectedImage,
viewerOpen,

openViewer,
closeViewer,

surpriseMe,

useTemplate,

historyOpen,
openHistory,
closeHistory,
  };
}