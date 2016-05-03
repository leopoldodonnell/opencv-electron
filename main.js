'use strict';

var app           = require('app');
var BrowserWindow = require('browser-window');
var ipcMain       = require('electron').ipcMain;
var cv            = require('opencv');

require('crash-reporter').start();

class FaceDetector {
  
  constructor(window) {
    this.window = window;
  }
  
  startDetecting(camera_num, interval, cb_channel) {
    this.camera = new cv.VideoCapture(camera_num);
    this.cb_channel = cb_channel;
    this.intervalId = setInterval(() => {
      this._readAndDetectFace();
    }, interval);
  }

  stopDetecting() {
    clearInterval(this.intervalId);
  }
  
  setViewportSize(width, height) {
    console.log("Viewport: " + width + ", " + height);
    this.viewport = { x:0, y:0, w: width, h: height };
  }
  
  detectFace(image) {
    return new Promise((resolve, reject) => {
      image.detectObject(__dirname + '/models/face.xml',
        {},
        (err, faces) => {
          if (err) {
            throw reject(err);
          }
          resolve(faces);
        });
    })
  }
  
  _readAndDetectFace() {
    this.camera.read((err, im) => {
      // Before working with the frame we need to check the image
      // is already available and has a width and height greater than 0,
      // otherwise it will fail when trying to do namedWindow.show()
      // and the image has width or height equal or less than 0.
      if (err || im.width() == 0 || im.height() == 0) return;

      let scaleX = this.viewport && this.viewport.w ? this.viewport.w/ im.width() : 1.0;
      let scaleY = this.viewport && this.viewport.h ? this.viewport.h / im.height() : 1.0;

      console.log("ScaleX = " + scaleX + " ScaleY = " + scaleY);
      
      this.detectFace(im).then(faces => {
        console.log("Detected faces: " + faces.length);
        let scaledFaces = faces.map(face => {
          let res = { 
            x: Math.floor(face.x * scaleX), 
            y: Math.floor(face.y * scaleY), 
            width: Math.floor(face.width * scaleY), 
            height: Math.floor(face.height * scaleY) 
          }
          console.log("Mapping face: " + 
            face.x + ":" + res.x + ", " + 
            face.y + ":" + res.y + ", " + 
            face.width + ":" + res.width + ", " + 
            face.height + ":" + res.height);
            return res;
          }
        );
        if (faces.length > 0) {
          this.window.webContents.send(this.cb_channel, scaledFaces);
        }
      }).catch(e => console.log("Camera error: " + e));
    })
  }  
}


app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  let mainWindow = new BrowserWindow({width: 640, height: 480});

  global.faceDetector = new FaceDetector(mainWindow);
  
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  //mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
