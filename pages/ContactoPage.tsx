import React from "react";
import ContactoSection from "../components/ContactoSection";
import { Footer } from "../components/Footer";

const ContactoPage: React.FC = () => (
  <>
    <ContactoSection />
    <div id="contacto-footer-root" className="relative bg-[#030508]">
      <Footer />
    </div>
  </>
);

export default ContactoPage;
