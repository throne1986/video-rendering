# ffmpegserver.js

[![Build Status](https://travis-ci.org/greggman/ffmpegserver.js.svg?branch=master)](https://travis-ci.org/greggman/ffmpegserver.js)

This is a simple node server and library that sends canvas frames to the server and uses ffmpeg to compress the video.
It can be used standalone or with [CCapture.js](https://github.com/spite/ccapture.js).

## Setup

1.  [Install nodejs](http://nodejs.org/download)
2.  clone this repo or download and unzip the zip
3.  cd to the repo and type `npm install`
4.  type `node start.js`

The server is now running.

To see it in work, go to "http://localhost:8080/test3.html"

## To use it make sure u include the following files in your js project

In whatever JavaScript program you want to capture from

```
<script src="http://localhost:8080/ffmpegserver/ffmpegserver.min..js"></script>
<script src="http://localhost:8080/3rdparty/CCapture.min.js"></script>
```

