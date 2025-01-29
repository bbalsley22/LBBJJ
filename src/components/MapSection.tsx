export const MapSection = () => {
  const handleMapClick = () => {
    window.open('https://maps.google.com/?q=5000+Valley+West+Blvd+Suite+8,+Arcata,+CA+95521', '_blank');
  };

  return (
    <section className="py-20 bg-black">
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
          <div 
            className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=5000+Valley+West+Blvd,+Arcata,+CA+95521&zoom=15&size=800x400&scale=2&markers=color:red%7C5000+Valley+West+Blvd,+Arcata,+CA+95521&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8')`
            }}
            onClick={handleMapClick}
            role="button"
            aria-label="Open in Google Maps"
          />
        </div>
      </div>
    </section>
  );
};