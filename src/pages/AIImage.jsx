import ImageHeader from "../components/image/ImageHeader";
import PromptPanel from "../components/image/PromptPanel";
import ImageGallery from "../components/image/ImageGallery";
import useImage from "../hooks/useImage";
import ImageViewer from "../components/image/ImageViewer";

export default function AIImage() {

  const image = useImage();

  return (
  <>
    
    <div className="h-[calc(100vh-96px)] bg-[#090511]">

      <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-6 p-4 lg:p-6">

        <ImageHeader />

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

          <div className="min-h-0 overflow-y-auto">

           <PromptPanel

prompt={image.prompt}

setPrompt={image.setPrompt}

loading={image.loading}

onGenerate={image.generateAIImage}
/>

          </div>

          {/* Right */}

         <div className="min-h-0 overflow-y-auto">
          
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
    </>
  );
}