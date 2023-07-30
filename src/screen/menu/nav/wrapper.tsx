interface INavWrapper {
	children: React.ReactNode;
}

const NavWrapper: React.FC<INavWrapper> = ({ children }) => {
	return (
		<nav className="pl-preview-padding flex text-tab-font-size">{children}</nav>
	);
};

export default NavWrapper;
