const ordered = []

function addToDay(date){
    let name = prompt('Zadejte jméno');
    let time = prompt('Zadejte čas');
    let count = parseInt(prompt('Zadejte počet osob'));
    let bar = confirm('Potrvzujete rezervaci');
    let den = "day" + date
    console.log(date, name, time, count, bar, den);

    ordered.push({ jmeno: name, den: date, cas: time });
    console.log(ordered);
}