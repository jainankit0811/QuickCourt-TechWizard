import { useParams } from 'react-router-dom';

function VenueDetails() {
  const { id } = useParams();
  const venue = {
    id: 1,
    name: 'City Sports Arena',
    description: 'A premium basketball arena with top facilities.',
    address: '123 Downtown St, City',
    sports: ['Basketball', 'Volleyball'],
    amenities: ['Locker Rooms', 'Parking', 'Refreshments'],
    about: 'State-of-the-art sports facility.',
    rating: 4.5,
    reviews: [
      { user: 'John', comment: 'Great place!', rating: 5 },
      { user: 'Jane', comment: 'Good courts.', rating: 4 },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{venue.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="carousel w-full rounded-box">
            <div className="carousel-item w-full">
              <div className="bg-gray-200 h-64 w-full flex items-center justify-center">
                <span>Venue Image</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>{venue.description}</p>
          <p><strong>Address:</strong> {venue.address}</p>
          <p><strong>Sports:</strong> {venue.sports.join(', ')}</p>
          <p><strong>Amenities:</strong> {venue.amenities.join(', ')}</p>
          <p><strong>About:</strong> {venue.about}</p>
          <a href={`/book/${id}`} className="btn btn-secondary mt-4">Book Now</a>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <p>Average Rating: {venue.rating}</p>
        {venue.reviews.map((review, index) => (
          <div key={index} className="card bg-base-100 shadow-xl mt-4">
            <div className="card-body">
              <p><strong>{review.user}</strong>: {review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenueDetails;