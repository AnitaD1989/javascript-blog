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
};

{  /*Generownaie listy tytulow*/
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const optArticleTagsSelector = '.post-tags .lists';


  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(){

    /*szukam elemenetu do usuniecia */
    const titleList = document.querySelector(optTitleListSelector);

    /* remove contents of titleList */
    titleList.innerHTML='';

    /*Petla dla wszystkich artykulow*/
    var articles = document.querySelectorAll(optArticleSelector);

    /*stworzenie zmiennej html i petli */
    let html ='';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log ('HTML created!');

      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    /*przeniesienie stalej i petli na koniec*/
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}

function generateTags(){
  /* find all articles */

  /* START LOOP: for every article: */

  /* find tags wrapper */

  /* make html variable with empty string */

  /* get tags from data-tags attribute */

  /* split tags into array */

  /* START LOOP: for each tag */

  /* generate HTML of the link */

  /* add generated code to html variable */

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
























