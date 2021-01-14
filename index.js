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
  const creatUrlArr = data.categories[0].videos.reduce((acc, item) => {
    const sourceArr = item.sources[0].split('/')
    sourceArr.pop()
    return [...acc, {pic: sourceArr.concat(`${item.thumb}`).join('/'), ...item}]
  }, [])

  const createTable = (mass) => {
    let table = document.getElementById('root');
    table.innerHTML = '';

    for (let el of mass) {
      table.innerHTML += `<div class="videoContainer">
      <div>
        <h3>${el.title}</h3>
        <img onclick="window.open('${el.sources[0]}')" alt='pic' src=${el.pic}>
      </div>
      <p class="description">Description: ${el.description}</p>
      </div>
    `;
    }
  }

  createTable(creatUrlArr)
})




