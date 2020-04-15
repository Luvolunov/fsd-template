const path = require("path"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
    const isProd = env.NODE_ENV === "production";

    const entriesForPug = {
       landing: "./src/pages/landing/landing",
       "room-details": "./src/pages/room-details/room-details",
       "search-room": "./src/pages/search-room/search-room",
       "sign-in": "./src/pages/sign-in/sign-in",
       "sign-up": "./src/pages/sign-up/sign-up"
    }

    const htmlTemplates = Object.entries(entriesForPug)
                                .map((entry) => 
                                                new HtmlWebpackPlugin({
                                                    template: `${entry[1]}.pug`,
                                                    chunks: [entry[0], "assets/fonts"],
                                                    filename: `${entry[0]}/index.html`
                                                })
                                );
    
    const config = {
        mode: isProd ? "production": "development",
        entry: {
            ...entriesForPug,
            "assets/fonts": "./src/shared/fonts/fonts.scss"
        },
        output: {
            filename: isProd ? "[name]/index.[contenthash].js": "[name]/index.js",
            path: path.resolve(__dirname, "build")
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.pug$/,
                    use: "pug-loader"
                },
                {
                    test: /\.scss/,
                    use: [
                        "style-loader",
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: () => [
                                    require("cssnano"),
                                    require("autoprefixer")
                                ]
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(ttf|woff)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/fonts",
                            publicPath: "../fonts",
                            filename: "[name].[ext]"
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|svg)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images",
                            publicPath: "../assets/images",
                            filename: "[name].[ext]"
                        }
                    }
                }
            ]
        },
        plugins: [
            ...htmlTemplates,
            new MiniCssExtractPlugin({
                filename: isProd ? "[name]/styles.[contenthash].css": "[name]/styles.css"
            }),
            new CleanWebpackPlugin()
        ],
        resolve: {
            extensions: [".ts", ".js"]
        }
    }
    return config;
}