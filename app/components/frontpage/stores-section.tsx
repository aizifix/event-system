import { Button } from "../../components/ui/button";

export default function StoresSection() {
  const stores = [
    {
      id: 1,
      name: "Serot Photography",
      category: "Photography",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      name: "Serot Photography",
      category: "Photography",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      name: "Serot Photography",
      category: "Photography",
      image: "/placeholder.svg?height=100&width=200",
    },
  ];

  return (
    <section id="stores" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-['Tiro_Gurmukhi'] text-3xl text-center">STORES</h2>
        <p className="text-center mb-8 text-gray-600">
          Search for stores & services that will fit your event
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={store.image || "/placeholder.svg"}
                alt={store.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{store.name}</h3>
                <p className="text-gray-600 mb-4">{store.category}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="link">See more stores</Button>
        </div>
      </div>
    </section>
  );
}
