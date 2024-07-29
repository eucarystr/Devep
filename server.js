const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, services, project } = req.body;
    
    // Prepare the data
    const submission = { name, email, phone, services, project };
    
    // Read the existing data
    fs.readFile('submissions.json', (err, data) => {
        if (err) throw err;
        const submissions = JSON.parse(data);
        submissions.push(submission);
        
        // Write the updated data back to the file
        fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2), (err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
