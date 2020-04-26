if ('Formatting' in window) Formatting['relative_fr'] = d => {
    let units = {
        second: ['une seconde', 'secondes'],
        minute: ['une minute',  'minutes'],
        hour:   ["une heur",    'heurs'],
        day:    ['un jour',     'jours'],
        week:   ['une semaine', 'semaine'],
        month:  ['un mois',     'mois'],
        year:   ['un ans',      'ans'],
    };
    let prefix = d[2] == 'future'? 'dans': 'il y a';
    if (d[0] == 0) return 'à présent';
    if (d[0] == 1) return `${prefix} ${units[d[1]][0]}`;
    else           return `${prefix} ${d[0]} ${units[d[1]][1]}`;
};
