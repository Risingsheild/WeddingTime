// src/pages/RSVP.js
import React, { useState } from 'react';

function RSVP() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(false);

  // Google Form URL
  const googleFormURL = 'https://docs.google.com/forms/d/11nfpPFVYpeb8qmxwmcXtjvPEuP3_3EwuepgxrQN7cf0/edit'; // Replace with your form URL

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // You can also include parameters in the URL if you want to pre-fill certain fields in the form
    const formURLWithParams = `${googleFormURL}?entry.123456=${encodeURIComponent(name)}&entry.654321=${attending ? 'Yes' : 'No'}`;

    // Redirect to Google Form
    window.location.href = formURLWithParams;
  };

  return (
    <div>
      <h1>RSVP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Will you be attending?
          <input
            type="checkbox"
            checked={attending}
            onChange={() => setAttending(!attending)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RSVP;
