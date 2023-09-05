const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://messenger-client-rho.vercel.app';

export async function dynamicBlurDataUrl(url: string) {
	const base64str = await fetch(
		`${baseURL}/_next/image?url=${url}&w=16&q=65`
	).then(async (response) =>
		Buffer.from(await response.arrayBuffer()).toString('base64')
	);

	const blurSVG = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
            <feGaussianBlur stdDeviation='1'/>
        </filter>

        <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100vw'
        href='data:image/avif;base64,${base64str}'/>
    </svg>
    `;

	const toBase64 = (str: string) => {
		return typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);
	};

	return `data:image/svg+xml;base64,${toBase64(blurSVG)}`;
}
