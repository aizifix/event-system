import { Button } from "../ui/button";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-[#486968] text-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="bg-white text-black rounded-[12px] overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Content */}
            <div className="p-6 md:p-12 flex flex-col justify-center">
              <h2 className="font-['Tiro_Gurmukhi'] text-3xl md:text-4xl mb-6">
                ABOUT US
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry's Standard Dummy
                Text Ever Since The 1500s, When An Unknown Printer Took A Galley
                Of Type And Scrambled It To Make A Type Specimen Book. It Has
                Survived Not Only Five Centuries, But Also The Leap Into
                Electronic Typesetting.
              </p>
              <div>
                <Button className="bg-[#486968] text-white hover:bg-[#486968]/90 px-6 md:px-8 text-sm md:text-base">
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="h-[300px] md:h-full">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/temp_package/package_1.jpg')",
                  minHeight: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
