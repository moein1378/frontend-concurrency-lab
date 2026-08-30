import { createVuetify } from 'vuetify'
import {
  VApp,
  VAppBar,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VChip,
  VCol,
  VContainer,
  VFooter,
  VMain,
  VProgressLinear,
  VRow,
  VSheet,
} from 'vuetify/components'
import 'vuetify/styles'

export const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VChip,
    VCol,
    VContainer,
    VFooter,
    VMain,
    VProgressLinear,
    VRow,
    VSheet,
  },
  defaults: {
    VCard: { rounded: 'xl' },
  },
  theme: {
    defaultTheme: 'labLight',
    themes: {
      labLight: {
        dark: false,
        colors: {
          primary: '#2563eb',
          secondary: '#f59e0b',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          background: '#f8fafc',
          surface: '#ffffff',
          'surface-variant': '#e2e8f0',
          'on-background': '#0f172a',
          'on-surface': '#0f172a',
        },
      },
      labDark: {
        dark: true,
        colors: {
          primary: '#60a5fa',
          secondary: '#fbbf24',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          background: '#111827',
          surface: '#111c30',
          'surface-variant': '#1e293b',
          'on-background': '#f8fafc',
          'on-surface': '#f8fafc',
        },
      },
    },
  },
})
