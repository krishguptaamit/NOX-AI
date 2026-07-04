import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/AIChat";
import ImageGenerator from "./pages/ImageGenerator";
import VideoGenerator from "./pages/VideoGenerator";
import CodeGenerator from "./pages/CodeGenerator";
import VoiceGenerator from "./pages/VoiceGenerator";
import PdfAnalyzer from "./pages/PdfAnalyzer";
import AITools from "./pages/AITools";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
<Route path="/" element={<Dashboard />} />
<Route path="/chat" element={<Chat />} />
<Route path="/image" element={<ImageGenerator />} />
<Route path="/video" element={<VideoGenerator />} />
<Route path="/code" element={<CodeGenerator />} />
<Route path="/voice" element={<VoiceGenerator />} />
<Route path="/pdf" element={<PdfAnalyzer />} />
<Route path="/tools" element={<AITools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;