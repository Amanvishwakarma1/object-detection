import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { copyToClipboard } from '../../utils/imageUtils';
import { Copy, Check, ExternalLink, Code2, Share2, Monitor } from 'lucide-react';

export const EmbedModal = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [embedHeight, setEmbedHeight] = useState('750');
  const [viewMode, setViewMode] = useState('snippet'); // 'snippet' | 'preview'

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://fireguard-ai.vercel.app';
  const shareUrl = `${currentOrigin}/#/studio`;
  const embedUrl = `${currentOrigin}/#/embed`;

  const iframeSnippet = `<iframe
  src="${embedUrl}"
  width="100%"
  height="${embedHeight}"
  style="border:0;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);"
  loading="lazy"
  title="FireGuard AI Inspection Studio"
  allow="camera;clipboard-read;clipboard-write"
></iframe>`;

  const handleCopyLink = async () => {
    await copyToClipboard(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = async () => {
    await copyToClipboard(iframeSnippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Embed & Share FireGuard AI"
      subtitle="Integrate FireGuard AI into internal portals, intranets, or share with safety teams"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Direct Link Section */}
        <div className="p-3.5 rounded-lg bg-[#0E1422] border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Share2 className="w-3.5 h-3.5 text-orange-400" />
              Public Application URL
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Independent SaaS link</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-[#0A0F1B] border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 select-all focus:outline-none"
            />
            <Button
              variant={copiedLink ? 'success' : 'primary'}
              size="sm"
              icon={copiedLink ? Check : Copy}
              onClick={handleCopyLink}
            >
              {copiedLink ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Embed View Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('snippet')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'snippet'
                  ? 'bg-[#1E293B] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 inline mr-1.5" />
              Iframe Snippet
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-[#1E293B] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 inline mr-1.5" />
              Live Preview
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Height:</span>
            <select
              value={embedHeight}
              onChange={(e) => setEmbedHeight(e.target.value)}
              className="bg-[#0A0F1B] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
            >
              <option value="600">600 px</option>
              <option value="750">750 px (Default)</option>
              <option value="900">900 px</option>
            </select>
          </div>
        </div>

        {viewMode === 'snippet' ? (
          <div className="space-y-3">
            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                {iframeSnippet}
              </pre>
              <button
                onClick={handleCopyEmbed}
                className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            </div>

            <div className="rounded-xl p-3 bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Security & Integration Notes:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-400">
                <li>Embed code contains zero API keys or private tokens. All inference requests route publicly to the Hugging Face Space.</li>
                <li>The widget layout automatically collapses side navigation to render cleanly inside embedded containers.</li>
                <li>Ensure your hosting domain does not enforce restrictive Content-Security-Policy (CSP) headers that disallow external iframes.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 h-80">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                title="Embed Preview"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Interactive preview rendering the embedded widget layout.
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
