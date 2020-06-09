let skillsButton = document.getElementById('navSkillsButton');
let aboutMeButton = document.getElementById('navAboutMeButton');
let projectsButton = document.getElementById('navProjectsButton');

let skillsContainer = document.getElementById('skillsContainer');
let aboutMeContainer = document.getElementById('aboutMeContainer');
let projectsContainer = document.getElementById('projectsContainer');

let frontEndSkillsBall = document.getElementById('frontEndSkillsBall');
let frontEndSkills = document.getElementsByClassName('frontEndSkills');

let backEndSkillsBall = document.getElementById('backEndSkillsBall');
let backEndSkills = document.getElementsByClassName('backEndSkills');

let othersSkillsBall = document.getElementById('othersSkillsBall');
let othersSkills = document.getElementsByClassName('othersSkills');


// display skills page
skillsButton.addEventListener('click', function() {
  skillsContainer.style.display = 'block';

  aboutMeContainer.style.display = 'none';
  projectsContainer.style.display = 'none';

  let activeButton = document.getElementsByClassName('activePage');
  activeButton[0].classList.remove('activePage');

  skillsButton.classList.add('activePage');
});

// display about me page
aboutMeButton.addEventListener('click', function() {
  aboutMeContainer.style.display = 'flex';

  skillsContainer.style.display = 'none';
  projectsContainer.style.display = 'none';

  let activeButton = document.getElementsByClassName('activePage');
  activeButton[0].classList.remove('activePage');

  aboutMeButton.classList.add('activePage');
});

// display projects page
projectsButton.addEventListener('click', function() {
  projectsContainer.style.display = 'block';

  aboutMeContainer.style.display = 'none';
  skillsContainer.style.display = 'none';

  let activeButton = document.getElementsByClassName('activePage');
  activeButton[0].classList.remove('activePage');

  projectsButton.classList.add('activePage');
});


// display the various kinds of skills
frontEndSkillsBall.addEventListener('mouseover', function(e) {
  explodeBalls(frontEndSkills);
}); // event mouseover

backEndSkillsBall.addEventListener('mouseover', function(e) {
  explodeBalls(backEndSkills);
}); // event mouseover

othersSkillsBall.addEventListener('mouseover', function(e) {
  explodeBalls(othersSkills);
});


frontEndSkillsBall.addEventListener('mouseout', function(e) {
  for (var i = 0; i < frontEndSkills.length; i++) 
  {
    frontEndSkills[i].style.top = '10px';
    frontEndSkills[i].style.left = '10px';
    frontEndSkills[i].style.right = '10px';
    frontEndSkills[i].style.bottom = '10px';
    frontEndSkills[i].style.zIndex = '40';
  }
});

backEndSkillsBall.addEventListener('mouseout', function(e) {
  for (var i = 0; i < frontEndSkills.length; i++) 
  {
    backEndSkills[i].style.top = '10px';
    backEndSkills[i].style.left = '10px';
    backEndSkills[i].style.right = '10px';
    backEndSkills[i].style.bottom = '10px';
    backEndSkills[i].style.zIndex = '40';
  }
});

othersSkillsBall.addEventListener('mouseout', function(e) {
  for (var i = 0; i < frontEndSkills.length; i++) 
  {
    othersSkills[i].style.top = '10px';
    othersSkills[i].style.left = '10px';
    othersSkills[i].style.right = '10px';
    othersSkills[i].style.bottom = '10px';
    othersSkills[i].style.zIndex = '40';
  }
});



function explodeBalls(balls)
{
  console.log('hover skills ball');

  // calculating the circle perimeter (balls diameters * number of balls) + (space between balls * number of balls minus 1) 
  // divide by pi then by 2 to get radius
  let width = 100;
  let ballsMargin = 60;
  let circleRadius = ( (width * balls.length) + (ballsMargin * (balls.length -1)) ) / Math.PI / 2; 
  let angle = 360/balls.length;

  if (circleRadius < 110) 
  {
    circleRadius = 110;
  }

  // boucle sur les skills en incrémentant l'angle, vérifier a quel quart l'angle appartient puis cos/tan les coordonnées 
  // calculer l'hypoténuse et faire un tableau avec chaque étape si l'animer

  for (var i = 0; i < balls.length; i++) 
  {
    let circle = getNextPosition(angle * i, circleRadius);

    balls[i].style.zIndex = '130';

    if (circle.x > 0) 
    {
      balls[i].style.left = circle.x + 20 + 'px'; 
    }
    else if (circle.x == 0) 
      {
        balls[i].style.left = 10 + 'px'; 
      }
    else
    {
      balls[i].style.left = circle.x + 'px'; 
    }

    if (circle.y > 0) 
    {
      balls[i].style.top = circle.y + 20 + 'px'; 
    }
    else
    {
      balls[i].style.top = circle.y + 'px'; 
    }
  }
} // fin fonction explodeBalls


function getNextPosition(angle, radius) 
{
  let circle = {};

  if (angle == 0) 
  {
    circle.y = -radius;
    circle.x = 0;
  }
  else if (angle == 90)             // vérifie les 4 directions de base en premier lieu et met à jour les coordonnées
  {
    circle.x = radius;        
    circle.y = 0;
  }
  else if (angle == 180)          // si aucune touche n'est pressée, les coordonnées ne changent pas (radius = 0 par défaut)
  {             
    circle.y = radius;
    circle.x = 0;
  }
  else if (angle == 270) 
  {
    circle.x = -radius;
    circle.y = 0;
  }
  else 
  {
    let quarter;
    let upRight = 0;
    let bottomRight = 1;
    let bottomLeft = 2;
    let upLeft = 3;

    let a = 0;
    let b = 0;

    if (angle < 180) 
    {
      if (angle < 90) 
      {
        quarter = upRight;
      }
      else
      {
        angle -= 90;
        quarter = bottomRight;
      }
    }
    else
    {
      if (angle < 270) 
      {
        angle -= 180;
        quarter = bottomLeft;
      }
      else
      {
        angle -= 270;
        quarter = upLeft;
      }
    }

    // calcule les distances V et H jusqu'à la nouvelle position de xy, selon l'angle et la vitesse
    a = Math.cos(angle*(Math.PI/180)) * radius;   
    b = Math.sin(angle*(Math.PI/180)) * radius;

    if (quarter == upRight) 
    {
      circle.x = b;
      circle.y = -a;
    }
    else if (quarter == bottomRight)    // met à jour les coordonnées de l'objet avec les distances obtenues selon le quartier et donc la direction
    {
      circle.x = a;
      circle.y = b;
    }
    else if (quarter == bottomLeft) 
    {
      circle.x = -b;
      circle.y = a;
    }
    else if (quarter == upLeft) 
    {
      circle.x = -a;
      circle.y = -b;
    }
  } // fin else

  return circle;
} // fin fonction