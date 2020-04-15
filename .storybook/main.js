const path = require("path");

module.exports = {
    stories: ['../src/**/*.stories.[tj]s'],
    webpackFinal: (config) => {
        config.module.rules.push({
            test: /\.pug$/,
            use: {
                loader: "pug-loader",
                options: {
                    root: path.resolve(__dirname, "../src")
                }
            }
        },
        {
            test: /\.scss/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        });
        return config;
    }
}