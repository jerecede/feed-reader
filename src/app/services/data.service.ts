import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://www.ilsecoloxix.it/genova/rss'

  getData() {
    fetch(this.url)
      .then(res => res.text())
      .then(str => new DOMParser().parseFromString(str, 'text/xml'))
      .then(data => console.log(data.documentElement))
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
