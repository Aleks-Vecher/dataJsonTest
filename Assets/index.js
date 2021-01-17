// const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg'

const dataJason = {
  "categories": [{
    "name": "Movies",
    "videos": [
      {
        "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "images/BigBuckBunny.jpg",
        "title": "Big Buck Bunny"
      },
      {
        "description": "The first Blender Open Movie from 2006",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
        "subtitle": "By Blender Foundation",
        "thumb": "images/ElephantsDream.jpg",
        "title": "Elephant Dream"
      },
      {
        "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
        "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
        "subtitle": "By Google",
        "thumb": "images/ForBiggerBlazes.jpg",
        "title": "For Bigger Blazes"
      }
    ]
  }]
}

const getData = () => {
  return new Promise(r => {
    r(dataJason)
  })
}

getData().then(data => {
  creatFilmListTable(data)(creatUrlArr)
})

const creatUrlArr = (data) => {
  return data.categories[0].videos.reduce((acc, item) => {
    const sourceArr = item.sources[0].split('/')
    sourceArr.pop()
    return [...acc, {pic: sourceArr.concat(`${item.thumb}`).join('/'), ...item}]
  }, [])
}

const creatFilmListTable = (data) => (fn) => {
  let videosArr = data.categories[0].videos
  let tableFilm = document.querySelector('.filmContainerRow')

  if (videosArr.length === 0) {
    tableFilm.innerHTML = `<h2>There are no any films available</h2>`
  } else {
    tableFilm.innerHTML = '';

    fn(data).forEach((el, i) => {
      tableFilm.innerHTML += `<div class="videoContainer">
        <h3>${el.title}</h3>
        <h4 class="subtitle">${el.subtitle}</h4>
      <div>
        <img data-img="video" alt='pic' class='imgVideo' data-playVideoUrl=${el.sources[0]} src=${el.pic}>
      </div>
      <button class="showDescription" data-id="desc-${i}">show description</button>
        <p class="description description_close" id="desc-${i}">${el.description}</p>
      </div>
      `;
    })
  }
}

document.addEventListener('click', (e) => {
      if (e.target.classList.contains('showDescription')) {
        const showDescription = document.querySelector(`[data-id=${e.target.dataset.id}]`)
        const description = document.getElementById(`${e.target.dataset.id}`)

        if (description.classList.contains('description_close')) {
          description.classList.remove('description_close')
          showDescription.innerHTML = 'hide description'
        } else {
          description.classList.add('description_close')
          showDescription.innerHTML = 'show description'
        }
      }

      const {img, playvideourl} = e.target.dataset;
      if (img === 'video') {
        const player = document.querySelector('.videoSrc')
        const source = document.getElementById('myVideo')
        player.setAttribute('src', `${playvideourl}`)
        source.load()
        source.play()
      }
    }
)
