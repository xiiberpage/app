const TEMPLATE = {
  shapes: [
    {
      color: '#7f5a83'
    },
    {
      color: '#b6dc76'
    },
    {
      color: '#368F8B'
    },
    {
      color: '#5adbff'
    },
    {
      color: '#160F29'
    },
    {
      color: '#C44536'
    },
    {
      color: '#B7245C'
    },
    {
      color: '#bb0a21'
    },
    {
      color: '#f25c54'
    },
    {
      color: '#FF9B42'
    }
  ]
}

const svg = document.querySelector('svg');
const startLevelScreen = document.querySelector('.start-level-screen');
const level =  {
  index: 0,
  matrix: [
    [], [], [], []
  ],
  cards: [],
  progres: {
    text: null,
    shape: null,
    parent: null,
    circumference: 0,
    value: 0
  },
  pairsFound: 0
};

function createBlankCard(x, y, shapeId) {
  let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  
  let card = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  card.setAttribute('x', `${x * 23 + 5}`);
  card.setAttribute('y', `${y * 23 + 5}`);
  card.setAttribute('width', '18');
  card.setAttribute('height', '18');
  card.setAttribute('style', 'fill:white');
  card.dataset.id=`${shapeId}`;
  card.classList.add('card');
  
  card.addEventListener('click', handleCardClick);
  
  group.appendChild(card);
  
  const shape = createShape(x, y, shapeId);
  group.appendChild(shape);
  
  level.cards.push(group);
  svg.appendChild(group);
}

function createShape(x, y, shapeId) {
  const shapeType = shapeId.substring(0, 1);
  const colorType = shapeId.substring(1, 2);
  let shape;
  
  switch(shapeType) {
    case '0':
      shape = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      shape.setAttribute('x', `${x * 23 + 5}`);
      shape.setAttribute('y', `${y * 23 + 5}`);
      shape.setAttribute('width', '9');
      shape.setAttribute('height', '18');
      break;
    case '1':
      shape = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      shape.setAttribute('x', `${x * 23 + 5}`);
      shape.setAttribute('y', `${y * 23 + 5}`);
      shape.setAttribute('width', '18');
      shape.setAttribute('height', '9');
      break;
    case '3':
      shape = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      shape.setAttribute('d', `M${x * 23 + 5} ${y * 23 + 5} L${x * 23 + 23} ${y * 23 + 5} L${x * 23 + 14} ${y * 23 + 23} Z`);
      break;
      case '4':
      shape = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      shape.setAttribute('d', `M${x * 23 + 14} ${y * 23 + 5} L${x * 23 + 23} ${y * 23 + 23} L${x * 23 + 5} ${y * 23 + 23} Z`);
      break;
    case '2':
      shape = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      shape.setAttribute('cx', x * 23 + 14);
      shape.setAttribute('cy', y * 23 + 14);
      shape.setAttribute('r', '8');
      break;
  }
  shape.setAttribute('style', `fill:${TEMPLATE.shapes[parseInt(colorType)].color}`);
  shape.classList.add('shape');
  return shape;
}

function generateLevelMatrix() {
  const leftOver = [];
  const nrOfShapes = Math.min(Math.ceil(level.index + 1 / 2) * 10, 50);
  let random;
  
  for(let i=0; i < 2; i++) {
    for(let j=0; j < 4; j++) {
      random = Math.floor(Math.random() * nrOfShapes);
      if(random < 10) {
        random = '0' + random;
      }
      level.matrix[i][j] = '' + random;
      leftOver.push(random);
    }
  }
  
  //shuffle the leftovers
  leftOver.sort(() => Math.random() - .5);
  
  for(let i=2; i < 4; i++) {
    for(let j=0; j < 4; j++) {
      level.matrix[i][j] = '' + leftOver.pop();
    }
  }
}

function initLevel() {
  generateLevelMatrix();
  
  //create Cards
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      createBlankCard(i, j, level.matrix[i][j]);
    }
  }
}

function initLevelCompletionScreen() {
  level.progres.parent = document.querySelector('.end-level-screen');
  level.progres.shape = level.progres.parent.querySelector('circle');
  level.progres.text = level.progres.parent.querySelector('text:nth-of-type(2)');
  level.progres.circumference = level.progres.shape.r.baseVal.value * 2 * Math.PI;
  level.progres.shape.style.strokeDasharray = `${level.progres.circumference} ${level.progres.circumference}`;
  level.progres.shape.style.strokeDashoffset = level.progres.circumference;
}

//Level Animations
function showLevel() {
  let showGridAnimationDelay = 0;
  if(!level.progres.value) {
    showGridAnimationDelay = 1800;
    startLevelScreen.innerText = `Level ${level.index + 1}`;
    const timeline = new TimelineMax();
    timeline.to(startLevelScreen, .4, {opacity: 1})
             .to(startLevelScreen, .4, {opacity: 0, delay: 1});  
  }
  
  setTimeout(() => {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        TweenMax.to(level.cards[i * 4 + j].children[0], .4, {opacity: 1, delay: .1 * (i + j)});
      }
    }  
  }, showGridAnimationDelay);
}

function hideLevel() {
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      TweenMax.to(level.cards[i * 4 + j].children[0], .4, {opacity: 1, delay: .1 * (i + j)});
      TweenMax.to(level.cards[i * 4 + j].children[1], .4, {opacity: 1, delay: .1 * (i + j)});
    }
  }
  
  setTimeout(() => {
    for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
        TweenMax.to(level.cards[i * 4 + j].children[0], .4, {opacity: 0, delay: .1 * (i + j)});
        TweenMax.to(level.cards[i * 4 + j].children[1], .4, {opacity: 0, delay: .1 * (i + j)});
      }
    }
  }, 1800);
}

function showLevelProgress() {
  const oldProgress = {percent: level.progres.value};
  level.progres.text.textContent = `${oldProgress.percent}%`;  
  const percent = Math.floor(100 /  Math.min(Math.ceil(level.index + 1 / 3), 5)) + level.progres.value;
  level.progres.value = percent;
  const value = level.progres.circumference - percent / 100 * level.progres.circumference;
  const timeline = new TimelineMax({onComplete: () => {
    resetForNextLevel();
    initLevel();
    showLevel();
  }, delay: 3});
  timeline.to(level.progres.parent, 1, {opacity: 1})
          .to(level.progres.shape, 2, {'stroke-dashoffset': value})
          .to(oldProgress, 2, {percent: `+=${Math.floor(100 / Math.min(Math.ceil(level.index + 1 / 3), 5))}`, roundProps:'percent', onUpdate: () => {
            level.progres.text.textContent = `${oldProgress.percent}%`;
          }}, '-=2')
          .to(level.progres.parent, 1, {opacity: 0}, '+=.4');
}

function resetForNextLevel() {
  level.pairsFound = 0;
  if(level.progres.value === 100) {
    level.index++;
    level.progres.value = 0;
    level.progres.shape.style['stroke-dashoffset'] = level.progres.circumference;
  }
  level.matrix = [
    [], [], [], []
  ];
  level.cards = [];
  svg.innerHTML = '';
  shownElement = null;
}

window.onload = function() {
  initLevel();
  initLevelCompletionScreen();
  showLevel();
}

//Add card interaction
let shownElement;
let isShownAnimationPlaying = false;
function handleCardClick(event) {
  if(!isShownAnimationPlaying && event.target !== shownElement) {
     if(shownElement) {
      isShownAnimationPlaying = true;
        setTimeout(() => {
          if(event.target.dataset.id == shownElement.dataset.id) {
          event.target.classList.add('paired');
          shownElement.classList.add('paired');
          event.target.style.opacity = 0;
          shownElement.style.opacity = 0;
          level.pairsFound++;
          checkForFinishedLevel();
        }
      shownElement.classList.remove('shown');
      event.target.classList.remove('shown');
      shownElement = null;
      isShownAnimationPlaying = false;
      }, 1000);  
    } else {
      shownElement = event.target;
    }
    event.target.classList.add('shown');
  }
}

function checkForFinishedLevel() {
  if(level.pairsFound === 8) {
    setTimeout(() => {
      hideLevel();
      showLevelProgress();
    }, 400);
  }
}