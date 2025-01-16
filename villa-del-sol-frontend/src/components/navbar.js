export default function Navbar() {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">Villa del Sol</div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  