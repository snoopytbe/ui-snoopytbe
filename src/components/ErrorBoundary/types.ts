/**
 * @fileoverview Types pour ErrorBoundary
 */

import type React from "react";

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  children?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
