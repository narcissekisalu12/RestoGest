function openTab(evt, categoryName) {
    let i, tabcontent, tablinks;
    
    // Masquer tous les contenus d'onglets
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-content");
    }
    
    // Retirer la classe 'active' de tous les boutons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Afficher l'onglet sélectionné et marquer le bouton comme actif
    document.getElementById(categoryName).style.display = "block";
    document.getElementById(categoryName).classList.add("active-content");
    evt.currentTarget.classList.add("active");
}

function envoyerSurWhatsApp() {
    // Récupérer le numéro de table
    let numeroTable = document.getElementById('table-number').value;
    
    if (!numeroTable) {
        alert("S'il vous plaît, veuillez entrer votre numéro de table !");
        return;
    }

    // Ton numéro de téléphone WhatsApp professionnel (mets ton vrai numéro ici avec l'indicatif du pays, ex: 243...)
    let telephoneResto = "243852341188"; // (J'ai mis ton numéro basé sur ton profil, tu pourras le changer si besoin)

    // Construire le message
    let message = `*Nouvelle Commande - RestoGest*\n`;
    message += `📍 *Numéro de table :* Table ${numeroTable}\n\n`;
    message += `📋 *Détails de la commande :*\n`;
    message += `- 1x Whisky Jack Daniel's (45 $)\n`;
    message += `- 2x Bières Glacées (6 $)\n`;
    message += `------------------\n`;
    message += `💰 *Total estimé : 51 $*\n\n`;
    message += `Merci de valider notre commande !`;

    // Encoder le message pour l'URL WhatsApp
    let urlWhatsApp = `https://wa.me/${telephoneResto}?text=${encodeURIComponent(message)}`;

    // Ouvrir WhatsApp
    window.open(urlWhatsApp, '_blank');
}
