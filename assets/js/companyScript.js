// const images = [];  // Array to hold image objects
// const imageKeys = {};  // Object to hold image src to ID mapping
// const row1 = document.getElementById('row1');
// const row2 = document.getElementById('row2');

// // Simulate fetching company logos from an API
// async function fetchImages() {
//     try {
//         const response = await fetch(`${CONFIG.API_URL}/companylogos`); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log(data); // Log the data to inspect it
//         // Convert the response data into an array of image objects
//         Object.entries(data).forEach(([id, imageData]) => {
//             const imgObj = {
//                 id: parseInt(id, 10),
//                 src: `data:image/jpeg;base64,${imageData}`
//             };
//             images.push(imgObj);  // Populate the images array
//             imageKeys[imgObj.src] = imgObj.id;  // Populate the imageKeys object
//         });

//         // Now, call displayImages to display the images
//         displayImages();  // No need to pass images as it's already populated globally
//     } catch (error) {
//         console.error('Error fetching images:', error);
//     }
// }

// // Display images in two rows
// // function displayImages() {
// //     const half = Math.ceil(images.length / 2);
// //     const firstHalf = images.slice(0, half);
// //     const secondHalf = images.slice(half);

// //     // Populate first row
// //     firstHalf.forEach((img, index) => {
// //         const div = createImageDiv(img.src, index);
// //         row1.appendChild(div);
// //     });

// //     // Populate second row
// //     secondHalf.forEach((img, index) => {
// //         const div = createImageDiv(img.src, index + half);
// //         row2.appendChild(div);
// //     });
// // }
// function displayImages() {
//     const gridContainer = document.getElementById('image-section');
//     gridContainer.innerHTML = ""; // Clear previous images if any

//     images.forEach((img, index) => {
//         const div = createImageDiv(img.src, index);
//         gridContainer.appendChild(div);
//     });
// }


// // Create an image div element with animation class
// function createImageDiv(src, index) {
//     const div = document.createElement('div');
    
//       // Updated Tailwind classes
//     div.classList.add(
//         'collection', 
//         'max-w-[120px]', // Maximum width (adjust as needed)
//         'max-h-[120px]', // Maximum height (adjust as needed)
//         'sm:max-w-[100px]',  // Smaller width on small screens
//         'sm:max-h-[100px]',  
//         'md:max-w-[110px]',  // Adjust size for medium screens
//         'md:max-h-[110px]',  
//         'lg:max-w-[120px]',  // Adjust size for large screens
//         'lg:max-h-[120px]',  
//         'border-4', 
//         'border-blue-500', 
//         'rounded-xl', 
//         'overflow-hidden', 
//         'cursor-pointer', 
//         'transition-transform', 
//         'transform', 
//         'hover:scale-110', 
//         'hover:shadow-xl',
//         'm-4', 
//         'flex',  // Centering image inside
//         'justify-center',
//         'items-center'
//     );
//     const img = document.createElement('img');
//     img.src = src;
//     img.alt = `Company logo ${index}`;
    
//     // Make the image square by setting the width and height to 100%
//     img.style.width = '100%';
//     img.style.height = '100%';
//     img.style.objectFit = 'cover';  // Ensures the image covers the entire square container, cropping if necessary
    
//     div.appendChild(img);

//     // Add click event listener to navigate to company detail page
//     div.addEventListener('click', () => handleImageClick(src));

//     return div;
// }

// // Handle click event to navigate to company detail page
// async function handleImageClick(imageSrc) {
//     const key = imageKeys[imageSrc];  // Get company ID from imageSrc

//     // Simulate fetching company details by ID
//     try {
//         const response = await fetch(`${CONFIG.API_URL}/displayCompanyById?companyId=${key}`); // Replace with actual API
//         const company = await response.json();

//         if (company) {
//             const encodedCompanyName = encodeURIComponent(company.companyName);
//             const companyUrl = window.location.hostname === "localhost"
//             ? `http://localhost:3000/companyPage/companyName/${encodedCompanyName}`
//             : `https://app.jobbox.one/companyPage/companyName/${encodedCompanyName}`;            
//             // Open in a new tab
//             window.open(companyUrl, "_blank", "noopener,noreferrer"); // Navigate to the company page
//         } else {
//             console.error("Company not found!");
//         }
//     } catch (error) {
//         console.error('Error fetching company details:', error);
//     }
// }

// // Call fetchImages on page load
// fetchImages();  // Trigger image fetching and displaying




const images = [];  // Array to hold image objects
const imageKeys = {};  // Object to hold image src to ID mapping

// Simulate fetching company logos from an API
async function fetchImages() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/companylogos`); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data); // Log the data to inspect it
        // Convert the response data into an array of image objects
        Object.entries(data).forEach(([id, imageData]) => {
            const imgObj = {
                id: parseInt(id, 10),
                src: `data:image/jpeg;base64,${imageData}`
            };
            images.push(imgObj);  // Populate the images array
            imageKeys[imgObj.src] = imgObj.id;  // Populate the imageKeys object
        });

        // Now, call displayImages to display the images
        displayImages();  // No need to pass images as it's already populated globally
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display images in two rows with 5 images per row
function displayImages() {
    const gridContainer = document.getElementById('image-section');
    gridContainer.innerHTML = ""; // Clear previous images if any

    const row1Images = images.slice(0, 4);
    const row2Images = images.slice(4, 8);

    const row1 = document.createElement('div');
    row1.classList.add('image-row');
    row1Images.forEach((img, index) => {
        const div = createImageDiv(img.src, index);
        row1.appendChild(div);
    });
    gridContainer.appendChild(row1);

    const row2 = document.createElement('div');
    row2.classList.add('image-row');
    row2Images.forEach((img, index) => {
        const div = createImageDiv(img.src, index + 5);
        row2.appendChild(div);
    });
    gridContainer.appendChild(row2);
}


// Create an image div element
function createImageDiv(src, index) {
    const div = document.createElement('div');
    
    // Apply only the necessary classes
    div.classList.add('collection');  // This class applies the basic styling
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Company logo ${index}`;
    
    // Make the image square by setting the width and height to 100%
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';  // Ensures the image covers the entire square container, cropping if necessary
    
    div.appendChild(img);

    // Add click event listener to navigate to company detail page
    div.addEventListener('click', () => handleImageClick(src));

    return div;
}

// Handle click event to navigate to company detail page
async function handleImageClick(imageSrc) {
    const key = imageKeys[imageSrc];  // Get company ID from imageSrc

    // Simulate fetching company details by ID
    try {
        const response = await fetch(`${CONFIG.API_URL}/displayCompanyById?companyId=${key}`); // Replace with actual API
        const company = await response.json();

        if (company) {
            const encodedCompanyName = encodeURIComponent(company.companyName);
            const companyUrl = window.location.hostname === "localhost"
            ? `http://localhost:3000/companyPage/companyName/${encodedCompanyName}`
            : `https://app.jobbox.one/companyPage/companyName/${encodedCompanyName}`;            
            // Open in a new tab
            window.open(companyUrl, "_blank", "noopener,noreferrer"); // Navigate to the company page
        } else {
            console.error("Company not found!");
        }
    } catch (error) {
        console.error('Error fetching company details:', error);
    }
}

// Call fetchImages on page load
fetchImages();  // Trigger image fetching and displaying
