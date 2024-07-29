document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('path/to/your-server-or-service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful submission
        document.getElementById('success-message').classList.remove('d-none');
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
});
