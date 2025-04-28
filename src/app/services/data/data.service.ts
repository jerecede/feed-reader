import { Injectable, signal } from '@angular/core';
import { Feed } from '../../models/feed';
import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentFeeds = signal<Feed[]>([]);
  currentItems = signal<Item[]>([]);
  currentFavoriteItems = signal<Item[]>([]);
  imgNotFound = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500';

  constructor() {
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

    this.updateEverything();
  }

  removeRss(name: string){
    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    const newFeeds = feeds.filter((feed: Feed) => feed.name !== name);
    localStorage.setItem('feed', JSON.stringify(newFeeds));

    this.updateEverything();
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

    this.updateEverything();
  }

  toggleFavoriteItem(itemSelected: Item){
    let favoriteItems: Item[] = JSON.parse(localStorage.getItem('favorite') || '[]');
    if(favoriteItems.some((item: Item)=> item.title === itemSelected.title && item.timestamp === itemSelected.timestamp)){
      favoriteItems = favoriteItems.filter((item: Item)=> item.title !== itemSelected.title && item.timestamp !== itemSelected.timestamp)
    } else {
      favoriteItems.push(itemSelected);
    }
    localStorage.setItem('favorite', JSON.stringify(favoriteItems));
    this.updateFavorite();
    console.log(this.currentItems())
    console.log(this.currentFavoriteItems())
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
            timestamp: itemTimestamp,
            isFavorite: false
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

  getFavoriteItems(): Item[]{
    let favoriteItems = JSON.parse(localStorage.getItem('favorite') || '[]');
    return favoriteItems;
  }

  updateEverything(){
    this.currentFeeds.set(this.getFeeds());
    this.currentItems.set(this.getItems());
  }

  updateFavorite(){
    this.currentFavoriteItems.set(this.getFavoriteItems());
  }

  setup(){
    let feeds = JSON.parse(localStorage.getItem('feed') || '[]');
    const setupFeeds = feeds.map((feed: Feed) => ({
      ...feed,
      isSelected: false
    }));
    localStorage.setItem('feed', JSON.stringify(setupFeeds));

    this.updateEverything();
    this.updateFavorite();
  }
}
