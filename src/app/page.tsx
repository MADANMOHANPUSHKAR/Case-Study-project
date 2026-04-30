export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4 text-center">College Activity & Facility Portal</h1>
        <p className="text-lg text-center mb-8">Secure, face-verified access to gym, swimming, and college events.</p>
        
        <div className="flex justify-center space-x-4">
          <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Login with Face Scan
          </a>
          <a href="/register" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
            Register Face
          </a>
        </div>
      </div>
    </main>
  );
}
