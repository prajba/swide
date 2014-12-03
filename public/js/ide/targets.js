var targets = [
  {
    field: 'OS',
    target: 'AIX',
    version: 'all'
  },
  {
    field: 'OS',
    target: 'AIX',
    version: '5.2'
  },
  {
    field: 'OS',
    target: 'AIX',
    version: '5.3'
  },
  {
    field: 'OS',
    target: 'AIX',
    version: '6.1'
  },
  {
    field: 'OS',
    target: 'AIX',
    version: '7.1'
  },
  {
    field: 'OS',
    target: 'SLES',
    version: 'all'
  },
  {
    field: 'OS',
    target: 'Windows',
    version: 'all'
  },
  {
    field: 'DB',
    target: 'Oracle',
    version: 'all'
  },
  {
    field: 'DB',
    target: 'Sybase',
    version: 'all'
  },
  {
    field: 'DB',
    target: 'SQLServer',
    version: 'all'
  },
  {
    field: 'MDW',
    target: 'CICS',
    version: 'all'
  },
  {
    field: 'MDW',
    target: 'IHS',
    version: 'all'
  },
  {
    field: 'MDW',
    target: 'IIS',
    version: 'all'
  },
  {
    field: 'MDW',
    target: 'MQ',
    version: 'all'
  },
  {
    field: 'MDW',
    target: 'WAS',
    version: 'all'
  },
  {
    field: 'STORAGE',
    target: 'STORAGE',
    version: 'all'
  }
];

var getTargetList = function(field) {
  var subTargets = $.grep(targets, function(item, index) {
    return (field == item.field);
  });
  return $.map(subTargets, function(item, index) {
    return item.target;
  });
};

var getTargetVersionList = function(target) {
  var subTargets = $.grep(targets, function(item, index) {
    return (target == item.target);
  });
  return $.map(subTargets, function(item, index) {
    return item.version;
  });
};
