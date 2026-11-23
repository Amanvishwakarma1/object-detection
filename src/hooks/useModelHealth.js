import { useState, useEffect, useCallback } from 'react';
import { detectionService } from '../services/detectionService';

export const useModelHealth = (autoCheck = true) => {
  const [status, setStatus] = useState('unknown'); // 'online' | 'offline' | 'checking' | 'unknown'
  const [latency, setLatency] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsChecking(true);
    setStatus('checking');
    try {
      const res = await detectionService.checkConnection();
      if (res.success) {
        setStatus('online');
        setLatency(res.latencyMs);
        setErrorMessage(null);
      } else {
        setStatus('offline');
        setLatency(null);
        setErrorMessage(res.error || 'Space unreachable');
      }
      setLastChecked(res.lastChecked);
    } catch (err) {
      setStatus('offline');
      setLatency(null);
      setErrorMessage(err.message || 'Connection check failed');
      setLastChecked(new Date().toISOString());
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (autoCheck) {
      checkHealth();
    }
  }, [autoCheck, checkHealth]);

  return {
    status,
    latency,
    lastChecked,
    errorMessage,
    isChecking,
    checkHealth,
    lastSuccessfulInference: detectionService.lastSuccessfulInference
  };
};
