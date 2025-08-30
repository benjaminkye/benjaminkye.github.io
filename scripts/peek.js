class SpriteCanvas {
    constructor(sprite, canvasId, spriteWidth, spriteHeight, frameCount, fps) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.canvas.width = spriteWidth;
        this.canvas.height = spriteHeight;

        this.canvas.style.backgroundImage = `url(${sprite})`;
        this.canvas.style.backgroundPosition = '0px 0px';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.position = 'absolute';
        
        let totalShiftX = this.spriteWidth * -(frameCount-1);
        this.anim = this.canvas.animate(
            [
                {backgroundPositionX: '0px'},
                {backgroundPositionX: `${totalShiftX}px`}
            ],
            {
              duration: frameCount * (1000/fps),
              easing: `steps(${frameCount-1})`,
              fill: 'both',
              direction: 'normal',
              iterations: 1,
            }
        )
        this.anim.pause();
        this.anim.currentTime = 0;
        this.anim.playbackRate = 0;
    }
}

function initSnoopy() {
    
    const snoopy = new SpriteCanvas(
      sprite='assets/snoopy.png', 
      canvasId='snoopy', 
      spriteWidth=110, 
      spriteHeight=134, 
      frameCount=13, 
      fps=20
    );

    snoopy.canvas.style.top = '15%';
    // offset right since snoopy's paw should grab edge of card, but on smaller screens grab from inside
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width >= 950) {
      snoopy.canvas.style.right = '-101px';
      
    } else {
      snoopy.canvas.style.right = '-10px';
      //reverse image facing direction
      snoopy.canvas.style.transform = 'scaleX(-1)';
    }

    console.log('init peek')
    let snoopyText = document.getElementById('snoopy-text')
    
    snoopyText.addEventListener('mouseover', (event) => {
      console.log('mouse in!');
      if(snoopy.anim.playbackRate !== 1) {
        snoopy.anim.playbackRate = 1;
        snoopy.anim.play();
      }
     });

     snoopyText.addEventListener('mouseout', (event) => {
      console.log('mouse out!');
      if(snoopy.anim.playbackRate !== -1) {
        snoopy.anim.playbackRate = -1;
        snoopy.anim.play();
      }      
     });


}

function initSanX() {
  const sanX = new SpriteCanvas(
    sprite='assets/rilakkuma.png',
    canvasId = 'san-x',
    spriteWidth = 82,
    spriteHeight = 230,
    frameCount = 13,
    fps = 20,
  );

  let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  if(width >= 950) {
    sanX.canvas.style.left = '-83px';
  } else {
    sanX.canvas.style.left = '0px';
    sanX.canvas.style.transform = 'scaleX(-1)';
  }

  sanX.canvas.style.bottom = '0';
  const sanXText = document.getElementById('sanx-text')

  sanXText.addEventListener('mouseover', (event) => {
    console.log('mouseover sanx')
    if(sanX.anim.playbackRate !== 1) {
      sanX.anim.playbackRate = 1;
      sanX.anim.play();
    }
  })

  sanXText.addEventListener('mouseout', (event) => {
    if(sanX.anim.playbackRate !== -1) {
      sanX.anim.playbackRate = -1;
      sanX.anim.play();
    }
  })
  
}

function initPeek() {
  initSanX();
  initSnoopy();
}