document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const reservationsList = document.getElementById('reservationsList');

    form.addEventListener('submit', (e) => {
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
        form.reset();
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

    displayReservations();
});
