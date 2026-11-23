import { useState, useEffect, useCallback, useMemo } from 'react';
import { historyService } from '../services/historyService';

export const useHistory = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest'
  const [stats, setStats] = useState({ recordCount: 0, estimatedBytes: 0, storageType: '' });

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await historyService.getAllRecords();
      setRecords(data);
      const storageStats = await historyService.getStorageStats();
      setStats(storageStats);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleDeleteRecord = useCallback(async (id) => {
    try {
      await historyService.deleteRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      const storageStats = await historyService.getStorageStats();
      setStats(storageStats);
      return true;
    } catch (err) {
      console.error('Failed to delete record:', err);
      return false;
    }
  }, []);

  const handleClearAll = useCallback(async () => {
    try {
      await historyService.clearAll();
      setRecords([]);
      const storageStats = await historyService.getStorageStats();
      setStats(storageStats);
      return true;
    } catch (err) {
      console.error('Failed to clear history:', err);
      return false;
    }
  }, []);

  const handleExportJSON = useCallback(async () => {
    await historyService.exportJSON();
  }, []);

  // Filtered and sorted records
  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        (r.filename && r.filename.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }

    result.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.savedAt).getTime();
      const timeB = new Date(b.timestamp || b.savedAt).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [records, searchQuery, statusFilter, sortBy]);

  return {
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
    loadRecords,
    handleDeleteRecord,
    handleClearAll,
    handleExportJSON
  };
};
