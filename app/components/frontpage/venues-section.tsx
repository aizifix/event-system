import { Button } from "../../components/ui/button";

export default function VenuesSection() {
  const venues = [
    {
      id: 1,
      name: "Serot Photography",
      location: "New York City",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      name: "Serot Photography",
      location: "Los Angeles",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      name: "Serot Photography",
      location: "Chicago",
      image: "/placeholder.svg?height=100&width=200",
    },
  ];

  return (
    <section id="venues" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-['Tiro_Gurmukhi'] text-3xl text-center">VENUES</h2>
        <p className="text-center mb-8 text-gray-600">
          Search for venues to organize your event
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={venue.image || "/placeholder.svg"}
                alt={venue.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{venue.name}</h3>
                <p className="text-gray-600 mb-4">{venue.location}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="link">See more venues</Button>
        </div>
      </div>
    </section>
  );
}
