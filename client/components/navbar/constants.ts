const brandsMenuTree = {
  title: 'BRANDS',
  ordered: ['canon', 'nikon', 'sony', 'other'],
  canon: {
    title: 'Canon',
    ordered: ['allCanon', 'canonCameras', 'canonLenses', 'canonKits'],
    allCanon: {
      title: 'All Canon',
      tags: ['Canon'],
    },
    canonCameras: {
      title: 'Canon Cameras',
      tags: ['Canon', 'Camera'],
    },
    canonLenses: {
      title: 'Canon Lenses',
      tags: ['Canon', 'Lens'],
    },
    canonKits: {
      title: 'Canon Kits',
      tags: ['Canon', 'Kit'],
    },
  },
  nikon: {
    title: 'Nikon',
    ordered: ['allNikon', 'nikonCameras', 'nikonLenses', 'nikonKits'],
    allNikon: {
      title: 'All Nikon',
      tags: ['Nikon'],
    },
    nikonCameras: {
      title: 'Nikon Cameras',
      tags: ['Nikon', 'Camera'],
    },
    nikonLenses: {
      title: 'Nikon Lenses',
      tags: ['Nikon', 'Lens'],
    },
    nikonKits: {
      title: 'Nikon Kits',
      tags: ['Nikon', 'Kit'],
    },
  },
  sony: {
    title: 'Sony',
    ordered: ['allSony', 'sonyCameras', 'sonyLenses', 'sonyKits'],
    allSony: {
      title: 'All Sony',
      tags: ['Sony'],
    },
    sonyCameras: {
      title: 'Sony Cameras',
      tags: ['Sony', 'Camera'],
    },
    sonyLenses: {
      title: 'Sony Lenses',
      tags: ['Sony', 'Lens'],
    },
    sonyKits: {
      title: 'Sony Kits',
      tags: ['Sony', 'Kit'],
    },
  },
  other: {
    title: 'Other',
    ordered: ['tokina', 'sigma', 'profoto'],
    tokina: {
      title: 'Tokina',
      tags: ['tokina'],
    },
    sigma: {
      title: 'Sigma',
      tags: ['Sigma'],
    },
    profoto: {
      title: 'Profoto',
      tags: ['Profoto'],
    },
  },
};

const camerasMenuTree = {
  title: 'CAMERAS',
  ordered: ['brands', 'dslr', 'mirrorless'],
  brands: {
    title: 'Brands',
    ordered: ['canon', 'nikon', 'sony', 'canonKits'],
    canon: {
      title: 'Canon',
      tags: ['Canon'],
    },
    nikon: {
      title: 'Nikon',
      tags: ['Nikon'],
    },
    sony: {
      title: 'Sony',
      tags: ['Sony'],
    },
    canonKits: {
      title: 'Canon Kits',
      tags: ['Canon', 'Kit'],
    },
  },
  dslr: {
    title: 'DSLR',
    ordered: ['allDslr', 'canonDslr', 'nikonDslr'],
    allDslr: {
      title: 'All DSLR',
      tags: ['DSLR'],
    },
    canonDslr: {
      title: 'Canon DSLR',
      tags: ['Canon', 'DSLR'],
    },
    nikonDslr: {
      title: 'Nikon DSLR',
      tags: ['Nikon', 'DSLR'],
    },
  },
  mirrorless: {
    title: 'Mirrorless',
    ordered: ['allMirrorless', 'sonyCameras', 'sonyLenses', 'sonyKits'],
    allMirrorless: {
      title: 'All Mirrorless',
      tags: ['Mirrorless'],
    },
    sonyCameras: {
      title: 'Sony Cameras',
      tags: ['Sony', 'Camera'],
    },
    sonyLenses: {
      title: 'Sony Lenses',
      tags: ['Sony', 'Lense'],
    },
    sonyKits: {
      title: 'Sony Kits',
      tags: ['Sony', 'Kit'],
    },
  },
};

export const menuTree: any = {
  ordered: ['brands', 'cameras', 'lenses', 'lighting', 'kits'],
  brands: brandsMenuTree,
  cameras: camerasMenuTree,
};
