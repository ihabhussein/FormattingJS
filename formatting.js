function Formatting(l) {
    this.locale = l || document.documentElement.lang || 'en';

    this.monthName =    n => new Date(1, n - 1, 1).toLocaleString(this.locale, {month: 'long'});
    this.date =         d => new Date(d).toLocaleDateString(this.locale);
    this.time =         d => new Date(d).toLocaleTimeString(this.locale);
    this.dateTime =     d => new Date(d).toLocaleString(this.locale);
    this.unixDate =     n => new Date(n * 1000).toLocaleDateString(this.locale);
    this.unixTime =     n => new Date(n * 1000).toLocaleTimeString(this.locale);
    this.unixDateTime = n => new Date(n * 1000).toLocaleString(this.locale);
    this.percent =      n => Number(n).toLocaleString(this.locale, {style: 'percent'});

    let distance = d => {
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

    this.relative = d => {
        for (let l of [this.locale, this.locale.substring(0, 2), 'en'])
            if (`relative_${l}` in this)
                return this[`relative_${l}`](distance(d));
    };

    this.relative_en = d => {
        if (d[0] == 0) {
            return 'now';
        } else {
            let prefix = d[2] == 'future'? 'in ': '';
            let suffix = d[2] == 'future'? '': ' ago';
            return `${prefix}${d[0]} ${d[1]}${d[0]==1?'':'s'}${suffix}`;
        }
    };
};
