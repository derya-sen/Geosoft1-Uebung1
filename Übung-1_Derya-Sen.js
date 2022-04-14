"use strict"

// Umrechnung von Grad-Koordinaten nach Koordinaten im Bogenmaß
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Berechnung der Distanz von 2 Koordinatenpunketen in Km mit der 'Haversine'-Formel
function getDistance (point1, point2) {
    var R = 6371; //Erdradius in km
    var dLat = deg2rad(point2[1]-point1[2]); //Umrechnung Breitengrad in Bogenmaß-Koordinaten
    var dLon = deg2rad(point2[0]-point1[1]); //Umrechnung Längengrad in Bogenmaß-Koordinaten
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(point1[2])) * Math.cos(deg2rad(point2[1])) *
            Math.sin(dLon/2)*Math.sin(dLon/2); // Berechnet Quadrat der halben Sehnlänge zwischen den Punkten
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); //Berechnet Winkelabstand im Bogenmaß
    var d = Math.round((R * c)*100)/100; //Berechnung Distanz in km und Rundung auf 2 Nachkommastellen
    console.log(d);
    return d;
}

let distance = []; // leeres Array erstellt, zur Speicherung der Distanzen der einzelnen Städte

/* Die Funktion 'berechneAbstand()' iteriert durch das cities-array, um für jede Stadt den Abstand 
 mit der getDistance-Formel zu berechnen und speichert diese anschließend in dem Distanz-Array */
function berechneAbstand () {
    var Abstand = 0;
    for(var i=0; i < cities.length; i++){
        Abstand = getDistance(cities[i], point);
        distance.push(Abstand);
        console.log(distance);
    }
}

berechneAbstand(); // Aufruf der Funktion

/* Die Funktion 'fillTable()' iteriert durch die im HTML-Teil generierte Tabelle und füllt diese mit 
dem Namen der Stadt, dem zugeörigen Längen- und Breitengrad und dem berechneten Abstand */
function fillTable() {
    var table = document.getElementById("mytable");
    for (var i = 0; i < cities.length; i++){
        var Row = table.insertRow(1);
        var Zelle0 = Row.insertCell(0);
        Zelle0.innerHTML = cities[i][0]
        var Zelle = Row.insertCell(1);
        Zelle.innerHTML = cities[i][1];
        var Zelle2 = Row.insertCell(2);
        Zelle2.innerHTML = cities[i][2];
        var Zelle3 = Row.insertCell(3);
        Zelle3.innerHTML = distance[i];
    }   
}

fillTable(); // Aufruf der Funktion


// Im Folgenden wird die erstellte Tabelle sortiert.

/* Die Funktion 'getCellValue' dient zum Abruf des Inhalts einer Zelle mit dem Tabellezeilen- und 
Spaltenindex. Dabei kann man mit 'x.children[i]' die ith-Spalte aufrufen und mit 'innerText' oder 
'textContent' den Inhalt erhalten.*/
const getCellValue = (tableRow, columnIndex) => tableRow.children[columnIndex].innerText || 
                                                tableRow.children[columnIndex].textContent;


/* Die Funktion 'comparer' wird genutz, um zwei Werte einer Tabelle miteinander zu vergleichen.
Dabei wird zuerst geprüft, ob beide Werte gültige Ganzzahlen oder Strings sind und anschließend verglichen, 
um die richtige Reihenfolge zu finden*/
const comparer = (idx, asc) => (r1, r2) => ((el1, el2) => 
    el1 !== '' && el2 !== '' && !isNaN(el1) && !isNaN(el2) ? el1 - el2 : el1.toString().localeCompare(el2)
    )(getCellValue(asc ? r1 : r2, idx), getCellValue(asc ? r2 : r1, idx));


// Folgender Algorithmus sortiert die HTML-Tabelle mit Hilfe der 'getCellValue'- und 'comparer'-Funktionen
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => { // macht alle Kopfzeilen in der Tabelle anklickbar
    const table = th.closest('table'); // Alle Zeilen (ohne Kopfzeile) in der ausgewählten Spalte finden
    Array.from(table.querySelectorAll('tr:nth-child(n+2)')) // sortiert mit der sort-Funktion und der comparer-Funktion
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)) 
        .forEach(tr => table.appendChild(tr) ); // fügt sortierte Zeilen wieder in Tabelle ein
})));




