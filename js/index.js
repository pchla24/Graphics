var world3D = new function () {

	var FRAMERATE = 48;

	var world = {
		x: 0,
		y: 0,
		width: 100,
		height: 100
	};


	var canvs;
	var contxt;

	var key = {
		up: false,
		down: false,
		left: false,
		right: false,
		w: false,
		a: false,
		s: false,
		d: false,
		q: false,
		e: false,
		r: false,
		f: false,
		t: false,
		g: false
	};

	var objectPool = [];


	var initsize = 25;

	objectPool.push(new point(0, 0, initsize * 10));
	objectPool.push(new point(0, initsize * 10, initsize * 10));
	objectPool.push(new point(initsize * 10, initsize * 10, initsize * 10));
	objectPool.push(new point(initsize * 10, 0, initsize * 10));

	objectPool.push(new point(0, 0, 0));
	objectPool.push(new point(0, initsize * 10, 0));
	objectPool.push(new point(initsize * 10, initsize * 10, 0));
	objectPool.push(new point(initsize * 10, 0, 0));

	var i = 0;
	var j = 0

	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j))));

	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j))));

	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));

	i = 1;
	j = 0;

	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j))));

	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j))));

	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, -initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), 0, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, -initsize * 10 + (initsize * 20 * j))));

	i = 1;
	j = 1;

	objectPool.push(new line(new point(0 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(0 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j))));

	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j))));

	objectPool.push(new line(new point(0 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, 0 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), -initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, initsize * 10 + (initsize * 20 * j))));
	objectPool.push(new line(new point(0 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j)), new point(initsize * 10 + (initsize * 20 * i), initsize * 10, 0 + (initsize * 20 * j))));


	var renderPool = [];

	var cam1 = new camera(-95, -604, -636, -0.6, 0.6, 0, 1.5, -2);

	this.initialize = function () {

		canvs = document.getElementById('world');

		if (canvs && canvs.getContext) {
			contxt = canvs.getContext('2d');

			document.addEventListener('keydown', documentKeyDownHandler, false);
			document.addEventListener('keyup', documentKeyUpHandler, false);

			windowResizeHandler();

			setInterval(loop, 1000 / FRAMERATE);

		}
	};

	function windowResizeHandler() {
		world.width = window.innerWidth * 1;
		world.height = window.innerHeight * 1;

		canvs.width = world.width;
		canvs.height = world.height;
	}

	function documentKeyDownHandler(event) {
		switch (event.keyCode) {
			case 38:
				key.up = true;
				event.preventDefault();
				break;
			case 40:
				key.down = true;
				event.preventDefault();
				break;
			case 37:
				key.left = true;
				event.preventDefault();
				break;
			case 39:
				key.right = true;
				event.preventDefault();
				break;
			case 87:
				key.w = true;
				event.preventDefault();
				break;
			case 65:
				key.a = true;
				event.preventDefault();
				break;
			case 83:
				key.s = true;
				event.preventDefault();
				break;
			case 68:
				key.d = true;
				event.preventDefault();
				break;
			case 82:
				key.r = true;
				event.preventDefault();
				break;
			case 70:
				key.f = true;
				event.preventDefault();
				break;
			case 84:
				key.t = true;
				event.preventDefault();
				break;
			case 71:
				key.g = true;
				event.preventDefault();
				break;
		}
	}

	function documentKeyUpHandler(event) {
		switch (event.keyCode) {
			case 38:
				key.up = false;
				event.preventDefault();
				break;
			case 40:
				key.down = false;
				event.preventDefault();
				break;
			case 37:
				key.left = false;
				event.preventDefault();
				break;
			case 39:
				key.right = false;
				event.preventDefault();
				break;
			case 87:
				key.w = false;
				event.preventDefault();
				break;
			case 65:
				key.a = false;
				event.preventDefault();
				break;
			case 83:
				key.s = false;
				event.preventDefault();
				break;
			case 68:
				key.d = false;
				event.preventDefault();
				break;
			case 82:
				key.r = false;
				event.preventDefault();
				break;
			case 70:
				key.f = false;
				event.preventDefault();
				break;
			case 84:
				key.t = false;
				event.preventDefault();
				break;
			case 71:
				key.g = false;
				event.preventDefault();
				break;
		}
	}

	function loop() {

		if (key.up) {
			cam1.move(initsize);

		}
		if (key.down) {
			cam1.move(-initsize);

		}
		if (key.left) {
			cam1.pan(-initsize, 0);

		}
		if (key.right) {
			cam1.pan(initsize, 0);

		}
		if (key.r) {
			cam1.pan(0, -initsize);

		}
		if (key.f) {
			cam1.pan(0, initsize);

		}

		if (key.w) {
			cam1.orientation.x += 0.03;

		}
		if (key.a) {
			cam1.orientation.y -= 0.03;

		}
		if (key.s) {
			cam1.orientation.x -= 0.03;

		}
		if (key.d) {
			cam1.orientation.y += 0.03;

		}
		if (key.t) {
			cam1.zoom += 0.05;

		}
		if (key.g) {
			cam1.zoom -= 0.05;

		}

		var temp;

		for (var i = 0, len = objectPool.length; i < len; i++) {
			var object = objectPool[i];
			if (typeof object === 'undefined') {
				continue;
			}

			temp = object.getScreenCoords(cam1);
			if ((temp.x < -world.width) || (temp.y < -world.height) || (temp.x > world.width * 2) || (temp.y > world.height * 2)) {

			} else {
				renderPool.push(object);
			}
		}

		renderPool.sort(function (a, b) {
			return b.tempIndex - a.tempIndex;
		});

		contxt.clearRect(0, 0, world.width, world.height);
		for (var i = 0, len = renderPool.length; i < len; i++) {
			var object = renderPool[i];
			object.render(cam1, contxt);
		}

		renderPool = [];

		TIME += 1;
	}
};

function camera(xpos, ypos, zpos, xori, yori, zori, zoom, stereo) {
	this.position = {
		x: xpos || 0,
		y: ypos || 0,
		z: zpos || 0
	};
	this.orientation = {
		x: xori || 0,
		y: yori || 0,
		z: zori || 0
	};
	this.zoom = zoom || 1;
	this.stereo = stereo || 0;
};
camera.prototype.move = function (z) {

	var tx = 0;
	var ty = 0;
	var tz = z;

	var cosx = Math.cos(-this.orientation.x);
	var cosy = Math.cos(-this.orientation.y);
	var cosz = Math.cos(-this.orientation.z);
	var sinx = Math.sin(-this.orientation.x);
	var siny = Math.sin(-this.orientation.y);
	var sinz = Math.sin(-this.orientation.z);

	var nx = (cosy * (sinz * (ty) + cosz * (tx)) - siny * (tz));
	// var ny = (sinx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) + cosx * (cosz * (ty) - sinz * (tx)));
	var nz = (cosx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) - sinx * (cosz * (ty) - sinz * (tx)));

	this.position.x += nx;
	// this.position.y += ny;
	this.position.z += nz;
};
camera.prototype.pan = function (x, y) {

	var tx = x;
	var ty = y;
	var tz = 0;

	var cosx = Math.cos(0);
	var cosy = Math.cos(-this.orientation.y);
	var cosz = Math.cos(-this.orientation.z);
	var sinx = Math.sin(0);
	var siny = Math.sin(-this.orientation.y);
	var sinz = Math.sin(-this.orientation.z);

	var nx = (cosy * (sinz * (ty) + cosz * (tx)) - siny * (tz));
	var ny = (sinx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) + cosx * (cosz * (ty) - sinz * (tx)));
	var nz = (cosx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) - sinx * (cosz * (ty) - sinz * (tx)));

	this.position.x += nx;
	this.position.y += ny;
	this.position.z += nz;
};

function point(x, y, z) {
	this.position = {
		x: x || 0,
		y: y || 0,
		z: z || 0
	};
	this.tempIndex = 0;
};

point.prototype.rotate = function (x, y, z, xr, yr, zr) {

	var tx = this.position.x - x;
	var ty = this.position.y - y;
	var tz = this.position.z - z;

	var cosx = Math.cos(xr);
	var cosy = Math.cos(yr);
	var cosz = Math.cos(zr);
	var sinx = Math.sin(xr);
	var siny = Math.sin(yr);
	var sinz = Math.sin(zr);

	var nx = (cosy * (sinz * (ty) + cosz * (tx)) - siny * (tz));
	var ny = (sinx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) + cosx * (cosz * (ty) - sinz * (tx)));
	var nz = (cosx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) - sinx * (cosz * (ty) - sinz * (tx)));

	this.position.x = nx + x;
	this.position.y = ny + y;
	this.position.z = nz + z;
};
point.prototype.getScreenCoords = function (c) {

	var tx = this.position.x - c.position.x;
	var ty = this.position.y - c.position.y;
	var tz = this.position.z - c.position.z;

	var cosx = Math.cos(c.orientation.x);
	var cosy = Math.cos(c.orientation.y);
	var cosz = Math.cos(c.orientation.z);
	var sinx = Math.sin(c.orientation.x);
	var siny = Math.sin(c.orientation.y);
	var sinz = Math.sin(c.orientation.z);

	var nx = (cosy * (sinz * (ty) + cosz * (tx)) - siny * (tz));
	var ny = (sinx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) + cosx * (cosz * (ty) - sinz * (tx)));
	var nz = (cosx * (cosy * (tz) + siny * (sinz * (ty) + cosz * (tx))) - sinx * (cosz * (ty) - sinz * (tx)));

	this.tempIndex = nz;
	return {
		x: (((nx + c.stereo) * (c.zoom / nz)) * (world.height / 2)) + (world.width / 2),
		y: (((ny + c.stereo) * (c.zoom / nz)) * (world.height / 2)) + (world.height / 2),
		distance: nz
	};
};

point.prototype.render = function (cam, cont) {};

function line(p1, p2) {
	this.points = new Array;
	this.points[0] = p1 || new point(0, 0, 0);
	this.points[1] = p2 || new point(0, 0, 0);
	this.tempIndex = 0;
};
line.prototype.rotate = function (x, y, z, xr, yr, zr) {
	for (var i = 0; i < this.points.length; i++) {
		this.points[i].rotate(x, y, z, xr, yr, zr);
	};
};
line.prototype.getScreenCoords = function (c) {
	var screenCoords = this.points[0].getScreenCoords(c);
	this.tempIndex = this.points[0].tempIndex;
	return (screenCoords);
};
line.prototype.render = function (cam, cont) {
	var screenCoords = this.points[0].getScreenCoords(cam);
	var screenCoords2 = this.points[1].getScreenCoords(cam);
	cont.beginPath();
	cont.moveTo(screenCoords.x, screenCoords.y);
	cont.lineTo(screenCoords2.x, screenCoords2.y);
	cont.strokeStyle = 'rgba( 0, 0, 0, 1.0 )';
	cont.stroke();
};

world3D.initialize();