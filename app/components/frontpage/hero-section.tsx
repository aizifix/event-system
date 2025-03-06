import { Button } from "../../components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen pt-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden mx-4 md:mx-8 lg:mx-16">
          {/* Background image with overlay */}
          <div
            className="relative h-[600px] bg-cover bg-center"
            style={{
              backgroundImage: `url('/1.jpg')`,
              backgroundPosition: "center 25%",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Tiro_Gurmukhi']">
                  CREATE SPECIAL MOMENTS FOR YOUR EVENT
                </h1>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  With a passion for creativity and a commitment to excellence,
                  we bring your vision to life—so you can relax and enjoy the
                  moment.
                </p>
                <Button
                  size="lg"
                  className="uppercase bg-[#486968] hover:bg-[#486968]/90"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
