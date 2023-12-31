import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execaSync } from 'execa'

const commit = execaSync('git', ['rev-parse', '--short=7', 'HEAD']).stdout

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        fs: {
          fileExists: fs.existsSync,
          readFile: file => fs.readFileSync(file, 'utf-8')
        }
      }
    }),
    copyVuePlugin()
  ],
  define: {
    __COMMIT__: JSON.stringify(commit),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  }
})

function copyVuePlugin(): Plugin {
  return {
    name: 'copy-vue',
    generateBundle() {
      const copyFile = (file: string) => {
        const filePath = path.resolve(__dirname, file)
        const basename = path.basename(file)
        if (!fs.existsSync(filePath)) {
          throw new Error(
            `${basename} not built. ` +
              `Run "nr build vue -f esm-browser" first.`
          )
        }
        this.emitFile({
          type: 'asset',
          fileName: basename,
          source: fs.readFileSync(filePath, 'utf-8')
        })
      }

      copyFile(`./node_modules/vue/dist/vue.runtime.esm-browser.js`)
      copyFile(`./node_modules/vue/dist/vue.runtime.esm-browser.prod.js`)
      copyFile(`./node_modules/@vue/server-renderer/dist/server-renderer.esm-browser.js`)
    }
  }
}
