export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold text-purple-500">403</h1>
      <p className="mt-4 text-lg text-gray-400">
        You do not have permission to access this page.
      </p>
    </div>
  );
}
