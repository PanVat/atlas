const staty = document.getElementById('staty');

fetch('https://restcountries.com/v3.1/region/europe')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(stat => {
            let blockCountry = `
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
            <div class="card">
                <a href="${stat.maps.googleMaps}">
                <img class="card-img-top" src="${stat.flags.png}" 
                alt="${stat.name.official}" />
                </a>
                <div class="card-body">
                    <h4 class="card-title">${stat.translations.ces.common}</h4> 
                </div>
                </div>                   
            </div>`;
            staty.innerHTML += blockCountry;
        });
    });