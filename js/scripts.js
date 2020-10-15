const all = [
  {
    id: 1,
    title: 'Pepper Steak',
    calories: '250g - 679',
    image: 'images/Pepper-steaks.jpg',
    time: '30 minutes',
    ingredients: '2 tablespoons coarsely ground black pepper<br><br>50g steak, such as Scotch or eye fillet<br><br>salt to taste<br><br>oil for frying1/2 shallot, finely chopped<br><br>4 tablespoons beef stock<br><br>4 tablespoons double cream<br><br>50ml cognac or brandy<br><br>',
    type: 'muscle',
    steps: [
      { type: 'video', url: 'https://www.youtube.com/embed/nsw0Px-Pho8', desc: 'Bring the steak to room temperature. Brush with a little oil. Sprinkle the crushed peppercorns on both sides of the steak, gently pressing the peppercorns onto the surface of the meat so they stick.', },
      { type: 'image', url: 'images/BBQ-Sauce.jpg', desc: 'Heat a heavy based pan or BBQ to medium high. Place steak into the hot pan and cook for 2-3 minutes on each side until cooked to your liking. Do not turn the steak more than twice.' },
      { type: 'image', url: 'images/Roasted-potatoes-carrots.jpg', desc: 'Serve with whole potatoes with broccoli and carrots.' }
    ]
  },
  {
    id: 2,
    title: 'Balsamic Salad',
    calories: '100g - 131',
    image: 'images/balsamic_salad.jpg',
    time: '10 minutes',
    ingredients: '2 cups torn mixed salad greens<br><br>1 plum tomato, cut into wedges<br><br>1/2 cup chopped sweet yellow pepper<br><br>2 tablespoons balsamic vinaigrette<br><br>2 tablespoons shredded Asiago cheese<br><br>',
    type: 'vegetarian',
    steps: [
      { type: 'video', url: 'images/balsamic_salad.jpg', desc: 'Bring the steak to room temperature. Brush with a little oil. Sprinkle the crushed peppercorns on both sides of the steak, gently pressing the peppercorns onto the surface of the meat so they stick.', },
      { type: 'image', url: 'images/balsamic_salad.jpg', desc: 'Heat a heavy based pan or BBQ to medium high. Place steak into the hot pan and cook for 2-3 minutes on each side until cooked to your liking. Do not turn the steak more than twice.' },
      { type: 'image', url: 'images/balsamic_salad.jpg', desc: 'Serve with whole potatoes with broccoli and carrots.' }
    ]
  },
  {
    id: 3,
    title: ' Chicken Breast',
    calories: '100g - 80',
    image: 'images/chicken_breast.jpg',
    time: '15 minutes',
    ingredients: '150 g chicken breast <br><br>500g water <br><br>salt to taste<br><br>',
    type: 'weight',
    steps: [
      { type: 'video', url: 'images/chicken_breast.jpg', desc: 'Bring the steak to room temperature. Brush with a little oil. Sprinkle the crushed peppercorns on both sides of the steak, gently pressing the peppercorns onto the surface of the meat so they stick.', },
      { type: 'image', url: 'images/chicken_breast.jpg', desc: 'Heat a heavy based pan or BBQ to medium high. Place steak into the hot pan and cook for 2-3 minutes on each side until cooked to your liking. Do not turn the steak more than twice.' },
      { type: 'image', url: 'images/chicken_breast.jpg', desc: 'Serve with whole potatoes with broccoli and carrots.' }
    ]
  }
];

$(function() {
  const href = window.location.href;
  if (href.indexOf('home.html') >= 0) {
    showHome();
  } else if (href.indexOf('profile.html') >= 0) {
    showProfile();
  } else if (href.indexOf('search.html') >= 0) {
    showSearch();
  } else if (href.indexOf('settings.html') >= 0) {
    showSettings();
  } else if (href.indexOf('step.html') >= 0) {
    showStep();
  } else if (href.indexOf('instructions.html') >= 0) {
    showInstructions();
  }
});

// views
function showHome() {
  const favorites = getLocalStorage('favorite');
  const button1 = getLocalStorage('toggle-button1');
  const button2 = getLocalStorage('toggle-button2');
  const button3 = getLocalStorage('toggle-button3');
  const array = [
    { name: 'weight', flag: button1.length > 0 },
    { name: 'vegetarian', flag: button2.length > 0 },
    { name: 'muscle', flag: button3.length > 0 },
  ]
  let html = '';
  all.filter(el => array.filter(i => i.flag > 0).length === 0 ? true : array.filter(i => i.flag > 0).findIndex(j => j.name === el.type) >= 0).forEach(item => {
    html += `<div class="card">
                <div class="card-body">
                    <h4 class="card-title">${item.title}</h4>
                    <h6 class="text-muted card-subtitle mb-2">${item.calories}</h6>
                    <a href="instructions.html?id=${item.id}">
                        <img alt="Pepper Steak" src="${item.image}" style="width: 97%">
                    </a>
                    </p>
                    <i class="fa fa-heart"
                      onClick="toggleFavorite(${item.id})"
                      style="font-size: 20px;color: rgb(${favorites.find(i => i === item.id) ? '255,0,0': 'gray'});margin: 5px;margin-right: 23px;">
                    </i>
                    <i class="fa fa-thumbs-down" style="font-size: 20px;color: grey; margin: 5px;margin-right: 23px;"></i>
                    <a class="card-link" href="#" style="font-size: 20px;">Share</a>
                </div>
            </div>`
  });
  $('#cards').html(html)
}

function showProfile() {
  const favorites = getLocalStorage('favorite');
  const history = getLocalStorage('history');
  let html = '<ul class="list-group" style="padding: 10px;">'
  all.filter(el => favorites.find(i => i === el.id) >= 0)
     .forEach(item => {
       html += `
       <li class="list-group-item">
        <a href="instructions.html?id=${item.id}">${item.title}</a>
       </li>
       `
     })
  html += '</ul>'
  $('#favorite').html(html);
  html = '<ul class="list-group" style="padding: 10px;">'
  history.forEach(id => {
    const item = all.find(el => el.id === id);
    if (item) {
      html += `
       <li class="list-group-item">
        <a href="instructions.html?id=${item.id}">${item.title}</a>
       </li>
       `
    }
  })
  html += '</ul>'
  $('#history-wrap').html(html);
}

function showSearch() {
  $('#list').html('');
  $('#searchButton').click(function() {
    const value = $('#searchInput').val().trim().toLowerCase();
    if (!value || value === '') {
      return;
    }
    let html = '';
    all.filter(el => el.title.toLowerCase().indexOf(value) >= 0).forEach(item => {
      html += `<li class="list-group-item"><a href="instructions.html?id=${item.id}">${item.title}</a></li>`
    })
    $('#list').html(html);
  })
}

function showSettings() {
  const button1 = getLocalStorage('toggle-button1');
  const button2 = getLocalStorage('toggle-button2');
  const button3 = getLocalStorage('toggle-button3');
  $('#toggle-button1').attr('checked', button1.length > 0)
  $('#toggle-button2').attr('checked', button2.length > 0)
  $('#toggle-button3').attr('checked', button3.length > 0)

  $('#toggle-button1').change(e => {
    if (button1.length > 0) {
      saveLocalStorage('toggle-button1', [])
    } else {
      saveLocalStorage('toggle-button1', [1])
    }
  });
  $('#toggle-button2').change(e => {
    if (button2.length > 0) {
      saveLocalStorage('toggle-button2', [])
    } else {
      saveLocalStorage('toggle-button2', [1])
    }
  });
  $('#toggle-button3').change(e => {
    if (button3.length > 0) {
      saveLocalStorage('toggle-button3', [])
    } else {
      saveLocalStorage('toggle-button3', [1])
    }
  });
}

function showStep() {
  const href = window.location.href;
  const searchParams = new URLSearchParams(href.split('?')[1]);
  const id = parseInt(searchParams.get("id"));
  const step = parseInt(searchParams.get("step"));
  const item = all.find(el => { return el.id === parseInt(id) });
  if (step === item.steps.length) {
    $('#main').html(`
      <div class="container">
      <img alt="finish" src="images/finish.jpg" style="max-width:100%">
      </div>
      <h1 class="text-center" style="margin: 10px 0px 0px 10px;">Cooking has finished!</h1>
      <div class='d-flex justify-content-center'>
        <button
          type="button"
          class="btn btn-primary navbar-btn"
          style="position:absolute; bottom:40%; margin:auto; width: 60%;"
          onClick="favorite(${id})"
        >
          Add to my favourite.
        </button>
      </div>
      <br>
      <a class="fa fa-long-arrow-left d-inline-flex justify-content-start align-items-end" href = "step.html?id=${id}&step=${step - 1 < 0 ? 0 : step - 1}" style="margin: 50px 40px 40px 40px;font-size: 50px;color: rgb(16,118,190); position:absolute; bottom:10px; left:0px;"></a>
      <a class="fa fa-home" href="home.html" style="margin: 50px 40px 40px 180px;font-size: 50px;color: rgb(16,118,190); position:absolute; bottom:10px;right:0px;"></a>
    `)
    return
  }
  const detail = item.steps[step];
  if (step === 0) {
    $('#main').html(`
      <div class="container" style="margin: 5%">
        <iframe width= "90%" height="200px" src="${detail.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <h1 class="text-center" style="margin: 10px 0px 0px 10px;">Step ${step + 1}</h1>
      <p class="text-justify" style="font-size: 22px;margin: 10px 40px 10px 40px;"><br>${detail.desc}<br><br></p>
      <div style="display: flex;justify-content: space-between;">
      <a class="fa fa-long-arrow-left d-inline-flex justify-content-start align-items-end" href="instructions.html?id=${id}" style="margin: 50px 40px 40px 40px;font-size: 50px;color: rgb(16,118,190);"></a>
      <a class="fa fa-long-arrow-right" href="step.html?id=${id}&step=${step + 1}" style="margin: 50px 40px 40px 180px;font-size: 50px;color: rgb(16,118,190);"></a>
      </div>
    `)
    return
  }
  if (detail.type === 'video') {
    $('#main').html(`
      <div class="container" style="margin: 5%">
        <iframe width= "90%" height="200px" src="${detail.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <h1 class="text-center" style="margin: 10px 0px 0px 10px;">Step ${step + 1}</h1>
      <p class="text-justify" style="font-size: 22px;margin: 10px 40px 10px 40px;"><br>${detail.desc}<br><br></p>
      <div style="display: flex;justify-content: space-between;">
      <a class="fa fa-long-arrow-left d-inline-flex justify-content-start align-items-end" href="step.html?id=${id}&step=${step - 1 < 0 ? 0 : step - 1}" style="margin: 50px 40px 40px 40px;font-size: 50px;color: rgb(16,118,190);"></a>
      <a class="fa fa-long-arrow-right" href="step.html?id=${id}&step=${step + 1}" style="margin: 50px 40px 40px 180px;font-size: 50px;color: rgb(16,118,190);"></a>
      </div>
    `)
  } else {
    $('#main').html(`
      <div class="container" style="margin: 5%">
      <img alt="BBQ Sauce" src="${detail.url}">
      </div>
      <h1 class="text-center" style="margin: 10px 0px 0px 10px;">Step ${step + 1}</h1>
      <p class="text-justify" style="font-size: 22px;margin: 10px 40px 10px 40px;"><br>${detail.desc}<br><br></p>
      <div style="display: flex;justify-content: space-between;">
        <a class="fa fa-long-arrow-left d-inline-flex justify-content-start align-items-end" href="step.html?id=${id}&step=${step - 1 ? 0 : step - 1}" style="margin: 50px 40px 40px 40px;font-size: 50px;color: rgb(16,118,190);"></a>
        <a class="fa fa-long-arrow-right" href="step.html?id=${id}&step=${step + 1}" style="margin: 50px 40px 40px 180px;font-size: 50px;color: rgb(16,118,190);"></a>
      </div>
    `)
  }
}

function showInstructions() {
  const href = window.location.href;
  const searchParams = new URLSearchParams(href.split('?')[1]);
  const id = searchParams.get("id");
  const item = all.find(el => { return el.id === parseInt(id) });
  const history = getLocalStorage('history');
  history.push(parseInt(id));
  saveLocalStorage('history', history);
  $('#main').html(`
    <h1 class="text-center" style = "font-size: 3rem; margin-top: 30px;">${item.title}</h1>
    <h4 class="text-center">${item.calories} Calories</h3>
    <h4	class="text-center">Approx: ${item.time}</h3>
    <h2 style="padding: 5px;margin: 20px; margin-bottom: 10px;">Ingredients</h2>
    <p style="margin: 47px;">${item.ingredients}</p>
    <div style="display: flex;justify-content: space-between;">
    <a class="btn btn-primary" role="button" style="margin: 10px; margin-left: 50px;" href="home.html">Back to Home</a>
    <a class="btn btn-primary" role="button" href="step.html?id=${id}&step=${0}" style="margin: 10px; margin-left: 50px;">Start Cooking!</a>
    </div>
  `)
}

function favorite(id) {
  const favorites = getLocalStorage('favorite');
  const flag = favorites.find(i => i === id);
  if (flag) {
    return
  }
  favorites.push(id)
  saveLocalStorage('favorite', favorites)
}

function toggleFavorite(id) {
  const favorites = getLocalStorage('favorite');
  const flag = favorites.findIndex(i => i === id);
  if (flag >= 0) {
    favorites.splice(flag, 1);
    saveLocalStorage('favorite', favorites)
    showHome()
    return
  }
  favorites.push(id)
  saveLocalStorage('favorite', favorites)
  showHome()
}

// localStorage utils
function saveLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  const temp = window.localStorage.getItem(key);
  if (!temp) {
    return []
  }
  return JSON.parse(temp)
}

// tab
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
