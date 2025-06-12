export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page not found</p>
        <a href="/" className="text-indigo-600 underline">
          Go to Home
        </a>
      </div>
    </div>
  );
}
