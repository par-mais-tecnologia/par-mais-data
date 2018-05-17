![Logo][]

> Sending useful data to Par Mais Big Data store. 

# Par Mais Data

- __Lead Maintainer:__ [Diego Laucsen][Lead]
- __Sponsor:__ [Par Mais][Sponsor]
- __Node:__ 6.x

##  Initialization

Initialize Par Mais Data Module with:

```js
import ParMaisData from 'par-mais-data';
ParMaisData.init('APP_IDENTIFIER')
```

## Events and Identifications

Uset this operation do identify an user.

```js
ParMaisData.identify(eventName, userId, userData, eventData);
```

Or to register just an event.

```js
ParMaisData.event(eventName, eventData);
```

## Data Base

### Sending data to our database

```js
ParMaisData.persisData(data);
```

Sent dada must contain relevant data, as user email and name, like:

```json
{
  "name": "user name",
  "email": "user email"
}
```

This method will return an `id` and a `link` to recover this data.

### Getting data from our database

To get data:

```js
ParMaisData.getData(id);
```

This id is the sabe returned on `persisData`.

## Contributing
The [Par Mais Tecnologia][ParMaisTech] encourages participation. If you feel you can help in any way, be
it with bug reporting, documentation, examples, extra testing, or new features feel free
to [create an issue][Issue], or better yet, [submit a [Pull Request][Pull]. For more
information on contribution please see our [Contributing][Contrib] guide.

## License
Copyright (c) 2017 Par 6 Tecnologia LTDA;
Licensed under __[Apache 2.0][Lic]__.

[Lead]: https://github.com/Laucsen
[Lic]: ./LICENSE
[Logo]: ./par-mais-rect.png
[Sponsor]: http://parmais.com.br
[ParMaisTech]: http://parmais.com.br
[Contrib]: ./CONTRIBUTE
[Issue]: https://github.com/par-mais-tecnologia/dynamito/issues/new
[Pull]: https://github.com/par-mais-tecnologia/dynamito/pulls
