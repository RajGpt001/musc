export const generateSilhouettePoints = (count: number = 1200): Float32Array => {
  const points = new Float32Array(count * 3);
  
  // Create an offscreen canvas to draw the deadlifter
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    
    // Left Plate (3/4 view)
    ctx.beginPath();
    ctx.ellipse(35, 145, 15, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right Plate
    ctx.beginPath();
    ctx.ellipse(165, 145, 15, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Barbell
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(35, 145);
    ctx.lineTo(165, 145);
    ctx.stroke();

    // Body (facing left, deadlift pose)
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Legs & Torso
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(110, 185); // Foot
    ctx.lineTo(125, 135); // Knee
    ctx.lineTo(150, 95);  // Hip
    ctx.lineTo(95, 55);   // Shoulder
    ctx.stroke();
    
    // Head
    ctx.beginPath();
    ctx.arc(80, 35, 16, 0, Math.PI * 2);
    ctx.fill();
    
    // Arms (straight down to the bar)
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(95, 55);   // Shoulder
    ctx.lineTo(105, 145); // Hands on bar
    ctx.stroke();

    const imgData = ctx.getImageData(0, 0, 200, 200).data;
    const validPixels = [];
    
    for (let y = 0; y < 200; y++) {
      for (let x = 0; x < 200; x++) {
        const idx = (y * 200 + x) * 4;
        if (imgData[idx] > 128) {
          validPixels.push({ x, y });
        }
      }
    }

    for (let i = 0; i < count; i++) {
      if (validPixels.length > 0) {
        const p = validPixels[Math.floor(Math.random() * validPixels.length)];
        const nx = (p.x / 200) * 2 - 1;
        const ny = -((p.y / 200) * 2 - 1);
        
        points[i * 3] = nx * 3.5;
        points[i * 3 + 1] = ny * 3.5;
        points[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    }
  } else {
    // Fallback if canvas fails
    for (let i = 0; i < count; i++) {
      points[i * 3] = (Math.random() - 0.5) * 4;
      points[i * 3 + 1] = (Math.random() - 0.5) * 4;
      points[i * 3 + 2] = 0;
    }
  }
  
  return points;
};

// Generate a scatter field bounds (where particles start)
export const generateScatterPoints = (count: number = 1200): Float32Array => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    points[i * 3] = (Math.random() - 0.5) * 15;
    points[i * 3 + 1] = (Math.random() - 0.5) * 15;
    points[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
  }
  return points;
};
