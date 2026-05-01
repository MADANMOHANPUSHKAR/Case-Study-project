export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 animated-gradient text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm glassmorphism p-16 rounded-3xl text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">College Activity <br/>& Facility Portal</h1>
        <p className="text-xl md:text-2xl mb-12 opacity-90 drop-shadow-md max-w-2xl mx-auto font-light">Secure, face-verified access to gym, swimming, and college events using next-gen biometrics.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="/login" className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-1">
            Login with Face Scan
          </a>
          <a href="/register" className="px-10 py-4 bg-black/20 backdrop-blur-md text-white border border-white/50 rounded-full font-bold hover:bg-white/30 transition shadow-lg hover:-translate-y-1">
            Register Face
          </a>
        </div>
      </div>
    </main>
  );
}
