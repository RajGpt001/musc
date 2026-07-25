import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-display uppercase text-text-muted opacity-20 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-text-primary mb-6">
        Void Reached
      </h2>
      <p className="font-body text-text-muted mb-12 max-w-md mx-auto">
        The gear you're looking for doesn't exist in this timeline. It may have been discontinued or moved.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Return to Base
      </Button>
    </div>
  );
};
