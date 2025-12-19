// Total seats and max per booking
const totalSeats = 10;
const maxSeats = 4;

// Load booked seats from localStorage
function loadBookedSeats(route, date) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booked = [];
    bookings.forEach(b => {
        if (b.route === route && b.date === date) {
            booked.push(...b.seats);
        }
    });
    return booked;
}

// Generate seat grid
function generateSeatGrid(route, date) {
    const grid = document.getElementById('seatGrid');
    grid.innerHTML = '';
    const bookedSeats = loadBookedSeats(route, date);
    
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = i;
        if (bookedSeats.includes(i)) {
            seat.classList.add('booked');
        } else {
            seat.addEventListener('click', () => toggleSeat(seat, i));
        }
        grid.appendChild(seat);
    }
}

// Toggle seat selection
function toggleSeat(seatElement, seatNumber) {
    const selectedSeats = getSelectedSeats();
    if (seatElement.classList.contains('selected')) {
        seatElement.classList.remove('selected');
    } else if (selectedSeats.length < maxSeats) {
        seatElement.classList.add('selected');
    } else {
        alert(`You can select up to ${maxSeats} seats.`);
    }
}

// Get selected seats
function getSelectedSeats() {
    return Array.from(document.querySelectorAll('.seat.selected')).map(s => parseInt(s.textContent));
}

// Update grid when route/date changes
document.getElementById('route').addEventListener('change', updateGrid);
document.getElementById('date').addEventListener('change', updateGrid);

function updateGrid() {
    const route = document.getElementById('route').value;
    const date = document.getElementById('date').value;
    if (route && date) {
        generateSeatGrid(route, date);
    } else {
        document.getElementById('seatGrid').innerHTML = '<p>Select route and date to view seats.</p>';
    }
}

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const route = document.getElementById('route').value;
    const date = document.getElementById('date').value;
    const seats = getSelectedSeats();
    
    if (name && email && route && date && seats.length > 0) {
        let price = 150 * seats.length;
        document.getElementById('confirmation').textContent = `Booking confirmed for ${name} on ${date} for route ${route}, Seats ${seats.join(', ')} at $${price}.  for details!`;
        
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push({ name, email, route, date, seats, price });
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        updateGrid();
    } else {
        alert('Please fill all fields and select at least one seat.');
    }
});

// Initial grid
updateGrid();