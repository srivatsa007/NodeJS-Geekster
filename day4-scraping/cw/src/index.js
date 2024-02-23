import axios from "axios";
import cheerio from "cheerio";
import ExcelJS from "exceljs";

// Function to fetch HTML content from the job board URL
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to extract job postings from the HTML content
function extractJobs(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    $('.jobTuple').each((index, element) => {
        const jobTitle = $(element).find('.title').text().trim();
        const company = $(element).find('.companyName').text().trim();
        const location = $(element).find('.location').text().trim();
        const experience = $(element).find('.experience').text().trim();
        const postedDate = $(element).find('.date').text().trim();

        jobs.push({
            jobTitle,
            company,
            location,
            experience,
            postedDate
        });
    });

    return jobs;
}

// Main function to run the scraper
async function main() {
    const url = 'https://apna.co/jobs?location_id=1&location_identifier=1&location_type=CustomLocation&location_name=All%20Cities&search=true&text=software';
    const html = await fetchData(url);

    if (html) {
        const jobs = extractJobs(html);
        console.log('Extracted jobs:', jobs);

        // Code to write data to Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Jobs');

        // Define column headers
        worksheet.columns = [
            { header: 'Job Title', key: 'jobTitle', width: 30 },
            { header: 'Company', key: 'company', width: 30 },
            { header: 'Location', key: 'location', width: 20 },
            { header: 'Experience', key: 'experience', width: 20 },
            { header: 'Posted Date', key: 'postedDate', width: 20 }
        ];

        // Add data to the worksheet
        jobs.forEach(job => {
            worksheet.addRow(job);
        });

        // Write the workbook to a file
        await workbook.xlsx.writeFile('jobs.xlsx');
        console.log('Excel file generated successfully.');
    }
}

main();
