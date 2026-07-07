import { useState } from "react";
import {
  Paperclip,
  Image,
  Mic,
  SendHorizontal,
  X,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { MicOff } from "lucide-react";

export default function ChatInput({
  sendMessage,
  voiceLanguage,
  isTyping,
  stopGeneration,
}) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSend = () => {
    if (!message.trim() && !selectedFile) return;

    sendMessage(message, selectedFile);

    setMessage("");
    setSelectedFile(null);
    setPreview(null);
    setDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    setDragging(false);
  };

  const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang =
    voiceLanguage === "auto"
      ? navigator.language
      : voiceLanguage;


  recognition.interimResults = false;
recognition.continuous = false;
recognition.maxAlternatives = 1;

recognition.onstart = () => {
  setListening(true);
};

recognition.onresult = (event) => {
  const transcript =
    event.results[event.results.length - 1][0].transcript;

  console.log("Transcript:", transcript);

  setMessage(transcript);
};

  recognition.onerror = (e) => {
    console.log("Speech Error:", e.error);
    setListening(false);
  };

  recognition.onend = () => {
    console.log("Listening ended");
    setListening(false);
  };

  recognition.start();
};
  return (
    <div className="border-t border-white/10 bg-[#0D0818]/80 p-3 backdrop-blur-xl md:p-4">

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`
          rounded-3xl
          border
          p-3
          transition-all
          duration-300
          shadow-[0_0_35px_rgba(139,92,246,.12)]

          ${
            dragging
              ? "border-violet-500 bg-violet-500/10"
              : "border-white/10 bg-white/5"
          }
        `}
      >

        <input
  id="file-upload"
  type="file"
  className="hidden"
  accept=".pdf,.txt,.doc,.docx"
  onChange={handleFileChange}
/>

<input
  id="image-upload"
  type="file"
  className="hidden"
  accept="image/*"
  onChange={handleFileChange}
/>

        {dragging && (
          <div className="mb-4 rounded-2xl border-2 border-dashed border-violet-500 bg-violet-500/10 p-8 text-center">

            <Paperclip
              size={40}
              className="mx-auto mb-4 text-violet-400"
            />

            <h3 className="text-lg font-semibold">
              Drop your file here
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Images, PDF and TXT supported
            </p>

          </div>
        )}

        {selectedFile && (
          <div className="mb-4 rounded-2xl border border-white/10 bg-[#1B1725] p-3">

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mb-3 max-h-56 w-full rounded-xl object-cover"
              />
            )}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {selectedFile.type.startsWith("image") ? (
                  <ImageIcon
                    size={20}
                    className="text-violet-400"
                  />
                ) : (
                  <FileText
                    size={20}
                    className="text-violet-400"
                  />
                )}

                <div>

                  <p className="text-sm font-medium">
                    {selectedFile.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="rounded-lg p-2 hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>

            </div>

          </div>
        )}
                <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NOXVERSE AI anything..."
          className="w-full resize-none bg-transparent px-2 py-2 text-white placeholder:text-gray-500 outline-none"
        />

        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <label
              htmlFor="file-upload"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition hover:bg-violet-500/10"
              title="Upload File"
            >
              <Paperclip size={18} />
            </label>

            <label
              htmlFor="image-upload"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition hover:bg-violet-500/10"
              title="Upload Image"
            >
              <Image size={18} />
            </label>

            <button
  type="button"
  onClick={startListening}
  title="Voice Input"
  className={`
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-xl
    transition

    ${
      listening
        ? "bg-red-500 text-white animate-pulse"
        : "hover:bg-violet-500/10"
    }
  `}
>
  {listening ? (
    <MicOff size={18} />
  ) : (
    <Mic size={18} />
  )}
</button>

          </div>

         <button
  type="button"
  onClick={isTyping ? stopGeneration : handleSend}
  className={`
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-2xl
    transition

    ${
      isTyping
        ? "bg-red-600 hover:bg-red-500"
        : message.trim() || selectedFile
        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_25px_rgba(139,92,246,.4)] hover:scale-105"
        : "cursor-not-allowed bg-white/10 opacity-50"
    }
  `}
>
  {isTyping ? (
    <div className="h-3 w-3 rounded-sm bg-white" />
  ) : (
    <SendHorizontal size={18} />
  )}
</button>
        </div>

      </div>

    </div>
  );
}