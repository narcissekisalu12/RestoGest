let panier = [];

function ajouterAuPanier(nom, prix) {
    let produitExistant = panier.find(item => item.nom === nom);
    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({ nom: nom, prix: prix, quantite: 1 });
    }
    mettreAJourAffichagePanier();
}

function retirerDuPanier(index) {
    panier.splice(index, 1);
    mettreAJourAffichagePanier();
}

function mettreAJourAffichagePanier() {
    let listePanier = document.getElementById('cart-items');
    let totalPanier = document.getElementById('cart-total');
    
    if (!listePanier) return;

    listePanier.innerHTML = '';
    let total = 0;

    if (panier.length === 0) {
        listePanier.innerHTML = '<p style="color: #777; font-size: 0.9rem; text-align: center;">Votre panier est vide pour le moment.</p>';
        totalPanier.textContent = '0 $';
        return;
    }

    panier.forEach((item, index) => {
        let sousTotal = item.prix * item.quantite;
        total += sousTotal;

        let div = document.createElement('div');
        div.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed #333; font-size: 0.95rem;";
        div.innerHTML = `
            <span style="color: #fff;">${item.nom} (x${item.quantite})</span>
            <div>
                <span style="color: #25d366; font-weight: bold; margin-right: 10px;">${sousTotal} $</span>
                <button onclick="retirerDuPanier(${index})" style="background: #e74c3c; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">❌</button>
            </div>
        `;
        listePanier.appendChild(div);
    });

    totalPanier.textContent = total + ' $';
}

function envoyerCommandeWhatsApp() {
    let numeroTable = document.getElementById('table-number').value;

    if (!numeroTable) {
        alert("Veuillez indiquer votre numéro de table avant d'envoyer la commande !");
        return;
    }

    if (panier.length === 0) {
        alert("Votre panier est vide ! Veuillez sélectionner des articles.");
        return;
    }

    let telephoneResto = "243852341188"; // Ton numéro WhatsApp professionnel

    let message = `*🍽️ Nouvelle Commande - RestoGest*\n`;
    message += `📍 *Numéro de table :* Table ${numeroTable}\n\n`;
    message += `📋 *Détails de la commande :*\n`;

    let totalGeneral = 0;
    panier.forEach(item => {
        let sousTotal = item.prix * item.quantite;
        totalGeneral += sousTotal;
        message += `- ${item.quantite}x ${item.nom} (${sousTotal} $)\n`;
    });

    message += `\n------------------\n`;
    message += `💰 *TOTAL À PAYER : ${totalGeneral} $*\n\n`;
    message += `Merci de valider notre commande !`;

    let urlWhatsApp = `https://wa.me/${telephoneResto}?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
}
