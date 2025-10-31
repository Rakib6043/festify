# Styles Folder

This folder contains all CSS files for the Festify application, organized separately from component files for better maintainability.

## 📁 File Structure

```
styles/
├── App.css                    # Global application styles and loading spinner
├── Login.css                  # Login page styles
├── Dashboard.css              # Dashboard page styles
├── FestifyList.css           # User festify list view styles
├── AdminFestifyList.css      # Admin table view styles
├── AdminFestifyEdit.css      # Create/Edit form styles
└── FestifyDetails.css        # Detail view styles
```

## 🎨 Design System

### Color Palette

- **Background**: `#f4f4f4` (Very light gray)
- **Content Blocks**: `#F5F3EB` (Light beige)
- **Text**: `#333` (Dark gray/black)
- **Primary Accent**: `#e91e63` (Dark pink)
- **Hover Accent**: `#d81b60` (Darker pink)
- **Border**: `#e1e1e1` (Light gray)
- **White**: `#ffffff`

### Typography

- **Font Family**: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
- **Headings**:
  - H1: 28-32px, font-weight: 600
  - H2: 24-28px, font-weight: 600
  - H3: 18px, font-weight: 600

### Spacing

- **Padding**: 10px, 12px, 15px, 20px, 30px, 40px
- **Gap**: 8px, 10px, 15px, 20px, 25px, 30px
- **Border Radius**: 6px, 8px, 10px, 12px, 15px

### Shadows

- **Light**: `0 5px 15px rgba(0, 0, 0, 0.1)`
- **Medium**: `0 10px 25px rgba(0, 0, 0, 0.1)`
- **Hover**: `0 8px 20px rgba(233, 30, 99, 0.3)`

### Borders

- **Standard**: `2px solid #e91e63`
- **Light**: `1px solid #e1e1e1`
- **Input Focus**: `2px solid #e91e63` + `0 0 0 3px rgba(233, 30, 99, 0.1)` box-shadow

## 📝 Style Guidelines

### Component Import

Always import styles from the `styles` folder:

```javascript
// ✅ Correct
import "../styles/ComponentName.css";

// ❌ Wrong
import "./ComponentName.css";
```

### Naming Conventions

- **Class Names**: Use kebab-case or camelCase consistently

  - `.festify-list-container` ✅
  - `.festifyListContainer` ✅
  - `.Festify_List_Container` ❌

- **Prefix Component Classes**: Use component name as prefix
  ```css
  /* Login.css */
  .login-container {
  }
  .login-card {
  }
  .login-button {
  }
  ```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
  /* Styles for mobile phones */
}

/* Tablet */
@media (max-width: 768px) {
  /* Styles for tablets and small laptops */
}

/* Desktop */
@media (min-width: 769px) {
  /* Default styles for desktop */
}
```

### Button States

All buttons should include these states:

```css
button {
  /* Default state */
  transition: all 0.3s ease;
}

button:hover {
  /* Hover effect */
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
}

button:active {
  /* Click effect */
  transform: translateY(0);
}

button:disabled {
  /* Disabled state */
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Transitions

Standard transition for interactive elements:

```css
transition: all 0.3s ease;
```

### Box Shadows

- **Cards**: `0 5px 15px rgba(0, 0, 0, 0.1)`
- **Elevated Cards**: `0 10px 25px rgba(0, 0, 0, 0.1)`
- **Hover Effects**: `0 8px 20px rgba(233, 30, 99, 0.3)`

## 🔄 Animations

### Spin Animation (Loading Spinner)

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Slide Up

```css
@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 📋 File Descriptions

### App.css

Global styles including:

- Loading spinner and container
- Global reset (`* { margin: 0; padding: 0; box-sizing: border-box; }`)
- Body font and colors
- App container base styles

### Login.css

Login page specific styles:

- Login container (centered layout)
- Login card with border and shadow
- Form inputs and labels
- Login button with loading state
- Error messages
- Footer links

### Dashboard.css

Dashboard layout styles:

- Dashboard container and header
- User info cards
- Action buttons (primary/secondary)
- Two-column grid layout
- Responsive mobile layout

### FestifyList.css

User view for festify list:

- Grid layout for cards
- Search form
- Festify cards with image and content
- Modal overlay and content
- Image previews
- Hover effects

### AdminFestifyList.css

Admin table view:

- Table wrapper with scroll
- Table styling (headers, rows, cells)
- Small image thumbnails
- Edit/Delete action buttons
- Add and Back buttons
- Responsive table layout

### AdminFestifyEdit.css

Create/Edit form:

- Form container and sections
- Input fields (text, textarea, radio)
- Image preview components
- Submit and Cancel buttons
- Error message styling
- Form validation styles

### FestifyDetails.css

Detail view:

- Image blocks for main and additional images
- Details information card
- Location image display
- Action buttons (Delete, Back)
- Responsive image layout

## 🛠 Maintenance

### Adding New Styles

1. Create a new CSS file in this folder: `NewComponent.css`
2. Import it in the component: `import "../styles/NewComponent.css";`
3. Use the established naming conventions and color palette
4. Update this README with the new file

### Updating Existing Styles

1. Modify the appropriate CSS file
2. Test changes in the browser
3. Ensure responsive behavior on mobile/tablet
4. Check hover/focus states

### Best Practices

- ✅ Keep styles specific to components in their respective CSS files
- ✅ Use the established color palette for consistency
- ✅ Include hover states for interactive elements
- ✅ Add transitions for smooth animations
- ✅ Test responsive behavior on different screen sizes
- ✅ Use meaningful class names
- ❌ Don't use inline styles in components (use classes instead)
- ❌ Don't create overly specific selectors (`.card > .content > .title > span`)
- ❌ Don't mix color schemes outside the established palette

## 📱 Responsive Design

All styles include responsive breakpoints:

- **Desktop**: Default styles (> 768px)
- **Tablet**: 768px and below
- **Mobile**: 480px and below

### Mobile-First Approach

Consider starting with mobile styles and adding desktop enhancements:

```css
/* Mobile default */
.container {
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
}
```

## 🎯 Performance

- Keep CSS files modular and component-specific
- Avoid excessive nesting (max 3 levels)
- Use CSS variables for repeated values (consider adding in future)
- Minimize use of `!important`
- Optimize animations for 60fps

## 📚 Resources

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)

---

**Last Updated**: October 31, 2025  
**Maintained by**: Festify Team
