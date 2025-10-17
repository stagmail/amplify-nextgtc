import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full mx-auto text-center min-h-screen flex flex-col items-center justify-center bg-white text-slate-700 space-y-4">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return to Dashboard</Link>
    </div>
  )
}