/**
 * Detection History Service with IndexedDB persistence
 * Provides reliable, device-local storage with graceful fallback to localStorage.
 */

const DB_NAME = 'FireGuardAI_DB';
const DB_VERSION = 1;
const STORE_NAME = 'detections';
const LOCAL_STORAGE_KEY = 'fireguard_history_fallback';

class HistoryService {
  constructor() {
    this.db = null;
    this.initPromise = null;
  }

  async getDB() {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        console.warn('IndexedDB not available, fallback will be used.');
        resolve(null);
        return;
      }

      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            store.createIndex('status', 'status', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };

        request.onerror = (event) => {
          console.error('IndexedDB open error:', event.target.error);
          resolve(null); // Fallback to localStorage
        };
      } catch (err) {
        console.error('IndexedDB initialization failed:', err);
        resolve(null);
      }
    });

    return this.initPromise;
  }

  // Fallback to localStorage
  _getFallbackRecords() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('localStorage read error:', e);
      return [];
    }
  }

  _saveFallbackRecords(records) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
  }

  /**
   * Save a completed detection record
   */
  async saveRecord(record) {
    const db = await this.getDB();
    const item = {
      ...record,
      savedAt: new Date().toISOString()
    };

    if (db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.put(item);
        req.onsuccess = () => resolve(item);
        req.onerror = () => reject(req.error);
      });
    } else {
      const records = this._getFallbackRecords();
      const existingIdx = records.findIndex(r => r.id === item.id);
      if (existingIdx >= 0) {
        records[existingIdx] = item;
      } else {
        records.unshift(item);
      }
      this._saveFallbackRecords(records);
      return item;
    }
  }

  /**
   * Retrieve all detection history records sorted newest first
   */
  async getAllRecords() {
    const db = await this.getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const items = req.result || [];
          items.sort((a, b) => new Date(b.timestamp || b.savedAt) - new Date(a.timestamp || a.savedAt));
          resolve(items);
        };
        req.onerror = () => reject(req.error);
      });
    } else {
      const records = this._getFallbackRecords();
      records.sort((a, b) => new Date(b.timestamp || b.savedAt) - new Date(a.timestamp || a.savedAt));
      return records;
    }
  }

  /**
   * Retrieve a single record by ID
   */
  async getRecordById(id) {
    const db = await this.getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } else {
      const records = this._getFallbackRecords();
      return records.find(r => r.id === id) || null;
    }
  }

  /**
   * Delete an individual record
   */
  async deleteRecord(id) {
    const db = await this.getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } else {
      let records = this._getFallbackRecords();
      records = records.filter(r => r.id !== id);
      this._saveFallbackRecords(records);
      return true;
    }
  }

  /**
   * Clear all records
   */
  async clearAll() {
    const db = await this.getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } else {
      this._saveFallbackRecords([]);
      return true;
    }
  }

  /**
   * Calculate storage metrics
   */
  async getStorageStats() {
    const records = await this.getAllRecords();
    const count = records.length;
    // Estimate size in bytes
    const estimatedSize = JSON.stringify(records).length * 2;
    return {
      recordCount: count,
      estimatedBytes: estimatedSize,
      storageType: this.db ? 'IndexedDB (High Capacity)' : 'localStorage (Fallback)'
    };
  }

  /**
   * Export all detection data as a downloadable JSON backup
   */
  async exportJSON() {
    const records = await this.getAllRecords();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fireguard_ai_history_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}

export const historyService = new HistoryService();
