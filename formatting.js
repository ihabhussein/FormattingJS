function Formatting(l) {
    let locale = l || document.documentElement.lang || 'en';

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

    let block = {
        locale:       () => locale,
        monthName:     n => new Date(1, n - 1, 1).toLocaleString(locale, {month: 'long'}),
        date:          d => new Date(d).toLocaleDateString(locale),
        time:          d => new Date(d).toLocaleTimeString(locale),
        timestamp:     d => new Date(d).toLocaleString(locale),
        unixDate:      n => new Date(n * 1000).toLocaleDateString(locale),
        unixTime:      n => new Date(n * 1000).toLocaleTimeString(locale),
        unixTimestamp: n => new Date(n * 1000).toLocaleString(locale),
        percent:       n => new Number(n).toLocaleString(locale, {style: 'percent'}),
        unixRelative:  n => this.relative(n * 1000),
    };

    for (let l of [locale, locale.substring(0, 2), 'en']) {
        if (`relative_${l}` in Formatting) {
            block.relative = d => Formatting[`relative_${l}`](age(d));
            break;
        }
    };

    return block;
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
