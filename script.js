const API_URL = 'https://flight-price-model.onrender.com';

document.getElementById('priceForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  resultDiv.style.display = 'none';
  errorDiv.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Predicting...';

  const payload = {
    airline: document.getElementById('airline').value,
    class: document.getElementById('class').value,
    departure_time: document.getElementById('departure_time').value,
    days_left: document.getElementById('days_left').value
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something wet.. eh went wrong');
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = 'Estimated Price: <strong>₹' + data.price.toLocaleString() + '</strong>';

  } catch (err) {
    errorDiv.style.display = 'block';
    errorDiv.textContent =
      'Could not reach the prediction server. Make sure app.py is running (python app.py), then try again. (' + err.message + ')';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Predict Price';
  }
});
