"use client"
// components/ErrorBoundary.tsx


import React from 'react';
import { Card } from '../ui/card';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Card className='w-full h-full p-2 flex items-center justify-center my-2'>Something went wrong in this section.</Card>;
    }

    return this.props.children;
  }
}
