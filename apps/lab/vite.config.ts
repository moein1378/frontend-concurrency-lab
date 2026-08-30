import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({ plugins: [vue()], base })
