function Formatting(l) {
    let locale = '';

    let locales = [];
    for (let s in Formatting)
        if (s.startsWith('relative_')) locales.push(s.substr(9));

    // Select locale as per RFC 4647 Section 3.4
    let a = (l || document.documentElement.lang || 'en')
        .toLowerCase()
        .replace(/-\*/g, '')
        .replace('*', '\\w+')
        .split('-');
    while (a.length > 0) {
        let re = new RegExp(`${a.join('-')}`);
        let found = locales.filter(el => re.exec(el));
        if (found.length > 0) {
            locale = found[0];
            break;
        };

        do {
            a = a.slice(0, -1);
        } while (a.length > 0 && a.slice(-1)[0].length <= 1);
    };
    if (locale === '') locale = 'en';
    let relative = Formatting[`relative_${locale}`];

    let age = d => {
        let units = [
            ['year',   1000 * 60 * 60 * 24 * 365.25],
            ['month',  1000 * 60 * 60 * 24 * 30.43],
            ['week',   1000 * 60 * 60 * 24 * 7],
            ['day',    1000 * 60 * 60 * 24],
            ['hour',   1000 * 60 * 60],
            ['minute', 1000 * 60],
            ['second', 1000],
        ];
        let diff = new Date(d).getTime() - new Date().getTime();
        let dir = diff > 0? 'future': 'past';
        diff = Math.abs(diff);
        for (let u of units)
            if (diff >= u[1])
                return [Math.round(diff / u[1]), u[0], dir]
        return [0, '', ''];
    };

    return {
        locale:       () => locale,
        locales:      () => locales.sort(),
        monthName:     n => new Date(1, n - 1, 1).toLocaleString(locale, {month: 'long'}),
        percent:       n => new Number(n).toLocaleString(locale, {style: 'percent'}),

        date:          d => new Date(d).toLocaleDateString(locale),
        time:          d => new Date(d).toLocaleTimeString(locale),
        timestamp:     d => new Date(d).toLocaleString(locale),
        relative:      d => relative(age(d)),

        unixDate:      n => new Date(n * 1000).toLocaleDateString(locale),
        unixTime:      n => new Date(n * 1000).toLocaleTimeString(locale),
        unixTimestamp: n => new Date(n * 1000).toLocaleString(locale),
        unixRelative:  n => relative(age(n * 1000)),
    };
};

Formatting['relative_en'] = d => {
    if (d[0] == 0) {
        return 'now';
    } else {
        let prefix = d[2] == 'future'? 'in ': '';
        let suffix = d[2] == 'future'? '': ' ago';
        return `${prefix}${d[0]} ${d[1]}${d[0]==1?'':'s'}${suffix}`;
    }
};
