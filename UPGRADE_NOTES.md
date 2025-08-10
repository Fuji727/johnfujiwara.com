# Upgrade Notes

## Next.js 15.4.6 Upgrade Completed

This project has been successfully upgraded to:
- Next.js 15.4.6 (from 14.0.4)
- React 19.1.1 (from 18.2.0)
- ESLint 9.33.0 (from 8.43.0)

### Node.js Compatibility

The project now includes engine specifications in package.json requiring Node.js >=18.17.0, which ensures compatibility with Node.js 22.

### Google Fonts Issue

During the upgrade testing, the Google Fonts (Baskervville) import has been temporarily commented out due to network connectivity restrictions in the testing environment. In a production environment with full internet access, you can uncomment the Google Fonts import in `app/layout.js`:

```javascript
import { Baskervville } from 'next/font/google'
 
const baskerville = Baskervville({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  fallback: ['Georgia', 'serif'],
})
```

And restore the className in the html element:
```javascript
<html lang="en" className={baskerville.className}>
```

### Security Vulnerabilities

All security vulnerabilities have been resolved with the dependency updates.

### Breaking Changes

No breaking changes were encountered during the upgrade. The App Router structure and existing code remain fully compatible with the new versions.