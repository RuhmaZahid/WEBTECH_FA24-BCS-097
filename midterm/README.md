# Midterm Exam — FA24-BCS-097

- **Name:** Ruhma
- **Roll Number:** FA24-BCS-097
- **N:** 97
- **BP:** 697px
- **H:** 319 (hsl(319, 70%, 45%))
- **K:** 4

## Changed Files & Task Summaries
1. **index.html:** Added 5 radio button category filters ("All", "Light", "Medium", "Dark", "Espresso"), a search bar input, and linked `script.js`.
2. **product.html:** Restructured the product details section into a CSS Grid with named template areas (`product-grid`), configured for stacking below 697px and side-by-side with a sticky details box (`top: 87px`) at 697px and above.
3. **style.css:** Added CSS rules for radio button filtering (`:checked ~ .row .product-card` selectors), grid layout and sticky positioning, dynamic "Premium" label styling, and accent color `$H$`.
4. **script.js:** Implemented real-time case-insensitive live search, combined filtering with CSS categories, price sorting toggle via `appendChild`, and automatic "Premium" labeling for products over Rs9,700.

## AI Tools Used
- Gemini 2.5
