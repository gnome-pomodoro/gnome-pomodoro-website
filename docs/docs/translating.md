This is a quick guide on how to get started with translating gnome-pomodoro and how to update existing translations.

You'll need to grab gnome-pomodoro source code. Fork it on github and run in terminal

    $ git clone git@github.com:<github-username>/gnome-pomodoro.git


## Adding new translation

Generate `gnome-pomodoro.pot` file (a .po file template) from the current code

    $ cd po
    $ make gnome-pomodoro.pot-update

Then create a new `<locale>.po` file where `<locale>` is one of the locales returned by `locale -a` or is listed [here](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html#Usual-Language-Codes):

    $ msginit --locale=<locale> --input=gnome-pomodoro.pot

If applicable, use the _short_ locale (de, es, fr, ...) to make it available to all sublocales. Use the regular locale (en_GB, en_AU, ..., zh_CN, zh_TW) when this is not applicable.

Add new locale to LINGUAS file.

Modify the heading comment to follow the format

    # <language> translations for gnome-pomodoro package.
    # Copyright (c) <year> gnome-pomodoro contributors
    # This file is distributed under the same license as the gnome-pomodoro package.
    # <your-name> <<email-optional>>, <year>.
    #

If you change `translator-credits` to your name, you will be listed in the about dialog

    #: lib/about-dialog.vala:41
    msgid "translator-credits"
    msgstr "Kamil Prusko"


## Translating

Open the `<locale>.po` file with your favorite text editor or with a specialized PO editor, popular are:

 * Poedit http://www.poedit.net
 * Gtranslator https://projects.gnome.org/gtranslator/
 * Viraal http://virtaal.translatehouse.org

Add your translation in the `msgstr` fields. Do not replace the original text in the `msgid` fields:

    #: hello:5
    msgid "Hello, world!"
    msgstr "世界你好!"

Take notice of the context in which translation strings are used. For some there are comments but for most just a location in the source code, it should give you a hint.

Do not use non breaking space characters to avoid problematic display issues.



## Updating a translation

Update the .pot file:

    $ cd po
    $ make gnome-pomodoro.pot-update

and merge your .po file with the .pot

    $ msgmerge --update <locale>.po gnome-pomodoro.pot

This will update your file. `msgmerge` tries to reuse old translations for small msgid changes, it sometimes makes wrong guesses. Review translations marked as _fuzzy_ and remove the _fuzzy_ markers.

To check your progress you can run

    $ msgfmt --check --verbose <locale>.po


## Testing your translation

To test your translation compile your .po file and install it on your system:

    $ sudo msgfmt -o /usr/share/locale/<locale>/LC_MESSAGES/gnome-pomodoro.mo <locale>.po

Then launch gnome-pomodoro with your locale

    $ gnome-pomodoro --quit
    $ LANG=<language-code>_<country-code> gnome-pomodoro


## Sending your translation

Translations can be sent via GitHub pull request to <https://github.com/codito/gnome-pomodoro>.

Thank you for your interest in translating gnome-pomodoro!


## Authors

This guide was originally written by [Remy Marquis](https://github.com/rmarquis/pacaur/blob/master/po/HOWTO) and adapted by [Bastien Traverse](https://github.com/neitsab) and [Kamil Prusko](https://github.com/kamilprusko).


## Resources

1. [GNOME Localisation Guide](https://wiki.gnome.org/TranslationProject/LocalisationGuide)
2. [gettext Manual](http://www.gnu.org/software/gettext/manual/gettext.html)
