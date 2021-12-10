{
'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

    const titleClickHandler = function(event){  
        event.preventDefault();
        const clickedElement = this.classList.add('active')
            console.log('Link was clicked!');
    
    
   /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
           
    }


    /* [DONE] remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
    
    /* remove class 'active' from all articles */

    const links = document.querySelectorAll('.titles a');
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
        
        
    
    
    const activeArticles = document.querySelectorAll('.post-active .title')
        for (let activeArticle of activeArticles){
             activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = function(){
        const articleSelector = document.clickedElement('href');
        console.log('link was clicked!');
     }
    }

     /* find the correct article using the selector (value of 'href' attribute) */
     const targetArticle = document.querySelector('href');
     console.log ('Link was clicked');

     /* add class 'active' to the correct article */
     targetArticle.addEventListener('click', function(){
         this.classList.add('active');
     })
     
    
     
    }


    const optArticleSelector = '.post',
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

    }

    function generateTitleLinks(){
    
    const titleList = document.querySelector(optArticleSelector);
    
    clearMessages()

        document.getElementById('messages').innerHTML = (optArticleSelector);
    }


