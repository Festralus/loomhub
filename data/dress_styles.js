// It is used in both index.vue (Home page) and default.vue (main layout) for "Interactive dress style masonry" and Dress style "Dropdown menu"
const dress_styles_list = [
  {
    name: 'Casual',
    backgroundPicture: '/assets/images/browse-casual',
    path: '/shop?dressStyle=["Casual"]',
  },
  {
    name: 'Formal',
    backgroundPicture: '/assets/images/browse-formal',
    path: '/shop?dressStyle=["Formal"]',
  },
  {
    name: 'Party',
    backgroundPicture: '/assets/images/browse-party',
    path: '/shop?dressStyle=["Party"]',
  },
  {
    name: 'Sport',
    backgroundPicture: '/assets/images/browse-gym',
    path: '/shop?dressStyle=["Sport"]',
  },
];

export default dress_styles_list;
