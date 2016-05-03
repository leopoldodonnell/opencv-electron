# OpenCV Electron

## Overview

This project is a basic demonstration of how to incorporate OpenCV within an Electron Application.

Given the native nature of OpenCV, all of the heavy lifting is done in the 'main' process
with results communicated to the Ux Browser Windows via IPC.

It has also been a first foray into using Polymer and ES6 (ES2015).

## Install

- install node 5
- install bower
- install gulp
- install openCV
- brew tap homebrew/science
- brew install opencv

**Build the application so it can be run**

- `npm install`
- `bower install`
- `gulp components`

You can also build the OSX application (didn't try Windows)

- `npm run build-osx`

##Usage

- `npm run start`

## TODO

The current state is pretty basic with lots of the console output. Much needs to be done...

* Fix the mapping of face to painted rectangle
* Face detection not great with people who have dark skin tone.
* Multi-face is pretty rough
* Improve Face Detector component to enable other detectors that do not require Electron IPC. Goal is to be
able to port to Cordova or some such framework.

## License

MIT License. 
Copyright (c) 2016 Leopold O'Donnell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.