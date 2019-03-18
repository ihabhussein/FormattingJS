# FormattingJS

A light-weight locale-aware library to format dates, including relative dates
and times

`FormattingJS` is a light-weight wrapper around ECMAScript's `Intl` object,
giving shortcut methods for `Number` and `Date` formatting, including friendly
relative dates and times.

## Usage

Just include the file `formatting.js` in your HTML:

```html
    <script src="formatting.js"></script>
```

If you want to use relative date/time formatting, and your locale is *not*
English, you also need to include the approperiate locale file *after*
`formatting.js`:

```html
    <script src="formatting.js"></script>
    <script src="locale/it.js"></script>
```

Then instantiate and use `Formatting` in your code. Examples:

```javascript
    let f = Formatting('en');      // English
    s = f.monthName(2);            // February
    s = f.unixDate(1234567890);    // 2/14/2009
    s = f.relative("1989-07-24");  // 30 years ago

    let f = Formatting('it');      // Italian
    s = f.monthName(2);            // febbraio
    s = f.unixDate(1234567890);    // 14/2/2009
    s = f.relative("1989-07-24");  // 30 anni fa
```

## API Reference

### Factory:

```javascript
    Formatting([locale])
```

- `locale`: Optional. A string with a
  [BCP 47](http://tools.ietf.org/html/rfc5646) language tag.
  If not given, falls back to the
  `html` element's `lang` attribute. Default: `en`.

### Instance Methods:

```javascript
    Formatting.locale()
```

Returns the `Formatting` instance's locale.

```javascript
    Formatting.monthName(n)
```

Returns the localized name of a month.

- `n`: Month number (1&ndash;12).

```javascript
    Formatting.percent(n)
```

Returns a number as localized percentage.

- `n`: Number to be formatted.

```javascript
    Formatting.date(d)
    Formatting.time(d)
    Formatting.timestamp(d)
```

Returns the localized formatted date, time, or timestamp.

- `d`: Can be either a `Date` object,
  a string representing an [RFC&nbsp;2822 timestamp](https://tools.ietf.org/html/rfc2822#section-3.3),
  a string in [simplified ISO&nbsp;8601 format](https://www.w3.org/TR/NOTE-datetime).
  or number of milliseconds since January&nbsp;1, 1970, 00:00:00&nbsp;UTC.

```javascript
    Formatting.relative(d)
```

Returns a human-friendly fuzzy relative date/time

- `d`: Can be either a `Date` object,
  a string representing an [RFC&nbsp;2822 timestamp](https://tools.ietf.org/html/rfc2822#section-3.3),
  a string in [simplified ISO&nbsp;8601 format](https://www.w3.org/TR/NOTE-datetime).
  or number of milliseconds since January&nbsp;1, 1970, 00:00:00&nbsp;UTC.

```javascript
    Formatting.unixDate(n)
    Formatting.unixTime(n)
    Formatting.unixTimestamp(n)
```

Returns the localized formatted date, time, or timestamp of a UNIX timestamp.

- `n`: Number of seconds since January&nbsp;1, 1970, 00:00:00&nbsp;UTC.

```javascript
    Formatting.unixRelative(n)
```

Returns a human-friendly fuzzy relative date/time

- `n`: Number of seconds since January&nbsp;1, 1970, 00:00:00&nbsp;UTC.

## Browser compatibility

### Desktop browsers:

| Chrome | Edge | Firefox | IE | Opera | Safari |
|:------:|:----:|:-------:|:--:|:-----:|:------:|
| 24     | Yes  | 29      | 11 | 15    | 10     |

### Mobile browsers:

| Android webview | Chrome for Android | Edge Mobile | Firefox for Android | iOS Safari | Samsung Internet |
|:---------------:|:------------------:|:-----------:|:-------------------:|:----------:|:----------------:|
| 4.4             | 26                 | Yes         | 56                  | 10         | Yes              |

## License

`FormattingJS` is freely distributable under the terms of the BSD-2-Clause license.
