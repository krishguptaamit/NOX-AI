import ImageHeader from "../components/image/ImageHeader";
import PromptPanel from "../components/image/PromptPanel";
import ImageGallery from "../components/image/ImageGallery";
import useImage from "../hooks/useImage";
import ImageViewer from "../components/image/ImageViewer";
import { useRef } from "react";
import HistoryModal from "../components/image/HistoryModal";
import AIActionResultModal from "../components/pdf/AIActionResultModal";

export default function AIImage() {

  const galleryRef = useRef(null);
  const settingsRef = useRef(null);
  const image = useImage();

  return (
  <>
    
    <div className="h-[calc(100vh-96px)] bg-[#090511]">

      <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-6 p-4 lg:p-6">

        <ImageHeader
  onGallery={() =>
    galleryRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }
  onSettings={() =>
    settingsRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }
  onHistory={image.openHistory}
/>

        <div
  className="
    grid
    flex-1
    min-h-0
    gap-6
    grid-cols-1
    xl:grid-cols-[420px_minmax(0,1fr)]
  "
>

          {/* Left */}

        <div
  ref={settingsRef}
  className="min-h-0 overflow-y-auto"
>

           <PromptPanel

prompt={image.prompt}

setPrompt={image.setPrompt}

loading={image.loading}

onGenerate={image.generateAIImage}

onEnhance={image.enhanceCurrentPrompt}

 onSurprise={image.surpriseMe}

 useTemplate={image.useTemplate}
/>

          </div>

          {/* Right */}

        <div
  ref={galleryRef}
  className="min-h-0 overflow-y-auto"
>

<ImageGallery
  loading={image.loading}
  images={image.images}
  deleteImage={image.deleteImage}
  clearImages={image.clearImages}
  toggleFavorite={image.toggleFavorite}
  onPreview={image.openViewer}
/>

          </div>

        </div>

      </div>

    </div>
     <ImageViewer
      image={image.selectedImage}
      open={image.viewerOpen}
      onClose={image.closeViewer}
   />

   <HistoryModal
  open={image.historyOpen}
  images={image.images}
  onClose={image.closeHistory}
  onPreview={(img) => {
    image.closeHistory();
    image.openViewer(img);
  }}
/>

<AIActionResultModal
  open={Boolean(pdf.actionResult)}
  type={pdf.actionType}
  result={pdf.actionResult}
  onClose={pdf.closeActionResult}
/>
    </>
  );
}