import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-[#ea384c]">CONTACT US</h2>
        <p className="text-xl mb-4">123 Main Street, Your City, ST 12345</p>
        <p className="text-xl mb-4">Phone: (555) 123-4567</p>
        <p className="text-xl mb-4">Email: info@lostboysbjj.com</p>
        <div className="mt-8">
          <Button 
            onClick={() => navigate("/contact")}
            className="bg-[#ea384c] hover:bg-[#ea384c]/90"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};