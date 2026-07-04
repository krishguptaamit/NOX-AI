import {
  FileText,
  ImageIcon,
  Video,
  Code2,
  Download,
} from "lucide-react";

const files = [
  {
    name: "Landing_Page.jsx",
    type: "React Component",
    icon: Code2,
    size: "18 KB",
  },
  {
    name: "AI_Image.png",
    type: "Generated Image",
    icon: ImageIcon,
    size: "2.4 MB",
  },
  {
    name: "Promo_Video.mp4",
    type: "Generated Video",
    icon: Video,
    size: "24 MB",
  },
  {
    name: "Report.pdf",
    type: "AI Summary",
    icon: FileText,
    size: "1.2 MB",
  },
];

export default function RecentFiles() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Recent Files
        </h2>

        <button className="text-violet-400">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {files.map((file) => {

          const Icon = file.icon;

          return (

            <div
              key={file.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">

                  <Icon size={22} />

                </div>

                <div>

                  <h4 className="font-semibold">
                    {file.name}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {file.type}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <span className="text-sm text-gray-400">
                  {file.size}
                </span>

                <Download size={18} />

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}