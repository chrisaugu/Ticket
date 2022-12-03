// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
  packagerConfig: {
    icon: "./images/favicon.ico"
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "kasap",
        // certificateFile: "./cert.pfx",
        // certificatePassword: "this-is-a-secret"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        // Renderer server port
        // port: 3000,
        //  Webpack logger port
        // loggerPort: 9000,
        // devServer: {
        //   stats: 'verbose',
        // },
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              name: "main_window",
              html: "./src/index.html",
              js: "./src/renderer.js",
              preload: {
                js: "./src/preload.js"
              }
            }
          ]
        }
      }
    }
  ]
}