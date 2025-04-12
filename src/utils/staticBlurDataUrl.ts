export function staticBlurDataUrl() {
	const blurSVG = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5' width='400'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1'/>
      </filter>

      <rect preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' stroke-width='3' stroke='#00b7eb'>
        <animate attributeName='stroke' values='#00b7eb;#ff1493;#ff4500;#800080;#00b7eb' dur='5s' repeatCount='indefinite'/>
        <animate attributeName='stroke-opacity' values='0.6;1;0.6' dur='3s' repeatCount='indefinite'/>
      </rect>

      <defs>
        <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style='stop-color:#00b7eb;stop-opacity:1'>
            <animate attributeName='stop-color' values='#00b7eb;#ff1493;#ff4500;#800080;#00ff7f;#00b7eb' dur='6s' repeatCount='indefinite'/>
          </stop>
          <stop offset='50%' style='stop-color:#ff1493;stop-opacity:0.9'>
            <animate attributeName='stop-color' values='#ff1493;#ff4500;#800080;#00ff7f;#00b7eb;#ff1493' dur='6s' repeatCount='indefinite'/>
          </stop>
          <stop offset='100%' style='stop-color:#ff4500;stop-opacity:1'>
            <animate attributeName='stop-color' values='#ff4500;#800080;#00ff7f;#00b7eb;#ff1493;#ff4500' dur='6s' repeatCount='indefinite'/>
          </stop>
        </linearGradient>
      </defs>

      <rect preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' fill='url(#grad)'/>

      <circle cx='4' cy='2.5' r='0.6' fill='none' stroke='#ffffff' stroke-width='0.05' stroke-opacity='0.5'/>

      <circle cx='4' cy='2.5' r='0.6' fill='none' stroke='#000000' stroke-width='0.04' stroke-linecap='round' stroke-dasharray='0.3 3.46'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 4 2.5'
          to='360 4 2.5'
          dur='1s'
          repeatCount='indefinite'/>
      </circle>
    </svg>`;

	const toBase64 = (str: string) => {
		return typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);
	};

	return `data:image/svg+xml;base64,${toBase64(blurSVG)}`;
}
