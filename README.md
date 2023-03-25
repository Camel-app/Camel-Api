# Api for the camel world

## Introduction

In order to best handle Cam studies, we developed an api to offer several functions helping the management of experiments. This api cn be accessible through the Admin panel or any other request senders as long as the input format is respected.

## Initialisation

The api needs several information to properly run. As this can be sensible, it is best to place it into a .env file. 

```
KEY_JWT=
PORT=
DB_LINK=
```

The key_jwt is the key in charge of generating jwt. This should be carefully setup to ensure best level of security.

The port indicates on which port the api is accessible.

The db_link is the address of the database. It could be hosted remotely on Atlas or "locally".


## Server

The api needs a valid db link in order to properly run. Once setup, the server can be launched via Docker (ensure to have the .env file accessible).

```
$ docker run --env-file .env -p 3001:3001 aodaira/camel-bundle:first
```

Else, the server can be ran through a terminal command:

```
$ node build/index.js
```

## Routes

[Description of the routes]
