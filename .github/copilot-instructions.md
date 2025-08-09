# John Fujiwara Personal Portfolio Website

Personal portfolio website built with Next.js 14 and React, featuring an interactive Cash Flow Tool and Tic Tac Toe game demo.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
Always run these commands in order to set up the development environment:

```bash
cd /home/runner/work/johnfujiwara.com/johnfujiwara.com
npm install
```

- `npm install` - Takes approximately 2 minutes (120 seconds). NEVER CANCEL. Set timeout to 120+ seconds.

### Build Commands
```bash
npm run build
```

- **CRITICAL**: Build takes approximately 15 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- **NETWORK DEPENDENCY**: Build requires internet access to Google Fonts. If build fails with "ENOTFOUND fonts.googleapis.com", temporarily comment out the Google Fonts import in `app/layout.js`:
  ```javascript
  // import { Baskervville } from 'next/font/google'
  // const baskerville = Baskervville({...})
  // Then change: className={baskerville.className} to: /* className={baskerville.className} */
  ```

### Development Server
```bash
npm run dev
```

- Starts development server on `http://localhost:3000` in approximately 2 seconds
- NEVER CANCEL. Set timeout to 60+ seconds for initial startup
- Server stays running until manually stopped

### Production Server
```bash
npm run build
npm start
```

- Starts production server on `http://localhost:3000` in approximately 1 second
- Must run `npm run build` first
- NEVER CANCEL. Set timeout to 60+ seconds

### Linting
```bash
npm run lint
```

- Takes approximately 2 seconds. Set timeout to 60+ seconds
- Currently shows some React Hook dependency warnings in Cash Flow Tool - these are non-critical
- Always run linting before committing changes

## Validation Scenarios

**ALWAYS manually validate changes by running through these complete end-to-end scenarios:**

### Basic Navigation Test
1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Verify homepage loads with "John Fujiwara" header and navigation
4. Click "Résumé" link - should load resume page
5. Click "Demos" link - should load demos listing
6. Click "Home" link - should return to homepage

### Cash Flow Tool Demo Test
1. Navigate to `http://localhost:3000/demos/cashflow`
2. Verify "Cash Flow Tool" page loads with instructions
3. Click "Add expense" button
4. Verify new expense row appears with "New expense" text input
5. Type a test expense name in the input field
6. Verify the interface is responsive and functional
7. **This validates the React components and state management are working**

### Tic Tac Toe Demo Test
1. Navigate to `http://localhost:3000/demos/tictactoe`
2. Verify "Tic Tac Toe" game loads
3. Click any square in the game board
4. Verify "X" appears in clicked square
5. Verify "Next player: O" displays
6. Verify move history appears with "Go to move #1" button
7. **This validates React game logic and state management**

## Project Structure

### Key Directories
```
app/                    # Next.js app router files
├── layout.js          # Main layout with navigation and Google Fonts
├── page.js            # Homepage content
├── demos/             # Demo applications
│   ├── page.js        # Demos listing page
│   ├── cashflow/      # Cash flow calculator
│   │   ├── page.js    # Cash flow tool page
│   │   ├── cashflow.js # React component
│   │   ├── CashFlowCalculator.js
│   │   ├── ExpenseCollectionModel.js
│   │   └── *.css      # Styling
│   └── tictactoe/     # Tic tac toe game
│       ├── page.js    # Game page
│       ├── tictactoe.js # React component
│       └── tictactoe.css
└── resume/
    └── page.js        # Resume page

public/                # Static assets
├── JFujiwara_Resume.pdf
└── test.* files       # Various test JavaScript files

diagrams/              # SVG diagrams
└── test.drawio.svg
```

### Configuration Files
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration (minimal)
- `.eslintrc.json` - ESLint rules (extends next/core-web-vitals)
- `jsconfig.json` - Path aliases configuration

## Common Tasks

### Making Code Changes
1. **ALWAYS** start the dev server first: `npm run dev`
2. Make your changes to the appropriate files
3. Verify changes appear immediately in browser (hot reload)
4. Run validation scenarios to ensure functionality works
5. Run `npm run lint` to check code quality
6. Run `npm run build` to verify production build works

### Debugging React Components
- Cash Flow Tool: Main component in `app/demos/cashflow/cashflow.js`
- Tic Tac Toe: Main component in `app/demos/tictactoe/tictactoe.js`
- Layout issues: Check `app/layout.js` and corresponding CSS files
- **Hydration warnings in development are expected and non-critical**

### Common File Locations
```bash
ls /home/runner/work/johnfujiwara.com/johnfujiwara.com/
# Output: README.md app diagrams jsconfig.json next.config.js package-lock.json package.json public
# Hidden files: .eslintrc.json .git .gitignore .github

ls /home/runner/work/johnfujiwara.com/johnfujiwara.com/app/
# Output: bgtest.svg demos jf.css layout.js page.js page.module.css resume svgbackgrounds.com.svg

ls /home/runner/work/johnfujiwara.com/johnfujiwara.com/app/demos/
# Output: cashflow page.js tictactoe
```

### Dependencies
Current key dependencies from package.json:
- Next.js 14.0.4
- React 18.2.0
- ESLint 8.43.0 with Next.js config

## Troubleshooting

### Build Failures
- **Google Fonts Error**: Comment out font imports in `app/layout.js` as shown above
- **Module Not Found**: Run `npm install` to ensure all dependencies are installed
- **Timeout Issues**: Always use timeouts of 120+ seconds for builds and 60+ seconds for dev server startup

### Runtime Issues
- **Hydration Warnings**: Expected in development, ignore unless affecting functionality
- **Navigation Not Working**: Check `app/layout.js` for Link components
- **Demo Not Interactive**: Verify React component state management in respective demo files

### Performance
- Build time: ~15 seconds (with network access)
- Dev server startup: ~2 seconds
- Lint time: ~10 seconds
- Page load time: <1 second (statically generated)

## Testing Strategy

**NEVER SKIP VALIDATION** - Always run the validation scenarios above after making changes. The demos are interactive React applications that require functional testing, not just build verification.

Focus testing on:
1. Navigation between pages works
2. Cash Flow Tool can add/remove expenses and show calculations
3. Tic Tac Toe game accepts moves and tracks game state
4. All pages load without errors in browser console (except expected hydration warnings)

**ALWAYS take screenshots when validating UI changes to confirm visual correctness.**