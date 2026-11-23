import React from 'react';
import {
  Clock,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  FileImage
} from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatUtils';
import { downloadImage } from '../../utils/imageUtils';

export const HistoryCard = ({ record, onOpenDetail, onDelete }) => {
  const {
    id,
    filename,
    timestamp,
    savedAt,
    processedImage,
    originalImage,
    processingTimeMs
  } = record;

  const handleDownload = (e) => {
    e.stopPropagation();
    if (processedImage) {
      downloadImage(processedImage, `${filename}_fireguard_annotated.webp`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      onClick={() => onOpenDetail(record)}
      className="rounded-xl enterprise-card enterprise-card-hover overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Thumbnail Frame */}
      <div className="relative h-40 bg-[#070A12] overflow-hidden flex items-center justify-center border-b border-slate-800">
        {processedImage || originalImage ? (
          <img
            src={processedImage || originalImage}
            alt={filename}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FileImage className="w-8 h-8 text-slate-600" />
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#0E1422]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Verified
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onOpenDetail(record)}
            className="p-1.5 rounded-md bg-[#162033] text-white hover:bg-orange-600 transition-colors shadow-lg cursor-pointer border border-slate-700"
            title="Inspect record"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-md bg-[#162033] text-slate-200 hover:bg-slate-700 transition-colors shadow-lg cursor-pointer border border-slate-700"
            title="Download annotated image"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <h4 className="text-xs font-semibold text-slate-200 truncate group-hover:text-orange-400 transition-colors font-mono">
            {filename || 'Inspection Record'}
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
            <Clock className="w-2.5 h-2.5 text-slate-500" />
            <span>{formatDate(timestamp || savedAt)} • {formatTime(timestamp || savedAt)}</span>
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-400 font-mono">
            {processingTimeMs ? `${processingTimeMs} ms` : 'YOLOv8'}
          </span>

          <button
            onClick={handleDelete}
            className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
            title="Delete this record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
