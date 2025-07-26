import LoaderCard from './loaderCard';

export default function LoaderGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 min-h-screen justify-items-center">
      {Array.from({ length: 6 }).map((_, idx) => (
        <LoaderCard key={idx} />
      ))}
    </div>
  );
}
