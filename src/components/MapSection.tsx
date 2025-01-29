export const MapSection = () => {
  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ea384c]">COME TRAIN WITH US</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pl-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">ADDRESS</h3>
              <p className="text-xl">5000 VALLEY WEST BLVD</p>
              <p className="text-xl">SUITE 8</p>
              <p className="text-xl">ARCATA CA 95521</p>
            </div>
            <div className="mt-8">
              <h3 className="text-3xl font-bold mb-4">TELEPHONE</h3>
              <p className="text-xl">707-388-3111</p>
            </div>
          </div>
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.6!2d-124.0891!3d40.8745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d1570e327d2c3b%3A0x6c2e4b5f2f6a8c0a!2s5000%20Valley%20West%20Blvd%2C%20Arcata%2C%20CA%2095521!5e0!3m2!1sen!2sus!4v1710901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lost Boys BJJ Location"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};