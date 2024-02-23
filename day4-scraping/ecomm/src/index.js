import axios from "axios";
import cheerio from "cheerio";
import xlsx from "xlsx";

// Function to fetch HTML content from the website
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to extract product information from the HTML content
function extractProducts(html) {
    const $ = cheerio.load(html);
    const products = [];

    // Use Cheerio selectors to extract product information
    $('.row .col-md-4').each((index, element) => {
        const productName = $(element).find('.caption h4 a.title').text().trim();
        const price = $(element).find('.price.card-title.pull-right').text().trim();
        const description = $(element).find('.description.card-text').text().trim();
        const reviewCount = $(element).find('.review-count').text().trim();
        const productRating = $(element).find('.ratings p').attr('data-rating');

        products.push({
            productName,
            price,
            description,
            reviewCount,
            productRating
        });
    });

    return products;
}

// Main function to run the scraper
async function main() {
    const url = 'https://webscraper.io/test-sites/e-commerce/allinone';
    const html = await fetchData(url);

    if (html) {
        const products = extractProducts(html);
        console.log('Extracted products:', products);

        // Convert data to Excel format
        const worksheet = xlsx.utils.json_to_sheet(products);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

        // Write the workbook to a file
        xlsx.writeFile(workbook, 'products.xlsx');
        console.log('Excel file generated successfully.');
    }
}

// Run the main function
main();
