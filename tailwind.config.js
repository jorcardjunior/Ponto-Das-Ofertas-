module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                sidebar: {
                    bg: 'hsl(var(--sidebar-bg))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            width: {
                sidebar: 'var(--sidebar-width)',
                'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
            },
            spacing: {
                sidebar: 'var(--sidebar-width)',
                'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-left': {
                    from: { opacity: '0', transform: 'translateX(-8px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    from: { opacity: '0', transform: 'translateX(100%)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-out-right': {
                    from: { opacity: '1', transform: 'translateX(0)' },
                    to: { opacity: '0', transform: 'translateX(100%)' },
                },
                'overlay-show': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'overlay-hide': {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
                'sidebar-expand': {
                    from: { width: 'var(--sidebar-collapsed-width)' },
                    to: { width: 'var(--sidebar-width)' },
                },
                'sidebar-collapse': {
                    from: { width: 'var(--sidebar-width)' },
                    to: { width: 'var(--sidebar-collapsed-width)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.4s ease-out',
                'fade-in-left': 'fade-in-left 0.3s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-in-right': 'slide-in-right 0.35s ease-out',
                'slide-out-right': 'slide-out-right 0.35s ease-in forwards',
                'overlay-show': 'overlay-show 0.2s ease-out',
                'overlay-hide': 'overlay-hide 0.2s ease-in forwards',
            },
        },
    },
    plugins: [],
};
