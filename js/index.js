const showloader = () => {
  document.getElementById("load").classList.remove("hidden");
  document.getElementById("videoSection").classList.add("hidden");
};
const hideloader = () => {
  document.getElementById("load").classList.add("hidden");
  document.getElementById("videoSection").classList.remove("hidden");
};

removeActiveClass = () => {
  const activeButton = document.getElementsByClassName("active");
  console.log(activeButton);
  for (let activ of activeButton) {
    activ.classList.remove("active");
  }
};

function loadCatagories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((responce) => responce.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(search = "") {
  showloader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`
  )
    .then((responce) => responce.json())
    .then((data) => {
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCatagorieVideos = (id) => {
  showloader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      removeActiveClass();
      displayVideos(data.category);
      const clickButton = document.getElementById(`btn-${id}`);
      clickButton.classList.add("active");
    });
};

const loadVideodetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayVideodetails(data.video);
    });
};

const displayVideodetails = (video) => {
  console.log(video);

  document.getElementById("hello").innerText = video.title;
  document.getElementById("modal").showModal();
  console.log(video);
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("categoryContainer");

  categories.map((cat) => {
    const categorieDiv = document.createElement("div");
    categorieDiv.innerHTML = `

<button id="btn-${cat.category_id}" onclick="loadCatagorieVideos(${cat.category_id})" class="btn btn-xs bg-gray-300 text-black hover:bg-red-600 hover:text-white">${cat.category}  </button>
`;
    categoryContainer.append(categorieDiv);
  });
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videoSection");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
<div class="flex justify-center items-center  col-span-full mt-20 flex-col gap-7">

<img src="image/Icon.png" alt="">
<h1 class="text-2xl font-bold"> Oops!! Sorry, There is no content here</h1>
</div>`;
hideloader()
    return;
  }

  videos.map((vid) => {
    console.log(vid);

    const createCell = document.createElement("div");
    createCell.innerHTML = `
    
 
<div class="relative">
<img class="w-full h-32 lg:h-42 object-cover flex justify-center" src="${vid.thumbnail}" alt="">
<p class="absolute bg-black text-white text-[8px] sm:text-[10px] rounded-md px-1 sm:p-1 bottom-3 right-3 "> 3hrs 56 min ago</p>
</div>
<div class="mt-2 flex flex-row gap-2">
        <img class="rounded-full w-8 h-8" src="${vid.authors[0].profile_picture}" alt="Author Image">
        
        <div>
          <h2 class="font-bold text-sm sm:text-xl">${vid.title}</h2>
          <div>
            <h3>${vid.authors[0].profile_name}</h3>
            <h3>${vid.others.views}</h3>
            

          </div>
        </div>
      
       
      </div>
      <div onclick=loadVideodetails('${vid.video_id}') class="">  <button class="btn btn-block  ">show details </button> </div>
    `;

    videoContainer.append(createCell);

  });
  hideloader()
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
});

loadCatagories();

loadVideos();
