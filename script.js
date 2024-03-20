document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    sendDataToBackend(jsonData);
});

function sendDataToBackend(data) {
    fetch('http://localhost:3000/laporan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
        alert('Laporan berhasil disimpan.');
        document.getElementById('reportForm').reset();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Terjadi kesalahan saat mengirim laporan.');
    });
}
