import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
        <Flame className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-100">404 - Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md">
        The requested view does not exist in the FireGuard AI platform. Please check the URL or return to the overview dashboard.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Button variant="primary" icon={Home} onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
        <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};
