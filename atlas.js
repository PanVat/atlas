const staty = document.getElementById('staty');

fetchCountriesByRegion('Evropa'); // Počáteční zobrazení států Evropy

function convertRegionNameToCode(regionName) {
    switch(regionName) {
        case 'Evropa':
            return 'europe';
        case 'Asie':
            return 'asia';
        case 'Afrika':
            return 'africa';
        case 'Oceánie':
            return 'oceania';
        case 'Severní Amerika':
            return 'north america';
        case 'Jižní Amerika':
            return 'south america';
        default:
            return '';
    }
}

// Funkce pro získání států daného kontinentu
function fetchCountriesByRegion(regionName) {
    const regionCode = convertRegionNameToCode(regionName);
    if (!regionCode) {
        console.error('Neznámý kontinent:', regionName);
        return;
    }

    const statyElement = document.getElementById('staty');

    fetch(`https://restcountries.com/v3.1/region/${regionCode}`)
        .then(response => response.json())
        .then(data => {
            statyElement.innerHTML = ''; // Vyprázdníme předchozí obsah
            data.sort((a, b) => a.translations.ces.common.localeCompare(b.translations.ces.common)); // Seřadíme státy podle abecedy
            data.forEach(stat => {
                let formattedPopulation = formatNumber(stat.population);
                let formattedArea = formatNumber(stat.area);

                // Přidání informací o hlavním městě, měně a jazyku
                let mainInfo = '';
                if (stat.capital) {
                    mainInfo += `Hlavní město: <strong>${translateCity(stat.capital)}</strong><br>`;
                }
                if (stat.currencies && stat.currencies[0] && stat.currencies[0].name) {
                    mainInfo += `Měna: <strong>${stat.currencies[0].name}</strong><br>`;
                }
                if (stat.languages && stat.languages[0] && stat.languages[0].name) {
                    mainInfo += `Jazyk: <strong>${stat.languages[0].name}</strong><br>`;
                }

                let blockCountry = `
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                        <div class="card">
                            <a href="https://www.google.com/maps/place/${encodeURIComponent(stat.translations.ces.common)}" target="_blank">
                                <img class="card-img-top flag" src="${stat.flags.png}" alt="${stat.name.official}" />
                            </a>
                            <div class="card-body">
                                <h4 class="card-title">${stat.translations.ces.common}</h4>
                                <p>Rozloha: <strong>${formattedArea} km<sup>2</sup></strong></p>
                                <p>Populace: <strong>${formattedPopulation}</strong></p>
                                <p>${mainInfo}</p>
                            </div>
                        </div>                   
                    </div>`;
                statyElement.innerHTML += blockCountry;
            });
        })
        .catch(error => console.error('Chyba při načítání dat:', error));
}

// Funkce pro formátování čísel s tisícovými oddělovači
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Funkce pro překlad názvů měst
function translateCity(city) {
    // Příklad překladu pro "Prague"
    const translations = {
        "Prague": "Praha"
        // Zde můžete přidat další překlady podle potřeby
    };
    return translations[city] || city;
}