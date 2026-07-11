import {
  FileText,
  Files,
  HardDrive,
  Calendar,
} from "lucide-react";

export default function PDFInfo({
  file,
  pages = 0,
}) {
  if (!file) return null;

  return (
    <div className="mt-6 rounded-[28px] border border-white/10 bg-[#14101D] p-6">

      <h2 className="mb-6 text-xl font-bold">
        Document Information
      </h2>

      <div className="space-y-4">

        <InfoItem
          icon={<FileText size={18} />}
          label="File Name"
          value={file.name}
        />

        <InfoItem
          icon={<HardDrive size={18} />}
          label="File Size"
          value={`${(
            file.size /
            1024 /
            1024
          ).toFixed(2)} MB`}
        />

        <InfoItem
          icon={<Files size={18} />}
          label="Pages"
          value={pages || "--"}
        />

        <InfoItem
          icon={<Calendar size={18} />}
          label="Uploaded"
          value={new Date().toLocaleString()}
        />

      </div>

    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#090511] p-4">

      <div className="flex items-center gap-3">

        <div className="text-violet-400">
          {icon}
        </div>

        <span className="text-gray-400">
          {label}
        </span>

      </div>

      <span className="font-medium">
        {value}
      </span>

    </div>
  );
}