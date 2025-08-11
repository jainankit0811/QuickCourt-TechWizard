function MyBookings() {
  const bookings = [
    { id: 1, venue: 'City Sports Arena', sport: 'Basketball', court: 'Court 1', dateTime: '2025-08-12 10:00 AM', status: 'Confirmed' },
    { id: 2, venue: 'Green Turf Fields', sport: 'Soccer', court: 'Field 2', dateTime: '2025-08-13 2:00 PM', status: 'Cancelled' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map(booking => (
            <div key={booking.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{booking.venue}</h2>
                <p>Sport: {booking.sport}</p>
                <p>Court: {booking.court}</p>
                <p>Date: {booking.dateTime}</p>
                <p>Status: {booking.status}</p>
                {booking.status === 'Confirmed' && (
                  <div className="card-actions justify-end">
                    <button className="btn btn-error">Cancel</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">No bookings found.</p>
        </div>
      )}
    </div>
  );
}

export default MyBookings;