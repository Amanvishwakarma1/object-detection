import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Trash2,
  Download,
  Filter,
  ArrowUpDown,
  FileText,
  AlertTriangle,
  HardDrive,
  ScanEye,
  Info
} from 'lucide-react';
import { HistoryCard } from '../components/history/HistoryCard';
import { HistoryDetailModal } from '../components/history/HistoryDetailModal';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useHistory } from '../hooks/useHistory';
import { formatFileSize } from '../utils/formatUtils';

export const DetectionHistory = () => {
  const navigate = useNavigate();
  const {
    records,
    filteredRecords,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    stats,
    handleDeleteRecord,
    handleClearAll,
    handleExportJSON
  } = useHistory();

  const [selectedRecord, setSelectedRecord] = useState(null);

  const confirmClearAll = () => {
    if (window.confirm('Are you sure you want to delete all detection history records from this browser? This cannot be undone.')) {
      handleClearAll();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#172033] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Inspection Archive & History
            </h2>
            <p className="text-xs text-slate-400">
              Local persistent record log stored securely in browser IndexedDB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {records.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={handleExportJSON}
                className="text-xs border-slate-700 text-slate-300"
              >
                Export JSON
              </Button>

              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={confirmClearAll}
                className="text-xs"
              >
                Clear All
              </Button>
            </>
          )}

          <Button
            variant="primary"
            size="sm"
            icon={ScanEye}
            onClick={() => navigate('/studio')}
            className="text-xs shadow-orange-500/20"
          >
            New Detection
          </Button>
        </div>
      </div>

      {/* Storage Information Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            Storage: <strong className="text-slate-200">{stats.storageType}</strong> • {stats.recordCount} records ({formatFileSize(stats.estimatedBytes)})
          </span>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          * History is stored device-locally in your browser; no images are retained on external servers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#172033]/80 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by image filename or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900">Newest First</option>
              <option value="oldest" className="bg-slate-900">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Grid */}
      {isLoading ? (
        <LoadingSpinner text="Loading detection archive..." />
      ) : filteredRecords.length === 0 ? (
        <EmptyState
          icon={History}
          title={searchQuery ? 'No Matching Records Found' : 'No Detection Records Yet'}
          description={
            searchQuery
              ? `No inspection logs match "${searchQuery}". Try a different keyword.`
              : 'Execute inspections in Detection Studio to preserve detection records.'
          }
          actionLabel={searchQuery ? 'Clear Search' : 'Launch Detection Studio'}
          onAction={searchQuery ? () => setSearchQuery('') : () => navigate('/studio')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRecords.map((record) => (
            <HistoryCard
              key={record.id}
              record={record}
              onOpenDetail={(rec) => setSelectedRecord(rec)}
              onDelete={handleDeleteRecord}
            />
          ))}
        </div>
      )}

      {/* Record Detail Modal */}
      <HistoryDetailModal
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        onDelete={handleDeleteRecord}
      />
    </div>
  );
};
