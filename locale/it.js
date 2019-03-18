if ('Formatting' in window) Formatting['relative_it'] = d => {
    let units = {
        second: ['un secondo',    'secondi'],
        minute: ['un minuto',     'minuti'],
        hour:   ["un'ora",        'ore'],
        day:    ['un giorno',     'giorni'],
        week:   ['una settimana', 'settimane'],
        month:  ['un mese',       'mesi'],
        year:   ['un anno',       'anni'],
    };
    let prefix = d[2] == 'future'? 'tra ': '';
    let suffix = d[2] == 'future'? '': ' fa';
    if (d[0] == 0) return 'adesso';
    if (d[0] == 1) return `${prefix}${units[d[1]][0]}${suffix}`;
    else           return `${prefix}${d[0]} ${units[d[1]][1]}${suffix}`;
};
