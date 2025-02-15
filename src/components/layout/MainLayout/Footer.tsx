interface FooterLink {
    label: string;
    href: string;
  }
  
  const defaultLinks: FooterLink[] = [
    { label: 'About', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];
  
  export const Footer = () => {
    return (
      <footer className="left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <div className="2xl:container 2xl:mx-auto md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} <a href="https://innoscripta.com/" className="hover:underline">Innoscripta</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            {defaultLinks.map((link, index) => (
                <li key={index}>
                <a 
                    href={link.href} 
                    className={`hover:underline ${index !== defaultLinks.length - 1 ? 'me-4 md:me-6' : ''}`}
                >
                    {link.label}
                </a>
                </li>
            ))}
            </ul>
        </div>
      </footer>
    );
  }