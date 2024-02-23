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

function extractJobs(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    $('.JobCardList__Grid-sc-1v9ot9b-1.bZUXMN [data-testid="job-card"]').each((index, element) => {
        const jobTitle = $(element).find('.JobListCardstyles__JobTitle-ffng7u-7.cuaBGE').text().trim();
        const company = $(element).find('.JobListCardstyles__JobCompany-ffng7u-8.gguURM').text().trim();
        const location = $(element).find('.JobListCardstyles__ContentContainer-ffng7u-9.JobListCardstyles__BottomContainer-ffng7u-11.jgNAYT.kgLuhL > div:nth-child(3)').text().trim();
        const experience = ''; // Adjust this selector according to the actual HTML structure
        const postedDate = ''; // Adjust this selector according to the actual HTML structure

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