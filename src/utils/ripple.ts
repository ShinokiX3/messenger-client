export const ripple = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	ref: React.MutableRefObject<any>
) => {
	if (ref.current) {
		const preview = ref.current;
		const { clientX, clientY, currentTarget } = e;
		var targetCoords = currentTarget.getBoundingClientRect();
		const x = ((clientX - targetCoords.left) * 100) / currentTarget.offsetWidth;
		const y = ((clientY - targetCoords.top) * 100) / currentTarget.offsetHeight;
		const ripple = document.createElement('span');
		const rippleColor = 'black';
		ripple.classList.add('ripple-effect');
		ripple.style.background = rippleColor;
		preview?.appendChild(ripple);
		ripple.style.left = `${x}%`;
		ripple.style.top = `${y}%`;
		setTimeout(() => {
			ripple.remove();
		}, 700);
	}
};
