const fs = require('fs');
const path = require('path');

// Simple SVG to use as base for icons
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
  
  <!-- Globe circle -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 3}" 
          stroke="white" stroke-width="${size / 40}" fill="none"/>
  
  <!-- Connection dots and lines -->
  <g stroke="white" stroke-width="${size / 40}" fill="white">
    <!-- Top-left dot -->
    <circle cx="${size / 2 - size / 4.3}" cy="${size / 2 - size / 4.3}" r="${size / 30}"/>
    <line x1="${size / 2}" y1="${size / 2}" x2="${size / 2 - size / 4.3}" y2="${size / 2 - size / 4.3}"/>
    
    <!-- Top-right dot -->
    <circle cx="${size / 2 + size / 4.3}" cy="${size / 2 - size / 4.3}" r="${size / 30}"/>
    <line x1="${size / 2}" y1="${size / 2}" x2="${size / 2 + size / 4.3}" y2="${size / 2 - size / 4.3}"/>
    
    <!-- Bottom-left dot -->
    <circle cx="${size / 2 - size / 4.3}" cy="${size / 2 + size / 4.3}" r="${size / 30}"/>
    <line x1="${size / 2}" y1="${size / 2}" x2="${size / 2 - size / 4.3}" y2="${size / 2 + size / 4.3}"/>
    
    <!-- Bottom-right dot -->
    <circle cx="${size / 2 + size / 4.3}" cy="${size / 2 + size / 4.3}" r="${size / 30}"/>
    <line x1="${size / 2}" y1="${size / 2}" x2="${size / 2 + size / 4.3}" y2="${size / 2 + size / 4.3}"/>
    
    <!-- Center dot -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 20}"/>
  </g>
</svg>
`;

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Generate SVG icons
sizes.forEach(size => {
    const svg = createIconSVG(size);
    const filename = `icon-${size}x${size}.svg`;
    const filepath = path.join(publicDir, filename);

    fs.writeFileSync(filepath, svg);
    console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All SVG icons generated successfully!');
console.log('\nNote: SVG icons will work for PWA, but for best compatibility,');
console.log('consider converting them to PNG using an online tool or image editor.');
console.log('\nYou can use:');
console.log('- https://cloudconvert.com/svg-to-png');
console.log('- https://www.aconvert.com/image/svg-to-png/');
console.log('- Or any image editing software like GIMP, Photoshop, etc.');
