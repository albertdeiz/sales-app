import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg">This is the home page of your application.</p>
      <Button className="mt-4" asChild>
        <Link to="/login">
          Get Started
        </Link>
      </Button>
    </div>
  );
};
