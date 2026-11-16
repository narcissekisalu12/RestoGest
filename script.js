// Charger le panier depuis la mémoire du navigateur (localStorage)
let panier = JSON.parse(localStorage.getItem('panierResto')) || [];

// Fonction pour sauvegarder et actualiser l'affichage partout
function sauvegarderEtMettreAJour() {
    localStorage.setItem('panierResto', JSON.stringify(panier));
    mettreAJourAffichagePanier();
}

// Ajouter un article avec une quantité personnalisée
function ajouterAuPanierAvecQuantite(nom, prix, inputId) {
    let inputField = document.getElementById(inputId);
    let quantite = parseInt(inputField.value);

    if (isNaN(quantite) || quantite <= 0) {
        alert("Veuillez entrer une quantité valide (au moins 1).");
        return;
    }

    let produitExistant = panier.find(item => item.nom === nom);
    if (produitExistant) {
        produitExistant.quantite += quantite;
    } else {
        panier.push({ nom: nom, prix: prix, quantite: quantite });
    }
    
    sauvegarderEtMettreAJour();
    inputField.value = 1; // Remettre à 1 par défaut

    // Petite animation visuelle ou message de confirmation discret
    alert(`✅ ${quantite}x ${nom} ajouté(s) au panier !`);
}

// Retirer un article
function retirerDuPanier(index) {
    panier.splice(index, 1);
    sauvegarderEtMettreAJour();
}

// Mettre à jour l'affichage et générer la barre flottante magique
function mettreAJourAffichagePanier() {
    let totalArticles = 0;
    let totalGeneral = 0;

    panier.forEach(item => {
        totalArticles += item.quantite;
        totalGeneral += item.prix * item.quantite;
    });

    // Chercher ou créer automatiquement la barre flottante en bas de page
    let floatingBar = document.getElementById('global-floating-bar');
    
    if (!floatingBar) {
        floatingBar = document.createElement('div');
        floatingBar.id = 'global-floating-bar';
        floatingBar.className = 'floating-checkout-bar';
        document.body.appendChild(floatingBar);
    }

    // Si le panier est vide, on peut masquer ou afficher un état vide
    if (panier.length === 0) {
        floatingBar.innerHTML = `
            <div style="color: #888; font-size: 0.9rem;">
                🛒 Panier vide — Naviguez dans le menu pour ajouter des articles
            </div>
            <div style="color: #555; font-size: 0.85rem;">
                RestoGest Pro v2.0
            </div>
        `;
        return;
    }

    // Si le panier contient des articles, on affiche le résumé dynamique et le bouton WhatsApp direct !
    floatingBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="color: #d4af37; font-weight: bold; font-size: 1rem;">🛒 ${totalArticles} article(s)</span>
            <span style="color: #25d366; font-weight: bold; font-size: 1.1rem;">Total : ${totalGeneral} $</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
            <input type="number" id="floating-table-number" placeholder="N° Table/Chambre" style="padding: 6px 10px; width: 110px; border-radius: 6px; border: 1px solid #444; background: #111; color: #fff; text-align: center; font-size: 0.9rem;">
            <button onclick="envoyerCommandeWhatsAppFlottante()" style="background: #25d366; color: #fff; border: none; padding: 8px 18px; border-radius: 20px; font-weight: bold; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 10px rgba(37,211,102,0.3); display: flex; align-items: center; gap: 6px;">
                🚀 Envoyer sur WhatsApp
            </button>
        </div>
    `;
}

// Envoyer la commande structurée depuis la barre flottante
function envoyerCommandeWhatsAppFlottante() {
    let inputTable = document.getElementById('floating-table-number');
    let numeroTable = inputTable ? inputTable.value : '';

    if (!numeroTable) {
        alert("Veuillez indiquer votre numéro de table ou de chambre dans le champ de la barre en bas !");
        if(inputTable) inputTable.focus();
        return;
    }

    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let telephoneResto = "243852341188"; // Ton numéro WhatsApp professionnel

    let hotelItems = panier.filter(item => item.nom.toLowerCase().includes('chambre') || item.nom.toLowerCase().includes('suite'));
    let restoItems = panier.filter(item => !hotelItems.includes(item));

    let message = `*🌟 RestoGest - Demande & Réservation Globale*\n`;
    message += `📍 *Lieu / N° (Table ou Chambre) :* ${numeroTable}\n\n`;

    let totalGeneral = 0;

    if (hotelItems.length > 0) {
        message += `*🏨 SECTION HÉBERGEMENT / HÔTEL :*\n`;
        hotelItems.forEach(item => {
            let sousTotal = item.prix * item.quantite;
            totalGeneral += sousTotal;
            message += `🔹 ${item.quantite}x ${item.nom} — *${sousTotal} $*\n`;
        });
        message += `\n`;
    }

    if (restoItems.length > 0) {
        message += `*🍽️ SECTION RESTAURANT & BAR :*\n`;
        restoItems.forEach(item => {
            let sousTotal = item.prix * item.quantite;
            totalGeneral += sousTotal;
            message += `🔹 ${item.quantite}x ${item.nom} — *${sousTotal} $*\n`;
        });
        message += `\n`;
    }

    message += `------------------\n`;
    message += `💰 *TOTAL GÉNÉRAL : ${totalGeneral} $*\n\n`;
    message += `Merci de valider notre demande !`;

    let urlWhatsApp = `https://wa.me/${telephoneResto}?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
}

// Charger l'affichage au démarrage de chaque page
window.onload = function() {
    mettreAJourAffichagePanier();
};
