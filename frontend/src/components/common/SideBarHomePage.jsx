import CircleLogo from "./CircleLogo";
import logo from "../../../public/images/logo.png";
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import defaultUserPhoto from "../../../public/images/defaultUserAvatar.jpg"

const SideBarHomePage = ({ currentUser, condominium, logout }) => {
    const navLinks = [
        { title: 'Home', path: `/condominium/${condominium.id}`, icon: 'home' },
        { title: 'Pedidos', path: '/pedidos', icon: 'file-text', onClick: null },
        { title: 'Espaços', path: `/condominium/${condominium.id}/espacos`, icon: 'grid', onClick: null },
        { title: 'Serviços', path: '/servicos', icon: 'tool', onClick: null },
        { title: 'Finanças', path: '/financas', icon: 'dollar-sign', onClick: null },
        { title: 'Moradores', path: '/moradores', icon: 'users', onClick: null },
        { title: 'Definições', path: '/definicoes', icon: 'settings', onClick: null },
        { title: 'Terminar sessão', path: '/login', icon: 'log-out', onClick: logout },
      ];

    return (
        <div className="fixed top-0 left-0 h-full w-68 bg-white flex flex-col">
            <div className="flex items-center p-4">
                <CircleLogo src={logo} size="em" />
                <span className="ml-2 text-2xl font-semibold truncate whitespace-nowrap">{condominium.name || "Neighbour Hub"}</span>
            </div>

            <nav className="flex-1 mt-4">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link 
                                to={link.path}
                                onClick={link.onClick}
                                className={`flex items-center px-4 py-3 text-gray-700 ${
                                location.pathname === link.path ? 'bg-gray-200' : ''
                                }`}
                            >
                                <FeatherIcon size={20} icon={link.icon} />
                                <span className="ml-3">{link.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <Link
                to={"/editUser"}
                className="flex items-center p-4"
            >
                <CircleLogo src={currentUser?.foto || defaultUserPhoto} size="em" />
                <div className="ml-2">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
            </Link>
                

            
        </div>
    )
}

export default SideBarHomePage;