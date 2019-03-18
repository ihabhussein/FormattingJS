if ('Formatting' in window) Formatting['relative_ar'] = d => {
    let units = {
        second: ['ثانية', 'ثانيتين', 'ثواني'],
        minute: ['دقيقة', 'دقيقتين', 'دقائق'],
        hour:   ['ساعة',  'ساعتين',  'ساعات'],
        day:    ['يوم',   'يومين',   'أيام'],
        week:   ['أسبوع', 'أسبوعين', 'أسابيع'],
        month:  ['شهر',   'شهرين',   'أشهر'],
        year:   ['سنة',   'سنتين',   'سنوات'],
    };
    let prefix = d[2] == 'future'? 'بعد': 'منذ';
    if (d[0] == 0)               return 'الآن';
    if (d[0] == 1)               return `${prefix} ${units[d[1]][0]}`;
    if (d[0] == 2)               return `${prefix} ${units[d[1]][1]}`;
    if (d[0] >= 3 && d[0] <= 10) return `${prefix} ${d[0]} ${units[d[1]][2]}`;
    else                         return `${prefix} ${d[0]} ${units[d[1]][0]}`;
};
