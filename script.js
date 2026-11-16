const produits = [
    {
        nom: "Coca-Cola",
        prix: 2000,
        categorie: "Boissons"
    },
    {
        nom: "Primus",
        prix: 2500,
        categorie: "Bières"
    },
    {
        nom: "Poulet braisé",
        prix: 15000,
        categorie: "Repas"
    },
    {
        nom: "Poisson braisé",
        prix: 12000,
        categorie: "Repas"
    }
];


let menu = document.getElementById("menu");

produits.forEach(function(produit){

    menu.innerHTML += `
        <div class="produit">
            <h3>${produit.nom}</h3>
            <p>${produit.categorie}</p>
            <p>${produit.prix} FC</p>

            <button>
                Commander
            </button>
        </div>
    `;

});
