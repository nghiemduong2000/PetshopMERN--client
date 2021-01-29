export const dataProductsPages = [
  {
    path: '/products',
    name: 'Sản phẩm',
    filter: {},
    index: 1,
  },
  {
    path: '/products/cun',
    name: 'Cún',
    filter: {
      species: 'Cún',
    },
    index: 2,
  },
  {
    path: '/products/meo',
    name: 'Meo',
    filter: {
      species: 'Meo',
    },
    index: 2,
  },
  {
    path: '/products/cun/thuc-an',
    name: 'Thức ăn',
    filter: {
      species: 'Cún',
      type: 'Food',
    },
    index: 3,
  },
  {
    path: '/products/cun/phu-kien',
    name: 'Quần áo cho cún',
    filter: {
      species: 'Cún',
      type: 'Fashion',
    },
    index: 3,
  },
  {
    path: '/products/cun/y-te',
    name: 'Y tế & thuốc cho cún',
    filter: {
      species: 'Cún',
      type: 'Medical',
    },
    index: 3,
  },
  {
    path: '/products/cun/nha',
    name: 'Nhà cho cún',
    filter: {
      species: 'Cún',
      type: 'Home',
    },
    index: 3,
  },
  {
    path: '/products/cun/do-choi',
    name: 'Đồ chơi',
    filter: {
      species: 'Cún',
      type: 'Toy',
    },
    index: 3,
  },
  {
    path: '/products/meo/thuc-an',
    name: 'Thức ăn',
    filter: {
      species: 'Meo',
      type: 'Food',
    },
    index: 3,
  },
  {
    path: '/products/meo/phu-kien',
    name: 'Quần áo cho meo',
    filter: {
      species: 'Meo',
      type: 'Fashion',
    },
    index: 3,
  },
  {
    path: '/products/meo/y-te',
    name: 'Y tế & thuốc cho meo',
    filter: {
      species: 'Meo',
      type: 'Medical',
    },
    index: 3,
  },
  {
    path: '/products/meo/nha',
    name: 'Nhà cho meo',
    filter: {
      species: 'Meo',
      type: 'Home',
    },
    index: 3,
  },
  {
    path: '/products/meo/do-choi',
    name: 'Đồ chơi',
    filter: {
      species: 'Meo',
      type: 'Toy',
    },
    index: 3,
  },
];
