
exports.hasEmoji = function(str){
  return (/[\uD800-\uDFFF]/).test(str);
};

exports.emojiUtf8Buffer = function(str) {
    var buf, bufPos, c, i, len, _ref;
    len = str.length * 6;
    buf = new Buffer(len);
    bufPos = 0;
    for (i = 0, _ref = str.length; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      c = str.charCodeAt(i);
      if (c < 0x80) {
        buf[bufPos++] = c & 0x7F | 0x00;
      } else if (c < 0x0800) {
        buf[bufPos++] = c >> 6 & 0x1F | 0xC0;
        buf[bufPos++] = c >> 0 & 0x3F | 0x80;
      } else if ((0xD800 <= c && c < 0xE000)) {

        var emojiStr = c.toString(16).toUpperCase();
        buf[bufPos++] = "\\".charCodeAt(0);
        buf[bufPos++] = "u".charCodeAt(0);
        for(var j=0;j<emojiStr.length;j++){
          buf[bufPos++] = emojiStr.charCodeAt(j);
        }

        /*
        buf[bufPos++] = c >> 8 & 0xFF;
        buf[bufPos++] = c & 0xFF;
        */
      } else if (c < 0x010000) {
        buf[bufPos++] = c >> 12 & 0x0F | 0xE0;
        buf[bufPos++] = c >> 6 & 0x3F | 0x80;
        buf[bufPos++] = c >> 0 & 0x3F | 0x80;
      } else if (c < 0x110000) {
        buf[bufPos++] = c >> 18 & 0x07 | 0xF0;
        buf[bufPos++] = c >> 12 & 0x3F | 0x80;
        buf[bufPos++] = c >> 6 & 0x3F | 0x80;
        buf[bufPos++] = c >> 0 & 0x3F | 0x80;
      }
    }
    return buf.slice(0, bufPos);
};
