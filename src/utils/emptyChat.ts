export function emptyChatURL() {
	const SVG = `
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6B7280;stop-opacity:1">
                <animate attributeName="stop-color" values="#6B7280;#3B82F6;#10B981;#6B7280" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1">
                <animate attributeName="stop-color" values="#3B82F6;#10B981;#6B7280;#3B82F6" dur="4s" repeatCount="indefinite"/>
            </stop>
            </linearGradient>
        </defs>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Vollkorn', 'Cairo SC Black', sans-serif" font-size="24" font-weight="bold" font-style="italic" fill="url(#gradient)">Type Messages...</text>
    </svg>`;

	const toBase64 = (str: string) => {
		return typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);
	};

	return `data:image/svg+xml;base64,${toBase64(SVG)}`;
}
