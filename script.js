/*----------------------------------------------------------------------------
    DECLARATION DES CONSTANTES ET DES VARIABLES
/----------------------------------------------------------------------------*/
const inputSearch = document.querySelector('#inputSearch');
const inputRange = document.querySelector('#inputRange');
const spanRange = document.querySelector('#spanRange');
const main = document.querySelector('main');
let data = [];
/* FIN DECLARATION */

/*----------------------------------------------------------------------------
    RECHERCHE QUI PERMET L'AFFICHAGE DE L'API RECHERCHER
/----------------------------------------------------------------------------*/
inputSearch.addEventListener("input", () => {
    const valueRecherche = inputSearch.value.toLowerCase();

    affichageData(valueRecherche);
});
/* FIN RECHERCHE */

/*----------------------------------------------------------------------------
    RANGE QUI PERMET DE LIMITER LE NOMBRE D'AFFICHAGE DES APIS
/----------------------------------------------------------------------------*/
inputRange.addEventListener('input', () => {
    const valueRange = inputRange.value;
    spanRange.innerHTML = valueRange;

    affichageData();
});
/* FIN RANGE */

/*----------------------------------------------------------------------------
    RECUPERATION DES DONNEES DE L'API
/----------------------------------------------------------------------------*/
async function recuperationData() {
    const response = await fetch('https://api.publicapis.org/entries');
    const result = await response.json();

    data = result.entries;
}
/* FIN RECUPERATION */

/*----------------------------------------------------------------------------
    AFFICHAGE DES DONNEES DE L'API
/----------------------------------------------------------------------------*/
function affichageData(recherche = '') {
    main.innerHTML = '';

    const valueRange = inputRange.value;

    let count = 0;

    data.map((x) => {
        if (count < valueRange && x.API.toLowerCase().includes(recherche) && x.API.length >= valueRange) {
            const card = `
                <div class="card">
                    <h1>${x.API}</h1>
                    <p>${x.Description}</p>
                    <a href="${x.Link}" target="_blank">${x.Link}</a>
                    <div class="https">
                        <i class="fa-solid fa-lock"></i> https <i class="fa-solid fa-check"></i>
                    </div>
                    <div class="auth">
                        <i class="fa-solid fa-user-lock"></i> auth <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            `;
            main.insertAdjacentHTML('beforeend', card);
            count++; // Incrémente le compteur après avoir ajouté une carte
        }
    });
}

(async () => {
    await recuperationData(); // Récupération des données de l'API au chargement de la page
    affichageData(); // Affichage par défaut
})();
/* FIN AFFICHAGE */
