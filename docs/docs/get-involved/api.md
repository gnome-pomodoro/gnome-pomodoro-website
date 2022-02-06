---
title: API
authors:
    - Kamil Prusko
---

# Pomodoro API

## Overview




## Vala

Core classes ad data types:

`Timer` -- Tracks progress of a current time-block. For calculating elapsed or remaining time you need to provide current timestamp. `Timer` only will let you know when current timeblock as been completed. To get updates on progress you should create a ticker with `.add_ticker(int64 interval)`.

`SessionManager` -- The controller for advancing time-blocks, cycles and sessions.

`Session` -- A set of pomodoros with breaks between them, ending with a long break.



-- It defines a sitting, from the moment user starts the timer to moment the timer has stopped. We collect UNDEFINED sessions which is used for analying user activity and for reminders. --

-`Cycle`- -- 

`TimeBlock` -- A definition of a time range with some context: state, session, cycle. Its bounds may be infinite.

`Timeline` -- Main container for the time-blocks. It's tightly coupled with database, therefore its main purpuse is storage and browsing history.




## GNOME Shell extension


## D-Bus


