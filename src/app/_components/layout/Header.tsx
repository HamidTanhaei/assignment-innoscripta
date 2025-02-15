import Image from "next/image";
import Link from "next/link";

const MenuItems = ({menuItems, className}: {menuItems: {id: number, name: string, href: string, isActive?: boolean}[], className?: string, href?: string}) => {
    return (<ul className={`flex space-x-2 ${className}`}>
        {menuItems.map((item) => (
            <li
                key={item.id}
                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded ${
                    item.isActive 
                        ? 'text-white bg-indigo-600' 
                        : 'text-gray-300 border border-gray-700 bg-gray-700'
                }`}
            >
                <Link href={item.href}>{item.name}</Link>
            </li>
        ))}
    </ul>);
}

export const Header = () => {
    const menuItems = [
        { id: 1, name: 'Home', href: '/', isActive: true },
    ];
    
    return (
        <header className="bg-gray-800">
            <div className="rounded shadow-lg py-5 px-7 2xl:container 2xl:mx-auto">
                <nav className="flex justify-between">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <Image width='150' height='34' src="/logo.svg" alt="logo" />
                    </div>
    
                    {/* For medium and plus sized devices */}
                    <MenuItems menuItems={menuItems} className="hidden md:flex flex-auto" />
                    <div className="flex space-x-5 justify-center items-center pl-2">
                        <svg className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>                        
                    </div>
                </nav>
                {/* for smaller devcies */}
    
                <MenuItems menuItems={menuItems} className="block md:hidden pt-5" />
            </div>
        </header>
    );
};

export default Header;