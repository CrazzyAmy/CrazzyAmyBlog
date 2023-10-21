import path from 'path';

module.exports=  {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
	},
	publicPath: "/",
	resolve: {
        fallback: {
            "fs": false
        },
    },
	target:'node',
};