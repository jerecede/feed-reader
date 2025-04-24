import { Injectable } from '@angular/core';
import { Feed } from '../../models/feed';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // proxy = 'https://cors-anywhere.herokuapp.com/';
  //per attivarlo dal mio localhost devo usare questo link https://cors-anywhere.herokuapp.com/corsdemo
  // fetch(this.proxy + url)
    // fetch(url)
    //   .then(res => res.text())
    //   .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    //   .then(data => console.log(data.documentElement));

  addRss(nameFeed: string, urlFeed?: string) {
    const feed: Feed = {
      name: nameFeed,
      url: urlFeed ? urlFeed : `https://www.reddit.com/r/${nameFeed}/.rss`,
      isSelected: false
    }

    let feeds = JSON.parse(localStorage.getItem('feed') || '[]') ;
    if(!(feeds.some((obj: Feed) => obj.url === feed.url)) && !(feeds.some((obj: Feed) => obj.name === feed.name))){ //aggiunge il feed solo se è nuovo per la localstorage(nome e url diverso)
        feeds.push(feed);
        localStorage.setItem('feed', JSON.stringify(feeds));
    }
    //bisogna aggiungere controllo se l'url serve veramente per ottenere rss, magari se ne occupa il form direttamente
  }

  // /**
  //  * 
  //  * @param {HTMLElement} data 
  //  */
  // function renderData(data) {
  //   const itemsArray = data.querySelectorAll('item')
  //   const ul = document.createElement('ul')
  //   itemsArray.forEach( post => {
  //     ul.appendChild(generateNews(post))
  //   })
  //   document.getElementById('root').appendChild(ul)
  // }

  // /**
  //  * 
  //  * @param {HTMLElement} item 
  //  */
  // function generateNews(item) {
  //   const li = document.createElement('li')
  //   const divDescription = document.createElement('div')
  //   const newsTitle = item.querySelector('title').textContent
  //   const desc = item.querySelector('description').textContent
  //   divDescription.innerHTML = desc
  //   const imgSrc = divDescription.querySelector('img')
  //   console.log(imgSrc)
  //   let src
  //   try {
  //     src = imgSrc.src
  //   } catch (error) {
  //     src = ''
  //   }

  //   li.innerHTML = `
  //   <h3 class="news-title">
  //     <a href="">${newsTitle}</a>
  //     <div class="img-container">
  //       <img src="${src}" alt="">
  //     </div>
  //   </h3>
  //   `

  //   // li.appendChild(divDescription)
  //   return li
  // }
}
