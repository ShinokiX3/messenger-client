/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.externals.push({
			'utf-8-validate': 'commonjs utf-8-validate',
			bufferutil: 'commonjs bufferutil',
		});
		return config;
	},
	experimental: {
		appDir: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'messenger-server-9lr8.onrender.com',
				port: '',
				pathname: '/image/**',
			},
		],
	},
};

module.exports = nextConfig;
