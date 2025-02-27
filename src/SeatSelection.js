import React, { useState, useEffect } from 'react';
// import './styles.css';


const seatPrices = {
  A: 1000,
  B: 1000,
  C: 1000,
  D: 1000,
  E: 1000,
  F: 600,
  G: 600,
  H: 400,
  I: 400,
  J: 400,
  K: 400,
  L: 400,
  M: 400,
  N: 400,
  O: 400,
  P: 400,
  Q: 400,
  R: 400,
  S: 400,
  T: 400
};


// Grouping seats by their price categories
const seats = {
  "Rs. 1000 Section": [
    ['','A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20','',''],
    ['','B1', 'B2', 'B3', 'B4', 'B5', '', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20','',''],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C21', 'C22', 'C23'],
    ['','D1', 'D2', 'D3', 'D4', 'D5', '', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20','',''],
    ['','E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', '', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', '', 'E21','']
  ],
  "Rs. 600 Section": [
    ['','F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', '', ''],
    ['','G1', 'G2', '', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', '', 'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20','','']
  ],
  "Rs. 400 Section": [
    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', '', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20', '', 'H22', ''],
    ['','I1', '', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', '', 'I18', 'I19', 'I20', 'I21', ''],
    ['','J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', '', 'J16', 'J17', 'J18', 'J19', 'J20', '', ''],
    ['','K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13', 'K14', 'K15', 'K16', 'K17', 'K18', 'K19', 'K20', '', ''],
    ['','L1', '', '', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', '', 'L17', 'L18', '', '', 'L21', ''],
    ['','M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', '', '', 'M11', 'M12', 'M13', '', 'M15', 'M16', '', 'M18', '', 'M20', '', ''],
    ['', 'N2', 'N3', '', 'N5', 'N6', 'N7', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', 'O3', '', 'O5', '', 'O7', 'O8', '', 'O10', '', '', '', '', '', '', '', '', '', '', '', '', '']
  ]
};

const getSeatPrice = (seat) => {
  const section = seat.charAt(0);
  const seatNumber = parseInt(seat.slice(1));

  if (seat === 'C5') return 600;
  if (seat === 'C17') return 1000;

  if (
    (['A', 'B', 'C', 'D', 'E'].includes(section) && seatNumber >= 5 && seatNumber <= 16)
  ) {
    return 1000; // Rs. 1000 block
  }
  if (['A', 'B', 'C', 'D', 'E'].includes(section)) {
    return 600; // Rest of A-E rows are Rs. 600
  }
  return seatPrices[section] || 0;
};





const SeatSelection = () => {

  document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://188.166.213.190/booked-seats',
          {
            mode: 'cors',
          }
        );
        const data = await response.json();
  
        if (response.ok) {
            console.log(data.bookedSeats);
        } else {
            console.error('Error fetching booked seats:', data.error);
        }
    } catch (error) {
        console.error('Failed to fetch booked seats:', error);
    }
  });

  const [seatRequests, setSeatRequests] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(''); // Initialize error state
  const [intake, setIntake] = useState('');
  const [indexNumber, setIndexNumber] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of seat requests to show per page

  // Calculate the index range of the seat requests to display
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRequests = seatRequests.slice(indexOfFirst, indexOfLast);

  // Handle "Next" and "Previous" button clicks
  const nextPage = () => {
    if (currentPage * itemsPerPage < seatRequests.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchSeatRequests = async () => {
    try {
      const response = await fetch('http://188.166.213.190/seat-requests',
        {
          mode: 'cors',
        });
      const data = await response.json();

      if (response.ok) {
        console.log(data.seatRequests);
        setSeatRequests(data.seatRequests);  // Update the state with fetched seat requests
      } else {
        setError(data.error);  // Set error if fetching fails
      }
    } catch (error) {
      setError('Failed to fetch seat requests');  // Catch any errors
      console.error('Error fetching seat requests:', error);
    }
  };

  useEffect(() => {
    fetchSeatRequests();  // Call the function to fetch data on component mount
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Use useEffect hook to fetch booked seats when the component mounts
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch('http://188.166.213.190/booked-seats',
          {
            mode: 'cors',
          });
        const data = await response.json();

        if (response.ok) {
          setBookedSeats(data.bookedSeats);  // Update the state with fetched booked seats
        } else {
          console.error('Error fetching booked seats:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch booked seats:', error);
      }
    };

    fetchBookedSeats();  // Call the function to fetch data
  }, []);  // Empty dependency array ensures this runs only once when the component mounts
  

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  // Update the calculateTotal function to consider the price based on the seat's first letter
  const calculateTotal = () =>
    selectedSeats.reduce((total, seat) => total + getSeatPrice(seat), 0);

  const handleRequestSeats = async () => {
    if (!email) {
      return alert('Please enter your email!');
    }
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      return alert('Please enter a valid 10-digit phone number!');
    }
    if (selectedSeats.length === 0) {
      return alert('No seats selected!');
    }

    // Map selected seats to an array of objects with seat number and price
    const seatDetails = selectedSeats.map(seat => ({
      seatNo: seat,
      price: getSeatPrice(seat),
    }));

    // Calculate total price from seat prices
    const total = seatDetails.reduce((sum, seat) => sum + seat.price, 0);

    // Generate a random 6-character reference number with 2 random letters and 4 random digits
const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter (A-Z)
const getRandomDigits = () => Math.floor(1000 + Math.random() * 900000); // Random 4 digits

// Combine letters and digits
const referenceNo = `${getRandomLetter()}${getRandomLetter()}${getRandomDigits()}`;


const timestamp = new Intl.DateTimeFormat('en-SL', {
  timeZone: 'Asia/Colombo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // To get 24-hour format
}).format(new Date());

    // Prepare the data to send to the backend
    const seatRequestData = {
      email: email,
      requested_seats: seatDetails,  // Send seat details with price information
      phoneNo: phoneNumber,
      referenceNo: referenceNo,        // Add the generated reference number
      timestamp: timestamp,            // Add the current timestamp
      total: total,                      // Include the total price
      intake: intake,
      indexNumber: indexNumber
    };

    try {
      const response = await fetch('http://188.166.213.190/request-seats', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seatRequestData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        const seatInfo = seatDetails
          .map(seat => `${seat.seatNo} - ${seat.price}`)
          .join('\n');

        alert(
          `Seat request sent!\n\n` +
          `Reference No: ${referenceNo}\n` +
          `Seats:\n${seatInfo}\n\n` +
          `Total Price: $${total}\n` +
          `Email: ${email}\n` +
          `Phone: ${phoneNumber}\n` +
          `Timestamp: ${timestamp}` +
          `Intake: ${intake}\n` +
          `Index Number: ${indexNumber}`
        );
      } else {
        // Show error message if any
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while sending seat request!');
    }
};

  const handleSubmit = async () => {
    const adminUsername = sessionStorage.getItem('username');
  
    if (adminUsername === 'guest') {
      alert('As a guest, you can only request seats — not confirm bookings.');
      return;
    }
  
    if (!email) {
      return alert('Please enter your email!');
    }
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      return alert('Please enter a valid 10-digit phone number!');
    }
    if (selectedSeats.length === 0) {
      return alert('No seats selected!');
    }
  
    // Map selected seats to an array of objects with seat number and price
    const seatDetails = selectedSeats.map(seat => ({
      seatNo: seat,
      price: getSeatPrice(seat)
    }));
  
    // Calculate total from seat details
    const total = seatDetails.reduce((sum, seat) => sum + seat.price, 0);

    const timestamp = new Intl.DateTimeFormat('en-SL', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // To get 24-hour format
    }).format(new Date());
  
    // Prepare the data to send to the backend
    const bookingData = {
      timestamp: timestamp,
      email: email,
      seats: seatDetails, // Now sending detailed seat info
      total: total,
      admin: adminUsername,
      phoneNo: phoneNumber,
      intake: intake,
      indexNumber: indexNumber
    };
  
    try {
      const response = await fetch('http://188.166.213.190/book-seats', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message); // Show success message from backend
      } else {
        setError(data.error); // Show error message if any
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while booking seats!');
    }
  };

  

  const getSeatStyle = (seat) => {
    const price = getSeatPrice(seat); // Get the price of the seat
    let backgroundColor = 'grey'; // Default color
  
    // Assign colors based on the price
    if (price === 1000) {
      backgroundColor = 'red'; // Color for Rs. 1000
    } else if (price === 600) {
      backgroundColor = 'blue'; // Color for Rs. 600
    } else if (price === 400) {
      backgroundColor = '#522D00'; // Color for Rs. 400
    }
  
    return {
      backgroundColor: bookedSeats.includes(seat)
          ? 'grey' // For already booked seats
          : selectedSeats.includes(seat)
          ? 'green' // For seats the user selects
          : backgroundColor,
      color: 'white',
      padding: '5px 10px',
      fontSize: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      minWidth: '45px',
      textAlign: 'center'
  };
  };

  return (
    <div className="container" style={{ textAlign: 'center', padding: '10px' }}>
      {/* Page Header */}
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '10px',
        color: '#444',
        fontFamily: 'Arial, sans-serif'
      }}>
        Lily's Magic World Drama Seat Booking
      </h1>

      {/* Ticket Price Legend */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  margin: '20px 0',
  flexWrap: 'wrap' // Ensures it looks good on smaller screens
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
      border: '1px solid #444'
    }}></div>
    <span>Rs. 1000</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'blue',
      border: '1px solid #444'
    }}></div>
    <span>Rs. 600</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: '#522D00',
      border: '1px solid #444'
    }}></div>
    <span>Rs. 400</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'green',
      border: '1px solid #444'
    }}></div>
    <span>Selected Seat</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'lightgrey',
      border: '1px solid #444'
    }}></div>
    <span>Booked Seat</span>
  </div>
</div>
  
      {/* Stage/Screen direction */}
<div style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '10px',
  margin: '10px auto',
  width: '90%', // Takes up more horizontal space
  maxWidth: '1200px', // Increases the max possible length
  fontWeight: 'bold',
  borderRadius: '5px',
  textAlign: 'center'
}}>
  🎭 STAGE 🎭
</div>

      {/* Seat Requests (only for non-guest users) */}
      {sessionStorage.getItem('username') !== 'guest' && (
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Seat Requests</h1>
      )}
  
      {/* Guest warning message */}
      {sessionStorage.getItem('username') === 'guest' ? (
        <div style={{
          backgroundColor: 'red',
          padding: '10px',
          color: 'white',
          marginBottom: '20px'
        }}>
          You are logged in as a guest.
        </div>
      ) : (
        <>
          {currentRequests.map((request, index) => (
            <div key={index} style={{
              marginBottom: '15px',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <h3>Reference No: {request.referenceNo}</h3>
              <p>Email: {request.email}</p>
              <p>Phone No: {request.phoneNo}</p>
              <p>Timestamp: {request.timestamp}</p>
              <p><strong>Requested Seats:</strong></p>
              <ul>
                {request.requested_seats.map((seat, idx) => (
                  <li key={idx}>
                    Seat No: {seat.seatNo}, Price: {seat.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
  
          {/* Pagination Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            gap: '10px'
          }}>
            <button onClick={prevPage} disabled={currentPage === 1} style={buttonStyle}>
              Previous
            </button>
            <button onClick={nextPage} disabled={currentPage * itemsPerPage >= seatRequests.length} style={buttonStyle}>
              Next
            </button>
          </div>
        </>
      )}
  
      {/* Seat map */}
<div
  style={{
    overflowX: 'auto', // Enable horizontal scroll for the entire grid
    whiteSpace: 'nowrap', // Prevent the content from wrapping
    padding: '10px 0', // Optional: adds some padding for visual spacing
    width: '100%', // Ensure the container takes full width of the screen
    boxSizing: 'border-box', // Include padding in the width
  }}
>
  <div style={{ display: 'inline-block', minWidth: '10px' }}> {/* Padding on the left side */}
  {Object.entries(seats).map(([section, rows]) => (
  <div key={`section-${section}`}
  style={{ marginBottom: '0px' }}>
    {rows.map((row, rowIndex) => (
      <div
        key={`row-${section}-${rowIndex}`}  // Unique key for each row
        style={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '7px',
          flexWrap: 'nowrap',
        }}
      >
        {row.map((seat, seatIndex) =>
          seat ? (
            <>
              {seatIndex === 11 && (
                <div style={{ minWidth: '20px' }}></div> // Spacer between left and right sections
              )}
              <button
                key={`seat-${section}-${rowIndex}-${seatIndex}`}  // Unique key for each seat
                onClick={() => handleSeatSelect(seat)}
                style={getSeatStyle(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            </>
          ) : (
            <div key={`empty-${section}-${rowIndex}-${seatIndex}`} style={{ minWidth: '45px' }}></div>  // Unique key for empty seats
          )
        )}
      </div>
    ))}
  </div>
))}


  </div>
</div>


  
      {/* KDU student warning */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <p style={{ color: 'red', fontSize: '14px' }}>
          If you are a KDU student from Intake 41 or 42, please fill in your intake and index number below.
        </p>
      </div>
  
      {/* Form for user details */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '30px'
      }}>
        {/* Column 1: Email and Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
  
          <input
            type="tel"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            style={inputStyle}
          />
        </div>
  
        {/* Column 2: Intake and Index Number */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Your intake (41 or 42)"
            value={intake}
            onChange={e => setIntake(e.target.value)}
            style={inputStyle}
          />
  
          <input
            type="text"
            placeholder="Your index number"
            value={indexNumber}
            onChange={e => setIndexNumber(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
  
      {/* Total and selected seats side by side and buttons*/}
<div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
  <p>Total: Rs. {calculateTotal()}</p>
  <p style={{ color: 'gray' }}>
    Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
  </p>
</div>
  
      {sessionStorage.getItem('username') === 'guest' ? (
        <button onClick={handleRequestSeats} style={buttonConfirmStyle}>
          Request Seats
        </button>
      ) : (
        <button onClick={handleSubmit} style={buttonConfirmStyle}>
          Confirm Booking
        </button>
      )}
    </div>
  );
};



// Common Styles
const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  width: '100%',
  maxWidth: '300px',
  backgroundColor: '#f0f0f0',
  color: 'black',
  border: '2px solid #ccc',
  borderRadius: '5px'
};

const buttonConfirmStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  margin: '0 auto'
};



// Basic button style for pagination buttons
const buttonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  margin: '0 10px'
};

export default SeatSelection;
