document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const reservationForm = document.getElementById('reservationForm');
    const reservationsList = document.getElementById('reservationsList');
    const authSection = document.getElementById('authSection');
    const reservationSection = document.getElementById('reservationSection');
    const logoutButton = document.getElementById('logoutButton');

    let currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        showReservationSection();
    } else {
        showAuthSection();
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('User already exists.');
            return;
        }

        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. You can now login.');
        registerForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            localStorage.setItem('currentUser', username);
            showReservationSection();
        } else {
            alert('Invalid username or password.');
        }
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const peopleCount = document.getElementById('peopleCount').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;
        const repeat = document.getElementById('repeat').value;

        const reservation = { name, peopleCount, date, time, service, repeat };
        
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        displayReservations();
        reservationForm.reset();
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        showAuthSection();
    });

    function displayReservations() {
        reservationsList.innerHTML = '';
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.forEach((reservation, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Name: ${reservation.name}, People: ${reservation.peopleCount}, Date: ${reservation.date}, Time: ${reservation.time}, Service: ${reservation.service}, Repeat: ${reservation.repeat}</span>
                <button onclick="deleteReservation(${index})">Delete</button>
            `;
            reservationsList.appendChild(li);
        });
    }

    window.deleteReservation = (index) => {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        displayReservations();
    };

    function showAuthSection() {
        authSection.style.display = 'block';
        reservationSection.style.display = 'none';
    }

    function showReservationSection() {
        authSection.style.display = 'none';
        reservationSection.style.display = 'block';
        displayReservations();
    }
});
