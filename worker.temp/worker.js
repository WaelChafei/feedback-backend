var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/process.js
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e3) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e4) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e3) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e4) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      args[i3 - 1] = arguments[i3];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance, performanceNow, startTime, process, defines;
var init_process = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/process.js"() {
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release = {};
    config = {};
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    performance = globalThis.performance || {};
    performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    startTime = /* @__PURE__ */ new Date();
    process = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    };
    defines = {};
    Object.keys(defines).forEach((key) => {
      const segs = key.split(".");
      let target = process;
      for (let i3 = 0; i3 < segs.length; i3++) {
        const seg = segs[i3];
        if (i3 === segs.length - 1) {
          target[seg] = defines[key];
        } else {
          target = target[seg] || (target[seg] = {});
        }
      }
    });
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i3 = 0, len = code.length; i3 < len; ++i3) {
    lookup[i3] = code[i3];
    revLookup[code.charCodeAt(i3)] = i3;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function base64toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i3, j, l2, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l2 = placeHolders > 0 ? len - 4 : len;
  var L2 = 0;
  for (i3 = 0, j = 0; i3 < l2; i3 += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i3)] << 18 | revLookup[b64.charCodeAt(i3 + 1)] << 12 | revLookup[b64.charCodeAt(i3 + 2)] << 6 | revLookup[b64.charCodeAt(i3 + 3)];
    arr[L2++] = tmp >> 16 & 255;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i3)] << 2 | revLookup[b64.charCodeAt(i3 + 1)] >> 4;
    arr[L2++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i3)] << 10 | revLookup[b64.charCodeAt(i3 + 1)] << 4 | revLookup[b64.charCodeAt(i3 + 2)] >> 2;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i3 = start; i3 < end; i3 += 3) {
    tmp = (uint8[i3] << 16) + (uint8[i3 + 1] << 8) + uint8[i3 + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function base64fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i3 = 0, len2 = len - extraBytes; i3 < len2; i3 += maxChunkLength) {
    parts.push(
      encodeChunk(
        uint8,
        i3,
        i3 + maxChunkLength > len2 ? len2 : i3 + maxChunkLength
      )
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill3, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill3 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill3, encoding) : createBuffer(that, size).fill(fill3);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i3 = 0; i3 < size; ++i3) {
      that[i3] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i3 = 0; i3 < length; i3 += 1) {
    that[i3] = array[i3] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError(
    "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
  );
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
    );
  }
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0)
    return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding)
    encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b, n2, m) {
  var i3 = b[n2];
  b[n2] = b[m];
  b[m] = i3;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0)
    byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir)
      return -1;
    else
      byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir)
      byteOffset = 0;
    else
      return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(
          buffer,
          val,
          byteOffset
        );
      } else {
        return Uint8Array.prototype.lastIndexOf.call(
          buffer,
          val,
          byteOffset
        );
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i4) {
    if (indexSize === 1) {
      return buf[i4];
    } else {
      return buf.readUInt16BE(i4 * indexSize);
    }
  }
  var i3;
  if (dir) {
    var foundIndex = -1;
    for (i3 = byteOffset; i3 < arrLength; i3++) {
      if (read2(arr, i3) === read2(val, foundIndex === -1 ? 0 : i3 - foundIndex)) {
        if (foundIndex === -1)
          foundIndex = i3;
        if (i3 - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1)
          i3 -= i3 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i3 = byteOffset; i3 >= 0; i3--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read2(arr, i3 + j) !== read2(val, j)) {
          found = false;
          break;
        }
      }
      if (found)
        return i3;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i3 = 0; i3 < length; ++i3) {
    var parsed = parseInt(string.substr(i3 * 2, 2), 16);
    if (isNaN(parsed))
      return i3;
    buf[offset + i3] = parsed;
  }
  return i3;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64fromByteArray(buf);
  } else {
    return base64fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i3 = start;
  while (i3 < end) {
    var firstByte = buf[i3];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i3 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i3 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i3 + 1];
          thirdByte = buf[i3 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i3 + 1];
          thirdByte = buf[i3 + 2];
          fourthByte = buf[i3 + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i3 += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i3 = 0;
  while (i3 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i3, i3 += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i3 = start; i3 < end; ++i3) {
    ret += String.fromCharCode(buf[i3] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i3 = start; i3 < end; ++i3) {
    ret += String.fromCharCode(buf[i3]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0)
    start = 0;
  if (!end || end < 0 || end > len)
    end = len;
  var out = "";
  for (var i3 = start; i3 < end; ++i3) {
    out += toHex(buf[i3]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i3 = 0; i3 < bytes.length; i3 += 2) {
    res += String.fromCharCode(bytes[i3] + bytes[i3 + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 65535 + value + 1;
  for (var i3 = 0, j = Math.min(buf.length - offset, 2); i3 < j; ++i3) {
    buf[offset + i3] = (value & 255 << 8 * (littleEndian ? i3 : 1 - i3)) >>> (littleEndian ? i3 : 1 - i3) * 8;
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 4294967295 + value + 1;
  for (var i3 = 0, j = Math.min(buf.length - offset, 4); i3 < j; ++i3) {
    buf[offset + i3] = value >>> (littleEndian ? i3 : 3 - i3) * 8 & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      4,
      34028234663852886e22,
      -34028234663852886e22
    );
  }
  ieee754write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      8,
      17976931348623157e292,
      -17976931348623157e292
    );
  }
  ieee754write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim)
    return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n2) {
  if (n2 < 16)
    return "0" + n2.toString(16);
  return n2.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i3 = 0; i3 < length; ++i3) {
    codePoint = string.charCodeAt(i3);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i3 + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i3 = 0; i3 < str.length; ++i3) {
    byteArray.push(str.charCodeAt(i3) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c3, hi, lo;
  var byteArray = [];
  for (var i3 = 0; i3 < str.length; ++i3) {
    if ((units -= 2) < 0)
      break;
    c3 = str.charCodeAt(i3);
    hi = c3 >> 8;
    lo = c3 % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i3 = 0; i3 < length; ++i3) {
    if (i3 + offset >= dst.length || i3 >= src.length)
      break;
    dst[i3 + offset] = src[i3];
  }
  return i3;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
function ieee754read(buffer, offset, isLE, mLen, nBytes) {
  var e3, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i3 = isLE ? nBytes - 1 : 0;
  var d3 = isLE ? -1 : 1;
  var s3 = buffer[offset + i3];
  i3 += d3;
  e3 = s3 & (1 << -nBits) - 1;
  s3 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i3], i3 += d3, nBits -= 8) {
  }
  m = e3 & (1 << -nBits) - 1;
  e3 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i3], i3 += d3, nBits -= 8) {
  }
  if (e3 === 0) {
    e3 = 1 - eBias;
  } else if (e3 === eMax) {
    return m ? NaN : (s3 ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e3 = e3 - eBias;
  }
  return (s3 ? -1 : 1) * m * Math.pow(2, e3 - mLen);
}
function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
  var e3, m, c3;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i3 = isLE ? 0 : nBytes - 1;
  var d3 = isLE ? 1 : -1;
  var s3 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e3 = eMax;
  } else {
    e3 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c3 = Math.pow(2, -e3)) < 1) {
      e3--;
      c3 *= 2;
    }
    if (e3 + eBias >= 1) {
      value += rt / c3;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c3 >= 2) {
      e3++;
      c3 /= 2;
    }
    if (e3 + eBias >= eMax) {
      m = 0;
      e3 = eMax;
    } else if (e3 + eBias >= 1) {
      m = (value * c3 - 1) * Math.pow(2, mLen);
      e3 = e3 + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e3 = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i3] = m & 255, i3 += d3, m /= 256, mLen -= 8) {
  }
  e3 = e3 << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i3] = e3 & 255, i3 += d3, e3 /= 256, eLen -= 8) {
  }
  buffer[offset + i3 - d3] |= s3 * 128;
}
var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_Buffer = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited = false;
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.kMaxLength = kMaxLength();
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
      }
    }
    Buffer2.alloc = function(size, fill3, encoding) {
      return alloc(null, size, fill3, encoding);
    };
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer;
    Buffer2.compare = function compare(a2, b) {
      if (!internalIsBuffer(a2) || !internalIsBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a2 === b)
        return 0;
      var x = a2.length;
      var y = b.length;
      for (var i3 = 0, len = Math.min(x, y); i3 < len; ++i3) {
        if (a2[i3] !== b[i3]) {
          x = a2[i3];
          y = b[i3];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i3;
      if (length === void 0) {
        length = 0;
        for (i3 = 0; i3 < list.length; ++i3) {
          length += list[i3].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i3 = 0; i3 < list.length; ++i3) {
        var buf = list[i3];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = true;
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 2) {
        swap(this, i3, i3 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 4) {
        swap(this, i3, i3 + 3);
        swap(this, i3 + 1, i3 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 8) {
        swap(this, i3, i3 + 7);
        swap(this, i3 + 1, i3 + 6);
        swap(this, i3 + 2, i3 + 5);
        swap(this, i3 + 3, i3 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function equals(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i3 = 0; i3 < len; ++i3) {
        if (thisCopy[i3] !== targetCopy[i3]) {
          x = thisCopy[i3];
          y = targetCopy[i3];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i3 = 0; i3 < sliceLen; ++i3) {
          newBuf[i3] = this[i3 + start];
        }
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i3 = 0;
      while (++i3 < byteLength3 && (mul *= 256)) {
        val += this[offset + i3] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      var val = this[offset + --byteLength3];
      var mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i3 = 0;
      while (++i3 < byteLength3 && (mul *= 256)) {
        val += this[offset + i3] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      var i3 = byteLength3;
      var mul = 1;
      var val = this[offset + --i3];
      while (i3 > 0 && (mul *= 256)) {
        val += this[offset + --i3] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, false, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      var mul = 1;
      var i3 = 0;
      this[offset] = value & 255;
      while (++i3 < byteLength3 && (mul *= 256)) {
        this[offset + i3] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      var i3 = byteLength3 - 1;
      var mul = 1;
      this[offset + i3] = value & 255;
      while (--i3 >= 0 && (mul *= 256)) {
        this[offset + i3] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i3 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i3 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i3 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i3] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i3 = byteLength3 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i3] = value & 255;
      while (--i3 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i3 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i3] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i3;
      if (this === target && start < targetStart && targetStart < end) {
        for (i3 = len - 1; i3 >= 0; --i3) {
          target[i3 + targetStart] = this[i3 + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i3 = 0; i3 < len; ++i3) {
          target[i3 + targetStart] = this[i3 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i3;
      if (typeof val === "number") {
        for (i3 = start; i3 < end; ++i3) {
          this[i3] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i3 = 0; i3 < end - start; ++i3) {
          this[i3 + start] = bytes[i3 % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
var init_buffer = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
    init_Buffer();
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/capability.js
function blobConstructor() {
  if (typeof _blobConstructor !== "undefined") {
    return _blobConstructor;
  }
  try {
    new globalThis.Blob([new ArrayBuffer(1)]);
    _blobConstructor = true;
  } catch (e3) {
    _blobConstructor = false;
  }
  return _blobConstructor;
}
function checkTypeSupport(type) {
  if (!xhr) {
    xhr = new globalThis.XMLHttpRequest();
    xhr.open("GET", globalThis.location.host ? "/" : "https://example.com");
  }
  try {
    xhr.responseType = type;
    return xhr.responseType === type;
  } catch (e3) {
    return false;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
var hasFetch, _blobConstructor, xhr, haveArrayBuffer, haveSlice, arraybuffer, msstream, mozchunkedarraybuffer, overrideMimeType, vbArray;
var init_capability = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/capability.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    hasFetch = isFunction(globalThis.fetch) && isFunction(globalThis.ReadableStream);
    haveArrayBuffer = typeof globalThis.ArrayBuffer !== "undefined";
    haveSlice = haveArrayBuffer && isFunction(globalThis.ArrayBuffer.prototype.slice);
    arraybuffer = haveArrayBuffer && checkTypeSupport("arraybuffer");
    msstream = !hasFetch && haveSlice && checkTypeSupport("ms-stream");
    mozchunkedarraybuffer = !hasFetch && haveArrayBuffer && checkTypeSupport("moz-chunked-arraybuffer");
    overrideMimeType = isFunction(xhr.overrideMimeType);
    vbArray = isFunction(globalThis.VBArray);
    xhr = null;
  }
});

// node-modules-polyfills:process
function defaultSetTimout2() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout2() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout2(fun) {
  if (cachedSetTimeout2 === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout2 === defaultSetTimout2 || !cachedSetTimeout2) && setTimeout) {
    cachedSetTimeout2 = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout2(fun, 0);
  } catch (e3) {
    try {
      return cachedSetTimeout2.call(null, fun, 0);
    } catch (e4) {
      return cachedSetTimeout2.call(this, fun, 0);
    }
  }
}
function runClearTimeout2(marker) {
  if (cachedClearTimeout2 === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout2 === defaultClearTimeout2 || !cachedClearTimeout2) && clearTimeout) {
    cachedClearTimeout2 = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout2(marker);
  } catch (e3) {
    try {
      return cachedClearTimeout2.call(null, marker);
    } catch (e4) {
      return cachedClearTimeout2.call(this, marker);
    }
  }
}
function cleanUpNextTick2() {
  if (!draining2 || !currentQueue2) {
    return;
  }
  draining2 = false;
  if (currentQueue2.length) {
    queue2 = currentQueue2.concat(queue2);
  } else {
    queueIndex2 = -1;
  }
  if (queue2.length) {
    drainQueue2();
  }
}
function drainQueue2() {
  if (draining2) {
    return;
  }
  var timeout = runTimeout2(cleanUpNextTick2);
  draining2 = true;
  var len = queue2.length;
  while (len) {
    currentQueue2 = queue2;
    queue2 = [];
    while (++queueIndex2 < len) {
      if (currentQueue2) {
        currentQueue2[queueIndex2].run();
      }
    }
    queueIndex2 = -1;
    len = queue2.length;
  }
  currentQueue2 = null;
  draining2 = false;
  runClearTimeout2(timeout);
}
function nextTick2(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      args[i3 - 1] = arguments[i3];
    }
  }
  queue2.push(new Item2(fun, args));
  if (queue2.length === 1 && !draining2) {
    runTimeout2(drainQueue2);
  }
}
function Item2(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop2() {
}
function binding2(name) {
  throw new Error("process.binding is not supported");
}
function cwd2() {
  return "/";
}
function chdir2(dir) {
  throw new Error("process.chdir is not supported");
}
function umask2() {
  return 0;
}
function hrtime2(previousTimestamp) {
  var clocktime = performanceNow2.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime2() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime2;
  return dif / 1e3;
}
var cachedSetTimeout2, cachedClearTimeout2, queue2, draining2, currentQueue2, queueIndex2, title2, platform2, browser2, env2, argv2, version2, versions2, release2, config2, on2, addListener2, once2, off2, removeListener2, removeAllListeners2, emit2, performance2, performanceNow2, startTime2, browser$1, process_default;
var init_process2 = __esm({
  "node-modules-polyfills:process"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    cachedSetTimeout2 = defaultSetTimout2;
    cachedClearTimeout2 = defaultClearTimeout2;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout2 = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout2 = clearTimeout;
    }
    queue2 = [];
    draining2 = false;
    queueIndex2 = -1;
    Item2.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title2 = "browser";
    platform2 = "browser";
    browser2 = true;
    env2 = {};
    argv2 = [];
    version2 = "";
    versions2 = {};
    release2 = {};
    config2 = {};
    on2 = noop2;
    addListener2 = noop2;
    once2 = noop2;
    off2 = noop2;
    removeListener2 = noop2;
    removeAllListeners2 = noop2;
    emit2 = noop2;
    performance2 = globalThis.performance || {};
    performanceNow2 = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    startTime2 = /* @__PURE__ */ new Date();
    browser$1 = {
      nextTick: nextTick2,
      title: title2,
      browser: browser2,
      env: env2,
      argv: argv2,
      version: version2,
      versions: versions2,
      on: on2,
      addListener: addListener2,
      once: once2,
      off: off2,
      removeListener: removeListener2,
      removeAllListeners: removeAllListeners2,
      emit: emit2,
      binding: binding2,
      cwd: cwd2,
      chdir: chdir2,
      umask: umask2,
      hrtime: hrtime2,
      platform: platform2,
      release: release2,
      config: config2,
      uptime: uptime2
    };
    process_default = browser$1;
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
var inherits, inherits_default;
var init_inherits = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    if (typeof Object.create === "function") {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    inherits_default = inherits;
  }
});

// node-modules-polyfills:util
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i3 = 0; i3 < arguments.length; i3++) {
      objects.push(inspect(arguments[i3]));
    }
    return objects.join(" ");
  }
  var i3 = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x2) {
    if (x2 === "%%")
      return "%";
    if (i3 >= len)
      return x2;
    switch (x2) {
      case "%s":
        return String(args[i3++]);
      case "%d":
        return Number(args[i3++]);
      case "%j":
        try {
          return JSON.stringify(args[i3++]);
        } catch (_) {
          return "[Circular]";
        }
      default:
        return x2;
    }
  });
  for (var x = args[i3]; i3 < len; x = args[++i3]) {
    if (isNull(x) || !isObject(x)) {
      str += " " + x;
    } else {
      str += " " + inspect(x);
    }
  }
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(globalThis.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }
  if (process_default.noDeprecation === true) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation) {
        throw new Error(msg);
      } else if (process_default.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process_default.env.NODE_DEBUG || "";
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function() {
      };
    }
  }
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3)
    ctx.depth = arguments[2];
  if (arguments.length >= 4)
    ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden))
    ctx.showHidden = false;
  if (isUndefined(ctx.depth))
    ctx.depth = 2;
  if (isUndefined(ctx.colors))
    ctx.colors = false;
  if (isUndefined(ctx.customInspect))
    ctx.customInspect = true;
  if (ctx.colors)
    ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function(val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction2(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  var keys2 = Object.keys(value);
  var visibleKeys = arrayToHash(keys2);
  if (ctx.showHidden) {
    keys2 = Object.getOwnPropertyNames(value);
  }
  if (isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
    return formatError(value);
  }
  if (keys2.length === 0) {
    if (isFunction2(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base2 = "", array = false, braces = ["{", "}"];
  if (isArray(value)) {
    array = true;
    braces = ["[", "]"];
  }
  if (isFunction2(value)) {
    var n2 = value.name ? ": " + value.name : "";
    base2 = " [Function" + n2 + "]";
  }
  if (isRegExp(value)) {
    base2 = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base2 = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base2 = " " + formatError(value);
  }
  if (keys2.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base2 + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
  } else {
    output = keys2.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base2, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
  var output = [];
  for (var i3 = 0, l2 = value.length; i3 < l2; ++i3) {
    if (hasOwnProperty(value, String(i3))) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        String(i3),
        true
      ));
    } else {
      output.push("");
    }
  }
  keys2.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        key,
        true
      ));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = "[" + key + "]";
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf("\n") > -1) {
        if (array) {
          str = str.split("\n").map(function(line) {
            return "  " + line;
          }).join("\n").substr(2);
        } else {
          str = "\n" + str.split("\n").map(function(line) {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify("" + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, "name");
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, "string");
    }
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base2, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf("\n") >= 0)
      numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
  }
  return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isString(arg) {
  return typeof arg === "string";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isDate(d3) {
  return isObject(d3) && objectToString(d3) === "[object Date]";
}
function isError(e3) {
  return isObject(e3) && (objectToString(e3) === "[object Error]" || e3 instanceof Error);
}
function isFunction2(arg) {
  return typeof arg === "function";
}
function objectToString(o3) {
  return Object.prototype.toString.call(o3);
}
function _extend(origin, add) {
  if (!add || !isObject(add))
    return origin;
  var keys2 = Object.keys(add);
  var i3 = keys2.length;
  while (i3--) {
    origin[keys2[i3]] = add[keys2[i3]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp, debugs, debugEnviron;
var init_util = __esm({
  "node-modules-polyfills:util"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_process2();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
  }
});

// node-modules-polyfills:events
function EventHandlers() {
}
function EventEmitter() {
  EventEmitter.init.call(this);
}
function $getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
function emitNone(handler, isFn, self2) {
  if (isFn)
    handler.call(self2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i3 = 0; i3 < len; ++i3)
      listeners2[i3].call(self2);
  }
}
function emitOne(handler, isFn, self2, arg1) {
  if (isFn)
    handler.call(self2, arg1);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i3 = 0; i3 < len; ++i3)
      listeners2[i3].call(self2, arg1);
  }
}
function emitTwo(handler, isFn, self2, arg1, arg2) {
  if (isFn)
    handler.call(self2, arg1, arg2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i3 = 0; i3 < len; ++i3)
      listeners2[i3].call(self2, arg1, arg2);
  }
}
function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self2, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i3 = 0; i3 < len; ++i3)
      listeners2[i3].call(self2, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self2, args) {
  if (isFn)
    handler.apply(self2, args);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i3 = 0; i3 < len; ++i3)
      listeners2[i3].apply(self2, args);
  }
}
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type];
  }
  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }
  return target;
}
function emitWarning(e3) {
  typeof console.warn === "function" ? console.warn(e3) : console.log(e3);
}
function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}
function listenerCount(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
}
function spliceOne(list, index) {
  for (var i3 = index, k2 = i3 + 1, n2 = list.length; k2 < n2; i3 += 1, k2 += 1)
    list[i3] = list[k2];
  list.pop();
}
function arrayClone(arr, i3) {
  var copy3 = new Array(i3);
  while (i3--)
    copy3[i3] = arr[i3];
  return copy3;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i3 = 0; i3 < ret.length; ++i3) {
    ret[i3] = arr[i3].listener || arr[i3];
  }
  return ret;
}
var domain, events_default;
var init_events = __esm({
  "node-modules-polyfills:events"() {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    events_default = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = false;
    EventEmitter.prototype.domain = void 0;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.init = function() {
      this.domain = null;
      if (EventEmitter.usingDomains) {
        if (domain.active && !(this instanceof domain.Domain)) {
          this.domain = domain.active;
        }
      }
      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n2) {
      if (typeof n2 !== "number" || n2 < 0 || isNaN(n2))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n2;
      return this;
    };
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit3(type) {
      var er, handler, len, args, i3, events, domain2;
      var needDomainExit = false;
      var doError = type === "error";
      events = this._events;
      if (events)
        doError = doError && events.error == null;
      else if (!doError)
        return false;
      domain2 = this.domain;
      if (doError) {
        er = arguments[1];
        if (domain2) {
          if (!er)
            er = new Error('Uncaught, unspecified "error" event');
          er.domainEmitter = this;
          er.domain = domain2;
          er.domainThrown = false;
          domain2.emit("error", er);
        } else if (er instanceof Error) {
          throw er;
        } else {
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
          err.context = er;
          throw err;
        }
        return false;
      }
      handler = events[type];
      if (!handler)
        return false;
      var isFn = typeof handler === "function";
      len = arguments.length;
      switch (len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          args = new Array(len - 1);
          for (i3 = 1; i3 < len; i3++)
            args[i3 - 1] = arguments[i3];
          emitMany(handler, isFn, this, args);
      }
      if (needDomainExit)
        domain2.exit();
      return true;
    };
    EventEmitter.prototype.addListener = function addListener3(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    EventEmitter.prototype.once = function once3(type, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener3(type, listener) {
      var list, events, position, i3, originalListener;
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events)
        return this;
      list = events[type];
      if (!list)
        return this;
      if (list === listener || list.listener && list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i3 = list.length; i3-- > 0; ) {
          if (list[i3] === listener || list[i3].listener && list[i3].listener === listener) {
            originalListener = list[i3].listener;
            position = i3;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list[0] = void 0;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }
        if (events.removeListener)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners3(type) {
      var listeners2, events;
      events = this._events;
      if (!events)
        return this;
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys2 = Object.keys(events);
        for (var i3 = 0, key; i3 < keys2.length; ++i3) {
          key = keys2[i3];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }
      listeners2 = events[type];
      if (typeof listeners2 === "function") {
        this.removeListener(type, listeners2);
      } else if (listeners2) {
        do {
          this.removeListener(type, listeners2[listeners2.length - 1]);
        } while (listeners2[0]);
      }
      return this;
    };
    EventEmitter.prototype.listeners = function listeners(type) {
      var evlistener;
      var ret;
      var events = this._events;
      if (!events)
        ret = [];
      else {
        evlistener = events[type];
        if (!evlistener)
          ret = [];
        else if (typeof evlistener === "function")
          ret = [evlistener.listener || evlistener];
        else
          ret = unwrapListeners(evlistener);
      }
      return ret;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
  }
});

// node-modules-polyfills:buffer
function init2() {
  inited2 = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i3 = 0, len = code.length; i3 < len; ++i3) {
    lookup2[i3] = code[i3];
    revLookup2[code.charCodeAt(i3)] = i3;
  }
  revLookup2["-".charCodeAt(0)] = 62;
  revLookup2["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited2) {
    init2();
  }
  var i3, j, l2, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr2(len * 3 / 4 - placeHolders);
  l2 = placeHolders > 0 ? len - 4 : len;
  var L2 = 0;
  for (i3 = 0, j = 0; i3 < l2; i3 += 4, j += 3) {
    tmp = revLookup2[b64.charCodeAt(i3)] << 18 | revLookup2[b64.charCodeAt(i3 + 1)] << 12 | revLookup2[b64.charCodeAt(i3 + 2)] << 6 | revLookup2[b64.charCodeAt(i3 + 3)];
    arr[L2++] = tmp >> 16 & 255;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup2[b64.charCodeAt(i3)] << 2 | revLookup2[b64.charCodeAt(i3 + 1)] >> 4;
    arr[L2++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup2[b64.charCodeAt(i3)] << 10 | revLookup2[b64.charCodeAt(i3 + 1)] << 4 | revLookup2[b64.charCodeAt(i3 + 2)] >> 2;
    arr[L2++] = tmp >> 8 & 255;
    arr[L2++] = tmp & 255;
  }
  return arr;
}
function tripletToBase642(num) {
  return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
}
function encodeChunk2(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i3 = start; i3 < end; i3 += 3) {
    tmp = (uint8[i3] << 16) + (uint8[i3 + 1] << 8) + uint8[i3 + 2];
    output.push(tripletToBase642(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  if (!inited2) {
    init2();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i3 = 0, len2 = len - extraBytes; i3 < len2; i3 += maxChunkLength) {
    parts.push(encodeChunk2(uint8, i3, i3 + maxChunkLength > len2 ? len2 : i3 + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup2[tmp >> 2];
    output += lookup2[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup2[tmp >> 10];
    output += lookup2[tmp >> 4 & 63];
    output += lookup2[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e3, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i3 = isLE ? nBytes - 1 : 0;
  var d3 = isLE ? -1 : 1;
  var s3 = buffer[offset + i3];
  i3 += d3;
  e3 = s3 & (1 << -nBits) - 1;
  s3 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i3], i3 += d3, nBits -= 8) {
  }
  m = e3 & (1 << -nBits) - 1;
  e3 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i3], i3 += d3, nBits -= 8) {
  }
  if (e3 === 0) {
    e3 = 1 - eBias;
  } else if (e3 === eMax) {
    return m ? NaN : (s3 ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e3 = e3 - eBias;
  }
  return (s3 ? -1 : 1) * m * Math.pow(2, e3 - mLen);
}
function write2(buffer, value, offset, isLE, mLen, nBytes) {
  var e3, m, c3;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i3 = isLE ? 0 : nBytes - 1;
  var d3 = isLE ? 1 : -1;
  var s3 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e3 = eMax;
  } else {
    e3 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c3 = Math.pow(2, -e3)) < 1) {
      e3--;
      c3 *= 2;
    }
    if (e3 + eBias >= 1) {
      value += rt / c3;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c3 >= 2) {
      e3++;
      c3 /= 2;
    }
    if (e3 + eBias >= eMax) {
      m = 0;
      e3 = eMax;
    } else if (e3 + eBias >= 1) {
      m = (value * c3 - 1) * Math.pow(2, mLen);
      e3 = e3 + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e3 = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i3] = m & 255, i3 += d3, m /= 256, mLen -= 8) {
  }
  e3 = e3 << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i3] = e3 & 255, i3 += d3, e3 /= 256, eLen -= 8) {
  }
  buffer[offset + i3 - d3] |= s3 * 128;
}
function kMaxLength2() {
  return Buffer3.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer2(that, length) {
  if (kMaxLength2() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer3.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer3.prototype;
  } else {
    if (that === null) {
      that = new Buffer3(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer3(arg, encodingOrOffset, length) {
  if (!Buffer3.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer3)) {
    return new Buffer3(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe2(this, arg);
  }
  return from2(this, arg, encodingOrOffset, length);
}
function from2(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer2(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString2(that, value, encodingOrOffset);
  }
  return fromObject2(that, value);
}
function assertSize2(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc2(that, size, fill3, encoding) {
  assertSize2(size);
  if (size <= 0) {
    return createBuffer2(that, size);
  }
  if (fill3 !== void 0) {
    return typeof encoding === "string" ? createBuffer2(that, size).fill(fill3, encoding) : createBuffer2(that, size).fill(fill3);
  }
  return createBuffer2(that, size);
}
function allocUnsafe2(that, size) {
  assertSize2(size);
  that = createBuffer2(that, size < 0 ? 0 : checked2(size) | 0);
  if (!Buffer3.TYPED_ARRAY_SUPPORT) {
    for (var i3 = 0; i3 < size; ++i3) {
      that[i3] = 0;
    }
  }
  return that;
}
function fromString2(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer3.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength2(string, encoding) | 0;
  that = createBuffer2(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike2(that, array) {
  var length = array.length < 0 ? 0 : checked2(array.length) | 0;
  that = createBuffer2(that, length);
  for (var i3 = 0; i3 < length; i3 += 1) {
    that[i3] = array[i3] & 255;
  }
  return that;
}
function fromArrayBuffer2(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer3.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer3.prototype;
  } else {
    that = fromArrayLike2(that, array);
  }
  return that;
}
function fromObject2(that, obj) {
  if (internalIsBuffer2(obj)) {
    var len = checked2(obj.length) | 0;
    that = createBuffer2(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan2(obj.length)) {
        return createBuffer2(that, 0);
      }
      return fromArrayLike2(that, obj);
    }
    if (obj.type === "Buffer" && isArray2(obj.data)) {
      return fromArrayLike2(that, obj.data);
    }
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked2(length) {
  if (length >= kMaxLength2()) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength2().toString(16) + " bytes");
  }
  return length | 0;
}
function internalIsBuffer2(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength2(string, encoding) {
  if (internalIsBuffer2(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0)
    return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes2(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes2(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes2(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString2(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding)
    encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice2(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice2(this, start, end);
      case "ascii":
        return asciiSlice2(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice2(this, start, end);
      case "base64":
        return base64Slice2(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice2(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap2(b, n2, m) {
  var i3 = b[n2];
  b[n2] = b[m];
  b[m] = i3;
}
function bidirectionalIndexOf2(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0)
    byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir)
      return -1;
    else
      byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir)
      byteOffset = 0;
    else
      return -1;
  }
  if (typeof val === "string") {
    val = Buffer3.from(val, encoding);
  }
  if (internalIsBuffer2(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf2(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer3.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf2(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf2(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i4) {
    if (indexSize === 1) {
      return buf[i4];
    } else {
      return buf.readUInt16BE(i4 * indexSize);
    }
  }
  var i3;
  if (dir) {
    var foundIndex = -1;
    for (i3 = byteOffset; i3 < arrLength; i3++) {
      if (read2(arr, i3) === read2(val, foundIndex === -1 ? 0 : i3 - foundIndex)) {
        if (foundIndex === -1)
          foundIndex = i3;
        if (i3 - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1)
          i3 -= i3 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i3 = byteOffset; i3 >= 0; i3--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read2(arr, i3 + j) !== read2(val, j)) {
          found = false;
          break;
        }
      }
      if (found)
        return i3;
    }
  }
  return -1;
}
function hexWrite2(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i3 = 0; i3 < length; ++i3) {
    var parsed = parseInt(string.substr(i3 * 2, 2), 16);
    if (isNaN(parsed))
      return i3;
    buf[offset + i3] = parsed;
  }
  return i3;
}
function utf8Write2(buf, string, offset, length) {
  return blitBuffer2(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
}
function asciiWrite2(buf, string, offset, length) {
  return blitBuffer2(asciiToBytes2(string), buf, offset, length);
}
function latin1Write2(buf, string, offset, length) {
  return asciiWrite2(buf, string, offset, length);
}
function base64Write2(buf, string, offset, length) {
  return blitBuffer2(base64ToBytes2(string), buf, offset, length);
}
function ucs2Write2(buf, string, offset, length) {
  return blitBuffer2(utf16leToBytes2(string, buf.length - offset), buf, offset, length);
}
function base64Slice2(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice2(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i3 = start;
  while (i3 < end) {
    var firstByte = buf[i3];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i3 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i3 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i3 + 1];
          thirdByte = buf[i3 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i3 + 1];
          thirdByte = buf[i3 + 2];
          fourthByte = buf[i3 + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i3 += bytesPerSequence;
  }
  return decodeCodePointsArray2(res);
}
function decodeCodePointsArray2(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH2) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i3 = 0;
  while (i3 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i3, i3 += MAX_ARGUMENTS_LENGTH2)
    );
  }
  return res;
}
function asciiSlice2(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i3 = start; i3 < end; ++i3) {
    ret += String.fromCharCode(buf[i3] & 127);
  }
  return ret;
}
function latin1Slice2(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i3 = start; i3 < end; ++i3) {
    ret += String.fromCharCode(buf[i3]);
  }
  return ret;
}
function hexSlice2(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0)
    start = 0;
  if (!end || end < 0 || end > len)
    end = len;
  var out = "";
  for (var i3 = start; i3 < end; ++i3) {
    out += toHex2(buf[i3]);
  }
  return out;
}
function utf16leSlice2(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i3 = 0; i3 < bytes.length; i3 += 2) {
    res += String.fromCharCode(bytes[i3] + bytes[i3 + 1] * 256);
  }
  return res;
}
function checkOffset2(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt2(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer2(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt162(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 65535 + value + 1;
  for (var i3 = 0, j = Math.min(buf.length - offset, 2); i3 < j; ++i3) {
    buf[offset + i3] = (value & 255 << 8 * (littleEndian ? i3 : 1 - i3)) >>> (littleEndian ? i3 : 1 - i3) * 8;
  }
}
function objectWriteUInt322(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 4294967295 + value + 1;
  for (var i3 = 0, j = Math.min(buf.length - offset, 4); i3 < j; ++i3) {
    buf[offset + i3] = value >>> (littleEndian ? i3 : 3 - i3) * 8 & 255;
  }
}
function checkIEEE7542(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat2(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE7542(buf, value, offset, 4);
  }
  write2(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble2(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE7542(buf, value, offset, 8);
  }
  write2(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean2(str) {
  str = stringtrim2(str).replace(INVALID_BASE64_RE2, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim2(str) {
  if (str.trim)
    return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex2(n2) {
  if (n2 < 16)
    return "0" + n2.toString(16);
  return n2.toString(16);
}
function utf8ToBytes2(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i3 = 0; i3 < length; ++i3) {
    codePoint = string.charCodeAt(i3);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i3 + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes2(str) {
  var byteArray = [];
  for (var i3 = 0; i3 < str.length; ++i3) {
    byteArray.push(str.charCodeAt(i3) & 255);
  }
  return byteArray;
}
function utf16leToBytes2(str, units) {
  var c3, hi, lo;
  var byteArray = [];
  for (var i3 = 0; i3 < str.length; ++i3) {
    if ((units -= 2) < 0)
      break;
    c3 = str.charCodeAt(i3);
    hi = c3 >> 8;
    lo = c3 % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes2(str) {
  return toByteArray(base64clean2(str));
}
function blitBuffer2(src, dst, offset, length) {
  for (var i3 = 0; i3 < length; ++i3) {
    if (i3 + offset >= dst.length || i3 >= src.length)
      break;
    dst[i3 + offset] = src[i3];
  }
  return i3;
}
function isnan2(val) {
  return val !== val;
}
function isBuffer2(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer2(obj) || isSlowBuffer2(obj));
}
function isFastBuffer2(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer2(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer2(obj.slice(0, 0));
}
var lookup2, revLookup2, Arr2, inited2, toString2, isArray2, INSPECT_MAX_BYTES, _kMaxLength, MAX_ARGUMENTS_LENGTH2, INVALID_BASE64_RE2;
var init_buffer2 = __esm({
  "node-modules-polyfills:buffer"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup2 = [];
    revLookup2 = [];
    Arr2 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited2 = false;
    toString2 = {}.toString;
    isArray2 = Array.isArray || function(arr) {
      return toString2.call(arr) == "[object Array]";
    };
    INSPECT_MAX_BYTES = 50;
    Buffer3.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
    _kMaxLength = kMaxLength2();
    Buffer3.poolSize = 8192;
    Buffer3._augment = function(arr) {
      arr.__proto__ = Buffer3.prototype;
      return arr;
    };
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from2(null, value, encodingOrOffset, length);
    };
    if (Buffer3.TYPED_ARRAY_SUPPORT) {
      Buffer3.prototype.__proto__ = Uint8Array.prototype;
      Buffer3.__proto__ = Uint8Array;
    }
    Buffer3.alloc = function(size, fill3, encoding) {
      return alloc2(null, size, fill3, encoding);
    };
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe2(null, size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe2(null, size);
    };
    Buffer3.isBuffer = isBuffer2;
    Buffer3.compare = function compare3(a2, b) {
      if (!internalIsBuffer2(a2) || !internalIsBuffer2(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a2 === b)
        return 0;
      var x = a2.length;
      var y = b.length;
      for (var i3 = 0, len = Math.min(x, y); i3 < len; ++i3) {
        if (a2[i3] !== b[i3]) {
          x = a2[i3];
          y = b[i3];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding2(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat2(list, length) {
      if (!isArray2(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      var i3;
      if (length === void 0) {
        length = 0;
        for (i3 = 0; i3 < list.length; ++i3) {
          length += list[i3].length;
        }
      }
      var buffer = Buffer3.allocUnsafe(length);
      var pos = 0;
      for (i3 = 0; i3 < list.length; ++i3) {
        var buf = list[i3];
        if (!internalIsBuffer2(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer3.byteLength = byteLength2;
    Buffer3.prototype._isBuffer = true;
    Buffer3.prototype.swap16 = function swap162() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 2) {
        swap2(this, i3, i3 + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap322() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 4) {
        swap2(this, i3, i3 + 3);
        swap2(this, i3 + 1, i3 + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap642() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i3 = 0; i3 < len; i3 += 8) {
        swap2(this, i3, i3 + 7);
        swap2(this, i3 + 1, i3 + 6);
        swap2(this, i3 + 2, i3 + 5);
        swap2(this, i3 + 3, i3 + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString3() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice2(this, 0, length);
      return slowToString2.apply(this, arguments);
    };
    Buffer3.prototype.equals = function equals2(b) {
      if (!internalIsBuffer2(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect2() {
      var str = "";
      var max = INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
        if (this.length > max)
          str += " ... ";
      }
      return "<Buffer " + str + ">";
    };
    Buffer3.prototype.compare = function compare4(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer2(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i3 = 0; i3 < len; ++i3) {
        if (thisCopy[i3] !== targetCopy[i3]) {
          x = thisCopy[i3];
          y = targetCopy[i3];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf2(val, byteOffset, encoding) {
      return bidirectionalIndexOf2(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf2(val, byteOffset, encoding) {
      return bidirectionalIndexOf2(this, val, byteOffset, encoding, false);
    };
    Buffer3.prototype.write = function write3(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite2(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write2(this, string, offset, length);
          case "ascii":
            return asciiWrite2(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write2(this, string, offset, length);
          case "base64":
            return base64Write2(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write2(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON2() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH2 = 4096;
    Buffer3.prototype.slice = function slice2(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer3.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer3(sliceLen, void 0);
        for (var i3 = 0; i3 < sliceLen; ++i3) {
          newBuf[i3] = this[i3 + start];
        }
      }
      return newBuf;
    };
    Buffer3.prototype.readUIntLE = function readUIntLE2(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset2(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i3 = 0;
      while (++i3 < byteLength3 && (mul *= 256)) {
        val += this[offset + i3] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUIntBE = function readUIntBE2(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        checkOffset2(offset, byteLength3, this.length);
      }
      var val = this[offset + --byteLength3];
      var mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUInt8 = function readUInt82(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUInt16LE = function readUInt16LE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUInt16BE = function readUInt16BE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUInt32LE = function readUInt32LE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUInt32BE = function readUInt32BE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readIntLE = function readIntLE2(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset2(offset, byteLength3, this.length);
      var val = this[offset];
      var mul = 1;
      var i3 = 0;
      while (++i3 < byteLength3 && (mul *= 256)) {
        val += this[offset + i3] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE2(offset, byteLength3, noAssert) {
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert)
        checkOffset2(offset, byteLength3, this.length);
      var i3 = byteLength3;
      var mul = 1;
      var val = this[offset + --i3];
      while (i3 > 0 && (mul *= 256)) {
        val += this[offset + --i3] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt82(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readFloatLE = function readFloatLE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 4, this.length);
      return read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 8, this.length);
      return read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE2(offset, noAssert) {
      if (!noAssert)
        checkOffset2(offset, 8, this.length);
      return read(this, offset, false, 52, 8);
    };
    Buffer3.prototype.writeUIntLE = function writeUIntLE2(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt2(this, value, offset, byteLength3, maxBytes, 0);
      }
      var mul = 1;
      var i3 = 0;
      this[offset] = value & 255;
      while (++i3 < byteLength3 && (mul *= 256)) {
        this[offset + i3] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUIntBE = function writeUIntBE2(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength3 = byteLength3 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt2(this, value, offset, byteLength3, maxBytes, 0);
      }
      var i3 = byteLength3 - 1;
      var mul = 1;
      this[offset + i3] = value & 255;
      while (--i3 >= 0 && (mul *= 256)) {
        this[offset + i3] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUInt8 = function writeUInt82(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 1, 255, 0);
      if (!Buffer3.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUInt16LE = function writeUInt16LE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt162(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeUInt16BE = function writeUInt16BE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt162(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeUInt32LE = function writeUInt32LE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeUInt32BE = function writeUInt32BE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeIntLE = function writeIntLE2(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i3 = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i3 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i3 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i3] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE2(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
      }
      var i3 = byteLength3 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i3] = value & 255;
      while (--i3 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i3 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i3] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeInt8 = function writeInt82(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 1, 127, -128);
      if (!Buffer3.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt162(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt162(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt322(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE2(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt2(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt322(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeFloatLE = function writeFloatLE2(value, offset, noAssert) {
      return writeFloat2(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE2(value, offset, noAssert) {
      return writeFloat2(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE2(value, offset, noAssert) {
      return writeDouble2(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE2(value, offset, noAssert) {
      return writeDouble2(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy2(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i3;
      if (this === target && start < targetStart && targetStart < end) {
        for (i3 = len - 1; i3 >= 0; --i3) {
          target[i3 + targetStart] = this[i3 + start];
        }
      } else if (len < 1e3 || !Buffer3.TYPED_ARRAY_SUPPORT) {
        for (i3 = 0; i3 < len; ++i3) {
          target[i3 + targetStart] = this[i3 + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill2(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i3;
      if (typeof val === "number") {
        for (i3 = start; i3 < end; ++i3) {
          this[i3] = val;
        }
      } else {
        var bytes = internalIsBuffer2(val) ? val : utf8ToBytes2(new Buffer3(val, encoding).toString());
        var len = bytes.length;
        for (i3 = 0; i3 < end - start; ++i3) {
          this[i3 + start] = bytes[i3 % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE2 = /[^+\/0-9A-Za-z-_]/g;
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js
function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
var buffer_list_default;
var init_buffer_list = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_buffer2();
    buffer_list_default = BufferList;
    BufferList.prototype.push = function(v2) {
      var entry = { data: v2, next: null };
      if (this.length > 0)
        this.tail.next = entry;
      else
        this.head = entry;
      this.tail = entry;
      ++this.length;
    };
    BufferList.prototype.unshift = function(v2) {
      var entry = { data: v2, next: this.head };
      if (this.length === 0)
        this.tail = entry;
      this.head = entry;
      ++this.length;
    };
    BufferList.prototype.shift = function() {
      if (this.length === 0)
        return;
      var ret = this.head.data;
      if (this.length === 1)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      --this.length;
      return ret;
    };
    BufferList.prototype.clear = function() {
      this.head = this.tail = null;
      this.length = 0;
    };
    BufferList.prototype.join = function(s3) {
      if (this.length === 0)
        return "";
      var p2 = this.head;
      var ret = "" + p2.data;
      while (p2 = p2.next) {
        ret += s3 + p2.data;
      }
      return ret;
    };
    BufferList.prototype.concat = function(n2) {
      if (this.length === 0)
        return Buffer3.alloc(0);
      if (this.length === 1)
        return this.head.data;
      var ret = Buffer3.allocUnsafe(n2 >>> 0);
      var p2 = this.head;
      var i3 = 0;
      while (p2) {
        p2.data.copy(ret, i3);
        i3 += p2.data.length;
        p2 = p2.next;
      }
      return ret;
    };
  }
});

// node-modules-polyfills:string_decoder
function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error("Unknown encoding: " + encoding);
  }
}
function StringDecoder(encoding) {
  this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
  assertEncoding(encoding);
  switch (this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case "base64":
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }
  this.charBuffer = new Buffer3(6);
  this.charReceived = 0;
  this.charLength = 0;
}
function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}
function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}
function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}
var isBufferEncoding;
var init_string_decoder = __esm({
  "node-modules-polyfills:string_decoder"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_buffer2();
    isBufferEncoding = Buffer3.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    StringDecoder.prototype.write = function(buffer) {
      var charStr = "";
      while (this.charLength) {
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;
        if (this.charReceived < this.charLength) {
          return "";
        }
        buffer = buffer.slice(available, buffer.length);
        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize;
          charStr = "";
          continue;
        }
        this.charReceived = this.charLength = 0;
        if (buffer.length === 0) {
          return charStr;
        }
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      if (this.charLength) {
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }
      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      var i3 = buffer.length >= 3 ? 3 : buffer.length;
      for (; i3 > 0; i3--) {
        var c3 = buffer[buffer.length - i3];
        if (i3 == 1 && c3 >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i3 <= 2 && c3 >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i3 <= 3 && c3 >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i3;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = "";
      if (buffer && buffer.length)
        res = this.write(buffer);
      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js
function prependListener2(emitter, event, fn) {
  if (typeof emitter.prependListener === "function") {
    return emitter.prependListener(event, fn);
  } else {
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount2(emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.buffer = new buffer_list_default();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;
  this.sync = true;
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.ranOut = false;
  this.awaitDrain = 0;
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);
  this._readableState = new ReadableState(options, this);
  this.readable = true;
  if (options && typeof options.read === "function")
    this._read = options.read;
  events_default.call(this);
}
function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit("error", er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e3 = new Error("stream.push() after EOF");
      stream.emit("error", e3);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error("stream.unshift() after end event");
      stream.emit("error", _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }
      if (!addToFront)
        state.reading = false;
      if (!skipAdd) {
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit("data", chunk);
          stream.read(0);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront)
            state.buffer.unshift(chunk);
          else
            state.buffer.push(chunk);
          if (state.needReadable)
            emitReadable(stream);
        }
      }
      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }
  return needMoreData(state);
}
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}
function computeNewHighWaterMark(n2) {
  if (n2 >= MAX_HWM) {
    n2 = MAX_HWM;
  } else {
    n2--;
    n2 |= n2 >>> 1;
    n2 |= n2 >>> 2;
    n2 |= n2 >>> 4;
    n2 |= n2 >>> 8;
    n2 |= n2 >>> 16;
    n2++;
  }
  return n2;
}
function howMuchToRead(n2, state) {
  if (n2 <= 0 || state.length === 0 && state.ended)
    return 0;
  if (state.objectMode)
    return 1;
  if (n2 !== n2) {
    if (state.flowing && state.length)
      return state.buffer.head.data.length;
    else
      return state.length;
  }
  if (n2 > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n2);
  if (n2 <= state.length)
    return n2;
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}
function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer2.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  return er;
}
function onEofChunk(stream, state) {
  if (state.ended)
    return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  emitReadable(stream);
}
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug("emitReadable", state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      nextTick2(emitReadable_, stream);
    else
      emitReadable_(stream);
  }
}
function emitReadable_(stream) {
  debug("emit readable");
  stream.emit("readable");
  flow(stream);
}
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick2(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug("maybeReadMore read 0");
    stream.read(0);
    if (len === state.length)
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}
function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug("pipeOnDrain", state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners("data").length) {
      state.flowing = true;
      flow(src);
    }
  };
}
function nReadingNextTick(self2) {
  debug("readable nexttick read 0");
  self2.read(0);
}
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick2(resume_, stream, state);
  }
}
function resume_(stream, state) {
  if (!state.reading) {
    debug("resume read 0");
    stream.read(0);
  }
  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit("resume");
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}
function flow(stream) {
  var state = stream._readableState;
  debug("flow", state.flowing);
  while (state.flowing && stream.read() !== null) {
  }
}
function fromList(n2, state) {
  if (state.length === 0)
    return null;
  var ret;
  if (state.objectMode)
    ret = state.buffer.shift();
  else if (!n2 || n2 >= state.length) {
    if (state.decoder)
      ret = state.buffer.join("");
    else if (state.buffer.length === 1)
      ret = state.buffer.head.data;
    else
      ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    ret = fromListPartial(n2, state.buffer, state.decoder);
  }
  return ret;
}
function fromListPartial(n2, list, hasStrings) {
  var ret;
  if (n2 < list.head.data.length) {
    ret = list.head.data.slice(0, n2);
    list.head.data = list.head.data.slice(n2);
  } else if (n2 === list.head.data.length) {
    ret = list.shift();
  } else {
    ret = hasStrings ? copyFromBufferString(n2, list) : copyFromBuffer(n2, list);
  }
  return ret;
}
function copyFromBufferString(n2, list) {
  var p2 = list.head;
  var c3 = 1;
  var ret = p2.data;
  n2 -= ret.length;
  while (p2 = p2.next) {
    var str = p2.data;
    var nb = n2 > str.length ? str.length : n2;
    if (nb === str.length)
      ret += str;
    else
      ret += str.slice(0, n2);
    n2 -= nb;
    if (n2 === 0) {
      if (nb === str.length) {
        ++c3;
        if (p2.next)
          list.head = p2.next;
        else
          list.head = list.tail = null;
      } else {
        list.head = p2;
        p2.data = str.slice(nb);
      }
      break;
    }
    ++c3;
  }
  list.length -= c3;
  return ret;
}
function copyFromBuffer(n2, list) {
  var ret = Buffer2.allocUnsafe(n2);
  var p2 = list.head;
  var c3 = 1;
  p2.data.copy(ret);
  n2 -= p2.data.length;
  while (p2 = p2.next) {
    var buf = p2.data;
    var nb = n2 > buf.length ? buf.length : n2;
    buf.copy(ret, ret.length - n2, 0, nb);
    n2 -= nb;
    if (n2 === 0) {
      if (nb === buf.length) {
        ++c3;
        if (p2.next)
          list.head = p2.next;
        else
          list.head = list.tail = null;
      } else {
        list.head = p2;
        p2.data = buf.slice(nb);
      }
      break;
    }
    ++c3;
  }
  list.length -= c3;
  return ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  if (state.length > 0)
    throw new Error('"endReadable()" called on non-empty stream');
  if (!state.endEmitted) {
    state.ended = true;
    nextTick2(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit("end");
  }
}
function forEach(xs, f) {
  for (var i3 = 0, l2 = xs.length; i3 < l2; i3++) {
    f(xs[i3], i3);
  }
}
function indexOf3(xs, x) {
  for (var i3 = 0, l2 = xs.length; i3 < l2; i3++) {
    if (xs[i3] === x)
      return i3;
  }
  return -1;
}
var debug, MAX_HWM;
var init_readable = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js"() {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_events();
    init_util();
    init_buffer_list();
    init_string_decoder();
    init_duplex();
    init_process2();
    Readable.ReadableState = ReadableState;
    debug = debuglog("stream");
    inherits_default(Readable, events_default);
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      if (!state.objectMode && typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
      }
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, "", true);
    };
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    MAX_HWM = 8388608;
    Readable.prototype.read = function(n2) {
      debug("read", n2);
      n2 = parseInt(n2, 10);
      var state = this._readableState;
      var nOrig = n2;
      if (n2 !== 0)
        state.emittedReadable = false;
      if (n2 === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n2 = howMuchToRead(n2, state);
      if (n2 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n2 < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n2 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n2 > 0)
        ret = fromList(n2, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = true;
        n2 = 0;
      } else {
        state.length -= n2;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n2 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    Readable.prototype._read = function(n2) {
      this.emit("error", new Error("not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== false;
      var endFn = doEnd ? onend2 : cleanup;
      if (state.endEmitted)
        nextTick2(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable) {
        debug("onunpipe");
        if (readable === src) {
          cleanup();
        }
      }
      function onend2() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend2);
        src.removeListener("end", cleanup);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      var increasedAwaitDrain = false;
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf3(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", src._readableState.awaitDrain);
            src._readableState.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (listenerCount2(dest, "error") === 0)
          dest.emit("error", er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var _i = 0; _i < len; _i++) {
          dests[_i].emit("unpipe", this);
        }
        return this;
      }
      var i3 = indexOf3(state.pipes, dest);
      if (i3 === -1)
        return this;
      state.pipes.splice(i3, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = events_default.prototype.on.call(this, ev, fn);
      if (ev === "data") {
        if (this._readableState.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            nextTick2(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      return this;
    };
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
      var self2 = this;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self2.push(chunk);
        }
        self2.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = self2.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i3 in stream) {
        if (this[i3] === void 0 && typeof stream[i3] === "function") {
          this[i3] = function(method) {
            return function() {
              return stream[method].apply(stream, arguments);
            };
          }(i3);
        }
      }
      var events = ["error", "close", "destroy", "pause", "resume"];
      forEach(events, function(ev) {
        stream.on(ev, self2.emit.bind(self2, ev));
      });
      self2._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return self2;
    };
    Readable._fromList = fromList;
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js
function nop() {
}
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}
function WritableState(options, stream) {
  Object.defineProperty(this, "buffer", {
    get: deprecate(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  });
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.needDrain = false;
  this.ending = false;
  this.ended = false;
  this.finished = false;
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.length = 0;
  this.writing = false;
  this.corked = 0;
  this.sync = true;
  this.bufferProcessing = false;
  this.onwrite = function(er) {
    onwrite(stream, er);
  };
  this.writecb = null;
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;
  this.pendingcb = 0;
  this.prefinished = false;
  this.errorEmitted = false;
  this.bufferedRequestCount = 0;
  this.corkedRequestsFree = new CorkedRequest(this);
}
function Writable(options) {
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);
  this._writableState = new WritableState(options, this);
  this.writable = true;
  if (options) {
    if (typeof options.write === "function")
      this._write = options.write;
    if (typeof options.writev === "function")
      this._writev = options.writev;
  }
  EventEmitter.call(this);
}
function writeAfterEnd(stream, cb) {
  var er = new Error("write after end");
  stream.emit("error", er);
  nextTick2(cb, er);
}
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  if (chunk === null) {
    er = new TypeError("May not write null values to stream");
  } else if (!Buffer3.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  if (er) {
    stream.emit("error", er);
    nextTick2(cb, er);
    valid = false;
  }
  return valid;
}
function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
    chunk = Buffer3.from(chunk, encoding);
  }
  return chunk;
}
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (Buffer3.isBuffer(chunk))
    encoding = "buffer";
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  if (!ret)
    state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync)
    nextTick2(cb, er);
  else
    cb(er);
  stream._writableState.errorEmitted = true;
  stream.emit("error", er);
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    var finished = needFinish(state);
    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }
    if (sync) {
      nextTick2(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit("drain");
  }
}
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    var l2 = state.bufferedRequestCount;
    var buffer = new Array(l2);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }
    doWrite(stream, state, true, state.length, buffer, "", holder.finish);
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      if (state.writing) {
        break;
      }
    }
    if (entry === null)
      state.lastBufferedRequest = null;
  }
  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit("prefinish");
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit("finish");
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      nextTick2(cb);
    else
      stream.once("finish", cb);
  }
  state.ended = true;
  stream.writable = false;
}
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function(err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
var init_writable = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_util();
    init_buffer2();
    init_events();
    init_duplex();
    init_process2();
    Writable.WritableState = WritableState;
    inherits_default(Writable, EventEmitter);
    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (Buffer3.isBuffer(chunk))
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ended)
        writeAfterEnd(this, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new TypeError("Unknown encoding: " + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js
function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false)
    this.readable = false;
  if (options && options.writable === false)
    this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;
  this.once("end", onend);
}
function onend() {
  if (this.allowHalfOpen || this._writableState.ended)
    return;
  nextTick2(onEndNT, this);
}
function onEndNT(self2) {
  self2.end();
}
var keys, method, v2;
var init_duplex = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_util();
    init_process2();
    init_readable();
    init_writable();
    inherits_default(Duplex, Readable);
    keys = Object.keys(Writable.prototype);
    for (v2 = 0; v2 < keys.length; v2++) {
      method = keys[v2];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js
function TransformState(stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };
  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}
function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (!cb)
    return stream.emit("error", new Error("no writecb in Transform class"));
  ts.writechunk = null;
  ts.writecb = null;
  if (data !== null && data !== void 0)
    stream.push(data);
  cb(er);
  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);
  Duplex.call(this, options);
  this._transformState = new TransformState(this);
  var stream = this;
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function")
      this._transform = options.transform;
    if (typeof options.flush === "function")
      this._flush = options.flush;
  }
  this.once("prefinish", function() {
    if (typeof this._flush === "function")
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}
function done(stream, er) {
  if (er)
    return stream.emit("error", er);
  var ws = stream._writableState;
  var ts = stream._transformState;
  if (ws.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (ts.transforming)
    throw new Error("Calling transform done when still transforming");
  return stream.push(null);
}
var init_transform = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_duplex();
    init_util();
    inherits_default(Transform, Duplex);
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("Not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n2) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js
function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);
  Transform.call(this, options);
}
var init_passthrough = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_transform();
    init_util();
    inherits_default(PassThrough, Transform);
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node-modules-polyfills:stream
var stream_exports = {};
__export(stream_exports, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => stream_default
});
function Stream() {
  events_default.call(this);
}
var stream_default;
var init_stream = __esm({
  "node-modules-polyfills:stream"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_events();
    init_util();
    init_duplex();
    init_readable();
    init_writable();
    init_transform();
    init_passthrough();
    inherits_default(Stream, events_default);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough;
    Stream.Stream = Stream;
    stream_default = Stream;
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend2);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend2() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (events_default.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend2);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/response.js
function IncomingMessage(xhr2, response, mode) {
  var self2 = this;
  Readable.call(self2);
  self2._mode = mode;
  self2.headers = {};
  self2.rawHeaders = [];
  self2.trailers = {};
  self2.rawTrailers = [];
  self2.on("end", function() {
    process.nextTick(function() {
      self2.emit("close");
    });
  });
  var read2;
  if (mode === "fetch") {
    self2._fetchResponse = response;
    self2.url = response.url;
    self2.statusCode = response.status;
    self2.statusMessage = response.statusText;
    for (var header, _i, _it = response.headers[Symbol.iterator](); header = (_i = _it.next()).value, !_i.done; ) {
      self2.headers[header[0].toLowerCase()] = header[1];
      self2.rawHeaders.push(header[0], header[1]);
    }
    var reader = response.body.getReader();
    read2 = function() {
      reader.read().then(function(result) {
        if (self2._destroyed)
          return;
        if (result.done) {
          self2.push(null);
          return;
        }
        self2.push(new Buffer2(result.value));
        read2();
      });
    };
    read2();
  } else {
    self2._xhr = xhr2;
    self2._pos = 0;
    self2.url = xhr2.responseURL;
    self2.statusCode = xhr2.status;
    self2.statusMessage = xhr2.statusText;
    var headers = xhr2.getAllResponseHeaders().split(/\r?\n/);
    headers.forEach(function(header2) {
      var matches = header2.match(/^([^:]+):\s*(.*)/);
      if (matches) {
        var key = matches[1].toLowerCase();
        if (key === "set-cookie") {
          if (self2.headers[key] === void 0) {
            self2.headers[key] = [];
          }
          self2.headers[key].push(matches[2]);
        } else if (self2.headers[key] !== void 0) {
          self2.headers[key] += ", " + matches[2];
        } else {
          self2.headers[key] = matches[2];
        }
        self2.rawHeaders.push(matches[1], matches[2]);
      }
    });
    self2._charset = "x-user-defined";
    if (!overrideMimeType) {
      var mimeType = self2.rawHeaders["mime-type"];
      if (mimeType) {
        var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
        if (charsetMatch) {
          self2._charset = charsetMatch[1].toLowerCase();
        }
      }
      if (!self2._charset)
        self2._charset = "utf-8";
    }
  }
}
var rStates;
var init_response = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/response.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_capability();
    init_util();
    init_stream();
    rStates = {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    };
    inherits_default(IncomingMessage, Readable);
    IncomingMessage.prototype._read = function() {
    };
    IncomingMessage.prototype._onXHRProgress = function() {
      var self2 = this;
      var xhr2 = self2._xhr;
      var response = null;
      switch (self2._mode) {
        case "text:vbarray":
          if (xhr2.readyState !== rStates.DONE)
            break;
          try {
            response = new globalThis.VBArray(xhr2.responseBody).toArray();
          } catch (e3) {
          }
          if (response !== null) {
            self2.push(new Buffer2(response));
            break;
          }
        case "text":
          try {
            response = xhr2.responseText;
          } catch (e3) {
            self2._mode = "text:vbarray";
            break;
          }
          if (response.length > self2._pos) {
            var newData = response.substr(self2._pos);
            if (self2._charset === "x-user-defined") {
              var buffer = new Buffer2(newData.length);
              for (var i3 = 0; i3 < newData.length; i3++)
                buffer[i3] = newData.charCodeAt(i3) & 255;
              self2.push(buffer);
            } else {
              self2.push(newData, self2._charset);
            }
            self2._pos = response.length;
          }
          break;
        case "arraybuffer":
          if (xhr2.readyState !== rStates.DONE || !xhr2.response)
            break;
          response = xhr2.response;
          self2.push(new Buffer2(new Uint8Array(response)));
          break;
        case "moz-chunked-arraybuffer":
          response = xhr2.response;
          if (xhr2.readyState !== rStates.LOADING || !response)
            break;
          self2.push(new Buffer2(new Uint8Array(response)));
          break;
        case "ms-stream":
          response = xhr2.response;
          if (xhr2.readyState !== rStates.LOADING)
            break;
          var reader = new globalThis.MSStreamReader();
          reader.onprogress = function() {
            if (reader.result.byteLength > self2._pos) {
              self2.push(new Buffer2(new Uint8Array(reader.result.slice(self2._pos))));
              self2._pos = reader.result.byteLength;
            }
          };
          reader.onload = function() {
            self2.push(null);
          };
          reader.readAsArrayBuffer(response);
          break;
      }
      if (self2._xhr.readyState === rStates.DONE && self2._mode !== "ms-stream") {
        self2.push(null);
      }
    };
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/to-arraybuffer.js
function to_arraybuffer_default(buf) {
  if (buf instanceof Uint8Array) {
    if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    } else if (typeof buf.buffer.slice === "function") {
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }
  if (isBuffer2(buf)) {
    var arrayCopy = new Uint8Array(buf.length);
    var len = buf.length;
    for (var i3 = 0; i3 < len; i3++) {
      arrayCopy[i3] = buf[i3];
    }
    return arrayCopy.buffer;
  } else {
    throw new Error("Argument must be a Buffer");
  }
}
var init_to_arraybuffer = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/to-arraybuffer.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_buffer2();
  }
});

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/request.js
function decideMode(preferBinary, useFetch) {
  if (hasFetch && useFetch) {
    return "fetch";
  } else if (mozchunkedarraybuffer) {
    return "moz-chunked-arraybuffer";
  } else if (msstream) {
    return "ms-stream";
  } else if (arraybuffer && preferBinary) {
    return "arraybuffer";
  } else if (vbArray && preferBinary) {
    return "text:vbarray";
  } else {
    return "text";
  }
}
function ClientRequest(opts) {
  var self2 = this;
  Writable.call(self2);
  self2._opts = opts;
  self2._body = [];
  self2._headers = {};
  if (opts.auth)
    self2.setHeader("Authorization", "Basic " + new Buffer2(opts.auth).toString("base64"));
  Object.keys(opts.headers).forEach(function(name) {
    self2.setHeader(name, opts.headers[name]);
  });
  var preferBinary;
  var useFetch = true;
  if (opts.mode === "disable-fetch") {
    useFetch = false;
    preferBinary = true;
  } else if (opts.mode === "prefer-streaming") {
    preferBinary = false;
  } else if (opts.mode === "allow-wrong-content-type") {
    preferBinary = !overrideMimeType;
  } else if (!opts.mode || opts.mode === "default" || opts.mode === "prefer-fast") {
    preferBinary = true;
  } else {
    throw new Error("Invalid value for opts.mode");
  }
  self2._mode = decideMode(preferBinary, useFetch);
  self2.on("finish", function() {
    self2._onFinish();
  });
}
function statusValid(xhr2) {
  try {
    var status = xhr2.status;
    return status !== null && status !== 0;
  } catch (e3) {
    return false;
  }
}
var request_default, unsafeHeaders;
var init_request = __esm({
  "../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/request.js"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_capability();
    init_util();
    init_response();
    init_stream();
    init_to_arraybuffer();
    request_default = ClientRequest;
    inherits_default(ClientRequest, Writable);
    unsafeHeaders = [
      "accept-charset",
      "accept-encoding",
      "access-control-request-headers",
      "access-control-request-method",
      "connection",
      "content-length",
      "cookie",
      "cookie2",
      "date",
      "dnt",
      "expect",
      "host",
      "keep-alive",
      "origin",
      "referer",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "user-agent",
      "via"
    ];
    ClientRequest.prototype.setHeader = function(name, value) {
      var self2 = this;
      var lowerName = name.toLowerCase();
      if (unsafeHeaders.indexOf(lowerName) !== -1)
        return;
      self2._headers[lowerName] = {
        name,
        value
      };
    };
    ClientRequest.prototype.getHeader = function(name) {
      var self2 = this;
      return self2._headers[name.toLowerCase()].value;
    };
    ClientRequest.prototype.removeHeader = function(name) {
      var self2 = this;
      delete self2._headers[name.toLowerCase()];
    };
    ClientRequest.prototype._onFinish = function() {
      var self2 = this;
      if (self2._destroyed)
        return;
      var opts = self2._opts;
      var headersObj = self2._headers;
      var body;
      if (opts.method === "POST" || opts.method === "PUT" || opts.method === "PATCH") {
        if (blobConstructor()) {
          body = new globalThis.Blob(self2._body.map(function(buffer) {
            return to_arraybuffer_default(buffer);
          }), {
            type: (headersObj["content-type"] || {}).value || ""
          });
        } else {
          body = Buffer2.concat(self2._body).toString();
        }
      }
      if (self2._mode === "fetch") {
        var headers = Object.keys(headersObj).map(function(name) {
          return [headersObj[name].name, headersObj[name].value];
        });
        globalThis.fetch(self2._opts.url, {
          method: self2._opts.method,
          headers,
          body,
          mode: "cors",
          credentials: opts.withCredentials ? "include" : "same-origin"
        }).then(function(response) {
          self2._fetchResponse = response;
          self2._connect();
        }, function(reason) {
          self2.emit("error", reason);
        });
      } else {
        var xhr2 = self2._xhr = new globalThis.XMLHttpRequest();
        try {
          xhr2.open(self2._opts.method, self2._opts.url, true);
        } catch (err) {
          process.nextTick(function() {
            self2.emit("error", err);
          });
          return;
        }
        if ("responseType" in xhr2)
          xhr2.responseType = self2._mode.split(":")[0];
        if ("withCredentials" in xhr2)
          xhr2.withCredentials = !!opts.withCredentials;
        if (self2._mode === "text" && "overrideMimeType" in xhr2)
          xhr2.overrideMimeType("text/plain; charset=x-user-defined");
        Object.keys(headersObj).forEach(function(name) {
          xhr2.setRequestHeader(headersObj[name].name, headersObj[name].value);
        });
        self2._response = null;
        xhr2.onreadystatechange = function() {
          switch (xhr2.readyState) {
            case rStates.LOADING:
            case rStates.DONE:
              self2._onXHRProgress();
              break;
          }
        };
        if (self2._mode === "moz-chunked-arraybuffer") {
          xhr2.onprogress = function() {
            self2._onXHRProgress();
          };
        }
        xhr2.onerror = function() {
          if (self2._destroyed)
            return;
          self2.emit("error", new Error("XHR error"));
        };
        try {
          xhr2.send(body);
        } catch (err) {
          process.nextTick(function() {
            self2.emit("error", err);
          });
          return;
        }
      }
    };
    ClientRequest.prototype._onXHRProgress = function() {
      var self2 = this;
      if (!statusValid(self2._xhr) || self2._destroyed)
        return;
      if (!self2._response)
        self2._connect();
      self2._response._onXHRProgress();
    };
    ClientRequest.prototype._connect = function() {
      var self2 = this;
      if (self2._destroyed)
        return;
      self2._response = new IncomingMessage(self2._xhr, self2._fetchResponse, self2._mode);
      self2.emit("response", self2._response);
    };
    ClientRequest.prototype._write = function(chunk, encoding, cb) {
      var self2 = this;
      self2._body.push(chunk);
      cb();
    };
    ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
      var self2 = this;
      self2._destroyed = true;
      if (self2._response)
        self2._response._destroyed = true;
      if (self2._xhr)
        self2._xhr.abort();
    };
    ClientRequest.prototype.end = function(data, encoding, cb) {
      var self2 = this;
      if (typeof data === "function") {
        cb = data;
        data = void 0;
      }
      Writable.prototype.end.call(self2, data, encoding, cb);
    };
    ClientRequest.prototype.flushHeaders = function() {
    };
    ClientRequest.prototype.setTimeout = function() {
    };
    ClientRequest.prototype.setNoDelay = function() {
    };
    ClientRequest.prototype.setSocketKeepAlive = function() {
    };
  }
});

// node-modules-polyfills:punycode
function error(type) {
  throw new RangeError(errors[type]);
}
function map(array, fn) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}
function mapDomain(string, fn) {
  var parts = string.split("@");
  var result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    string = parts[1];
  }
  string = string.replace(regexSeparators, ".");
  var labels = string.split(".");
  var encoded = map(labels, fn).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  var output = [], counter = 0, length = string.length, value, extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function digitToBasic(digit, flag) {
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}
function adapt(delta, numPoints, firstTime) {
  var k2 = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
}
function encode(input) {
  var n2, delta, handledCPCount, basicLength, bias, j, m, q, k2, t2, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
  input = ucs2decode(input);
  inputLength = input.length;
  n2 = initialN;
  delta = 0;
  bias = initialBias;
  for (j = 0; j < inputLength; ++j) {
    currentValue = input[j];
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  handledCPCount = basicLength = output.length;
  if (basicLength) {
    output.push(delimiter);
  }
  while (handledCPCount < inputLength) {
    for (m = maxInt, j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue >= n2 && currentValue < m) {
        m = currentValue;
      }
    }
    handledCPCountPlusOne = handledCPCount + 1;
    if (m - n2 > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error("overflow");
    }
    delta += (m - n2) * handledCPCountPlusOne;
    n2 = m;
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < n2 && ++delta > maxInt) {
        error("overflow");
      }
      if (currentValue == n2) {
        for (q = delta, k2 = base; ; k2 += base) {
          t2 = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
          if (q < t2) {
            break;
          }
          qMinusT = q - t2;
          baseMinusT = base - t2;
          output.push(
            stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n2;
  }
  return output.join("");
}
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
  });
}
var maxInt, base, tMin, tMax, skew, damp, initialBias, initialN, delimiter, regexNonASCII, regexSeparators, errors, baseMinusTMin, floor, stringFromCharCode;
var init_punycode = __esm({
  "node-modules-polyfills:punycode"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    maxInt = 2147483647;
    base = 36;
    tMin = 1;
    tMax = 26;
    skew = 38;
    damp = 700;
    initialBias = 72;
    initialN = 128;
    delimiter = "-";
    regexNonASCII = /[^\x20-\x7E]/;
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    baseMinusTMin = base - tMin;
    floor = Math.floor;
    stringFromCharCode = String.fromCharCode;
  }
});

// node-modules-polyfills:querystring
function hasOwnProperty2(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function stringifyPrimitive(v2) {
  switch (typeof v2) {
    case "string":
      return v2;
    case "boolean":
      return v2 ? "true" : "false";
    case "number":
      return isFinite(v2) ? v2 : "";
    default:
      return "";
  }
}
function stringify(obj, sep, eq, name) {
  sep = sep || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = void 0;
  }
  if (typeof obj === "object") {
    return map2(objectKeys(obj), function(k2) {
      var ks = encodeURIComponent(stringifyPrimitive(k2)) + eq;
      if (isArray3(obj[k2])) {
        return map2(obj[k2], function(v2) {
          return ks + encodeURIComponent(stringifyPrimitive(v2));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k2]));
      }
    }).join(sep);
  }
  if (!name)
    return "";
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
}
function map2(xs, f) {
  if (xs.map)
    return xs.map(f);
  var res = [];
  for (var i3 = 0; i3 < xs.length; i3++) {
    res.push(f(xs[i3], i3));
  }
  return res;
}
function parse(qs, sep, eq, options) {
  sep = sep || "&";
  eq = eq || "=";
  var obj = {};
  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1e3;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i3 = 0; i3 < len; ++i3) {
    var x = qs[i3].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k2, v2;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = "";
    }
    k2 = decodeURIComponent(kstr);
    v2 = decodeURIComponent(vstr);
    if (!hasOwnProperty2(obj, k2)) {
      obj[k2] = v2;
    } else if (isArray3(obj[k2])) {
      obj[k2].push(v2);
    } else {
      obj[k2] = [obj[k2], v2];
    }
  }
  return obj;
}
var isArray3, objectKeys;
var init_querystring = __esm({
  "node-modules-polyfills:querystring"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    isArray3 = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
    objectKeys = Object.keys || function(obj) {
      var res = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          res.push(key);
      }
      return res;
    };
  }
});

// node-modules-polyfills:url
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}
function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url)
    return url;
  var u2 = new Url();
  u2.parse(url, parseQueryString, slashesDenoteHost);
  return u2;
}
function parse2(self2, url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }
  var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, "/");
  url = uSplit.join(splitter);
  var rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      self2.path = rest;
      self2.href = rest;
      self2.pathname = simplePath[1];
      if (simplePath[2]) {
        self2.search = simplePath[2];
        if (parseQueryString) {
          self2.query = parse(self2.search.substr(1));
        } else {
          self2.query = self2.search.substr(1);
        }
      } else if (parseQueryString) {
        self2.search = "";
        self2.query = {};
      }
      return self2;
    }
  }
  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    self2.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      self2.slashes = true;
    }
  }
  var i3, hec, l2, p2;
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    var hostEnd = -1;
    for (i3 = 0; i3 < hostEndingChars.length; i3++) {
      hec = rest.indexOf(hostEndingChars[i3]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    var auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      self2.auth = decodeURIComponent(auth);
    }
    hostEnd = -1;
    for (i3 = 0; i3 < nonHostChars.length; i3++) {
      hec = rest.indexOf(nonHostChars[i3]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    if (hostEnd === -1)
      hostEnd = rest.length;
    self2.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    parseHost(self2);
    self2.hostname = self2.hostname || "";
    var ipv6Hostname = self2.hostname[0] === "[" && self2.hostname[self2.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      var hostparts = self2.hostname.split(/\./);
      for (i3 = 0, l2 = hostparts.length; i3 < l2; i3++) {
        var part = hostparts[i3];
        if (!part)
          continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = "";
          for (var j = 0, k2 = part.length; j < k2; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i3);
            var notHost = hostparts.slice(i3 + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = "/" + notHost.join(".") + rest;
            }
            self2.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (self2.hostname.length > hostnameMaxLen) {
      self2.hostname = "";
    } else {
      self2.hostname = self2.hostname.toLowerCase();
    }
    if (!ipv6Hostname) {
      self2.hostname = toASCII(self2.hostname);
    }
    p2 = self2.port ? ":" + self2.port : "";
    var h = self2.hostname || "";
    self2.host = h + p2;
    self2.href += self2.host;
    if (ipv6Hostname) {
      self2.hostname = self2.hostname.substr(1, self2.hostname.length - 2);
      if (rest[0] !== "/") {
        rest = "/" + rest;
      }
    }
  }
  if (!unsafeProtocol[lowerProto]) {
    for (i3 = 0, l2 = autoEscape.length; i3 < l2; i3++) {
      var ae = autoEscape[i3];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    self2.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    self2.search = rest.substr(qm);
    self2.query = rest.substr(qm + 1);
    if (parseQueryString) {
      self2.query = parse(self2.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    self2.search = "";
    self2.query = {};
  }
  if (rest)
    self2.pathname = rest;
  if (slashedProtocol[lowerProto] && self2.hostname && !self2.pathname) {
    self2.pathname = "/";
  }
  if (self2.pathname || self2.search) {
    p2 = self2.pathname || "";
    var s3 = self2.search || "";
    self2.path = p2 + s3;
  }
  self2.href = format2(self2);
  return self2;
}
function format2(self2) {
  var auth = self2.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var protocol = self2.protocol || "", pathname = self2.pathname || "", hash = self2.hash || "", host = false, query = "";
  if (self2.host) {
    host = auth + self2.host;
  } else if (self2.hostname) {
    host = auth + (self2.hostname.indexOf(":") === -1 ? self2.hostname : "[" + this.hostname + "]");
    if (self2.port) {
      host += ":" + self2.port;
    }
  }
  if (self2.query && isObject(self2.query) && Object.keys(self2.query).length) {
    query = stringify(self2.query);
  }
  var search = self2.search || query && "?" + query || "";
  if (protocol && protocol.substr(-1) !== ":")
    protocol += ":";
  if (self2.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/")
      pathname = "/" + pathname;
  } else if (!host) {
    host = "";
  }
  if (hash && hash.charAt(0) !== "#")
    hash = "#" + hash;
  if (search && search.charAt(0) !== "?")
    search = "?" + search;
  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash;
}
function parseHost(self2) {
  var host = self2.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      self2.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host)
    self2.hostname = host;
}
var protocolPattern, portPattern, simplePathPattern, delims, unwise, autoEscape, nonHostChars, hostEndingChars, hostnameMaxLen, hostnamePartPattern, hostnamePartStart, unsafeProtocol, hostlessProtocol, slashedProtocol;
var init_url = __esm({
  "node-modules-polyfills:url"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_punycode();
    init_util();
    init_querystring();
    protocolPattern = /^([a-z0-9.+-]+:)/i;
    portPattern = /:[0-9]*$/;
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    autoEscape = ["'"].concat(unwise);
    nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    hostEndingChars = ["/", "?", "#"];
    hostnameMaxLen = 255;
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    unsafeProtocol = {
      "javascript": true,
      "javascript:": true
    };
    hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    };
    slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      return parse2(this, url, parseQueryString, slashesDenoteHost);
    };
    Url.prototype.format = function() {
      return format2(this);
    };
    Url.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };
    Url.prototype.resolveObject = function(relative) {
      if (isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
      }
      var result = new Url();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
      }
      result.hash = relative.hash;
      if (relative.href === "") {
        result.href = result.format();
        return result;
      }
      if (relative.slashes && !relative.protocol) {
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== "protocol")
            result[rkey] = relative[rkey];
        }
        if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
          result.path = result.pathname = "/";
        }
        result.href = result.format();
        return result;
      }
      var relPath;
      if (relative.protocol && relative.protocol !== result.protocol) {
        if (!slashedProtocol[relative.protocol]) {
          var keys2 = Object.keys(relative);
          for (var v2 = 0; v2 < keys2.length; v2++) {
            var k2 = keys2[v2];
            result[k2] = relative[k2];
          }
          result.href = result.format();
          return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          relPath = (relative.pathname || "").split("/");
          while (relPath.length && !(relative.host = relPath.shift()))
            ;
          if (!relative.host)
            relative.host = "";
          if (!relative.hostname)
            relative.hostname = "";
          if (relPath[0] !== "")
            relPath.unshift("");
          if (relPath.length < 2)
            relPath.unshift("");
          result.pathname = relPath.join("/");
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || "";
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        if (result.pathname || result.search) {
          var p2 = result.pathname || "";
          var s3 = result.search || "";
          result.path = p2 + s3;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }
      var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
      relPath = relative.pathname && relative.pathname.split("/") || [];
      if (psychotic) {
        result.hostname = "";
        result.port = null;
        if (result.host) {
          if (srcPath[0] === "")
            srcPath[0] = result.host;
          else
            srcPath.unshift(result.host);
        }
        result.host = "";
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === "")
              relPath[0] = relative.host;
            else
              relPath.unshift(relative.host);
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
      }
      var authInHost;
      if (isRelAbs) {
        result.host = relative.host || relative.host === "" ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
      } else if (relPath.length) {
        if (!srcPath)
          srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!isNullOrUndefined(relative.search)) {
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        if (!isNull(result.pathname) || !isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.href = result.format();
        return result;
      }
      if (!srcPath.length) {
        result.pathname = null;
        if (result.search) {
          result.path = "/" + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
      var up = 0;
      for (var i3 = srcPath.length; i3 >= 0; i3--) {
        last = srcPath[i3];
        if (last === ".") {
          srcPath.splice(i3, 1);
        } else if (last === "..") {
          srcPath.splice(i3, 1);
          up++;
        } else if (up) {
          srcPath.splice(i3, 1);
          up--;
        }
      }
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift("..");
        }
      }
      if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
        srcPath.unshift("");
      }
      if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
        srcPath.push("");
      }
      var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
      if (psychotic) {
        result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
        authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      mustEndAbs = mustEndAbs || result.host && srcPath.length;
      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift("");
      }
      if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
      } else {
        result.pathname = srcPath.join("/");
      }
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };
    Url.prototype.parseHost = function() {
      return parseHost(this);
    };
  }
});

// node-modules-polyfills:http
var http_exports = {};
__export(http_exports, {
  Agent: () => Agent,
  METHODS: () => METHODS,
  STATUS_CODES: () => STATUS_CODES,
  default: () => http_default,
  get: () => get,
  request: () => request
});
function request(opts, cb) {
  if (typeof opts === "string")
    opts = urlParse(opts);
  var defaultProtocol = globalThis.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
  var protocol = opts.protocol || defaultProtocol;
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || "/";
  if (host && host.indexOf(":") !== -1)
    host = "[" + host + "]";
  opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
  opts.method = (opts.method || "GET").toUpperCase();
  opts.headers = opts.headers || {};
  var req = new request_default(opts);
  if (cb)
    req.on("response", cb);
  return req;
}
function get(opts, cb) {
  var req = request(opts, cb);
  req.end();
  return req;
}
function Agent() {
}
var METHODS, STATUS_CODES, http_default;
var init_http = __esm({
  "node-modules-polyfills:http"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_request();
    init_url();
    Agent.defaultMaxSockets = 4;
    METHODS = [
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REPORT",
      "SEARCH",
      "SUBSCRIBE",
      "TRACE",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
    STATUS_CODES = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      // RFC 2518, obsoleted by RFC 4918
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      // RFC 4918
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Moved Temporarily",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Time-out",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Large",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      // RFC 2324
      422: "Unprocessable Entity",
      // RFC 4918
      423: "Locked",
      // RFC 4918
      424: "Failed Dependency",
      // RFC 4918
      425: "Unordered Collection",
      // RFC 4918
      426: "Upgrade Required",
      // RFC 2817
      428: "Precondition Required",
      // RFC 6585
      429: "Too Many Requests",
      // RFC 6585
      431: "Request Header Fields Too Large",
      // RFC 6585
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Time-out",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      // RFC 2295
      507: "Insufficient Storage",
      // RFC 4918
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      // RFC 2774
      511: "Network Authentication Required"
      // RFC 6585
    };
    http_default = {
      request,
      get,
      Agent,
      METHODS,
      STATUS_CODES
    };
  }
});

// node-modules-polyfills-commonjs:http
var require_http = __commonJS({
  "node-modules-polyfills-commonjs:http"(exports, module) {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_http(), __toCommonJS(http_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k2 in polyfill) {
        module.exports[k2] = polyfill[k2];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node-modules-polyfills:https
var https_exports = {};
__export(https_exports, {
  Agent: () => Agent2,
  METHODS: () => METHODS2,
  STATUS_CODES: () => STATUS_CODES2,
  default: () => https_default,
  get: () => get2,
  request: () => request2
});
function request2(opts, cb) {
  if (typeof opts === "string")
    opts = urlParse(opts);
  var defaultProtocol = globalThis.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
  var protocol = opts.protocol || defaultProtocol;
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || "/";
  if (host && host.indexOf(":") !== -1)
    host = "[" + host + "]";
  opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
  opts.method = (opts.method || "GET").toUpperCase();
  opts.headers = opts.headers || {};
  var req = new request_default(opts);
  if (cb)
    req.on("response", cb);
  return req;
}
function get2(opts, cb) {
  var req = request2(opts, cb);
  req.end();
  return req;
}
function Agent2() {
}
var METHODS2, STATUS_CODES2, https_default;
var init_https = __esm({
  "node-modules-polyfills:https"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    init_request();
    init_url();
    Agent2.defaultMaxSockets = 4;
    METHODS2 = [
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REPORT",
      "SEARCH",
      "SUBSCRIBE",
      "TRACE",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
    STATUS_CODES2 = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      // RFC 2518, obsoleted by RFC 4918
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      // RFC 4918
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Moved Temporarily",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Time-out",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Large",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      // RFC 2324
      422: "Unprocessable Entity",
      // RFC 4918
      423: "Locked",
      // RFC 4918
      424: "Failed Dependency",
      // RFC 4918
      425: "Unordered Collection",
      // RFC 4918
      426: "Upgrade Required",
      // RFC 2817
      428: "Precondition Required",
      // RFC 6585
      429: "Too Many Requests",
      // RFC 6585
      431: "Request Header Fields Too Large",
      // RFC 6585
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Time-out",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      // RFC 2295
      507: "Insufficient Storage",
      // RFC 4918
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      // RFC 2774
      511: "Network Authentication Required"
      // RFC 6585
    };
    https_default = {
      request: request2,
      get: get2,
      Agent: Agent2,
      METHODS: METHODS2,
      STATUS_CODES: STATUS_CODES2
    };
  }
});

// node-modules-polyfills-commonjs:https
var require_https = __commonJS({
  "node-modules-polyfills-commonjs:https"(exports, module) {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_https(), __toCommonJS(https_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k2 in polyfill) {
        module.exports[k2] = polyfill[k2];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node_modules/axios/dist/browser/axios.cjs
var require_axios = __commonJS({
  "node_modules/axios/dist/browser/axios.cjs"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }
    var { toString: toString4 } = Object.prototype;
    var { getPrototypeOf } = Object;
    var kindOf = ((cache) => (thing) => {
      const str = toString4.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(/* @__PURE__ */ Object.create(null));
    var kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type;
    };
    var typeOfTest = (type) => (thing) => typeof thing === type;
    var { isArray: isArray4 } = Array;
    var isUndefined2 = typeOfTest("undefined");
    function isBuffer3(val) {
      return val !== null && !isUndefined2(val) && val.constructor !== null && !isUndefined2(val.constructor) && isFunction3(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      let result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    var isString2 = typeOfTest("string");
    var isFunction3 = typeOfTest("function");
    var isNumber2 = typeOfTest("number");
    var isObject2 = (thing) => thing !== null && typeof thing === "object";
    var isBoolean2 = (thing) => thing === true || thing === false;
    var isPlainObject = (val) => {
      if (kindOf(val) !== "object") {
        return false;
      }
      const prototype2 = getPrototypeOf(val);
      return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };
    var isDate2 = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    var isStream = (val) => isObject2(val) && isFunction3(val.pipe);
    var isFormData = (thing) => {
      let kind;
      return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction3(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
      kind === "object" && isFunction3(thing.toString) && thing.toString() === "[object FormData]"));
    };
    var isURLSearchParams = kindOfTest("URLSearchParams");
    var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    function forEach2(obj, fn, { allOwnKeys = false } = {}) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      let i3;
      let l2;
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray4(obj)) {
        for (i3 = 0, l2 = obj.length; i3 < l2; i3++) {
          fn.call(null, obj[i3], i3, obj);
        }
      } else {
        const keys2 = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys2.length;
        let key;
        for (i3 = 0; i3 < len; i3++) {
          key = keys2[i3];
          fn.call(null, obj[key], key, obj);
        }
      }
    }
    function findKey(obj, key) {
      key = key.toLowerCase();
      const keys2 = Object.keys(obj);
      let i3 = keys2.length;
      let _key;
      while (i3-- > 0) {
        _key = keys2[i3];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }
    var _global = (() => {
      if (typeof globalThis !== "undefined")
        return globalThis;
      return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : globalThis;
    })();
    var isContextDefined = (context) => !isUndefined2(context) && context !== _global;
    function merge() {
      const { caseless } = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray4(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };
      for (let i3 = 0, l2 = arguments.length; i3 < l2; i3++) {
        arguments[i3] && forEach2(arguments[i3], assignValue);
      }
      return result;
    }
    var extend = (a2, b, thisArg, { allOwnKeys } = {}) => {
      forEach2(b, (val, key) => {
        if (thisArg && isFunction3(val)) {
          a2[key] = bind(val, thisArg);
        } else {
          a2[key] = val;
        }
      }, { allOwnKeys });
      return a2;
    };
    var stripBOM = (content) => {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    };
    var inherits2 = (constructor, superConstructor, props, descriptors2) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, "super", {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };
    var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i3;
      let prop;
      const merged = {};
      destObj = destObj || {};
      if (sourceObj == null)
        return destObj;
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i3 = props.length;
        while (i3-- > 0) {
          prop = props[i3];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    };
    var endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
    var toArray = (thing) => {
      if (!thing)
        return null;
      if (isArray4(thing))
        return thing;
      let i3 = thing.length;
      if (!isNumber2(i3))
        return null;
      const arr = new Array(i3);
      while (i3-- > 0) {
        arr[i3] = thing[i3];
      }
      return arr;
    };
    var isTypedArray = ((TypedArray) => {
      return (thing) => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
    var forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];
      const iterator = generator.call(obj);
      let result;
      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };
    var matchAll = (regExp, str) => {
      let matches;
      const arr = [];
      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }
      return arr;
    };
    var isHTMLForm = kindOfTest("HTMLFormElement");
    var toCamelCase = (str) => {
      return str.toLowerCase().replace(
        /[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };
    var hasOwnProperty3 = (({ hasOwnProperty: hasOwnProperty4 }) => (obj, prop) => hasOwnProperty4.call(obj, prop))(Object.prototype);
    var isRegExp2 = kindOfTest("RegExp");
    var reduceDescriptors = (obj, reducer) => {
      const descriptors2 = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};
      forEach2(descriptors2, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });
      Object.defineProperties(obj, reducedDescriptors);
    };
    var freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        if (isFunction3(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
          return false;
        }
        const value = obj[name];
        if (!isFunction3(value))
          return;
        descriptor.enumerable = false;
        if ("writable" in descriptor) {
          descriptor.writable = false;
          return;
        }
        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error("Can not rewrite read-only method '" + name + "'");
          };
        }
      });
    };
    var toObjectSet = (arrayOrString, delimiter2) => {
      const obj = {};
      const define = (arr) => {
        arr.forEach((value) => {
          obj[value] = true;
        });
      };
      isArray4(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter2));
      return obj;
    };
    var noop3 = () => {
    };
    var toFiniteNumber = (value, defaultValue) => {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };
    var ALPHA = "abcdefghijklmnopqrstuvwxyz";
    var DIGIT = "0123456789";
    var ALPHABET = {
      DIGIT,
      ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };
    var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
      let str = "";
      const { length } = alphabet;
      while (size--) {
        str += alphabet[Math.random() * length | 0];
      }
      return str;
    };
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction3(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
    }
    var toJSONObject = (obj) => {
      const stack = new Array(10);
      const visit = (source, i3) => {
        if (isObject2(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }
          if (!("toJSON" in source)) {
            stack[i3] = source;
            const target = isArray4(source) ? [] : {};
            forEach2(source, (value, key) => {
              const reducedValue = visit(value, i3 + 1);
              !isUndefined2(reducedValue) && (target[key] = reducedValue);
            });
            stack[i3] = void 0;
            return target;
          }
        }
        return source;
      };
      return visit(obj, 0);
    };
    var isAsyncFn = kindOfTest("AsyncFunction");
    var isThenable = (thing) => thing && (isObject2(thing) || isFunction3(thing)) && isFunction3(thing.then) && isFunction3(thing.catch);
    var utils$1 = {
      isArray: isArray4,
      isArrayBuffer,
      isBuffer: isBuffer3,
      isFormData,
      isArrayBufferView,
      isString: isString2,
      isNumber: isNumber2,
      isBoolean: isBoolean2,
      isObject: isObject2,
      isPlainObject,
      isUndefined: isUndefined2,
      isDate: isDate2,
      isFile,
      isBlob,
      isRegExp: isRegExp2,
      isFunction: isFunction3,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach: forEach2,
      merge,
      extend,
      trim,
      stripBOM,
      inherits: inherits2,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty: hasOwnProperty3,
      hasOwnProp: hasOwnProperty3,
      // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop: noop3,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      ALPHABET,
      generateString,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable
    };
    function AxiosError(message, code, config3, request3, response) {
      Error.call(this);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack;
      }
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config3 && (this.config = config3);
      request3 && (this.request = request3);
      response && (this.response = response);
    }
    utils$1.inherits(AxiosError, Error, {
      toJSON: function toJSON3() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype$1 = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED",
      "ERR_NOT_SUPPORT",
      "ERR_INVALID_URL"
      // eslint-disable-next-line func-names
    ].forEach((code) => {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, "isAxiosError", { value: true });
    AxiosError.from = (error2, code, config3, request3, response, customProps) => {
      const axiosError = Object.create(prototype$1);
      utils$1.toFlatObject(error2, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, (prop) => {
        return prop !== "isAxiosError";
      });
      AxiosError.call(axiosError, error2.message, code, config3, request3, response);
      axiosError.cause = error2;
      axiosError.name = error2.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    var httpAdapter = null;
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }
    function removeBrackets(key) {
      return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
    }
    function renderKey(path, key, dots) {
      if (!path)
        return key;
      return path.concat(key).map(function each(token, i3) {
        token = removeBrackets(token);
        return !dots && i3 ? "[" + token + "]" : token;
      }).join(dots ? "." : "");
    }
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }
    var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });
    function toFormData(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError("target must be an object");
      }
      formData = formData || new FormData();
      options = utils$1.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        return !utils$1.isUndefined(source[option]);
      });
      const metaTokens = options.metaTokens;
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
      if (!utils$1.isFunction(visitor)) {
        throw new TypeError("visitor must be a function");
      }
      function convertValue(value) {
        if (value === null)
          return "";
        if (utils$1.isDate(value)) {
          return value.toISOString();
        }
        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError("Blob is not supported. Use a Buffer instead.");
        }
        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer2.from(value);
        }
        return value;
      }
      function defaultVisitor(value, key, path) {
        let arr = value;
        if (value && !path && typeof value === "object") {
          if (utils$1.endsWith(key, "{}")) {
            key = metaTokens ? key : key.slice(0, -2);
            value = JSON.stringify(value);
          } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
            key = removeBrackets(key);
            arr.forEach(function each(el, index) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
                convertValue(el)
              );
            });
            return false;
          }
        }
        if (isVisitable(value)) {
          return true;
        }
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
      }
      const stack = [];
      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });
      function build(value, path) {
        if (utils$1.isUndefined(value))
          return;
        if (stack.indexOf(value) !== -1) {
          throw Error("Circular reference detected in " + path.join("."));
        }
        stack.push(value);
        utils$1.forEach(value, function each(el, key) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
            formData,
            el,
            utils$1.isString(key) ? key.trim() : key,
            path,
            exposedHelpers
          );
          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });
        stack.pop();
      }
      if (!utils$1.isObject(obj)) {
        throw new TypeError("data must be an object");
      }
      build(obj);
      return formData;
    }
    function encode$1(str) {
      const charMap = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];
      params && toFormData(params, this, options);
    }
    var prototype = AxiosURLSearchParams.prototype;
    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };
    prototype.toString = function toString5(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;
      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + "=" + _encode(pair[1]);
      }, "").join("&");
    };
    function encode2(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    function buildURL(url, params, options) {
      if (!params) {
        return url;
      }
      const _encode = options && options.encode || encode2;
      const serializeFn = options && options.serialize;
      let serializedParams;
      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
      }
      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    }
    var InterceptorManager = class {
      constructor() {
        this.handlers = [];
      }
      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }
      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }
      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }
      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    };
    var InterceptorManager$1 = InterceptorManager;
    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
    var URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
    var FormData$1 = typeof FormData !== "undefined" ? FormData : null;
    var Blob$1 = typeof Blob !== "undefined" ? Blob : null;
    var platform$1 = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      protocols: ["http", "https", "file", "blob", "url", "data"]
    };
    var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
    var hasStandardBrowserEnv = ((product) => {
      return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
    })(typeof navigator !== "undefined" && navigator.product);
    var hasStandardBrowserWebWorkerEnv = (() => {
      return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
    })();
    var utils = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      hasBrowserEnv,
      hasStandardBrowserWebWorkerEnv,
      hasStandardBrowserEnv
    });
    var platform3 = {
      ...utils,
      ...platform$1
    };
    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform3.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
          if (platform3.isNode && utils$1.isBuffer(value)) {
            this.append(key, value.toString("base64"));
            return false;
          }
          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }
    function parsePropPath(name) {
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
        return match[0] === "[]" ? "" : match[1] || match[0];
      });
    }
    function arrayToObject(arr) {
      const obj = {};
      const keys2 = Object.keys(arr);
      let i3;
      const len = keys2.length;
      let key;
      for (i3 = 0; i3 < len; i3++) {
        key = keys2[i3];
        obj[key] = arr[key];
      }
      return obj;
    }
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils$1.isArray(target) ? target.length : name;
        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }
          return !isNumericKey;
        }
        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }
        const result = buildPath(path, value, target[name], index);
        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }
        return !isNumericKey;
      }
      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};
        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
      }
      return null;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e3) {
          if (e3.name !== "SyntaxError") {
            throw e3;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: ["xhr", "http"],
      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || "";
        const hasJSONContentType = contentType.indexOf("application/json") > -1;
        const isObjectPayload = utils$1.isObject(data);
        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }
        const isFormData2 = utils$1.isFormData(data);
        if (isFormData2) {
          if (!hasJSONContentType) {
            return data;
          }
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }
        if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data)) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
          return data.toString();
        }
        let isFileList2;
        if (isObjectPayload) {
          if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }
          if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
            const _FormData = this.env && this.env.FormData;
            return toFormData(
              isFileList2 ? { "files[]": data } : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }
        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType("application/json", false);
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === "json";
        if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;
          try {
            return JSON.parse(data);
          } catch (e3) {
            if (strictJSONParsing) {
              if (e3.name === "SyntaxError") {
                throw AxiosError.from(e3, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e3;
            }
          }
        }
        return data;
      }],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: platform3.classes.FormData,
        Blob: platform3.classes.Blob
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": void 0
        }
      }
    };
    utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
      defaults.headers[method] = {};
    });
    var defaults$1 = defaults;
    var ignoreDuplicateOf = utils$1.toObjectSet([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ]);
    var parseHeaders = (rawHeaders) => {
      const parsed = {};
      let key;
      let val;
      let i3;
      rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
        i3 = line.indexOf(":");
        key = line.substring(0, i3).trim().toLowerCase();
        val = line.substring(i3 + 1).trim();
        if (!key || parsed[key] && ignoreDuplicateOf[key]) {
          return;
        }
        if (key === "set-cookie") {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      });
      return parsed;
    };
    var $internals = Symbol("internals");
    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }
    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }
      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }
    function parseTokens(str) {
      const tokens = /* @__PURE__ */ Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;
      while (match = tokensRE.exec(str)) {
        tokens[match[1]] = match[2];
      }
      return tokens;
    }
    var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils$1.isFunction(filter)) {
        return filter.call(this, value, header);
      }
      if (isHeaderNameFilter) {
        value = header;
      }
      if (!utils$1.isString(value))
        return;
      if (utils$1.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }
      if (utils$1.isRegExp(filter)) {
        return filter.test(value);
      }
    }
    function formatHeader(header) {
      return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
    }
    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(" " + header);
      ["get", "set", "has"].forEach((methodName) => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }
    var AxiosHeaders = class {
      constructor(headers) {
        headers && this.set(headers);
      }
      set(header, valueOrRewrite, rewrite) {
        const self2 = this;
        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);
          if (!lHeader) {
            throw new Error("header name must be a non-empty string");
          }
          const key = utils$1.findKey(self2, lHeader);
          if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
            self2[key || _header] = normalizeValue(_value);
          }
        }
        const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }
        return this;
      }
      get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
          const key = utils$1.findKey(this, header);
          if (key) {
            const value = this[key];
            if (!parser) {
              return value;
            }
            if (parser === true) {
              return parseTokens(value);
            }
            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }
            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }
            throw new TypeError("parser must be boolean|regexp|function");
          }
        }
      }
      has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
          const key = utils$1.findKey(this, header);
          return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
      }
      delete(header, matcher) {
        const self2 = this;
        let deleted = false;
        function deleteHeader(_header) {
          _header = normalizeHeader(_header);
          if (_header) {
            const key = utils$1.findKey(self2, _header);
            if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
              delete self2[key];
              deleted = true;
            }
          }
        }
        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }
        return deleted;
      }
      clear(matcher) {
        const keys2 = Object.keys(this);
        let i3 = keys2.length;
        let deleted = false;
        while (i3--) {
          const key = keys2[i3];
          if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }
        return deleted;
      }
      normalize(format3) {
        const self2 = this;
        const headers = {};
        utils$1.forEach(this, (value, header) => {
          const key = utils$1.findKey(headers, header);
          if (key) {
            self2[key] = normalizeValue(value);
            delete self2[header];
            return;
          }
          const normalized = format3 ? formatHeader(header) : String(header).trim();
          if (normalized !== header) {
            delete self2[header];
          }
          self2[normalized] = normalizeValue(value);
          headers[normalized] = true;
        });
        return this;
      }
      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }
      toJSON(asStrings) {
        const obj = /* @__PURE__ */ Object.create(null);
        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
        });
        return obj;
      }
      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }
      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
      }
      get [Symbol.toStringTag]() {
        return "AxiosHeaders";
      }
      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }
      static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target) => computed.set(target));
        return computed;
      }
      static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
          accessors: {}
        };
        const accessors = internals.accessors;
        const prototype2 = this.prototype;
        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);
          if (!accessors[lHeader]) {
            buildAccessors(prototype2, _header);
            accessors[lHeader] = true;
          }
        }
        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
      }
    };
    AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
    utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
      let mapped = key[0].toUpperCase() + key.slice(1);
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      };
    });
    utils$1.freezeMethods(AxiosHeaders);
    var AxiosHeaders$1 = AxiosHeaders;
    function transformData(fns, response) {
      const config3 = this || defaults$1;
      const context = response || config3;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;
      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config3, data, headers.normalize(), response ? response.status : void 0);
      });
      headers.normalize();
      return data;
    }
    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }
    function CanceledError(message, config3, request3) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config3, request3);
      this.name = "CanceledError";
    }
    utils$1.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }
    var cookies = platform3.hasStandardBrowserEnv ? (
      // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain2, secure) {
          const cookie = [name + "=" + encodeURIComponent(value)];
          utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
          utils$1.isString(path) && cookie.push("path=" + path);
          utils$1.isString(domain2) && cookie.push("domain=" + domain2);
          secure === true && cookie.push("secure");
          document.cookie = cookie.join("; ");
        },
        read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      }
    ) : (
      // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {
        },
        read() {
          return null;
        },
        remove() {
        }
      }
    );
    function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }
    function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    }
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }
    var isURLSameOrigin = platform3.hasStandardBrowserEnv ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement("a");
        let originURL;
        function resolveURL(url) {
          let href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin2(requestURL) {
          const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      function nonStandardBrowserEnv() {
        return function isURLSameOrigin2() {
          return true;
        };
      }()
    );
    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    }
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;
      min = min !== void 0 ? min : 1e3;
      return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) {
          firstSampleTS = now;
        }
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i3 = tail;
        let bytesCount = 0;
        while (i3 !== head) {
          bytesCount += bytes[i3++];
          i3 = i3 % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }
        if (now - firstSampleTS < min) {
          return;
        }
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
      };
    }
    function progressEventReducer(listener, isDownloadStream) {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);
      return (e3) => {
        const loaded = e3.loaded;
        const total = e3.lengthComputable ? e3.total : void 0;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;
        bytesNotified = loaded;
        const data = {
          loaded,
          total,
          progress: total ? loaded / total : void 0,
          bytes: progressBytes,
          rate: rate ? rate : void 0,
          estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
          event: e3
        };
        data[isDownloadStream ? "download" : "upload"] = true;
        listener(data);
      };
    }
    var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
    var xhrAdapter = isXHRAdapterSupported && function(config3) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config3.data;
        const requestHeaders = AxiosHeaders$1.from(config3.headers).normalize();
        let { responseType, withXSRFToken } = config3;
        let onCanceled;
        function done2() {
          if (config3.cancelToken) {
            config3.cancelToken.unsubscribe(onCanceled);
          }
          if (config3.signal) {
            config3.signal.removeEventListener("abort", onCanceled);
          }
        }
        let contentType;
        if (utils$1.isFormData(requestData)) {
          if (platform3.hasStandardBrowserEnv || platform3.hasStandardBrowserWebWorkerEnv) {
            requestHeaders.setContentType(false);
          } else if ((contentType = requestHeaders.getContentType()) !== false) {
            const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
            requestHeaders.setContentType([type || "multipart/form-data", ...tokens].join("; "));
          }
        }
        let request3 = new XMLHttpRequest();
        if (config3.auth) {
          const username = config3.auth.username || "";
          const password = config3.auth.password ? unescape(encodeURIComponent(config3.auth.password)) : "";
          requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
        }
        const fullPath = buildFullPath(config3.baseURL, config3.url);
        request3.open(config3.method.toUpperCase(), buildURL(fullPath, config3.params, config3.paramsSerializer), true);
        request3.timeout = config3.timeout;
        function onloadend() {
          if (!request3) {
            return;
          }
          const responseHeaders = AxiosHeaders$1.from(
            "getAllResponseHeaders" in request3 && request3.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === "text" || responseType === "json" ? request3.responseText : request3.response;
          const response = {
            data: responseData,
            status: request3.status,
            statusText: request3.statusText,
            headers: responseHeaders,
            config: config3,
            request: request3
          };
          settle(function _resolve(value) {
            resolve(value);
            done2();
          }, function _reject(err) {
            reject(err);
            done2();
          }, response);
          request3 = null;
        }
        if ("onloadend" in request3) {
          request3.onloadend = onloadend;
        } else {
          request3.onreadystatechange = function handleLoad() {
            if (!request3 || request3.readyState !== 4) {
              return;
            }
            if (request3.status === 0 && !(request3.responseURL && request3.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request3.onabort = function handleAbort() {
          if (!request3) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config3, request3));
          request3 = null;
        };
        request3.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config3, request3));
          request3 = null;
        };
        request3.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = config3.timeout ? "timeout of " + config3.timeout + "ms exceeded" : "timeout exceeded";
          const transitional = config3.transitional || transitionalDefaults;
          if (config3.timeoutErrorMessage) {
            timeoutErrorMessage = config3.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config3,
            request3
          ));
          request3 = null;
        };
        if (platform3.hasStandardBrowserEnv) {
          withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config3));
          if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(fullPath)) {
            const xsrfValue = config3.xsrfHeaderName && config3.xsrfCookieName && cookies.read(config3.xsrfCookieName);
            if (xsrfValue) {
              requestHeaders.set(config3.xsrfHeaderName, xsrfValue);
            }
          }
        }
        requestData === void 0 && requestHeaders.setContentType(null);
        if ("setRequestHeader" in request3) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request3.setRequestHeader(key, val);
          });
        }
        if (!utils$1.isUndefined(config3.withCredentials)) {
          request3.withCredentials = !!config3.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request3.responseType = config3.responseType;
        }
        if (typeof config3.onDownloadProgress === "function") {
          request3.addEventListener("progress", progressEventReducer(config3.onDownloadProgress, true));
        }
        if (typeof config3.onUploadProgress === "function" && request3.upload) {
          request3.upload.addEventListener("progress", progressEventReducer(config3.onUploadProgress));
        }
        if (config3.cancelToken || config3.signal) {
          onCanceled = (cancel) => {
            if (!request3) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError(null, config3, request3) : cancel);
            request3.abort();
            request3 = null;
          };
          config3.cancelToken && config3.cancelToken.subscribe(onCanceled);
          if (config3.signal) {
            config3.signal.aborted ? onCanceled() : config3.signal.addEventListener("abort", onCanceled);
          }
        }
        const protocol = parseProtocol(fullPath);
        if (protocol && platform3.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config3));
          return;
        }
        request3.send(requestData || null);
      });
    };
    var knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };
    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, "name", { value });
        } catch (e3) {
        }
        Object.defineProperty(fn, "adapterName", { value });
      }
    });
    var renderReason = (reason) => `- ${reason}`;
    var isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
    var adapters = {
      getAdapter: (adapters2) => {
        adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
        const { length } = adapters2;
        let nameOrAdapter;
        let adapter;
        const rejectedReasons = {};
        for (let i3 = 0; i3 < length; i3++) {
          nameOrAdapter = adapters2[i3];
          let id;
          adapter = nameOrAdapter;
          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
            if (adapter === void 0) {
              throw new AxiosError(`Unknown adapter '${id}'`);
            }
          }
          if (adapter) {
            break;
          }
          rejectedReasons[id || "#" + i3] = adapter;
        }
        if (!adapter) {
          const reasons = Object.entries(rejectedReasons).map(
            ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
          );
          let s3 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
          throw new AxiosError(
            `There is no suitable adapter to dispatch the request ` + s3,
            "ERR_NOT_SUPPORT"
          );
        }
        return adapter;
      },
      adapters: knownAdapters
    };
    function throwIfCancellationRequested(config3) {
      if (config3.cancelToken) {
        config3.cancelToken.throwIfRequested();
      }
      if (config3.signal && config3.signal.aborted) {
        throw new CanceledError(null, config3);
      }
    }
    function dispatchRequest(config3) {
      throwIfCancellationRequested(config3);
      config3.headers = AxiosHeaders$1.from(config3.headers);
      config3.data = transformData.call(
        config3,
        config3.transformRequest
      );
      if (["post", "put", "patch"].indexOf(config3.method) !== -1) {
        config3.headers.setContentType("application/x-www-form-urlencoded", false);
      }
      const adapter = adapters.getAdapter(config3.adapter || defaults$1.adapter);
      return adapter(config3).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config3);
        response.data = transformData.call(
          config3,
          config3.transformResponse,
          response
        );
        response.headers = AxiosHeaders$1.from(response.headers);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config3);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config3,
              config3.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }
        return Promise.reject(reason);
      });
    }
    var headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
    function mergeConfig(config1, config22) {
      config22 = config22 || {};
      const config3 = {};
      function getMergedValue(target, source, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge.call({ caseless }, target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(a2, b, caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a2, b, caseless);
        } else if (!utils$1.isUndefined(a2)) {
          return getMergedValue(void 0, a2, caseless);
        }
      }
      function valueFromConfig2(a2, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        }
      }
      function defaultToConfig2(a2, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        } else if (!utils$1.isUndefined(a2)) {
          return getMergedValue(void 0, a2);
        }
      }
      function mergeDirectKeys(a2, b, prop) {
        if (prop in config22) {
          return getMergedValue(a2, b);
        } else if (prop in config1) {
          return getMergedValue(void 0, a2);
        }
      }
      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        withXSRFToken: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a2, b) => mergeDeepProperties(headersToObject(a2), headersToObject(b), true)
      };
      utils$1.forEach(Object.keys(Object.assign({}, config1, config22)), function computeConfigValue(prop) {
        const merge2 = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge2(config1[prop], config22[prop], prop);
        utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
      });
      return config3;
    }
    var VERSION = "1.6.2";
    var validators$1 = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i3) => {
      validators$1[type] = function validator2(thing) {
        return typeof thing === type || "a" + (i3 < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators$1.transitional = function transitional(validator2, version3, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return (value, opt, opts) => {
        if (validator2 === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version3 ? " in " + version3 : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version3 && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version3 + " and will be removed in the near future"
            )
          );
        }
        return validator2 ? validator2(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      const keys2 = Object.keys(options);
      let i3 = keys2.length;
      while (i3-- > 0) {
        const opt = keys2[i3];
        const validator2 = schema[opt];
        if (validator2) {
          const value = options[opt];
          const result = value === void 0 || validator2(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    var validator = {
      assertOptions,
      validators: validators$1
    };
    var validators = validator.validators;
    var Axios = class {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1()
        };
      }
      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      request(configOrUrl, config3) {
        if (typeof configOrUrl === "string") {
          config3 = config3 || {};
          config3.url = configOrUrl;
        } else {
          config3 = configOrUrl || {};
        }
        config3 = mergeConfig(this.defaults, config3);
        const { transitional, paramsSerializer, headers } = config3;
        if (transitional !== void 0) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }
        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config3.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }
        config3.method = (config3.method || this.defaults.method || "get").toLowerCase();
        let contextHeaders = headers && utils$1.merge(
          headers.common,
          headers[config3.method]
        );
        headers && utils$1.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (method) => {
            delete headers[method];
          }
        );
        config3.headers = AxiosHeaders$1.concat(contextHeaders, headers);
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config3) === false) {
            return;
          }
          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i3 = 0;
        let len;
        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), void 0];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;
          promise = Promise.resolve(config3);
          while (i3 < len) {
            promise = promise.then(chain[i3++], chain[i3++]);
          }
          return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config3;
        i3 = 0;
        while (i3 < len) {
          const onFulfilled = requestInterceptorChain[i3++];
          const onRejected = requestInterceptorChain[i3++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error2) {
            onRejected.call(this, error2);
            break;
          }
        }
        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error2) {
          return Promise.reject(error2);
        }
        i3 = 0;
        len = responseInterceptorChain.length;
        while (i3 < len) {
          promise = promise.then(responseInterceptorChain[i3++], responseInterceptorChain[i3++]);
        }
        return promise;
      }
      getUri(config3) {
        config3 = mergeConfig(this.defaults, config3);
        const fullPath = buildFullPath(config3.baseURL, config3.url);
        return buildURL(fullPath, config3.params, config3.paramsSerializer);
      }
    };
    utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config3) {
        return this.request(mergeConfig(config3 || {}, {
          method,
          url,
          data: (config3 || {}).data
        }));
      };
    });
    utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config3) {
          return this.request(mergeConfig(config3 || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    var Axios$1 = Axios;
    var CancelToken = class {
      constructor(executor) {
        if (typeof executor !== "function") {
          throw new TypeError("executor must be a function.");
        }
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        const token = this;
        this.promise.then((cancel) => {
          if (!token._listeners)
            return;
          let i3 = token._listeners.length;
          while (i3-- > 0) {
            token._listeners[i3](cancel);
          }
          token._listeners = null;
        });
        this.promise.then = (onfulfilled) => {
          let _resolve;
          const promise = new Promise((resolve) => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);
          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };
          return promise;
        };
        executor(function cancel(message, config3, request3) {
          if (token.reason) {
            return;
          }
          token.reason = new CanceledError(message, config3, request3);
          resolvePromise(token.reason);
        });
      }
      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }
      /**
       * Subscribe to the cancel signal
       */
      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }
        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }
      /**
       * Unsubscribe from the cancel signal
       */
      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }
      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c3) {
          cancel = c3;
        });
        return {
          token,
          cancel
        };
      }
    };
    var CancelToken$1 = CancelToken;
    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }
    function isAxiosError(payload) {
      return utils$1.isObject(payload) && payload.isAxiosError === true;
    }
    var HttpStatusCode = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511
    };
    Object.entries(HttpStatusCode).forEach(([key, value]) => {
      HttpStatusCode[value] = key;
    });
    var HttpStatusCode$1 = HttpStatusCode;
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);
      utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
      utils$1.extend(instance, context, null, { allOwnKeys: true });
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults$1);
    axios.Axios = Axios$1;
    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData;
    axios.AxiosError = AxiosError;
    axios.Cancel = axios.CanceledError;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread;
    axios.isAxiosError = isAxiosError;
    axios.mergeConfig = mergeConfig;
    axios.AxiosHeaders = AxiosHeaders$1;
    axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
    axios.getAdapter = adapters.getAdapter;
    axios.HttpStatusCode = HttpStatusCode$1;
    axios.default = axios;
    module.exports = axios;
  }
});

// node_modules/mailtrap/dist/lib/mail-buffer-encoder.js
var require_mail_buffer_encoder = __commonJS({
  "node_modules/mailtrap/dist/lib/mail-buffer-encoder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    function encodeMailBuffers(mail) {
      const preparedMail = { ...mail };
      if ("text" in preparedMail && preparedMail.text instanceof Buffer2) {
        preparedMail.text = preparedMail.text.toString();
      }
      if ("html" in preparedMail && preparedMail.html instanceof Buffer2) {
        preparedMail.html = preparedMail.html.toString();
      }
      if (preparedMail.attachments) {
        preparedMail.attachments = preparedMail.attachments.map((attachment) => {
          if (attachment.content instanceof Buffer2) {
            return {
              ...attachment,
              content: attachment.content.toString("base64")
            };
          }
          return attachment;
        });
      }
      return preparedMail;
    }
    exports.default = encodeMailBuffers;
  }
});

// node_modules/mailtrap/dist/lib/MailtrapError.js
var require_MailtrapError = __commonJS({
  "node_modules/mailtrap/dist/lib/MailtrapError.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MailtrapError = class extends Error {
    };
    exports.default = MailtrapError;
  }
});

// node_modules/mailtrap/dist/config/index.js
var require_config = __commonJS({
  "node_modules/mailtrap/dist/config/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
      ERRORS: {
        FILENAME_REQUIRED: "Filename is required.",
        CONTENT_REQUIRED: "Content is required.",
        SUBJECT_REQUIRED: "Subject is required.",
        FROM_REQUIRED: "From is required.",
        SENDING_FAILED: "Sending failed.",
        NO_DATA_ERROR: "No Data."
      },
      CLIENT_SETTINGS: {
        MAILTRAP_ENDPOINT: "https://send.api.mailtrap.io",
        USER_AGENT: "mailtrap-nodejs (https://github.com/railsware/mailtrap-nodejs)",
        MAX_REDIRECTS: 0,
        TIMEOUT: 1e4
      },
      TRANSPORT_SETTINGS: {
        NAME: "MailtrapTransport"
      }
    };
  }
});

// node_modules/mailtrap/dist/lib/mailtrap-client.js
var require_mailtrap_client = __commonJS({
  "node_modules/mailtrap/dist/lib/mailtrap-client.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m, k2);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    } : function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      o3[k22] = m[k2];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o3, v2) {
      Object.defineProperty(o3, "default", { enumerable: true, value: v2 });
    } : function(o3, v2) {
      o3["default"] = v2;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k2 in mod)
          if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2))
            __createBinding(result, mod, k2);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var http = __importStar(require_http());
    var https = __importStar(require_https());
    var axios_1 = __importDefault(require_axios());
    var mail_buffer_encoder_1 = __importDefault(require_mail_buffer_encoder());
    var MailtrapError_1 = __importDefault(require_MailtrapError());
    var config_1 = __importDefault(require_config());
    var { CLIENT_SETTINGS } = config_1.default;
    var { MAILTRAP_ENDPOINT, MAX_REDIRECTS, USER_AGENT, TIMEOUT } = CLIENT_SETTINGS;
    var MailtrapClient2 = class {
      /**
       * Initalizes axios instance with Mailtrap params.
       */
      constructor({ endpoint = MAILTRAP_ENDPOINT, token }) {
        this.axios = axios_1.default.create({
          httpAgent: new http.Agent({ keepAlive: true }),
          httpsAgent: new https.Agent({ keepAlive: true }),
          baseURL: endpoint,
          headers: {
            Authorization: `Bearer ${token}`,
            Connection: "keep-alive",
            "User-Agent": USER_AGENT
          },
          maxRedirects: MAX_REDIRECTS,
          timeout: TIMEOUT
        });
      }
      /**
       * Sends mail with given `mail` params. If there is error, rejects with `MailtrapError`.
       */
      async send(mail) {
        const preparedMail = (0, mail_buffer_encoder_1.default)(mail);
        try {
          const axiosResponse = await this.axios.post("/api/send", preparedMail);
          return axiosResponse.data;
        } catch (err) {
          if (axios_1.default.isAxiosError(err)) {
            const serverErrors = err.response?.data && typeof err.response.data === "object" && "errors" in err.response.data && err.response.data.errors instanceof Array ? err.response.data.errors : void 0;
            const message = serverErrors ? serverErrors.join(", ") : err.message;
            throw new MailtrapError_1.default(message, { cause: err });
          }
          throw err;
        }
      }
    };
    exports.default = MailtrapClient2;
  }
});

// node_modules/mailtrap/dist/adapters/attachement.js
var require_attachement = __commonJS({
  "node_modules/mailtrap/dist/adapters/attachement.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = __importDefault(require_config());
    var { ERRORS } = config_1.default;
    var { FILENAME_REQUIRED, CONTENT_REQUIRED } = ERRORS;
    function adaptAttachment(nodemailerAttachment) {
      if (!nodemailerAttachment.filename) {
        throw new Error(FILENAME_REQUIRED);
      }
      if (!nodemailerAttachment.content) {
        throw new Error(CONTENT_REQUIRED);
      }
      const content = typeof nodemailerAttachment.content === "string" || nodemailerAttachment.content instanceof Buffer2 ? nodemailerAttachment.content : nodemailerAttachment.content.read();
      return {
        filename: nodemailerAttachment.filename,
        content,
        disposition: nodemailerAttachment.contentDisposition,
        content_id: nodemailerAttachment.cid,
        type: nodemailerAttachment.contentType
      };
    }
    exports.default = adaptAttachment;
  }
});

// node-modules-polyfills:fs
var fs_exports = {};
__export(fs_exports, {
  default: () => fs_default
});
var fs_default;
var init_fs = __esm({
  "node-modules-polyfills:fs"() {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    fs_default = {};
  }
});

// node-modules-polyfills-commonjs:fs
var require_fs = __commonJS({
  "node-modules-polyfills-commonjs:fs"(exports, module) {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_fs(), __toCommonJS(fs_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k2 in polyfill) {
        module.exports[k2] = polyfill[k2];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node-modules-polyfills-commonjs:stream
var require_stream = __commonJS({
  "node-modules-polyfills-commonjs:stream"(exports, module) {
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var polyfill = (init_stream(), __toCommonJS(stream_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k2 in polyfill) {
        module.exports[k2] = polyfill[k2];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node_modules/mailtrap/dist/adapters/content.js
var require_content = __commonJS({
  "node_modules/mailtrap/dist/adapters/content.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_fs_1 = require_fs();
    var node_stream_1 = require_stream();
    function adaptContent(content) {
      if (typeof content === "string" || content instanceof Buffer2) {
        return content;
      }
      if (content instanceof node_stream_1.Readable) {
        return content.read();
      }
      if (content.content) {
        return adaptContent(content.content);
      }
      return (0, node_fs_1.readFileSync)(content.path);
    }
    exports.default = adaptContent;
  }
});

// node_modules/mailtrap/dist/adapters/headers.js
var require_headers = __commonJS({
  "node_modules/mailtrap/dist/adapters/headers.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    function adaptHeaders(nodemailerHeaders) {
      if (Array.isArray(nodemailerHeaders)) {
        return nodemailerHeaders.reduce((acc, header) => {
          acc[header.key] = header.value;
          return acc;
        }, {});
      }
      const headerKeys = Object.keys(nodemailerHeaders);
      return headerKeys.reduce((acc, key) => {
        const value = nodemailerHeaders[key];
        if (typeof value === "string") {
          acc[key] = value;
          return acc;
        }
        if (Array.isArray(value)) {
          [acc[key]] = value;
          return acc;
        }
        acc[key] = value.value;
        return acc;
      }, {});
    }
    exports.default = adaptHeaders;
  }
});

// node_modules/mailtrap/dist/adapters/recipients.js
var require_recipients = __commonJS({
  "node_modules/mailtrap/dist/adapters/recipients.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adaptSingleRecipient = void 0;
    function adaptSingleRecipient(recipient) {
      if (typeof recipient === "string") {
        return { email: recipient };
      }
      return { name: recipient.name, email: recipient.address };
    }
    exports.adaptSingleRecipient = adaptSingleRecipient;
    function adaptRecipients(recipients) {
      if (!recipients) {
        return [];
      }
      if (!Array.isArray(recipients)) {
        return [adaptSingleRecipient(recipients)];
      }
      return recipients.map(adaptSingleRecipient);
    }
    exports.default = adaptRecipients;
  }
});

// node_modules/mailtrap/dist/adapters/mail.js
var require_mail = __commonJS({
  "node_modules/mailtrap/dist/adapters/mail.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m, k2);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    } : function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      o3[k22] = m[k2];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o3, v2) {
      Object.defineProperty(o3, "default", { enumerable: true, value: v2 });
    } : function(o3, v2) {
      o3["default"] = v2;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k2 in mod)
          if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2))
            __createBinding(result, mod, k2);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var attachement_1 = __importDefault(require_attachement());
    var content_1 = __importDefault(require_content());
    var headers_1 = __importDefault(require_headers());
    var recipients_1 = __importStar(require_recipients());
    var config_1 = __importDefault(require_config());
    var { ERRORS } = config_1.default;
    var { SUBJECT_REQUIRED, FROM_REQUIRED } = ERRORS;
    function adaptMail(data) {
      if (!data.from) {
        return { success: false, errors: [FROM_REQUIRED] };
      }
      const mail = {
        from: (0, recipients_1.adaptSingleRecipient)(data.from),
        to: (0, recipients_1.default)(data.to),
        cc: (0, recipients_1.default)(data.cc),
        bcc: (0, recipients_1.default)(data.bcc)
      };
      if (data.headers) {
        mail.headers = (0, headers_1.default)(data.headers);
      }
      if (data.attachments) {
        mail.attachments = data.attachments.map(attachement_1.default);
      }
      if (data.customVariables) {
        mail.custom_variables = data.customVariables;
      }
      if (data.templateUuid) {
        return {
          ...mail,
          template_uuid: data.templateUuid,
          ...data.templateVariables && {
            template_variables: data.templateVariables
          }
        };
      }
      if (!data.subject) {
        return { success: false, errors: [SUBJECT_REQUIRED] };
      }
      const mailWithSubject = {
        ...mail,
        subject: data.subject
      };
      if (data.category) {
        mailWithSubject.category = data.category;
      }
      if (data.text || data.html) {
        return {
          ...mailWithSubject,
          ...data.text && { text: (0, content_1.default)(data.text) },
          ...data.html && { html: (0, content_1.default)(data.html) }
        };
      }
      return mailWithSubject;
    }
    exports.default = adaptMail;
  }
});

// node_modules/mailtrap/dist/lib/normalizer.js
var require_normalizer = __commonJS({
  "node_modules/mailtrap/dist/lib/normalizer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var mail_1 = __importDefault(require_mail());
    var config_1 = __importDefault(require_config());
    var { ERRORS } = config_1.default;
    var { SENDING_FAILED, NO_DATA_ERROR } = ERRORS;
    function normalizeCallback(client, callback) {
      return (err, data) => {
        if (err) {
          return callback(err, { success: false, errors: [err.message] });
        }
        if (data) {
          const mail = (0, mail_1.default)(data);
          if ("errors" in mail) {
            return callback(new Error(...mail.errors), {
              success: false,
              errors: mail.errors
            });
          }
          return client.send(mail).then((sendResponse) => callback(null, sendResponse)).catch((error2) => {
            callback(new Error(error2), {
              success: false,
              errors: [SENDING_FAILED]
            });
          });
        }
        return callback(new Error(NO_DATA_ERROR), {
          success: false,
          errors: [NO_DATA_ERROR]
        });
      };
    }
    exports.default = normalizeCallback;
  }
});

// node_modules/mailtrap/package.json
var require_package = __commonJS({
  "node_modules/mailtrap/package.json"(exports, module) {
    module.exports = {
      name: "mailtrap",
      description: "Official mailtrap.io API client",
      version: "3.2.0",
      author: "Railsware Products Studio LLC",
      dependencies: {
        axios: ">=0.27"
      },
      devDependencies: {
        "@babel/core": "^7.20.5",
        "@babel/preset-env": "^7.20.2",
        "@babel/preset-typescript": "^7.18.6",
        "@jest/globals": "^29.3.1",
        "@types/jest": "^29.5.3",
        "@types/node": "^18.15.11",
        "@types/nodemailer": "^6.4.9",
        "@typescript-eslint/eslint-plugin": "^5.57.1",
        "@typescript-eslint/parser": "^5.57.1",
        "axios-mock-adapter": "^1.21.2",
        "babel-jest": "^29.3.1",
        eslint: "^7.32.0 || ^8.2.0",
        "eslint-config-airbnb-base": "^15.0.0",
        "eslint-config-airbnb-typescript": "^17.0.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-import": "^2.25.2",
        "eslint-plugin-prettier": "^4.0.0",
        jest: "^29.3.1",
        nodemailer: "^6.9.4",
        prettier: "^2.6.2",
        "ts-node": "^10.2.1",
        typescript: "^5.0.3"
      },
      engines: {
        node: ">=16.20.1",
        yarn: ">=1.22.17"
      },
      files: [
        "dist/**/*"
      ],
      license: "MIT",
      main: "dist/index.js",
      peerDependencies: {
        nodemailer: "^6.9.4",
        "@types/nodemailer": "^6.4.9"
      },
      peerDependenciesMeta: {
        nodemailer: {
          optional: true
        },
        "@types/nodemailer": {
          optional: true
        }
      },
      repository: "https://github.com/railsware/mailtrap-nodejs",
      scripts: {
        lint: "yarn lint:eslint && yarn lint:tsc",
        "lint:eslint": "yarn run eslint . --ext .js,.ts",
        "lint:tsc": "tsc -p . --noEmit --incremental false",
        prepublish: "rm -rf dist && tsc --project tsconfig.build.json",
        test: "jest"
      },
      types: "dist/index.d.ts"
    };
  }
});

// node_modules/mailtrap/dist/lib/transport.js
var require_transport = __commonJS({
  "node_modules/mailtrap/dist/lib/transport.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var mailtrap_client_1 = __importDefault(require_mailtrap_client());
    var normalizer_1 = __importDefault(require_normalizer());
    var config_1 = __importDefault(require_config());
    var { TRANSPORT_SETTINGS } = config_1.default;
    var { NAME } = TRANSPORT_SETTINGS;
    var packageData = require_package();
    var MailtrapTransport = class {
      /**
       * Initialize transport `name`, `version` and `client`.
       */
      constructor(options) {
        this.name = NAME;
        this.version = packageData.version;
        this.client = new mailtrap_client_1.default(options);
      }
      /**
       * Send message via `Mailtrap` client.
       */
      send(nodemailerMessage, callback) {
        nodemailerMessage.normalize((0, normalizer_1.default)(this.client, callback));
      }
    };
    exports.default = (options) => new MailtrapTransport(options);
  }
});

// node_modules/mailtrap/dist/types/mailtrap.js
var require_mailtrap = __commonJS({
  "node_modules/mailtrap/dist/types/mailtrap.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/mailtrap/dist/index.js
var require_dist = __commonJS({
  "node_modules/mailtrap/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m, k2);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    } : function(o3, m, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      o3[k22] = m[k2];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p2 in m)
        if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
          __createBinding(exports2, m, p2);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MailtrapTransport = exports.MailtrapClient = void 0;
    var mailtrap_client_1 = __importDefault(require_mailtrap_client());
    exports.MailtrapClient = mailtrap_client_1.default;
    var transport_1 = __importDefault(require_transport());
    exports.MailtrapTransport = transport_1.default;
    __exportStar(require_mailtrap(), exports);
  }
});

// src/worker.ts
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@cloudflare/itty-router-openapi/dist/index.mjs
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/itty-router/index.mjs
init_modules_watch_stub();
init_process();
init_buffer();
var e = ({ base: e3 = "", routes: t2 = [] } = {}) => ({ __proto__: new Proxy({}, { get: (o3, s3, r, n2) => (o4, ...a2) => t2.push([s3.toUpperCase(), RegExp(`^${(n2 = (e3 + o4).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), a2, n2]) && r }), routes: t2, async handle(e4, ...o3) {
  let s3, r, n2 = new URL(e4.url), a2 = e4.query = { __proto__: null };
  for (let [e5, t3] of n2.searchParams)
    a2[e5] = void 0 === a2[e5] ? t3 : [a2[e5], t3].flat();
  for (let [a3, c3, l2, i3] of t2)
    if ((a3 === e4.method || "ALL" === a3) && (r = n2.pathname.match(c3))) {
      e4.params = r.groups || {}, e4.route = i3;
      for (let t3 of l2)
        if (void 0 !== (s3 = await t3(e4.proxy || e4, ...o3)))
          return s3;
    }
} });
var o = (e3 = "text/plain; charset=utf-8", t2) => (o3, s3) => {
  const { headers: r = {}, ...n2 } = s3 || {};
  return "Response" === o3?.constructor.name ? o3 : new Response(t2 ? t2(o3) : o3, { headers: { "content-type": e3, ...r }, ...n2 });
};
var s = o("application/json; charset=utf-8", JSON.stringify);
var c = o("text/plain; charset=utf-8", String);
var l = o("text/html");
var i = o("image/jpeg");
var p = o("image/png");
var d = o("image/webp");

// node_modules/@cloudflare/itty-router-openapi/dist/index.mjs
var e2 = class extends Error {
  key;
  constructor(A) {
    super(A), this.message = A;
  }
};
var t = class extends e2 {
  constructor(A) {
    super(A);
  }
};
function a(A) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="SwaggerIU"/>
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css"/>
    <link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlMb//2ux//9or///ZKz//wlv5f8JcOf/CnXv/why7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2vi/wZo3/9ytf//b7P//2uw//+BvP//DHbp/w568P8Md+//CnXv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApv4/8HbOH/lMf//3W3//9ytf//brL//w946v8SfvH/EHzw/w558P8AAAAAAAAAAAAAAAAAAAAAAAAAABF56f8Ndef/C3Dj/whs4f98u///eLn//3W3//+Evv//FoPx/xSA8f8SfvD/EHvw/wAAAAAAAAAAAAAAAA1EeF0WgOz/EXrp/w515v8LceT/lsn//3+9//97u///eLj//xaB7f8YhfL/FoLx/xSA8f8JP/deAAAAAAAAAAAgjfH/HIjw/xeB7P8Te+n/AAAAAAAAAACGwf//gr///369//+Iwf//HIny/xqH8v8YhfL/FYLx/wAAAAAnlfPlJJLy/yGO8v8cifD/GILt/wAAAAAAAAAAmMz//4nD//+Fwf//gb///xyJ8P8ejPP/HIny/xmH8v8XhPLnK5r0/yiW8/8lk/P/IpDy/wAAAAAAAAAAAAAAAAAAAACPx///jMX//4jD//+MxP//IpD0/yCO8/8di/P/G4ny/y6e9f8sm/T/KZj0/yaV8/8AAAAAAAAAAAAAAAAAAAAAlsz//5LJ//+Px///lMn//yaV9P8kkvT/IZD0/x+O8/8yo/blMKD1/y2d9f8qmfT/KJbz/wAAAAAAAAAAqdb//53Q//+Zzv//lsv//yiY8/8qmvX/KJf1/yWV9P8jkvTQAAAAADSl9v8xofX/Lp71/yyb9P8AAAAAAAAAAKfW//+k1P//oNL//6rW//8wofb/Lp72/yuc9f8pmfX/AAAAAAAAAAAcVHtcNab2/zKj9v8voPX/LZz0/7vh//+u2///qtj//6fW//8wofT/NKX3/zKj9/8voPb/F8/6XgAAAAAAAAAAAAAAADmr9/82qPf/M6T2/zCg9f+44f//td///7Hd//++4v//Oqz4/ziq+P81p/f/M6X3/wAAAAAAAAAAAAAAAAAAAAAAAAAAOqz4/zep9//M6///v+X//7vj//+44f//OKn1/z6x+f88rvn/Oaz4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6x+f8qmfP/yOv//8bq///C5///z+z//0O3+v9Ctfr/QLP5/z2x+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0u///8jr///I6///yOv//zmq9f9Dt/r/Q7f6/0O3+v8AAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADgBwAAwAMAAMADAACGAQAABgAAAA8AAAAPAAAABgAAAIYBAADAAwAAwAMAAOAHAADgBwAA8A8AAA==" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin><\/script>
<script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js" crossorigin><\/script>
<script>
    window.onload = () => {
        window.ui = SwaggerUIBundle({
            url: '${A = A.replace(/\/+(\/|$)/g, "$1")}',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis
            ]
        });
    };
<\/script>
</body>
</html>`;
}
function s2(A) {
  return `<!DOCTYPE html>
    <html>
    <head>
    <title>ReDocUI</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlMb//2ux//9or///ZKz//wlv5f8JcOf/CnXv/why7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2vi/wZo3/9ytf//b7P//2uw//+BvP//DHbp/w568P8Md+//CnXv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApv4/8HbOH/lMf//3W3//9ytf//brL//w946v8SfvH/EHzw/w558P8AAAAAAAAAAAAAAAAAAAAAAAAAABF56f8Ndef/C3Dj/whs4f98u///eLn//3W3//+Evv//FoPx/xSA8f8SfvD/EHvw/wAAAAAAAAAAAAAAAA1EeF0WgOz/EXrp/w515v8LceT/lsn//3+9//97u///eLj//xaB7f8YhfL/FoLx/xSA8f8JP/deAAAAAAAAAAAgjfH/HIjw/xeB7P8Te+n/AAAAAAAAAACGwf//gr///369//+Iwf//HIny/xqH8v8YhfL/FYLx/wAAAAAnlfPlJJLy/yGO8v8cifD/GILt/wAAAAAAAAAAmMz//4nD//+Fwf//gb///xyJ8P8ejPP/HIny/xmH8v8XhPLnK5r0/yiW8/8lk/P/IpDy/wAAAAAAAAAAAAAAAAAAAACPx///jMX//4jD//+MxP//IpD0/yCO8/8di/P/G4ny/y6e9f8sm/T/KZj0/yaV8/8AAAAAAAAAAAAAAAAAAAAAlsz//5LJ//+Px///lMn//yaV9P8kkvT/IZD0/x+O8/8yo/blMKD1/y2d9f8qmfT/KJbz/wAAAAAAAAAAqdb//53Q//+Zzv//lsv//yiY8/8qmvX/KJf1/yWV9P8jkvTQAAAAADSl9v8xofX/Lp71/yyb9P8AAAAAAAAAAKfW//+k1P//oNL//6rW//8wofb/Lp72/yuc9f8pmfX/AAAAAAAAAAAcVHtcNab2/zKj9v8voPX/LZz0/7vh//+u2///qtj//6fW//8wofT/NKX3/zKj9/8voPb/F8/6XgAAAAAAAAAAAAAAADmr9/82qPf/M6T2/zCg9f+44f//td///7Hd//++4v//Oqz4/ziq+P81p/f/M6X3/wAAAAAAAAAAAAAAAAAAAAAAAAAAOqz4/zep9//M6///v+X//7vj//+44f//OKn1/z6x+f88rvn/Oaz4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6x+f8qmfP/yOv//8bq///C5///z+z//0O3+v9Ctfr/QLP5/z2x+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0u///8jr///I6///yOv//zmq9f9Dt/r/Q7f6/0O3+v8AAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADgBwAAwAMAAMADAACGAQAABgAAAA8AAAAPAAAABgAAAIYBAADAAwAAwAMAAOAHAADgBwAA8A8AAA==" />

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    </head>
    <body>
    <redoc spec-url="${A = A.replace(/\/+(\/|$)/g, "$1")}"></redoc>
    <script src="https://unpkg.com/redoc@2.0.0-rc.58/bundles/redoc.standalone.js"> <\/script>
    </body>
    </html>`;
}
var n = class {
  isParameter = true;
  type = "string";
  params;
  generated;
  constructor(A) {
    this.params = A || {}, this.generated = true, void 0 === this.params.required && (this.params.required = true);
  }
  getValue() {
    const A = { type: this.type, description: this.params.description, example: this.params.example, default: this.params.default };
    return this.params.deprecated && (A.deprecated = this.params.deprecated), A;
  }
  validate(A) {
    return A;
  }
};
__publicField(n, "isParameter", true);
var i2 = class extends n {
  isArr = true;
  innerType;
  constructor(A, e3) {
    super(e3), this.innerType = A;
  }
  validate(A) {
    return A = super.validate(A), false !== this.params.required || null !== A && "" !== A ? A = Array.isArray(A) ? A.map((A2) => this.innerType.validate(A2)) : [this.innerType.validate(A)] : null;
  }
  getValue() {
    return { type: "array", items: this.innerType.getValue(), description: this.params.description, example: this.params.example, default: this.params.default };
  }
};
var o2 = class extends n {
  isObj = true;
  fields;
  constructor(A, e3) {
    super(e3), this.fields = A;
  }
  validate(A) {
    A = super.validate(A);
    for (const [e3, r] of Object.entries(this.fields))
      try {
        if (void 0 === A[e3] || null === A[e3]) {
          if (r.params.required)
            throw new t("is required");
        } else
          A[e3] = r.validate(A[e3]);
      } catch (A2) {
        throw A2.key = (A2.key || "") + `.${e3}`, A2;
      }
    return A;
  }
  getValue() {
    const A = { type: "object", properties: {} }, e3 = [];
    for (const [t2, r] of Object.entries(this.fields))
      true === r.params?.required && e3.push(t2), r.getValue ? A.properties[t2] = r.getValue() : A.properties[t2] = r;
    return e3.length > 0 && (A.required = e3), this.params.xml && (A.xml = this.params.xml), A;
  }
};
var d2 = class extends n {
  type = "number";
  validate(A) {
    if (A = super.validate(A), A = Number.parseFloat(A), isNaN(A))
      throw new t("is not a valid number");
    return A;
  }
};
var c2 = class extends n {
  type = "string";
  constructor(A) {
    super(A);
  }
  validate(A) {
    if ("string" != typeof (A = super.validate(A)) && (A = A.toString()), this.params.format) {
      if ("date-time" === this.params.format) {
        if (A = new Date(A), isNaN(A.getDay()))
          throw new t("is not a valid date time");
      } else if ("date" === this.params.format) {
        if (!A.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))
          throw new t("is not a valid date");
        if (A = new Date(A), isNaN(A.getDay()))
          throw new t("is not a valid date");
      }
    }
    return A;
  }
  getValue() {
    return { ...super.getValue(), format: this.params.format };
  }
};
var u = class extends c2 {
  type = "string";
  constructor(A) {
    super({ example: "2022-09-15T00:00:00Z", ...A, format: "date-time" });
  }
};
var v = class extends c2 {
  type = "boolean";
  validValues = ["true", "false"];
  validate(A) {
    if (A = (A = super.validate(A)).toLowerCase(), !this.validValues.includes(A))
      throw new t("is not a valid boolean, allowed values are true or false");
    return A = "true" === A;
  }
};
var P = class {
  location;
  rawType;
  type;
  params;
  constructor(A, e3, t2) {
    this.location = A, this.rawType = e3, void 0 === t2.required && (t2.required = true), this.params = t2, this.type = this.getType(e3, t2);
  }
  getType(A, e3) {
    if (true === A.generated)
      return A;
    if (true === A.isParameter)
      return new A({ ...e3 });
    if (A === String)
      return new c2({ ...e3 });
    if ("string" == typeof A)
      return new c2({ example: A });
    if (A === Number)
      return new d2({ ...e3 });
    if ("number" == typeof A)
      return new d2({ example: A });
    if (A === Boolean)
      return new v({ ...e3 });
    if ("boolean" == typeof A)
      return new v({ example: A });
    if (A === Date)
      return new u();
    if (Array.isArray(A)) {
      if (0 === A.length)
        throw new Error("Arr must have a type");
      return new i2(this.getType(A[0], e3), { ...e3 });
    }
    if ("object" == typeof A) {
      const t2 = {};
      for (const [e4, r] of Object.entries(A))
        t2[e4] = this.getType(r, {});
      return new o2(t2, e3);
    }
    throw new Error(`${A} not implemented`);
  }
  getValue() {
    const A = k(this.type.getValue());
    return { description: this.params.description, required: this.params.required, schema: A, name: this.params.name, in: this.location };
  }
  validate(A) {
    if (null == A) {
      if (void 0 === this.params.default || null === this.params.default) {
        if (this.params.required)
          throw new t("is required");
        return null;
      }
      A = this.params.default;
    }
    return A = this.type.validate(A);
  }
};
function z(A, e3 = {}) {
  return new P("path", A, e3);
}
function k(A) {
  for (const [e3, t2] of Object.entries(A))
    "object" != typeof t2 || Array.isArray(t2) || (A[e3] = k(t2)), void 0 === t2 && delete A[e3];
  return A;
}
function I(A) {
  const e3 = [], t2 = Array.isArray(A);
  for (const [r, a2] of Object.entries(A || {})) {
    if (t2 && !a2.params.name)
      throw new Error("Parameter must have a defined name when using as Array");
    const A2 = a2.params.name ? a2.params.name : r;
    e3.push({ ...a2.getValue(), name: A2 });
  }
  return e3;
}
var B;
var L;
var S;
function V(e3) {
  const t2 = {}, r = e({ base: e3?.base, routes: e3?.routes }), n2 = { openapi: "3.0.2", info: { title: e3?.schema?.info?.title || "OpenAPI", version: e3?.schema?.info?.version || "1.0" }, raiseUnknownParameters: e3?.raiseUnknownParameters, ...e3?.schema }, i3 = { ...n2, paths: t2 };
  delete i3.raiseUnknownParameters;
  const o3 = new Proxy(r, { get: (A, a2, s3) => "original" === a2 ? r : "schema" === a2 ? i3 : (r2, ...i4) => {
    if ("handle" !== a2) {
      if (1 === i4.length && void 0 !== i4[0].schema?.paths) {
        const A2 = i4[0];
        for (const [e4, r3] of Object.entries(A2.schema.paths))
          t2[e4] = r3;
      } else if ("all" !== a2) {
        const A2 = (e3?.base || "") + r2.replace(/\/+(\/|$)/g, "$1").replace(/:(\w+)/g, "{$1}");
        let s4, n3;
        for (const A3 of i4)
          if (A3.name && (n3 = `${a2.toString()}_${A3.name}`), A3.getParsedSchema) {
            s4 = A3.getParsedSchema();
            break;
          }
        if (void 0 === t2[A2] && (t2[A2] = {}), void 0 === n3 && (n3 = `${a2.toString()}_${r2.replaceAll("/", "_")}`), void 0 === s4) {
          const A3 = r2.match(/:(\w+)/g);
          s4 = { operationId: n3, parameters: A3 ? I(A3.map((A4) => z(String, { name: A4.replace(":", "") }))) : [], responses: { 200: { description: "Successfully Response" } } };
        } else if (!s4.operationId) {
          if (false === e3?.generateOperationIds && !s4.operationId)
            throw new Error(`Route ${r2} don't have operationId set!`);
          s4.operationId = n3;
        }
        t2[A2][a2.toString()] = s4;
      }
    }
    return Reflect.get(A, a2, s3)(r2, ...i4.map((A2) => void 0 !== A2.schema?.paths ? A2.handle : A2.isRoute ? (...e4) => new A2({ raiseUnknownParameters: n2.raiseUnknownParameters }).execute(...e4) : A2));
  } });
  return void 0 !== n2 && (null !== e3?.docs_url && null !== e3?.openapi_url && r.get(e3?.docs_url || "/docs", () => new Response(a((e3?.base || "") + (e3?.openapi_url || "/openapi.json")), { headers: { "content-type": "text/html; charset=UTF-8" }, status: 200 })), null !== e3?.redoc_url && null !== e3?.openapi_url && r.get(e3?.redoc_url || "/redocs", () => new Response(s2((e3?.base || "") + (e3?.openapi_url || "/openapi.json")), { headers: { "content-type": "text/html; charset=UTF-8" }, status: 200 })), null !== e3?.openapi_url && r.get(e3?.openapi_url || "/openapi.json", () => new Response(JSON.stringify(i3), { headers: { "content-type": "application/json;charset=UTF-8" }, status: 200 })), e3?.aiPlugin && null !== e3?.openapi_url && r.get("/.well-known/ai-plugin.json", (A) => {
    const t3 = { type: S.OPENAPI, has_user_authentication: false, url: e3?.openapi_url || "/openapi.json", ...e3?.aiPlugin?.api };
    return t3.url.startsWith("http") || (t3.url = `https://${A.headers.get("host")}${t3.url}`), new Response(JSON.stringify({ schema_version: B.V1, auth: { type: L.NONE }, ...e3?.aiPlugin, api: t3 }), { headers: { "content-type": "application/json;charset=UTF-8" }, status: 200 });
  })), o3;
}
!function(A) {
  A.V1 = "v1";
}(B || (B = {})), function(A) {
  A.NONE = "none", A.OAUTH = "oauth", A.SERVICE_HTTP = "service_http", A.USER_HTTP = "user_http";
}(L || (L = {})), function(A) {
  A.OPENAPI = "openapi";
}(S || (S = {}));

// src/users.ts
init_modules_watch_stub();
init_process();
init_buffer();
async function handleGetUsers(request3, env3, context, data) {
  try {
    const value = await env3.userskv.get("test");
    return new Response(JSON.stringify({ users: value }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error2) {
    console.error("Error:", error2);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function handlePostUsers(request3, env3, context, data) {
  try {
    const currentValue = await env3.userskv.get("users");
    const requestBody = await request3.json();
    const existingData = currentValue ? JSON.parse(currentValue).users : [];
    const newUser = {
      "name": requestBody.name,
      "role": requestBody.role,
      "email": requestBody.email
    };
    existingData.push(newUser);
    await env3.userskv.put("users", JSON.stringify({ users: existingData }));
    return new Response(JSON.stringify({ users: existingData }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error2) {
    console.error("Error:", error2);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// src/createSurvey.ts
init_modules_watch_stub();
init_process();
init_buffer();
async function handlePostSurvey(request3, env3, context, data) {
  try {
    const requestBody = await request3.json();
    console.log("reqqqq", requestBody);
    const currentSurveysValue = await env3.userskv.get("surveys");
    const existingSurveysData = currentSurveysValue ? JSON.parse(currentSurveysValue) : [];
    existingSurveysData.push(requestBody);
    await env3.userskv.put("surveys", JSON.stringify(existingSurveysData));
    return new Response(JSON.stringify({ surveys: existingSurveysData }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error2) {
    console.error("Error:", error2);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// src/sendMail.ts
init_modules_watch_stub();
init_process();
init_buffer();
var import_mailtrap = __toESM(require_dist());
async function sendMailFun(request3) {
  try {
    const data = await request3.json();
    const TOKEN = "BF7B9D7A37A848E05981F7915B331EE27D865AED322DB39CBC3FC7E021394CD3F4D9B1E2901AB0546E20245A2C86F17A";
    const SENDER_EMAIL = "waeltn7@gmail.com";
    const RECIPIENT_EMAIL = "waeltn7@gmail.com";
    const client = new import_mailtrap.MailtrapClient({ token: TOKEN });
    const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };
    await client.send({
      from: sender,
      to: [{ email: RECIPIENT_EMAIL }],
      subject: data.subject || "Hello from Mailtrap!",
      text: data.message || "Welcome to Mailtrap Sending!"
    });
    return new Response("Email sent successfully!", { status: 200 });
  } catch (error2) {
    console.error(error2);
    return new Response("Failed to send email. Internal Server Error", { status: 500 });
  }
}

// src/worker.ts
var router = V();
router.get("/getUsers", handleGetUsers);
router.post("/postUsers", handlePostUsers);
router.post("/createSurvey", handlePostSurvey);
router.post("/sendMail", sendMailFun);
var worker_default = {
  fetch: router.handle
};
export {
  worker_default as default
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*! https://mths.be/punycode v1.4.1 by @mathias */
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=worker.js.map
