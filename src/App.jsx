import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/AIChat";
import VideoGenerator from "./pages/VideoGenerator";
import CodeGenerator from "./pages/CodeGenerator";
import VoiceGenerator from "./pages/VoiceGenerator";

import AIPDF from "./pages/AIPDF";
import AITools from "./pages/AITools";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AIImage from "./pages/AIImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
<Route path="/" element={<Dashboard />} />
<Route path="/chat" element={<Chat />} />
<Route path="/image" element={<AIImage />} />
<Route path="/video" element={<VideoGenerator />} />
<Route path="/code" element={<CodeGenerator />} />
<Route path="/voice" element={<VoiceGenerator />} />
<Route path="/pdf" element={<AIPDF />} />
<Route path="/tools" element={<AITools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;