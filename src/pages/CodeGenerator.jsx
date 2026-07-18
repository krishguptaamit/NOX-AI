import CodeHeader from "../components/code/CodeHeader";
import CodePromptPanel from "../components/code/CodePromptPanel";
import CodeOutput from "../components/code/CodeOutput";
import HistoryModal from "../components/code/HistoryModal";

import useCode from "../hooks/useCode";

export default function CodeGenerator() {
  const code = useCode();

  return (
    <div className="min-h-[calc(100vh-96px)] bg-[#090511] text-white">
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
       <CodeHeader
  openHistory={code.openHistory}
/>

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

          <div className="min-w-0">
            <CodePromptPanel code={code} />
          </div>

          {/* Right */}

          <div className="min-w-0">
            <CodeOutput code={code} />
          </div>

<HistoryModal
  open={code.historyOpen}
  onClose={code.closeHistory}
  history={code.codeHistory}
  viewHistoryCode={code.viewHistoryCode}
  deleteHistory={code.deleteHistory}
  clearHistory={code.clearHistory}
/>

        </div>
      </div>
    </div>
  );
}