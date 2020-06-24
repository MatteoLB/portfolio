let skillsButton = document.getElementById('navSkillsButton');
let aboutMeButton = document.getElementById('navAboutMeButton');
let projectsButton = document.getElementById('navProjectsButton');

let skillsContainer = document.getElementById('skillsContainer');
let aboutMeContainer = document.getElementById('aboutMeContainer');
let projectsContainer = document.getElementById('projectsContainer');

let frontEndSkillsBall = document.getElementById('frontEndSkillsBall');
let frontEndSkills = document.getElementsByClassName('frontEndSkills');
let skillsDescriptionFront = document.getElementsByClassName('skillsDescriptionFront');

let backEndSkillsBall = document.getElementById('backEndSkillsBall');
let backEndSkills = document.getElementsByClassName('backEndSkills');
let skillsDescriptionBack = document.getElementsByClassName('skillsDescriptionBack');

let othersSkillsBall = document.getElementById('othersSkillsBall');
let othersSkills = document.getElementsByClassName('othersSkills');
let skillsDescriptionOthers = document.getElementsByClassName('skillsDescriptionOthers');


let mediaQuery = window.matchMedia("screen and (min-width: 1350px)");
let mediumScreen = false;
let smallScreen = false;

if (!mediaQuery.matches) // *******************************************************************************
{
  console.log('medium screen');
  mediumScreen = true;
}

mediaQuery = window.matchMedia("screen and (min-width: 850px)");

if (!mediaQuery.matches) // *******************************************************************************
{
  console.log('small screen');
  smallScreen = true;
}

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
  explodeBalls(frontEndSkills, 'front');
}); // event mouseover

backEndSkillsBall.addEventListener('mouseover', function(e) {
  explodeBalls(backEndSkills, 'back');
}); // event mouseover

othersSkillsBall.addEventListener('mouseover', function(e) {
  explodeBalls(othersSkills, 'others');
});

for (var i = 0; i < skillsDescriptionFront.length; i++)
{
  skillsDescriptionFront[i].addEventListener('mouseover', function(e) {
    explodeBalls(frontEndSkills, 'front');
  });
}

for (var i = 0; i < skillsDescriptionBack.length; i++)
{
  skillsDescriptionBack[i].addEventListener('mouseover', function(e) {
    explodeBalls(backEndSkills, 'back');
  });
}

for (var i = 0; i < skillsDescriptionOthers.length; i++)
{
  skillsDescriptionOthers[i].addEventListener('mouseover', function(e) {
    explodeBalls(othersSkills, 'others');
  });
}


frontEndSkillsBall.addEventListener('mouseout', function(e) {
    skillsMouseOut(frontEndSkills, 'front');
});

backEndSkillsBall.addEventListener('mouseout', function(e) {
  skillsMouseOut(backEndSkills, 'back');
});

othersSkillsBall.addEventListener('mouseout', function(e) {
  skillsMouseOut(othersSkills, 'others');
});

for (var i = 0; i < skillsDescriptionFront.length; i++)
{
  skillsDescriptionFront[i].addEventListener('mouseout', function(e) {
    skillsMouseOut(frontEndSkills, 'front');
  });
}

for (var i = 0; i < skillsDescriptionBack.length; i++)
{
  skillsDescriptionBack[i].addEventListener('mouseout', function(e) {
    skillsMouseOut(backEndSkills, 'back');
  });
}

for (var i = 0; i < skillsDescriptionOthers.length; i++)
{
  skillsDescriptionOthers[i].addEventListener('mouseout', function(e) {
    skillsMouseOut(othersSkills, 'others');
  });
}


function explodeBalls(balls, type)
{
  console.log('hover skills ball');

  // calculating the circle perimeter (balls diameters * number of balls) + (space between balls * number of balls minus 1)
  // divide by pi then by 2 to get radius
  let width = balls[0].offsetWidth;
  let ballsMargin = 45;

  console.log('width balls');
  console.log(balls[0].offsetWidth);


  if (mediumScreen) // medium avant parce que si on a small on a forcément medium mais pas l'inverse
  {
      ballsMargin = 30;
  }
  if (smallScreen)
  {
    ballsMargin = 30;
  }


  let circleRadius = ( (width * balls.length) + (ballsMargin * (balls.length -1)) ) / Math.PI / 2;
  let angle = 360/balls.length;

  if (circleRadius < 110)
  {
    circleRadius = 110;

    if (mediumScreen)
    {
      circleRadius -= 3 / (balls.length/10);
    }
    if (smallScreen)
    {
      circleRadius -= 20 / (balls.length/10);
    }
  }

  if (type == 'front')
  {
    backEndSkillsBall.style.zIndex = '40';
    othersSkillsBall.style.zIndex = '40';
  }
  else if (type == 'back')
  {
    frontEndSkillsBall.style.zIndex = '40';
    othersSkillsBall.style.zIndex = '40';
  }
  else if (type == 'others')
  {
    frontEndSkillsBall.style.zIndex = '40';
    backEndSkillsBall.style.zIndex = '40';
  }

  // boucle sur les skills en incrémentant l'angle, vérifier a quel quart l'angle appartient puis cos/tan les coordonnées
  // calculer l'hypoténuse et faire un tableau avec chaque étape si l'animer

  for (var i = 0; i < balls.length; i++)
  {
    let circle = getNextPosition(angle * i, circleRadius);
    let offset = 0;

    balls[i].style.zIndex = '130';

    if (circle.x > 0)
    {
      offset = (smallScreen ? 16 : 20);
      balls[i].style.left = circle.x + offset + 'px';
    }
    else if (circle.x == 0)
    {
      offset = (smallScreen ? 8 : 10);
      balls[i].style.left = offset + 'px';
    }
    else
    {
      balls[i].style.left = circle.x + 'px';
    }

    if (circle.y > 0)
    {
      offset = (smallScreen ? 16 : 20);
      balls[i].style.top = circle.y + offset + 'px';
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


function skillsMouseOut(skills, type)
{
  if (type == 'front')
  {
    backEndSkillsBall.style.zIndex = '50';
    othersSkillsBall.style.zIndex = '50';
  }
  else if (type == 'back')
  {
    frontEndSkillsBall.style.zIndex = '50';
    othersSkillsBall.style.zIndex = '50';
  }
  else if (type == 'others')
  {
    frontEndSkillsBall.style.zIndex = '50';
    backEndSkillsBall.style.zIndex = '50';
  }

  for (var i = 0; i < skills.length; i++)
  {
    let ballsAbsolutePosition = 10;

    if (smallScreen )
    {
      ballsAbsolutePosition = 5;
    }

    skills[i].style.top = ballsAbsolutePosition + 'px';
    skills[i].style.left = ballsAbsolutePosition + 'px';
    skills[i].style.right = ballsAbsolutePosition + 'px';
    skills[i].style.bottom = ballsAbsolutePosition + 'px';
    skills[i].style.zIndex = '40';
  }
}
