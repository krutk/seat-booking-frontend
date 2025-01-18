// frontend/src/app/page.js
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Train Seat Reservation System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="mb-4">
              This system allows you to reserve seats in our train. Please login or register
              to start booking your seats.
            </p>
            <div className="space-x-4">
              <a
                href="/auth/login"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Login
              </a>
              <a
                href="/auth/register"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Register
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Book up to 7 seats at once</li>
              <li>Priority booking for seats in the same row</li>
              <li>Real-time seat availability updates</li>
              <li>Easy booking cancellation</li>
              <li>Secure user authentication</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
