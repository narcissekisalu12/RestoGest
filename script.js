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
