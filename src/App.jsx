import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy-loaded routes for optimal loading performance
const Overview = lazy(() => import('./pages/Overview').then(m => ({ default: m.Overview })));
const DetectionStudio = lazy(() => import('./pages/DetectionStudio').then(m => ({ default: m.DetectionStudio })));
const DetectionHistory = lazy(() => import('./pages/DetectionHistory').then(m => ({ default: m.DetectionHistory })));
const EquipmentClasses = lazy(() => import('./pages/EquipmentClasses').then(m => ({ default: m.EquipmentClasses })));
const ModelInformation = lazy(() => import('./pages/ModelInformation').then(m => ({ default: m.ModelInformation })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const EmbedView = lazy(() => import('./pages/EmbedView').then(m => ({ default: m.EmbedView })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

export default function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading FireGuard AI Platform..." />
        </div>
      }>
        <Routes>
          {/* Main App Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="studio" element={<DetectionStudio />} />
            <Route path="history" element={<DetectionHistory />} />
            <Route path="equipment" element={<EquipmentClasses />} />
            <Route path="model-info" element={<ModelInformation />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Standalone Embed View for iframes */}
          <Route path="/embed" element={<EmbedView />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
