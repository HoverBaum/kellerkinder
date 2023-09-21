# Kellerkinder utils

Ein kleines, [Deno](https://deno.com/) basiertes Util für das Kellerkinder Chatspiel.

Wer will schon manuell Chatbefehle bauen, wenn das ganze auch automatisiert geht 😁

## Nutzung

Da Deno Skripte direkt von GitHub ausführen kann, reich ein einfaches:

```shell
deno run --allow-net https://raw.githubusercontent.com/HoverBaum/kellerkinder/main/cli-utils/donations.ts
```

Alle Utils brauchen `--allow-net`, um Anfragen an die API zu senden.

Beim ersten Ausführen eines Utils wird Deno unsere Libs runter laden. Diese sollten danach gecashed sein.

### Mögliche Spenden

Als Ausgabe erhaltet ihr dann eine Liste von Chatbefehlen für alles, was ihr momentan einem Mod spenden könntet. Falls ihr ein Items mehreren Mods spenden könnt, werden alle aufgelistet. Das sieht dann etwas so aus:

```
deno run --allow-net https://raw.githubusercontent.com/HoverBaum/kellerkinder/main/cli-utils/donations.ts [username]
```

Denkt daran, euren username zu nutzen 😉

```
Hi hoverbaum 👋
Wir laden den aktuellen Stand...

Mögliche Spenden:
!spenden Lasagne 1 @Cebrox

Denk daran: Mods müssen für Spenden im Chat sein 🙃
```

### Mod Fortschritt

```shell
deno run --allow-net https://raw.githubusercontent.com/HoverBaum/kellerkinder/main/cli-utils/completion.ts
```

```
DerElky         100%
Cebrox          89.8%
BenniDoubleU    100%
Dameya          80.4%
dinivateres     55%
eidechsefalke   64%
Furiouspeet     52.2%
Ma1ubi          66.3%
MsSummersun     65.8%
Tbi994          100%
```

## Limitierungen

- Wir können leider nicht abfragen, welcher Mod gerade im Chat ist. Dafür bräuchten wir einen Moderator Token. Siehe [GetChatter Doku](https://dev.twitch.tv/docs/api/reference/#get-chatters)

## Dev Docs

We program in English 🏴󠁧󠁢󠁥󠁮󠁧󠁿

### Folder structure

- lib, single functions that we can compose into utils.
- cli-utils, single utils that can be called with "deno run".
