import { Dumbbell, Facebook, House, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import navItems from '../../lib/links';

const Footer = () => {
    const socials = [
        { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
        { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' }
    ];

    return (
        <footer className="bg-neutral-2 border-neutral-6 border-t text-neutral-11">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-start">
                        <a href="/" className="flex items-center mb-4 text-neutral-12">
                            <Dumbbell className="h-8 w-8 mr-2" />
                            <span className="text-xl font-bold">ILift</span>
                        </a>
                        <p className="text-sm">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus adipisci nam obcaecati facilis possimus culpa voluptate,
                            reiciendis sint? Voluptates, recusandae.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-neutral-12">Liens rapides</h3>
                        <ul className="space-y-2">
                            {navItems.map(item => (
                                <li key={item.to}>
                                    <NavLink to={item.to} className="hover:text-green-9 transition-colors">
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-neutral-12">Contactez nous</h3>
                        <div className="flex items-center">
                            <House className="w-4 h-4 mr-2 mt-1" />
                            36 rue saint Léon
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 mt-1" /> gauthier@seyzeriat.fr
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 mt-1" /> 03 89 80 53 62
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-neutral-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm mb-4 sm:mb-0">© {new Date().getFullYear()} ILift. Tout droits réservés.</div>
                    <div className="flex space-x-4">
                        {socials.map(({ icon: Icon, label, href }) => (
                            <a key={label} href={href} target="_blank" className="text-neutral-11 hover:text-green-9 transition-colors">
                                <Icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
