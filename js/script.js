'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)

};

const titleClickHandler = function (event) {
  event.preventDefault();
  console.log('link was clicked!');
  const clickedElement = this;

  /* Zabieramy klasę aktywności z akatualnie aktywnego linku */
  const activeLink = document.querySelector('.titles a.active');
  if (activeLink) activeLink.classList.remove('active');

  /* Dodajemy klasę aktywności (pogrubienia) dla linku klikniętego */
  clickedElement.classList.add('active');

  /* Chowamy aktualnie aktywny artykuł (zabierając klasę active) */
  const activeArticle = document.querySelector('.posts .post.active');
  if (activeArticle) activeArticle.classList.remove('active');

  /* Sprawdzamy z jakim artykułem skojarzony jest nasz kliknięty link i pokazujemy ten artykuł */
  const href = clickedElement.getAttribute('href'); //#article-2
  const articleRelatedToLink = document.querySelector(href);
  articleRelatedToLink.classList.add('active');
};

/*Generownaie listy tytulow*/
const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorWrapperSelector: '.post-author',
  authorsListSelector: '.author.list',
  tagsListSelector: '.post-tags .list',
  cloudTagsListSelector: '.sidebar .tags'
};

function generateTitleLinks(customSelector = '') {
  /*szukam elemenetu do usuniecia */
  const titleList = document.querySelector(opts.titleListSelector);

  /* remove contents of titleList */
  titleList.innerHTML = '';

  /*Petla dla wszystkich artykulow*/
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  /*stworzenie zmiennej html i petli */
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* NEW create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('HTML created!');

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  /*przeniesienie stalej i petli na koniec*/
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(`${tag} 'is used' ${tags[tag]} 'times'`);
  }
  return params;
}

function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);

  return opts.cloudClassPrefix + classNumber;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.tagsListSelector);
    console.log(tagsWrapper, opts.tagsListSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //var tags = tag.querySelectorAll('data-tags');

      /*NEW generate HTML of the link  */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      //const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      console.log('HTML created!');

      /* add generated code to html variable */
      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
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
    const tagList = document.querySelector(opts.cloudTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      /*const tagLinkHTML = `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
      console.log('taglinkHTML:', tagLinkHTML);
      allTagsHTML += tagLinkHTML;*/
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData');

  }
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
  const tagLinksHref = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {

    /* add class active */
    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(`a[href^="#tag-"]`);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(opts.authorWrapperSelector);

    /* make html variable with empty string */
    let html = ' ';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-authors');

    /* NEW generate HTML of the link */
    //const linkHTML = `<li><a href="#author-${articleAuthor}">${articleAuthor}</a></li>`;
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTMLData);


    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.innerHTML = html;
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  console.log(authorList);

  /* [NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    /*const authorLinkHTML = `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li>`;
    console.log('authorLinkHTML:', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;*/
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }


  /*[NEW] add HTML from allAuthorsHTML to AuthorsList */
  //authorList.innerHTML = allAuthorsHTML;
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

}
generateAuthors();

function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks) {

    /* remove class active */
    authorLink.classList.remove('active');

    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found author link */
  for (let authorLinkHref of authorLinksHref) {

    /* add class active */
    authorLinkHref.classList.add('active');

    /* END LOOP: for each found author link */
  }
  /* execute function "generateAuthorLinks" with article selector as argument */
  generateTitleLinks(`[data-authors="${author}"]`);
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll(`a[href^="#author"]`);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();










