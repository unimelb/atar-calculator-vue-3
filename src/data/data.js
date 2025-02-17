const data = [
  {
    name: 'Bachelor of Design - Indigenous',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      indigenous: {
        number: '50.00',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 50.00,
    previousYearDom: 55.00,
    previousYearInt: 65.00,
    sort: 'b',
    filter: 'all, arts, business-economics',
  }, {
    name: 'Bachelor of Law - GDP',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      gdp: {
        number: '80.00',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 80.00,
    international: 70.00,
    previousYearDom: null,
    previousYearInt: null,
    sort: 'a',
    filter: 'all, arts, science',
  }, {
    name: 'Bachelor of Arts - UG',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      ug: {
        number: '80.00',
        url: 'http:\/\/www.google.com',
      },
      access: {
        number: '80.00',
        url: null,
      },
      international: {
        number: '80.50',
        url: 'http:\/\/www.google.com',
      },
      mcs: {
        number: '80.50',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 80.00,
    international: 50.00,
    previousYearInt: 52.00,
    previousYearDom: 62.00,
    sort: 'c',
    filter: 'all',
  }, {
    name: 'Bachelor of Arts - UG no mcs or access',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      ug: {
        number: '80.00',
        url: 'http:\/\/www.google.com',
      },
      international: {
        number: '80.50',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 80.00,
    international: 50.00,
    previousYearInt: 52.00,
    previousYearDom: 62.00,
    sort: 'c',
    filter: 'All',
  }, {
    name: 'Gauranteed Pathways to Law',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      other: {
        number: '60.00',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 60.00,
    international: 60.00,
    previousYearDom: null,
    previousYearInt: null,
    sort: 'd',
    filter: 'all, business-economics',
  }, {
    name: 'Gauranteed Pathways to Law',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      other: {
        number: '60.00',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 50.00,
    international: 50.00,
    previousYearDom: 79.53,
    previousYearInt: 79.99,
    sort: 'd',
    filter: 'all, law',
  }, {
    name: 'A course with everything at 96 / Int at 76',
    desc: 'Pellentesque vitae mi nec elit blandit pellentesque ut feugiat lorem. Praesent tempus dui sed libero semper lacinia. Cras ultricies lacus.',
    score: {
      ug: {
        number: '96.00',
        url: 'http:\/\/www.google.com',
      },
      access: {
        number: '96.00',
        url: 'http:\/\/www.google.com',
      },
      international: {
        number: '76.00',
        url: 'http:\/\/www.google.com',
      },
      mcs: {
        number: '96.00',
        url: 'http:\/\/www.google.com',
      }
    },
    domestic: 96.00,
    international: 96.00,
    previousYearDom: 32.00,
    previousYearInt: 82.00,
    sort: 'c',
    filter: 'all, health',
  }
];

export default data;
