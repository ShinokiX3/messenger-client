interface IMenuWrapper {
	children: React.ReactNode;
	items?: number;
}

const MenuWrapper: React.FC<IMenuWrapper> = ({ children, items = 9 }) => {
	return (
		<div
			className={`p-side-content-padding 
			scrollbar overflow-hidden
			h-side-content-vh-h 
			hover:overflow-auto
			${items > 8 ? 'hover:pr-[0.5px]' : ''}`}
		>
			{children}
		</div>
	);
};

export default MenuWrapper;
