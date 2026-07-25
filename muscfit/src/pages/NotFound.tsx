import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <PageWrapper>
      <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-[15rem] leading-none text-surface-elevated font-bold select-none absolute z-0 overflow-hidden mix-blend-screen pointer-events-none">
          404
        </h1>
        <div className="relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl uppercase text-text-primary mb-6">Dead End</h2>
          <p className="font-body text-text-muted text-lg max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved. Regroup and head back to base.
          </p>
          <Link to="/">
            <Button size="lg">Return to Base</Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
