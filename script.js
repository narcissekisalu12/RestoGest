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
            <p>Catégorie : ${produit.categorie}</p>
            <p>Prix : ${produit.prix} FC</p>

            <button onclick="commander('${produit.nom}')">
                Commander
            </button>
        </div>
    `;

});


function commander(nomProduit){

    alert("Vous avez choisi : " + nomProduit);

}
