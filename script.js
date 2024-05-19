document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const reservationsList = document.getElementById('reservationsList');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const count = document.getElementById('count').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        const reservation = { name, count, date, time };
        
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
            li.textContent = `Name: ${reservation.name}, Count: ${reservation.count}, Date: ${reservation.date}, Time: ${reservation.time}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteReservation(index);
            });
            li.appendChild(deleteButton);
            reservationsList.appendChild(li);
        });
    }

    function deleteReservation(index) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        displayReservations();
    }

    displayReservations();
});