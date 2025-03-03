const images = [];
const imageKeys = {};
const row1 = document.getElementById('row1');
const row2 = document.getElementById('row2');

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
            images.push(imgObj);
            imageKeys[imgObj.src] = imgObj.id;
        });

        // Split the images into two rows and display
        displayImages();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display images in two rows
function displayImages() {
    const half = Math.ceil(images.length / 2);
    const firstHalf = images.slice(0, half);
    const secondHalf = images.slice(half);

    // Populate first row
    firstHalf.forEach((img, index) => {
        const div = createImageDiv(img.src, index);
        row1.appendChild(div);
    });

    // Populate second row
    secondHalf.forEach((img, index) => {
        const div = createImageDiv(img.src, index + half);
        row2.appendChild(div);
    });
}

// Create an image div element with animation class
function createImageDiv(src, index) {
    const div = document.createElement('div');
    
    // Tailwind classes to make the images responsive
    div.classList.add(
        'collection', 
        'w-full',  // Makes the div responsive (full width by default)
        'sm:w-32',  // On small screens, it takes up 32 width (8rem)
        'md:w-36',  // On medium screens, it takes up 36 width (9rem)
        'lg:w-48',  // On large screens, it takes up 48 width (12rem)
        'xl:w-56',  // On extra-large screens, it takes up 56 width (14rem)
        'border-4', 
        'border-blue-500', 
        'rounded-xl', 
        'overflow-hidden', 
        'cursor-pointer', 
        'transition-transform', 
        'transform', 
        'hover:scale-110', 
        'hover:shadow-xl',
        'm-4' // Adds margin to space out the images
    );

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
    const key = imageKeys[imageSrc];

    // Simulate fetching company details by ID
    try {
        const response = await fetch(`${CONFIG.API_URL}/displayCompanyById?companyId=${key}`); // Replace with actual API
        const company = await response.json();

        if (company) {
            const encodedCompanyName = encodeURIComponent(company.companyName);
            const companyUrl = `https://app.jobbox.one/companyPage/companyName/${encodedCompanyName}`;
            
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
fetchImages();
