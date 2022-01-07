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

  function generateTitleLinks(customSelector = '') {
    /*szukam elemenetu do usuniecia */
    const titleList = document.querySelector(optTitleListSelector);

    /* remove contents of titleList */
    titleList.innerHTML='';

    /*Petla dla wszystkich artykulow*/
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  const optArticleTagsSelector = '.post-tags .lists';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

  /* find tags wrapper */
  const tagsWrapper = article.querySelector(opt.optArticleTagsSelector);

  /* make html variable with empty string */
  let html = '';

  /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');

  /* split tags into array */
  const articleTagsArray = articleTags.split(' ');

  /* START LOOP: for each tag */
  for(let tag of articleTagsArray) {
    var tags = tag.querySelectorAll('data-tags');

    /* generate HTML of the link */
    const linkHTML = `<li><a href="#tag-${ tag }">${ tag }</a></li>`;
    console.log ('HTML created!');

    /* add generated code to html variable */
    html += linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if(!allTags[tag]){
      /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
    } else {
     allTags[tag]++;
    }

    /* END LOOP for each tag */
  }

  /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.innerHTML = html;

  /* END LOOP for every article */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML =`<li><a href="#tag-${ tag }">${ tag }</a></li>`;
    console.log('tagLinkHTML:', tagLinkHTML);
    //*allTagsHTML += tag + ' (' + allTags[tag] + ') '
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

generateTags();

/*ADD actions after clicking on Tag*/
function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();
    console.log('link was clicked!');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

  /* remove class active */
  tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll(`a[href="${ href }"]`);

  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {

  /* add class active */
  tagLinkHref.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${ tag }"]`);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(`a[href="${ href }"]`)

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

  /* add tagClickHandler as event listener for that link */
  tagLink.classList.addEventListener('click, tagClickHandler');

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors (){

  const optArticleAuthorSelector = '.post-author .lists';

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(opt.articleAuthorSelector);

    /* make html variable with empty string */
    let html = ' ';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = `<li><a href="#tag-${ author }">${ author }</a></li>`;;
    console.log ('HTML created!');

    /* add generated code to the html variable*/
    html += linkHTML;

    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

/*ADD actions after clicking on Author*/
function AuthorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();
    console.log('link was clicked!');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let authorLink of authorLinks) {

  /* remove class active */
  authorLink.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll(`a[href="${ href }"]`);

  /* START LOOP: for each found author link */
  for (let authorLinkHref of authorLinksHref) {

  /* add class active */
  authorLinkHref.classList.add('active');

  /* END LOOP: for each found author link */
  }
  /* execute function "generateAuthorLinks" with article selector as argument */
  generateAuthorLinks(`[data-authors="${ author }"]`);
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll(`a[href="${ href }"]`)

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

  /* add tagClickHandler as event listener for that link */
  authorLink.classList.addEventListener('click, authorClickHandler');

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
