import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repositoryName ? `/${repositoryName}/` : '/'

export default defineConfig({ plugins: [vue(), tailwindcss()], base })
