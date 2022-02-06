---
title: Development
authors:
    - Kamil Prusko
---

# Development

## Overview

Project consist of an main app and an desktop extension. Both are written in Java Script. The main app offers GTK and CLI interfaces, but primary usage actually is to be a DBus service. The desktop extension for the most part is a mere UI for that DBus service.


TODO: directory structure, architecture, where to find things


Useful resources:

 * [Guide on development of GNOME Shell](https://wiki.gnome.org/Projects/GnomeShell/Development)


## Getting code

We keep *master* branch stable for the latest GNOME version. Use *gnome-** [branches](https://github.com/gnome-pomodoro/gnome-pomodoro/branches) if you need to go backwards or bleeding-edge.

```
$ git clone git@github.com:gnome-pomodoro/gnome-pomodoro.git -b master
$ cd gnome-pomodoro
```

## Setting up development environment


TODO: About setting up JHBuild

### Updating jhbuild

```
cd ~/jhbuild/checkout/jhbuild
$ git pull --rebase
$ autoreconf
$ make install
$ jhbuild sanitycheck
$ jhbuild sysdeps  # and install missing dependencies
$ jhbuild build
```


### Running gnome-pomodoro from jhbuild

Finally, to open a nested gnome-shell session in Wayland do:
```
$ jhbuild run dbus-run-session -- gnome-shell --nested --wayland
```


```
$ jhbuild shell
$ dbus-run-session -- gnome-pomodoro
```



## Building from source

Suggest two options

Using GNOME Builder + flatpak or using jhbuild.


Installing into jhbuild
```
$ jhbuild shell
$ meson build-jhbuild --prefix=~/jhbuild/install
$ cd build-jhbuild
$ meson compile
$ meson install
```




## Style guide

Please follow style guide of gnome-shell. 


See:
 * [GNOME Shell Style Guide](https://wiki.gnome.org/Projects/GnomeShell/StyleGuide)
 * [Gjs Style Guide](https://live.gnome.org/GnomeShell/Gjs_StyleGuide)


## Writing tests


## Updating dependencies

To check latest dependency version run
```
$ pkg-config --modversion <dependency-name>
```

