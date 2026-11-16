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

    alert(`✅ ${quantite}x ${nom} ajouté(s) au panier !`);
}

// 🗑️ FONCTION POUR VIDER LE PANIER MANUELLEMENT (Remet tout à zéro)
function viderPanierComplet() {
    if (confirm("Voulez-vous vraiment vider le panier et recommencer à zéro ?")) {
        panier = [];
        localStorage.removeItem('panierResto');
        mettreAJourAffichagePanier();
    }
}

// Mettre à jour et générer automatiquement la barre flottante avec le bouton Vider
function mettreAJourAffichagePanier() {
    let totalArticles = 0;
    let totalGeneral = 0;

    panier.forEach(item => {
        totalArticles += item.quantite;
        totalGeneral += item.prix * item.quantite;
    });

    let floatingBar = document.getElementById('global-floating-bar');
    
    if (!floatingBar) {
        floatingBar = document.createElement('div');
        floatingBar.id = 'global-floating-bar';
        floatingBar.className = 'floating-checkout-bar';
        document.body.appendChild(floatingBar);
    }

    if (panier.length === 0) {
        floatingBar.innerHTML = `
            <div style="color: #888; font-size: 0.85rem;">
                🛒 Panier vide — Prêt pour une nouvelle commande
            </div>
            <div style="color: #555; font-size: 0.8rem;">
                RestoGest Pro
            </div>
        `;
        return;
    }

    floatingBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: #d4af37; font-weight: bold; font-size: 0.9rem;">🛒 ${totalArticles} art.</span>
            <span style="color: #25d366; font-weight: bold; font-size: 1rem;">${totalGeneral} $</span>
            <button onclick="viderPanierComplet()" style="background: #e74c3c; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; font-weight: bold;" title="Vider le panier">🗑️ Vider</button>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
            <input type="number" id="floating-table-number" placeholder="N° Table" style="padding: 5px; width: 85px; border-radius: 6px; border: 1px solid #444; background: #111; color: #fff; text-align: center; font-size: 0.85rem;">
            <button onclick="envoyerCommandeWhatsAppFlottante()" style="background: #25d366; color: #fff; border: none; padding: 7px 12px; border-radius: 15px; font-weight: bold; font-size: 0.85rem; cursor: pointer;">
                🚀 Envoyer
            </button>
        </div>
    `;
}

// Envoyer la commande et nettoyer automatiquement la mémoire
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

    // 🧹 Nettoyage automatique complet après l'envoi
    panier = [];
    localStorage.removeItem('panierResto');
    mettreAJourAffichagePanier();
}

// Charger l'affichage au démarrage de chaque page
window.onload = function() {
    mettreAJourAffichagePanier();
};
