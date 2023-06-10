const Jimp = require('jimp');
const fs = require('fs');
const imagePaths = [
    './image/image1.jpg',
    './image/image2.jpg',
    './image/image3.jpg',


    // Add more image paths as needed
  ];
  const collageWidth = 800;
  const collageHeight = 600;
  const images = [];

  Promise.all(
    imagePaths.map((path) =>
      Jimp.read(path).then((image) => {
        image.resize(collageWidth / 2, collageHeight / 2); // Adjust the size as needed
        images.push(image);
      })
    )
  )
    .then(() => {
      // Create a new blank canvas for the collage
      return new Jimp(collageWidth, collageHeight, (err, canvas) => {
        if (err) throw err;
  
        // Calculate the position to place each image
        const imageWidth = canvas.bitmap.width / 2;
        const imageHeight = canvas.bitmap.height / 2;
        const positions = [
          { x: 0, y: 0 },
          { x: imageWidth, y: 0 },
          { x: 0, y: imageHeight },
          { x: imageWidth, y: imageHeight },
          { x: imageWidth / 2, y: imageHeight / 2 }, // Additional position
          { x: imageWidth / 2, y: 0 },
          { x: 0, y: imageHeight / 2 }, // Additional position
          { x: imageWidth, y: imageHeight / 2 }, // Additional position
          // Add more positions as needed
        ];

        // Paste each image onto the canvas
        images.forEach((image, index) => {
          canvas.blit(image, positions[index].x, positions[index].y);
        });
  
        // Save the collage
        const collagePath = './image/collage.jpg';
        canvas.write(collagePath, (err) => {
          if (err) throw err;
          console.log(`Collage created and saved at ${collagePath}`);
        });
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });