const adminUser = 'Admin1';
const adminPass = 'Deep@2005';

function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const list = document.getElementById('bookingsList');
    list.innerHTML = '';
    bookings.forEach((booking, index) => {
        const li = document.createElement('li');
        li.textContent = `${booking.name} - ${booking.route} on ${booking.date}, Seats ${booking.seats.join(', ')} (${booking.email}) - $${booking.price}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            bookings.splice(index, 1);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            loadBookings();
        };
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Polling for real-time updates (checks every 10 seconds)
setInterval(loadBookings, 10000);

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === adminUser && password === adminPass) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadBookings();  // Load immediately on login
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid credentials!';
    }
});

document.getElementById('addRouteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newRoute = document.getElementById('newRoute').value;
    const newPrice = document.getElementById('newPrice').value;
    
    alert(`Route "${newRoute}" added at $${newPrice}. (Note: This is demo; routes aren't dynamically updated on main site yet.)`);
});

document.getElementById('logout').addEventListener('click', function() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginMessage').textContent = '';
});
