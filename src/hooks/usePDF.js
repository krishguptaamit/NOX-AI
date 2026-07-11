import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { parsePDF } from "../utils/pdfParser";
import {
  summarizePDF,
  askPDFQuestionStream,
} from "../services/pdfService";


export default function usePDF() {
  const [file, setFile] = useState(null);

  const [pages, setPages] = useState(0);

  const [pdfText, setPdfText] = useState("");

  const [summary, setSummary] = useState("");

  const [pageTexts, setPageTexts] = useState([]);

  const [loadingPDF, setLoadingPDF] =
    useState(false);

  const [loadingSummary, setLoadingSummary] =
    useState(false);

  const [chatLoading, setChatLoading] =
    useState(false);

  const [messages, setMessages] = useState([]);

  const [clearHistoryOpen, setClearHistoryOpen] =
  useState(false);
  const [clearChatOpen, setClearChatOpen] =
  useState(false);

  const [pdfHistory, setPdfHistory] = useState(() => {
  const saved = localStorage.getItem("nox-pdf-history");

  return saved ? JSON.parse(saved) : [];
});

const [historyOpen, setHistoryOpen] = useState(false);

useEffect(() => {
  localStorage.setItem(
    "nox-pdf-history",
    JSON.stringify(pdfHistory)
  );
}, [pdfHistory]);

useEffect(() => {
  if (!file || messages.length === 0) return;

  updateHistoryMessages(messages);
}, [messages]);

  async function uploadPDF(selectedFile) {
    if (!selectedFile) return;

    try {
      setLoadingPDF(true);

      setFile(selectedFile);

      setPages(0);

      setPdfText("");

      setSummary("");

      setMessages([]);

      const result = await parsePDF(
        selectedFile
      );

      setPages(result.pages);

      setPdfText(result.text);

      setPageTexts(result.pageTexts);

      const historyItem = {
  id: crypto.randomUUID(),
  name: selectedFile.name,
  size: selectedFile.size,
  pages: result.pages,
  uploadedAt: new Date().toISOString(),
  messages: [],
};

setPdfHistory((prev) => [
  historyItem,
  ...prev,
]);

      setLoadingSummary(true);

      try {
        const aiSummary = await summarizePDF(
          result.text
        );

        setSummary(aiSummary);
      } catch (error) {
        console.error(
          "Summary Error:",
          error
        );

        alert(
          "Failed to generate PDF summary."
        );
      } finally {
        setLoadingSummary(false);
      }

    } catch (error) {
      console.error("PDF Error:", error);

      alert("Failed to read PDF.");

      setFile(null);

      setPages(0);

      setPdfText("");

      setSummary("");

      setMessages([]);

    } finally {
      setLoadingPDF(false);
    }
  }


  async function sendQuestion(question) {
    if (!question.trim()) return;

    if (!pdfText.trim()) {
      alert("Please upload a PDF first.");

      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    const assistantId =
      crypto.randomUUID();

    const assistantMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);

    try {
      setChatLoading(true);

      await askPDFQuestionStream(
        pdfText,
        question,
        (chunk) => {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content:
                      message.content + chunk,
                  }
                : message
            )
          );
        }
      );

    } catch (error) {
      console.error(
        "PDF Chat Error:",
        error
      );

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content:
                  "Failed to generate answer.",
              }
            : message
        )
      );

    } finally {
      setChatLoading(false);
    }
  }

  async function regenerateAnswer() {
  if (chatLoading) return;

  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (!lastUserMessage) return;

  const question = lastUserMessage.content;
  const assistantId = crypto.randomUUID();

  setMessages((prev) => {
    const lastAssistantIndex = prev
      .map((message) => message.role)
      .lastIndexOf("assistant");

    if (lastAssistantIndex === -1) {
      return prev;
    }

    return prev.filter(
      (_, index) => index !== lastAssistantIndex
    );
  });

  setChatLoading(true);

  setMessages((prev) => [
    ...prev,
    {
      id: assistantId,
      role: "assistant",
      content: "",
    },
  ]);

  try {
    await askPDFQuestionStream(
      pdfText,
      question,
      (chunk) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + chunk,
                }
              : message
          )
        );
      }
    );
  } catch (error) {
    console.error("Regenerate Error:", error);

    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId
          ? {
              ...message,
              content: "Failed to regenerate answer.",
            }
          : message
      )
    );
  } finally {
    setChatLoading(false);
  }
}

function openClearChat() {
  if (messages.length === 0) return;

  setClearChatOpen(true);
}

function closeClearChat() {
  setClearChatOpen(false);
}

function confirmClearChat() {
  setMessages([]);
  setClearChatOpen(false);
}

function exportChatTXT() {
  if (messages.length === 0) return;

  const chatText = messages
    .map((message) => {
      const sender =
        message.role === "user"
          ? "YOU"
          : "NOXVERSE AI";

      return `${sender}\n${message.content}`;
    })
    .join("\n\n----------------------------------------\n\n");

  const content = `
NOXVERSE AI PDF CHAT
========================================

PDF: ${file?.name || "Unknown PDF"}
Pages: ${pages}
Exported: ${new Date().toLocaleString()}

========================================

${chatText}

========================================
Generated by NOXVERSE AI
`;

  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `${
    file?.name?.replace(/\.pdf$/i, "") ||
    "nox-pdf"
  }-chat.txt`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function exportChatPDF() {
  if (messages.length === 0) return;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 18;
  const maxWidth = pageWidth - margin * 2;

  let y = 20;

  function checkPageSpace(height = 10) {
    if (y + height > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("NOXVERSE AI PDF CHAT", margin, y);

  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `PDF: ${file?.name || "Unknown PDF"}`,
    margin,
    y
  );

  y += 6;

  doc.text(`Pages: ${pages}`, margin, y);

  y += 6;

  doc.text(
    `Exported: ${new Date().toLocaleString()}`,
    margin,
    y
  );

  y += 12;

  doc.line(
    margin,
    y,
    pageWidth - margin,
    y
  );

  y += 10;

  messages.forEach((message) => {
    const sender =
      message.role === "user"
        ? "YOU"
        : "NOXVERSE AI";

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text(sender, margin, y);

    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const cleanContent = message.content
      .replace(/\*\*/g, "")
      .replace(/#{1,6}\s?/g, "")
      .replace(/[^\x20-\x7E\n]/g, "");

    const lines = doc.splitTextToSize(
      cleanContent,
      maxWidth
    );

    lines.forEach((line) => {
      checkPageSpace(6);

      doc.text(line, margin, y);

      y += 5;
    });

    y += 5;
  });

  checkPageSpace(15);

  doc.line(
    margin,
    y,
    pageWidth - margin,
    y
  );

  y += 8;

  doc.setFontSize(9);

  doc.text(
    "Generated by NOXVERSE AI",
    margin,
    y
  );

  const fileName =
    file?.name?.replace(/\.pdf$/i, "") ||
    "nox-pdf";

  doc.save(`${fileName}-chat.pdf`);
}

function updateHistoryMessages(updatedMessages) {
  if (!file) return;

  setPdfHistory((prev) =>
    prev.map((item) =>
      item.name === file.name
        ? {
            ...item,
            messages: updatedMessages,
          }
        : item
    )
  );
}

function viewHistoryChat(item) {
  if (!item.messages) return;

  setMessages(item.messages);

  setHistoryOpen(false);
}

function openHistory() {
  setHistoryOpen(true);
}

function closeHistory() {
  setHistoryOpen(false);
}

function deleteHistory(id) {
  setPdfHistory((prev) =>
    prev.filter((item) => item.id !== id)
  );
}

function openClearHistory() {
  
  setClearHistoryOpen(true);
}

function closeClearHistory() {
  setClearHistoryOpen(false);
}

function confirmClearHistory() {
  setPdfHistory([]);
  setClearHistoryOpen(false);
}


  function removePDF() {

    setPageTexts([]);

    setFile(null);

    setPages(0);

    setPdfText("");

    setSummary("");

    setMessages([]);

    setLoadingPDF(false);

    setLoadingSummary(false);

    setChatLoading(false);
  }

  return {
    file,

    pages,

    pdfText,

    pageTexts,

    summary,

    loadingPDF,

    loadingSummary,

    messages,

    chatLoading,

    uploadPDF,

    sendQuestion,

    removePDF,
  

regenerateAnswer,
clearChatOpen,
openClearChat,
closeClearChat,
confirmClearChat,

pdfHistory,
historyOpen,

openHistory,
closeHistory,
deleteHistory,
viewHistoryChat,

clearHistoryOpen,
openClearHistory,
closeClearHistory,
confirmClearHistory,

exportChatTXT,
exportChatPDF,

  };
}