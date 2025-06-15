import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const ReceptionsContainer = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Recepciones</h1>
        <p className="text-muted-foreground">
          Aquí puedes gestionar las recepciones de productos.
        </p>
      </div>
      <div>
        <Button asChild>
          <Link to={'/receptions/new'}>
            Nueva
          </Link>
        </Button>
      </div>
      {/* Aquí iría la lista de recepciones y acciones para crear una nueva */}
    </div>
  );
};
