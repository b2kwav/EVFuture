export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-12">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">About ElectriCore</h3>
            <p className="text-gray-300 text-sm">
              Leading the EV revolution with innovative, sustainable mobility solutions.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary transition">Our Vehicles</a></li>
              <li><a href="#" className="hover:text-primary transition">Charging Network</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">support@electricore.com</p>
            <p className="text-gray-300 text-sm">1-800-ELECTRIC</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2026 ElectriCore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}