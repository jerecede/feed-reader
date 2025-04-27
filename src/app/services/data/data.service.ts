import { Injectable, signal } from '@angular/core';
import { Feed } from '../../models/feed';
import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentFeeds = signal<Feed[]>([]);
  currentItems = signal<Item[]>([]);
  imgNotFound = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500';

  constructor() {
    this.currentFeeds.set(this.getFeeds())
    this.currentItems.set(this.getItems());
    console.log(this.currentItems());

    fetch('https://www.ilsecoloxix.it/genova/rss')
    .then(res => res.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(data => console.log(data.documentElement));
  }

  addRss(nameFeed: string, urlFeed?: string) {
    const feed: Feed = {
      name: nameFeed,
      url: urlFeed ? urlFeed : `https://www.reddit.com/r/${nameFeed}/.rss`,
      isSelected: false
    }

    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    feeds.push(feed);
    localStorage.setItem('feed', JSON.stringify(feeds));

    this.currentFeeds.set(this.getFeeds())
  }

  removeRss(name: string){
    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    const newFeeds = feeds.filter((feed: Feed) => feed.name !== name);
    localStorage.setItem('feed', JSON.stringify(newFeeds));
    this.currentFeeds.set(this.getFeeds());
  }

  getFeeds(): Feed[]{
    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    return feeds;
  }

  nameSelected(name: string){
    const feedSelected = this.currentFeeds().find((feed: Feed) => feed.name === name);
    if(feedSelected){
      feedSelected.isSelected = !feedSelected.isSelected;
    }

    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    const feedSelectedStorage = feeds.find((feed: Feed) => feed.name === name);
    if(feedSelectedStorage){
      feedSelectedStorage.isSelected = !feedSelectedStorage.isSelected;
    }
    localStorage.setItem('feed', JSON.stringify(feeds));

    this.currentItems.set(this.getItems());
  }

  getItemFromUrl(url: string) {
    // proxy = 'https://cors-anywhere.herokuapp.com/';
    //per attivarlo dal mio localhost devo usare questo link https://cors-anywhere.herokuapp.com/corsdemo
    // fetch(this.proxy + url)

    return fetch(url)
      .then(res => res.text())
      .then(str => new DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const itemsArray = data.querySelectorAll('item');
        let items: Item[] = []
        itemsArray.forEach(itemObj => {
          const itemTitle = itemObj.querySelector('title')!.textContent;
          const itemLink = itemObj.querySelector('link')!.textContent;

          const itemDate = itemObj.querySelector('pubDate')!.textContent || '';
          const itemDateClean = itemDate.replace(/^[A-Za-z]+, /, '');

          const newItemDate = new Date(itemDateClean);
          const itemTimestamp = newItemDate.getTime();

          const itemImgDesc = itemObj.querySelector('description')!.textContent || '';

          let matchImg = itemImgDesc.match(/<img src="([^"]+)"/);
          const itemImg = matchImg ? matchImg[1] : this.imgNotFound;

          let itemDesc = itemImgDesc.replace(/<\/?[^>]+(>|$)/g, "").trim();

          const item: Item = {
            title: itemTitle || '',
            desc: itemDesc,
            img: itemImg,
            link: itemLink || '',
            timestamp: itemTimestamp
          }
          items.push(item);
        })
        return Promise.all(items);
      });
  }

  getItems() {
    const items: Item[] = []
    for (const feed of this.currentFeeds()) {
      if (feed.isSelected || this.currentFeeds().every((feed: Feed) => feed.isSelected === false)) {
        const url = feed.url
        this.getItemFromUrl(url).then(arrayItems => {
          items.push(...arrayItems);
        })
      }
    }
    items.sort((a, b) => a.timestamp - b.timestamp)
    return items;
  }

  // esisteNome(nome){
  // if (!(feeds.some((obj: Feed) => obj.url === feed.url)) && !(feeds.some((obj: Feed) => obj.name === feed.name))) { //aggiunge il feed solo se è nuovo per la localstorage(nome e url diverso)
  //bisogna aggiungere controllo se l'url serve veramente per ottenere rss, magari se ne occupa il form direttamente
  // }

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
