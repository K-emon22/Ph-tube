function loadCatagories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((responce) => responce.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((responce) => responce.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("categoryContainer");

  categories.map((cat) => {
    const categorieDiv = document.createElement("div");
    categorieDiv.innerHTML = `

<button class="btn btn-xs bg-gray-300 text-black hover:bg-red-600 hover:text-white">${cat.category}  </button>
`;
    categoryContainer.append(categorieDiv);
  });
}

// {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videoSection");
  videos.map((vid) => {
    console.log(vid);

    const createCell = document.createElement("div");
    createCell.innerHTML = `
    
 
<img class="w-full h-32 lg:h-42 object-cover flex justify-center" src="${vid.thumbnail}" alt="">

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
    `;

    videoContainer.append(createCell);
  });
};

loadCatagories();
loadVideos();
