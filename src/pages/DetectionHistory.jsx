import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Trash2,
  Download,
  ArrowUpDown,
  HardDrive,
  ScanEye
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
    if (window.confirm('Delete all detection history records from this browser? This cannot be undone.')) {
      handleClearAll();
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl enterprise-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#162033] border border-slate-700/80 text-orange-400 flex items-center justify-center shrink-0">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Inspection Archive
            </h2>
            <p className="text-[11px] text-slate-400">
              Persistent local audit trail stored in browser IndexedDB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {records.length > 0 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={handleExportJSON}
                className="text-xs"
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
            className="text-xs"
          >
            New Inspection
          </Button>
        </div>
      </div>

      {/* Storage Information Notice */}
      <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>
            Storage: <strong className="text-slate-200">{stats.storageType}</strong> • {stats.recordCount} records ({formatFileSize(stats.estimatedBytes)})
          </span>
        </div>
        <p className="text-[10px] text-slate-400">
          Client-side persistence only • No external server retention
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl enterprise-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0F1B] border border-slate-700/80 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#0A0F1B] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#0A0F1B]">Newest First</option>
              <option value="oldest" className="bg-[#0A0F1B]">Oldest First</option>
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
          title={searchQuery ? 'No Matching Records' : 'Archive Empty'}
          description={
            searchQuery
              ? `No inspection logs match "${searchQuery}".`
              : 'Execute inspections in Detection Studio to populate your audit stream.'
          }
          actionLabel={searchQuery ? 'Clear Search' : 'Launch Studio'}
          onAction={searchQuery ? () => setSearchQuery('') : () => navigate('/studio')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
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
