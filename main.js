import './style.css';

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    document.getElementById('slider').checked = false;
  } else {
    setTheme('theme-light');
    document.getElementById('slider').checked = true;
  }
  document.getElementById('slider').addEventListener('change', () => {
    toggleTheme();
  })
})();

var updates = 0;

document.getElementById('search-bar').addEventListener('input', () => {
  updates++;
  document.getElementById('search-term').innerHTML =
    document.getElementById('search-bar').value +
    ' Number of Changes: ' +
    updates;
});

fetch(
  'https://raw.githubusercontent.com/MurtadhaM/ITSC-4155/main/staff_dataV2.json'
)
  .then((response) => response.json())
  .then((data) => {
    const staff = data[0];
    console.log(staff);
    const people = [];
    const college_keys = Object.keys(staff);
    //console.log(college_keys);
    for (let i = 0; i < college_keys.length; i++) {
      //console.log(staff[college_keys[i]]);
      const dept_keys = Object.keys(staff[college_keys[i]]);
      //console.log(dept_keys);
      for (let j = 0; j < dept_keys.length; j++) {
        let keys = Object.keys(staff[college_keys[i]][dept_keys[j]]);
        //console.log(keys);
        keys = keys.filter(
          (name) =>
            name != 'link' &&
            name != 'bio' &&
            name != 'academic_interests' &&
            name != 'college' &&
            name != 'department' &&
            name !== undefined
        );
        console.log(keys);

        for (let k = 0; k < keys.length; k++) {
          let item = { ...staff[college_keys[i]][dept_keys[j]][keys[k]] };
          item.academic_interests = [];
          if (
            staff[college_keys[i]][dept_keys[j]][keys[k]].hasOwnProperty(
              'academic_interests'
            )
          ) {
            //console.log(staff[college_keys[i]][dept_keys[j]][keys[k]]);
            for (
              let z = 0;
              z <
              staff[college_keys[i]][dept_keys[j]][keys[k]][
                'academic_interests'
              ].length;
              z++
            ) {
              //console.log(z);
              if (
                staff[college_keys[i]][dept_keys[j]][keys[k]]
                  .academic_interests[z] != ''
              ) {
                item.academic_interests.push(
                  staff[college_keys[i]][dept_keys[j]][keys[k]]
                    .academic_interests[z]
                );
              }
            }
          }
          item.name = keys[k];
          people.push(item);
          //console.log(item);
        }
      }
    }

    //window.exportFromJSON({data: people, fileName: 'staff', exportType: 'json'});

    people.forEach((e) => {
      let item = document.createElement('div');
      item.id = e.name;
      item.className = 'item';
      item.innerHTML =
        '<a href="' +
        e.link +
        '"><div class="name">' +
        e.name +
        '</div></a> \
            <div class="college">' +
        e.college +
        '</div> \
            <div class="department">' +
        e.department +
        '</div> \
            <div class="publications">Publications: ' +
        e.academic_interests.length +
        '</div>';
      document.getElementById('search-items').appendChild(item);
    });

    var start, end1, end2;

    document.getElementById('search-bar').addEventListener('input', () => {
      document.getElementById('results').classList.remove("hidden");
      if(document.getElementById('search-bar').value == ""){
        document.getElementById('results').classList.add("hidden");
      }
      updates++;
      start = new Date();
      let display = people.filter((obj) =>
        JSON.stringify(obj)
          .toLowerCase()
          .includes(document.getElementById('search-bar').value.toLowerCase())
      );
      end1 = new Date();
      document.getElementById('search-items').innerHTML = '';
      display.forEach((e) => {
        let item = document.createElement('div');
        item.id = e.name;
        item.className = 'item';
        item.innerHTML =
          '<a href="' +
          e.link +
          '"><div class="name">' +
          e.name +
          '</div></a> \
            <div class="college">' +
          e.college +
          '</div> \
            <div class="department">' +
          e.department +
          '</div> \
            <div class="publications">Publications: ' +
          e.academic_interests.length +
          '</div>';
        document.getElementById('search-items').appendChild(item);
      });
      end2 = new Date();
      document.getElementById('search-term').innerHTML =
        ' Num. of Filters: ' +
        updates +
        ' || Last Filter took: ' +
        (end1.getTime() - start.getTime()) +
        'ms' +
        ' || Dom re-display took: ' +
        (end2.getTime() - end1.getTime()) +
        'ms';
    });
  });
