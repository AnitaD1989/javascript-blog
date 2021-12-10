{
    'use strict';

    const titleClickHandler = function(event){  
        event.preventDefault();
        console.log('link was clicked!');

        const clickedElement = this;

        /* Zabieramy klasę aktywności z akatualnie aktywnego linku */
        const activeLink = document.querySelector('.titles a.active');
        if(activeLink) activeLink.classList.remove('active');

        /* Dodajemy klasę aktywności (pogrubienia) dla linku klikniętego */
        clickedElement.classList.add('active');

        /* Chowamy aktualnie aktywny artykuł (zabierając klasę active) */
        const activeArticle = document.querySelector('.posts .post.active');
        if(activeArticle) activeArticle.classList.remove('active');

        /* Sprawdzamy z jakim artykułem skojarzony jest nasz kliknięty link i pokazujemy ten artykuł */
        const href = clickedElement.getAttribute('href'); //#article-2
        const articleRelatedToLink = document.querySelector(href);
        articleRelatedToLink.classList.add('active');    
    }

    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}



    
    
    
   /* const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks(){

    /* remove contents of titleList */

    /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

    

    /*function generateTitleLinks(){
    
    const titleList = document.querySelector(optArticleSelector);
    
    clearMessages()

        document.getElementById('messages').innerHTML = (optArticleSelector);
    }*/


