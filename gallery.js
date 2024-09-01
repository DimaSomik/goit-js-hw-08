const images = [
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
     },
     {
      preview:
       'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
       'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
     },
];
    
const createElement = (tag, properties) => Object.assign(document.createElement(tag), properties);

const createGalleryImage = ({preview, original, description}) => {
    const newHyperLink = createElement("a", {className: "gallery-link",
                                             href: original});

    const newImage = createElement("img", {className: "gallery-image",
                                           src: preview,
                                           alt: description,
                                           width: "360",
                                           height: "200"});
    newImage.dataset.source = original; 

    newHyperLink.append(newImage);
    return newHyperLink;
}

const createListItem = (images, gallery) => {
    const list = images.map(createGalleryImage)
                       .map(image => {
                                const li = createElement("li");
                                li.append(image);
                                return li;
                       });
    
    const fragment = document.createDocumentFragment();
    fragment.append(...list);

    gallery.appendChild(fragment);
}

const gallery = document.querySelector('.gallery');
createListItem(images, gallery);

(() => {
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener("click", (event) => {
        if (event.target.tagName === "A" || event.target.parentNode.tagName === "A") {
                event.preventDefault();
                console.log(event.target.dataset.source);

                const modal = basicLightbox.create(`
                        <div class="modal">
                        <img src="${event.target.dataset.source}" width="1100px" height="640px">
                        </div>
                    `);
                modal.show();
                        
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        modal.close();
                    };
                });
        }    
    });

})();

// --> Without delegation <-- //
// (() => {
//     const images = document.querySelectorAll('.gallery-link');

//     images.forEach(image => {
//         image.addEventListener("click", (event) => {
//             event.preventDefault();
//             console.log(`${image.href}`);
//             const modal = basicLightbox.create(`
//                 <div class="modal">
//                 <img src="${image.href}" width="1100px" height="640px">
//                 </div>
//             `);

//             modal.show();
                   
//             document.addEventListener('keydown', (event) => {
//                 if (event.key === 'Escape') {
//                     modal.close();
//                 }
//             });
//         })
//     })
// })();
