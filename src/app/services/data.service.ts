import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // proxy = 'https://cors-anywhere.herokuapp.com/';
  //per attivarlo dal mio localhost devo usare questo link https://cors-anywhere.herokuapp.com/corsdemo

  addRss(name: string, url: string = '') {
    // fetch(this.proxy + url)
    // fetch(url)
    //   .then(res => res.text())
    //   .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    //   .then(data => console.log(data.documentElement));

    const feed = {
      nameFeed: name,
      urlFeed: url ? url : `https://www.reddit.com/r/${name}/.rss`
    }

    let feeds = JSON.parse(localStorage.getItem('feed') || '[]') ;
    if(!(feeds.some((obj: any) => obj.urlFeed === feed.urlFeed))){ //aggiunge il feed solo se non esiste nella localstorage
      feeds.push(feed)
      localStorage.setItem('feed', JSON.stringify(feeds));
    }
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
