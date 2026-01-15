import logo from '../images/logo.png';
import hamburger from '../images/hamburger.png';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<div className="">
				<nav className="navbar">
					<img src={logo.src} className="navbar-logo" alt="Logo" />
					<img
						src={hamburger.src}
						className="navbar-hamburger"
						alt="Hamburger"
						onClick={() => setIsOpen(!isOpen)}
					/>
				</nav>
				<div
					className={'overlay-menu'}
					style={
						isOpen
							? { transform: 'translateY(0%)' }
							: { transform: 'translateY(-100%)' }
					}
				>
					<Link className="overlay-menu-link" href={{pathname: '/'}}>
						Characters
					</Link>
					<Link className="overlay-menu-link" href={{pathname: '/locations'}}>
						Locations
					</Link>
					<Link className="overlay-menu-link" href={{pathname: '/episodes'}}>
						Episodes
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
