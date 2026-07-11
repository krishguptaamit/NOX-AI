import PDFHeader from "../components/pdf/PDFHeader";
import UploadPanel from "../components/pdf/UploadPanel";
import ChatPanel from "../components/pdf/ChatPanel";
import usePDF from "../hooks/usePDF";
import PDFHistoryModal from "../components/pdf/PDFHistoryModal";
import ConfirmModal from "../components/pdf/ConfirmModal";


export default function AIPDF() {
  const pdf = usePDF();

  return (
    <>
    <div className="min-h-[calc(100vh-96px)] bg-[#090511]">

      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-96px)]
          max-w-[1800px]
          flex-col
          gap-4
          p-3
          sm:p-4
          lg:gap-6
          lg:p-6
        "
      >
        <PDFHeader />

        <div className="flex justify-end">
  <button
    type="button"
    onClick={pdf.openHistory}
    className="
      rounded-xl
      border
      border-white/10
      bg-[#14101D]
      px-5
      py-3
      transition
      hover:border-violet-500
      hover:bg-violet-600/10
    "
  >
    PDF History
  </button>
</div>

        <div
          className="
            grid
            min-h-0
            flex-1
            grid-cols-1
            gap-4
            lg:gap-6
            xl:grid-cols-[420px_minmax(0,1fr)]
          "
        >
       {/* Left */}

<div className="min-w-0 xl:min-h-0 xl:overflow-y-auto">

  <div className="flex flex-col gap-4 lg:gap-6">

    <UploadPanel pdf={pdf} />

  </div>

</div>

          {/* Right */}

          <div className="min-w-0 xl:min-h-0 xl:overflow-y-auto">

            <ChatPanel pdf={pdf} />

          </div>

        </div>

      </div>

    </div>

<PDFHistoryModal
  open={pdf.historyOpen}
  history={pdf.pdfHistory}
  onClose={pdf.closeHistory}
  onDelete={pdf.deleteHistory}
  onClear={pdf.openClearHistory}
  onViewChat={pdf.viewHistoryChat}
/>

<ConfirmModal
  open={pdf.clearChatOpen}
  title="Clear PDF Chat?"
  message="This will permanently remove all messages from the current PDF chat. This action cannot be undone."
  onCancel={pdf.closeClearChat}
  onConfirm={pdf.confirmClearChat}
  confirmText="Clear Chat"
/>
    </>
  );
}