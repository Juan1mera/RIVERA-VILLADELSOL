import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { href: '/', label: 'Dashboard', icon: 'home' },
    { href: '/propietarios', label: 'Propietarios', icon: 'users' },
    { href: '/apartamentos', label: 'Apartamentos', icon: 'home' },
    { href: '/visitantes', label: 'Visitantes', icon: 'userPlus' },
    { href: '/pagos', label: 'Pagos', icon: 'dollarSign' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                  <Icon name={item.icon} className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}