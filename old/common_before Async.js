//var paths = ['http://oda.lingnet.org/','http://oda2.lingnet.org/','http://localhost/oda3/','http://localhost/oda/','http://glossDev.lingnet.org/demo/','']
//var myPath    = paths[1]
//changed to make the site dynamic not dependant on hard coded url
//~botros 10-26-2011
var myPath    = location.protocol + '\/\/' + location.hostname + '\/'
var baseUrl = myPath + 'wss\/service.asmx\/'
var glang = '' 
var gmod = ''
var guid = 0
var glname= ''
var gfname = ''
var SITENUMBER = location.hostname.toLowerCase().indexOf("oda2") > 0 ? 'oda2_' : 'oda_'
var rtlLangs = ['arabic', 'farsi', 'levantine', 'iraqi', 'dari', 'pashto', 'urdu', 'balochi']

function isIn(x, y) {
  var yn = false
  var n = y.length
  for (var i = 0; i < n; i++)
    if (x == y[i]) {
      yn = true
      break
    }
  return yn
}

//==>
//change when installed
SITENUMBER = 'oda2_'
//for older browser JSON object
var JSON; if (!JSON) { JSON = {} } (function () { function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } } ());

String.prototype.L_Trim      = new Function( "return this.replace(/^\\s+/,'')"   )
String.prototype.R_Trim      = new Function( "return this.replace(/\\s+$/,'')"   )
String.prototype.Trim        = new Function( "return this.L_Trim().R_Trim()"     )
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
  {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv;
  }
function isIEnbeforeNine() 
  {
    var ver = getInternetExplorerVersion()
    var R = false

    if (ver > -1) 
      {
      if (ver < 9.0)
        R = true
      }
    return R
  }


function xid( a )
  {
  return document.getElementById( a )
  }

function gid( wh, tp, id )
  {
  var ob = null
  var cn = wh.getElementsByTagName( tp )
  for(var w=0, q=cn.length; w<q; w++)
    if( cn[w].id == id )
      ob = cn[w]
  return ob
  }

function classify( node, tag_name, a )
  {
  var R = []
  var K = node.getElementsByTagName(tag_name)
  var L = K.length
  for (var i=0; i<L; i++)
    if (K[i].className == a)
      R.push(K[i])
  return R
  }

function IHTML( A, B )
  {
  A.innerHTML = B
  }

function spf( s, t )
  {
  var n=0
  function F()
    {
    return t[n++]
    }
  return s.replace(/~/g, F)
  }

function program_abort()
  {
  var msg = ''
  for (var i=0, len=arguments.length; i<len; i++)
    msg += arguments[i]
  window.onerror = null
  window.close()
  }

  // Check if string is a whole number(digits only).
function isWholeNumbers(s) 
  {
  var isWhole_re = /^\s*\d+\s*$/
  return String(s).search(isWhole_re) != -1
  } //isWholeNumbers

function extract( a, S1, S2 )
  {
  a = a.substr(a.indexOf(S1)+S1.length)
  a = a.substr(0, a.lastIndexOf(S2))
  return a
  }

function extract_CDATA( a )
  {
  return extract( a,  '<![CDATA[', ']]>' )
  }

function extract_BODY( a )
  {
  return extract( a, '<body>', '<\/body>' )
  }

function XML_HTTP_class()
  {
  var ns = !document.all
  var ax = null
  function preventCache(url, s) 
    {
    var R = s
    if (url.indexOf('.asp') > -1) 
      {
      var dum = 'dummy=' + (new Date()).getTime() + '&'
      if (R.indexOf('.aspx?') > -1) 
       {
        R = R.replace('.aspx?', '.aspx?' + dum)
        }
      else if (R.indexOf('.asp?') > -1) 
        {
        R = R.replace('.asp?', '.asp?' + dum)
        }
      else 
        {
        R = dum + R
        }
    }

    return R
    }
  //do_init()
  function do_init()
    {
    function err(e)
      {
      program_abort( 'foundation_download_class:  Cannot create XMLHTTP: ', e )
      }
    if (ns)
      try
        {
        ax = new XMLHttpRequest()
        }
      catch (e)
        {
        err( e )
        }
    else if (window.ActiveXObject)
      try
        {
        ax = new ActiveXObject( 'Microsoft.XMLHTTP' )
        }
      catch(e)
        {
        err( e )
        }
    else
      program_abort( 'Your browser does not support XMLHTTP' )
    }
  this.get_responseText = function()
    {
    return ax.responseText
    }
  this.get_response = function()
    {
    return ax.response
    }
  this.get_responseXML =  function()
    {
    return ax.responseXML
    }
  this.XML_HTTP_GET = function( url )
    {
    var newURL = preventCache(url, url)
    //alert(newURL)
    ax.open( 'get', newURL, false )
    if (ns)
      {
      ax.send(null)
      }
    else
      {
	try {
	    ax.send()
	    }
	catch(e)
	{
	alert(e)
	}
      }
    }
  this.post_form = function ( url, sss )
    {
    var newSSS = preventCache(url, sss)
    //alert(newSSS)
    ax.open( 'post', url, false )
    ax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
    ax.send( newSSS )
    }
  this.post_XML = function( url, sss )
    {

    ax.open( 'post', url, false )
    ax.setRequestHeader( 'Content-Type', 'text/xml' )
    ax.send( sss )
    }
  do_init()
  }//XML_HTTP_class

function foundation_gif_btn_class( the_id )
  {
  var _this = this
  var e = xid(the_id)
  if (e)
    {
    var a = e.src+''
    var b = a.substr(0, a.length-4) + '_on.gif'
    if (document.images)
      new Image().src = b
    e.onclick = function()
      {
      _this.do_click()
      }
    e.onmouseover = function()
      {
      this.src= b
      }
    e.onmouseout = function()
      {
      this.src= a
      }
    this.do_click = function()
      {
      }
    }
  }

function CGI_input_class()
  {
  this._parse = function()
    {
    var s =  decodeURI(document.location + '')
    var n = s.indexOf('?')
    if (n > 0)
      {
      s = s.substr(n+1)
      var a = s.split('&')
      for (var i in a)
        {
        try
          {
          a[i] = a[i].split('=')
          }
        catch(e)
          {
          alert( a + "\n\n" + a[i] )
          }
        }
      for (var i in a)
        this[a[i][0]] = decodeURIComponent(a[i][1].replace(/\+/g,' '))
      }
    }
  this._parse()
  }//CGI_input_class

function CGI_output_class(sType)
  {
  var d, r
  this.store = function(name, val)
    {
    r += d + name + '=' + val //encodeURIComponent(val)
    d = '&'
    }
  this.get = function()
    {
    return r
    }
  this.init = function()
    {
    d = sType ? '' : '?'
    r = ''
    }
  this.init()
  }

function hat_class()
  {
  this.inhat  = function(n)
    {
    return this.ff[n]
    }
  this.remove = function(n)
    {
    if (this.ff[n])
      {
      this.ff[n] = false
      this.count--
      }
    }
  this.fill   = function(n)
    {
    this.ff = []
    for (var i=0; i < n; i++)
      this.ff[i] = true
    this.count = n
    }
  this.get = function()
    {
    var k, r
    r = this.count
    if (r > 0)
      {
      x = Math.ceil(Math.random()*r)
      r = k = 0
      do
        if (this.ff[r++])
          k++
      while (k < x)
        this.ff[r-1] = false
      this.count--
      }
    return r - 1
    }
  }

function doFontSize( n )
  {
  function goGray()
    {
    var e = xid( 'id_btn_txt' + n )
    e.src = "images/navigation/a_" + n + "_on.gif"
    e.onmouseover = e.onmouseout = e.onclick = null
    }
  var RTL = isIn(lang.toLowerCase(), rtlLangs) //'|persian|arabic|hebrew|'.indexOf('|'+lang.toLowerCase()+'|') >= 0
  var rats = RTL ? {'s':90,'m':110,'l':130} : {'s':80,'m':100,'l':120}
  var BXS =  RTL ? [ 'css_TextBoxRTL', 'css_TextBoxRTL_r_dir' ] : [ 'css_TextBoxLTR', 'css_TextBoxLTR_r_dir' ]
  for(var g=0, h=BXS.length; g<h; g++)
    {     
    var ZZ = classify( document, 'div', BXS[g] )
    for(var i=0; i<ZZ.length; i++ )
      ZZ[i].style.fontSize = rats[n] + "%"
    for (var i in rats)
      {
      var a = xid('id_btn_txt' + i)
      a.src = "images/navigation/a_" + i + ".gif"
      with (new foundation_gif_btn_class( a.id ) )
        do_click = new Function( spf("doFontSize('~')",[i]) )
      }
    }
  goGray()
  }
  
// ------------------------------ the popup scripts ------------------------------ //
var w0

function popup_class()
  {
  var _this     = this
  var imageDir  = './images/popup/'
  var theID     = 0
  var ie        = document.all && !window.opera
  var tjx       = []
  var PWX       = {}
  _this.resizable = true

  function spf(s, t)
    {
    var n=0
    function F()
      {
      return t[n++]
      }
    return s.replace(/~/g, F)
    }
  function px(A)
    {
    return A + 'px'
    }
  function IntI(a)
    {
    return parseInt(a)||0
    }
  this.registerChild = function(the_id, the_win)
    {
    var t = PWX[the_id]
    t.the_child_window = the_win
    t.onopen()
    return t
    }
  this.init = function(the_id,  af)
    {
    var wr = ''
    function ws()
      {
      for (var i=0, n=arguments.length; i<n; i++)
        wr += arguments[i]
      }
    function wl()
      {
      ws.apply(this, arguments)
      ws(String.fromCharCode(13, 10))
      }
    if (!xid('id_popup_wrapper'))
      {
      var e = document.createElement('div')
      e.id = 'id_popup_wrapper'
      e.innerHTML = '<span style="display:none">&nbsp;<\/span>'
      document.body.appendChild(e)
      }
    var e = document.createElement('div')
    e.id = the_id

    ws('<div class="css_d-h_div">')
    ws('<div class="css_d-controler">')
    ws('<img style="background-color:transparent;" src="', imageDir, 'unlocked.gif" title="Lock" \/>&nbsp;<\/div>')
    ws('<span class="ttl"></span>')
    ws('<div class="css_d-controls">')
    ws('<img style="background-color:transparent;" src="', imageDir, 'printer.gif" title="Print" \/>&nbsp;')
    ws('<img style="background-color:transparent;" src="', imageDir, 'minimize.gif" title="Minim" \/>&nbsp;')
    ws('<img style="background-color:transparent;" src="', imageDir, 'close.gif" title="Close" \/>')
    ws('<\/div><\/div>')
    ws('<div id="content_div" class="css_d-content_div"><\/div>')
    ws('<div id="stat" class="css_d-status_div">')
    ws('<div class="css_d-resizer" style="float: right; width : 13px; height: 13px; cursor: nw-resize; font-size: 0; background: transparent url(', imageDir, 'resize.gif) top right no-repeat;"><\/div>')
    wl('<\/div>')

    e.innerHTML = wr
    xid('id_popup_wrapper').appendChild(e)
    this.z = this.z ? this.z++ : 100
    var t = xid(the_id)
    t.style.cssText = 'position: absolute; visibility: hidden; background-color: #FDFEFF;'// 
    var d = t.getElementsByTagName('div')
    for (var i=0; i<d.length; i++)
      if (/css_d-/.test(d[i].className))
        t[d[i].className.replace(/css_d-/, '')] = d[i]
    t.style.zIndex = this.z
    t.h_div._parent = t
    t.ttl = t.h_div.getElementsByTagName('span')[0]
    t.controls._parent = t
    t.controler._parent = t
    t.resizer._parent = t
    t.onopen = function()
      {
      return true
      }
    t.onclose = function()
      {
      return true
      }
    t.onmousedown = function()
      {
      _this.z++
      this.style.zIndex = _this.z
      }
        t.IH = ""   
    t.minimize = function()                                          // the whole minimization business // MG
      {
      var divs = []
      for(var ii=0; ii<this.childNodes.length; ii++)
        {
        if(this.childNodes[ii].nodeType == 1)
          divs.push(ii)
        }
      for(var kk=0, ll=divs.length; kk<ll; kk++)                     // the battle to keep the invisible status bars as they are // MG
        {
                if( this.childNodes[kk].className == 'css_d-content_div'  )
                  {
                    if( this.childNodes[kk].style.display != "none" ) 
                      {
                      t.IH = this.childNodes[kk].innerHTML  
                        this.childNodes[kk].innerHTML = ""
                        }
                    else
                        this.childNodes[kk].innerHTML = t.IH
                    }
        if( (this.childNodes[kk].nodeName == 'DIV')&&(this.childNodes[kk].style.display != "none") )
          this.childNodes[kk].style.display = "none"
        else if( ( t.resizable != false ) && (this.childNodes[kk].nodeName == 'DIV') && (this.childNodes[kk].style.display == "none") )
          this.childNodes[kk].style.display = "block"
        else if( ( t.resizable == false ) && (this.childNodes[kk].nodeName == 'DIV') && (this.childNodes[kk].style.display == "none") )
          {
          if(kk < ll-1)
            this.childNodes[kk].style.display = "block"
          }
        }
      t.h_div.style.display = 'block'
      }
    t.lock = function( L )                                           // to lock the window so it can't be dragged //MG
      {
      var yn = L.src.indexOf('unlocked.gif') > -1 ? L.src.replace(/unlocked\.gif$/,"locked.gif") : L.src.replace(/locked\.gif$/,"unlocked.gif")
      L.src = yn
      if( yn.indexOf('unlocked.gif') == -1 )
        this.h_div.onmousedown = function()
          {
          return true
          }
      else
        this.h_div.onmousedown = t.resizer.onmousedown
      }
    t.printout = function()
      {
      var wp = print_manager.getPrintWindow()
      var txt = this.getElementsByTagName("DIV")[2].innerHTML        //alternatively, we could name the DIV but I was lazy // MG
      wp.xid('id_out').innerHTML = txt
      wp.focus()                                                     // if not given focus, it'll print the top win // MG
      wp.print()
      }
    t.h_div.onmousedown = t.resizer.onmousedown = function(e)
      {
      dragging = true
      var d = _this
      var t = this._parent
      t.style.filter = 'alpha(opacity=50)'
      t.style.opacity = 0.5
      d.etarget = this
      var e = window.event || e
      d.initmousex = e.clientX
      d.initmousey = e.clientY
      d.initx = IntI(t.offsetLeft)
      d.inity = IntI(t.offsetTop)
      d.width = IntI(t.offsetWidth)
      d.contentheight = IntI(t.content_div.offsetHeight)
      document.onmousemove = function(e)
        {
        var d = _this
        var etarget = d.etarget
        var e = window.event || e
        d.d_x = e.clientX-d.initmousex
        d.d_y = e.clientY-d.initmousey
        if ( (etarget.className=='css_d-h_div') && dragging )
          d.move(etarget._parent)
        else if (etarget.className=='css_d-resizer')
          d.resize(etarget._parent, e)
        return false
        }
      document.onmouseup = function ceeze()        // named the function to call it from elsewhere //MG
        {
        dragging = false                           // added a variable to make DIVs draggable or docked //MG
        _this.etarget = null
        document.onmousemove = document.onmouseup = null
        document.onmouseover = document.onmouseout = null
        t.style.filter = 'alpha(opacity=100)'
        t.style.opacity = 1.0
        }
      t.onmouseout = function(e)                    // This entire function to
        {                                          // drop the window if the mouse exits the DIV and is about to mouseout the window
        var e = window.event || e                  //
        if( e.clientX < 40 || e.clientY < 20 )     // when approaching left & top egdes of the window
          ceeze()                                  // do the same as mouseup
        }                                          //
      return false                                 //
      }                                            //   MG & BL
    t.controls.onclick = t.controler.onclick = function(e)
      {
      var d = _this
      var sourceobj = window.event ? window.event.srcElement : e.target
      if (/Close/i.test(sourceobj.getAttribute('title')))
        d.close(this._parent)
      else if (/Minim/i.test(sourceobj.getAttribute('title')))
        this._parent.minimize()
      else if (/Lock/i.test(sourceobj.getAttribute('title')))
        this._parent.lock( sourceobj )
      else if (/Print/i.test(sourceobj.getAttribute('title')))
        this._parent.printout()
      return false
      }
    t.moveTo = function(x, y)
      {
      _this.moveTo(this, x, y)
      }
    t.show = function()
      {
      _this.show(this)
      }
    t.hide = function()
      {
      _this.close(this)
      }
    t.setHTML = function(HTML)
      {
      _this.setHTML(this, HTML)
      }
    t.setSize = function(w, h)
      {
      _this.setSize(this, w, h)
      }
    t.setResize = function(b)
      {
      _this.setResize(this, b)
      }
    t.setTitle = function(t, RTL)
      {
      _this.setTitle(this, t, RTL)
      }
    tjx.push(t)
    return t
    }
  this.move = function(t)
    {
    t.style.left = px(Math.max(10, this.d_x+this.initx))
    t.style.top  = px(Math.max(10, this.d_y+this.inity))
    }
  this.open = function(S)
    {
    var t = this.init(theID, S.aud)
    t.setSize(S.width, S.height)
    t.moveTo(S.x, S.y)
    t.setResize(S.resize != false ? true : false)
    t.style.visibility = 'visible'
    t.style.display = 'block'
    t.content_div.style.display = 'block'
    //t.content_div.style.overflow = 'auto'
    t.content_div.style.overflow = 'hidden';
    var v = '&nbsp;'
    t.content_div.innerHTML = v
    var u = '_id_pop_win_' + t.id
    PWX[u] = t
    if (ie)
      {
      var a = xid('id_popup_wrapper').getElementsByTagName('*')
      for (var i=0, L=a.length; i<L; i++)
        a[i].unselectable = 'on'
      }
    theID++
    return t
    }
  this.setHTML = function(t, HTML)
    {
    t.content_div.innerHTML = HTML
    }
  this.setSize = function(t, w, h)
    {
    t.style.width              = px(Math.max(IntI(w), 150))
    t.content_div.style.height = px(Math.max(IntI(h), 100))
    }
  this.moveTo = function(t, x, y)
    {
    this.update_pos()
    t.style.left = px(this.scroll_left + IntI(x))
    t.style.top  = px(this.scroll_top  + IntI(y))
    }
  this.setResize = function(t, b)
    {
    if(!b)
      t.resizable = false
    t.status_div.style.display = b ? 'block' : 'none'
    }
  this.setTitle = function(t, title, RTL)
    {
    t.h_div.getElementsByTagName('span')[0].innerHTML = title
    if (RTL)
      {
      var s = t.h_div.style
      s.border = 1
      s.borderColor = "blue"
      //t.h_div.dir = 'rtl' --- turned off because screws up buttons in the title bar //MG
      s.paddingLeft = '5px'
      s.textAlign = 'left'
      }
    }
  this.update_pos = function()
    { 
    var domclientWidth = document.documentElement && IntI(document.documentElement.clientWidth) || 99999
    this.standardbody  = document.compatMode=='CSS1Compat' ? document.documentElement : document.body
    this.scroll_top  = ie ? this.standardbody.scrollTop    : window.pageYOffset
    this.scroll_left = ie ? this.standardbody.scrollLeft   : window.pageXOffset
    this.docwidth    = ie ? this.standardbody.clientWidth  : /Safari/i.test(navigator.userAgent) ? window.innerWidth : Math.min(domclientWidth, window.innerWidth-16)
    this.docheight   = ie ? this.standardbody.clientHeight : window.innerHeight
    }
  this.resize = function(t, e)
    {
    t.style.width = px(Math.max(this.width+this.d_x, 150))
    t.ttl.style.width = parseInt( t.style.width )-7
    t.content_div.style.height = px(Math.max(this.contentheight+this.d_y, 100))
    }
  this.close = function(t)
    {
    try
      {
      var FP = classify( t, "div", "css_d-content_div" )[0]
      FP.innerHTML = ""
      var b = t.onclose()
      }
    catch(e)
      {
      //alert(e)
      var b = true
      }
    if (b)
      {
      this.update_pos()
      t.lastx = IntI((t.style.left || t.offsetLeft))-this.scroll_left
      t.lasty = IntI((t.style.top || t.offsetTop))-this.scroll_top
      t.lastwidth = t.style.width
      t.style.display = 'none'
      }
    return b
    }
  this.show = function(t)
    {
    if (t.lastx)
      {
      this.update_pos()
      t.state = ''
      t.content_div.style.display = 'block'
      t.status_div.style.display = 'block'
      var s = t.style
      s.display = 'block'
      s.left = px(IntI(t.lastx)+_this.scroll_left)
      s.top =  px(IntI(t.lasty)+_this.scroll_top)
      s.width = px(IntI(t.lastwidth))
      }
    else
      t.style.display = 'block'
    t.state = ''
    }
  this.allDone = function()
    {
    var A = tjx
    for (var i=0; i<A.length; i++)
      A[i].h_div._parent = A[i].resizer._parent = A[i].controls._parent = null
    }
  }//popup_class

function loadVideo( FN, pType )
  {
  var wr = ''
  function ws()
    {
    for (var i=0, L=arguments.length; i<L; i++)
      wr += arguments[i]
    }

  function loadPlayer( A, pType )
    {
    ws( '<embed ' )
    ws( ' src="', A, '"' )
    //ws( pType ? ' width="320"' : ' width="187"' )
    //ws( pType ? ' height="310"' : ' height="29"' )
    //RR:01242013
    ws(pType ? ' width="620"' : ' width="187"') //RR: try Todd's 640x480 video size, adjust outside framework size ? x ? 
    ws(pType ? ' height="580"' : ' height="29"') //RR: final 620x580 video within 880x570 framework ( Dr. Sun said no)
    ws( ' quality="high"' )
    ws( ' bgcolor="#ffffff"' )
    ws( ' allowScriptAccess="sameDomain"' )
    //ws( ' wmode="solid"' )
    ws(' wmode="direct"') //RR: 01252013
    
    ws(' type="application/x-shockwave-flash"')
    ws( ' pluginspage="http://www.macromedia.com/go/getflashplayer">' )
    ws( '<\/embed>' )
    }
   loadPlayer('flv_player.swf?theFile=' + FN + '&autoStart=true', true)//encodeURIComponent() //RR: 01232013, autoStart=true now
   return wr
  }//end of loadVideo()

function launchVideoOverlay( usg, aType, oID, lang )
  {
  lang = aType == 'ma_LC' ? '' : (lang == 'chinese' || lang == 'russian') ? 'korean' : lang //alert( (aType == 'ma_LC') + '::' + aType + '::' + oID + '::' + lang )
  if( w0 ) //if any w0 already exists, remove it.
    {
    while (w0.firstChild)
      w0.removeChild(w0.firstChild)
    pop_manager.close(w0)
    }
  //w0 = pop_manager.open({x: 60, y: 120, width: 390, height: 315, resize: !true})
  w0 = pop_manager.open({ x: 50, y: 25, width: 880, height: 570, resize: !true }) //RR: try the oudside framework size to hold 640x480 pxi.
  var myLang = lang && oID != 'instructions' ? ('_' + lang) : '' //oID not instructinons, then '_lang'; else ''
  var myVideo = 'tutorial/' + aType + '_' + oID + myLang + '.flv'
  var qontent = loadVideo( myVideo )
  //var myTitle =myTitle
  w0.setTitle( usg ? usg : 'Feedback' )
  xid('content_div').style.display = "none"
  IHTML( xid('content_div'), qontent )   
  function showIt()
    {
    xid('content_div').style.display = "block"
    xid('content_div').style.zIndex = 102   //alert(w0.innerHTML)
    }
  window.setTimeout( showIt, 0 )
  
  }//end of lanunchVideoOverlay()
  //RR: 01222013, click1 behavior for universal Tutorial video in .swf format

  function queryStringIt(pairs) 
    {
    var qs = []
    for (var x = 0, xL = pairs.length; x < xL; x++)
      {
      qs.push(pairs[x].join('='))
      }

    return qs.join('&')
    }


    /*
    try to log session into db, get id, make sure it is a number otherwise return -1
    test error by adding +'d' to ouId
    */
    function createSessionId(vals)// lang, mod, uid, last name , frst name
      {

      //populate info in case of error later
      glang   = vals[0]
      gmod    = parseInt(vals[1]) == 1 ? 'reading' : 'listening'
      guid    = vals[2]
      glname  = vals[3]
      gfname  = vals[4]

      //create sessionID
      //document.fm_track.sessionID = document.fm_track.UID.value + ':' + lang + ':' + document.fm_track.lName.value + ':' + document.fm_track.skill.value + ':' + d.toLocaleString().replace(/\s/ig, ':').replace(',', '')
      var S_id = -1
      var args = []
      var d = new Date()
      var m = d.getMonth() + 1
      var dd = d.getDate()

      var dbName = SITENUMBER + vals[0] + (vals[1] == 1 ? '_rc' : '_lc')
      var datetime = new String(d.getFullYear() + '\/' + m + '\/' + dd + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds())

      args.push(['dbName',    dbName])
      args.push(['ouId',      vals[2]])
      args.push(['modality', vals[1] == 1 ? 'reading' : 'listening'])
      args.push(['language',  vals[0]])
      args.push(['startTime', encodeURIComponent(datetime)])
     
      output = g_WS.tryPostForm('StartNewSession', args)
      //validate output, error will be logged to db
      //var sid = g_WS.validateOutput(output, dbName + '||' + vals[2] + '||' + vals[1] + '||' + encodeURIComponent(datetime), -1, location.href)

      var endNow = false
      if (null != output) 
        {
        //S_id = output.getElementsByTagName('string')[0].nodeType == 1 ? JSON.parse(output.getElementsByTagName('string')[0].childNodes[0].nodeValue) : { genstring: -1 }
        //S_id = parseInt(S_id.genstring)
        S_id = g_WS.validateOutput(output)
        if (S_id == -1)
          {
          endNow = true
          }
        }
      else 
        {
        endNow = true
        }

    if (endNow)
      {
      g_WS.logError2Master('No-CreateSessionId',  '')
      alert('ODA System couldn\'t start your session.  Please try again later.\nIf problem persists please contact ODA team.')
      endTest(2)
      }

    return S_id
  }



  //===============================================



  function webServiceClass() 
    {



    function CreateMSXMLDocumentObject() 
      {
      if (typeof (ActiveXObject) != "undefined") 
        {
        var progIDs = [
                                "Msxml2.DOMDocument.6.0",
                                "Msxml2.DOMDocument.5.0",
                                "Msxml2.DOMDocument.4.0",
                                "Msxml2.DOMDocument.3.0",
                                "MSXML2.DOMDocument",
                                "MSXML.DOMDocument"
                       ]
        for (var i = 0; i < progIDs.length; i++) 
          {
          try 
            {
            return new ActiveXObject(progIDs[i])
            } catch (e) { }
          }
        }
      return null;
      } // CreateMSXMLDocumentObject

    function BuildXMLFromString(text) 
      {
      var message = ""
      if (window.DOMParser) 
        { // all browsers, except IE before version 9
        var parser = new DOMParser()
        try 
          {
          xmlDoc = parser.parseFromString(text, "text/xml")
          } 
        catch (e) 
          {
          // if text is not well-formed, 
          // it raises an exception in IE from version 9
          alert("XML parsing error.")
          return null
          }
        }
      else 
        {  // Internet Explorer before version 9
        xmlDoc = CreateMSXMLDocumentObject()
        if (!xmlDoc) 
          {
          alert("Cannot create XMLDocument object")
          return null
          }

        xmlDoc.loadXML(text)
        }

      var errorMsg = null
      if (xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) 
        {
        errorMsg = "XML Parsing Error: " + xmlDoc.parseError.reason + " at line " + xmlDoc.parseError.line + " at position " + xmlDoc.parseError.linepos
        }
      else 
        {
        if (xmlDoc.documentElement) 
          {
          if (xmlDoc.documentElement.nodeName == "parsererror") 
            {
            errorMsg = xmlDoc.documentElement.childNodes[0].nodeValue
            }
          }
        else 
          {
          errorMsg = "XML Parsing Error!"
          }
        }

      if (errorMsg) 
        {
        alert(errorMsg)
        return null
        }
      
      return xmlDoc
      }

    this.postForm = function (webMethodName, args) 
      {
      var currURL = baseUrl + webMethodName
      var str = queryStringIt(args)
      g_XX.post_form(currURL, str)

      if (g_XX.get_responseText().toLowerCase().indexOf('<string') > -1) 
        {
        var doc = BuildXMLFromString(g_XX.get_responseText().substring(g_XX.get_responseText().toLowerCase().indexOf('<string')))
        }
      else 
        {
        //for debugging don't delete
        //doc.loadXML('<string>{"genstring:"'+myReq.responseText+'"}<\/string>')
        var doc = BuildXMLFromString('<string>{"genstring":"' + g_XX.get_responseText().replace(/\r\n/g, "  ").replace(/\n/g, "  ").replace(/\r/g, "  ").replace(/&/g, ' ') + '"}<\/string>')
        }
      //var doc = BuildXMLFromString(g_XX.get_responseText())

      return doc
      } //postForm

    this.tryPostForm = function (wsName, arg) 
      {
        //try 5 times
        var R
        var times = 0
        do 
          {
            R = this.postForm(wsName, arg)
            times = times + 1
          }
        while ((!R) && (times < 5))

        return R
      } // tryPostForm



      this.ValidateBlubOutput = function (op) 
        {
        var R = null
        var errCode = ''
        var errData
        var noError = false
        var nodeTyp = 0

        if (isIEnbeforeNine()) 
          {
          noError = (op.parseError && (op.parseError.errorCode == 0))
          nodeTyp = op.childNodes[0].nodeType
          }
        else
          {
          noError = (op.documentElement.nodeName=="string")
          nodeTyp = op.getElementsByTagName('string')[0].nodeType
          }

        if (noError) 
          {
          /*
          //ie before 9
            alert(op.childNodes[0].nodeName)//string
            alert(op.childNodes[0].nodeValue)//null
            alert(op.childNodes[0].nodeType)//1
            alert(op.documentElement.getElementsByTagName('string').length)
            alert(op.childNodes[0].xml)//everything
            alert(op.childNodes[0].childNodes[0].nodeValue)//{genstring}
            */
          //got xml node from web service

          if (nodeTyp == 1) 
            {
            var temp_json
            try 
              {
              if (isIEnbeforeNine())
                {
                if(op.childNodes[0].childNodes[0].wholeText) //not there
                  var temp_json = JSON.parse(op.childNodes[0].childNodes[0].wholeText)
                else if (op.childNodes[0].childNodes[0].xml)
                  var temp_json = JSON.parse(op.childNodes[0].childNodes[0].xml) //xml
                else if (op.childNodes[0].childNodes[0].nodeValue)
                  var temp_json = JSON.parse(op.childNodes[0].childNodes[0].nodeValue) //xml
                }
              else
                {
                  //alert('child-child.nodeValue:\n'+op.childNodes[0].childNodes[0].nodeValue)
                  //alert('child-child.xml:\n'+op.childNodes[0].childNodes[0].xml)
                  //alert('child-child.wholeTest:\n'+op.childNodes[0].childNodes[0].wholeText)
                  //alert('getElementsByTagName()[0].childNodes[0].wholeText\n'+op.getElementsByTagName('string')[0].childNodes[0].wholeText)
                  //alert('getElementsByTagName()[0].childNodes[0].xml\n'+op.getElementsByTagName('string')[0].childNodes[0].xml)
                  // alert('getElementsByTagName()[0].childNodes[0].nodevalue\n'+op.getElementsByTagName('string')[0].childNodes[0].nodeValue)
                var temp_json = JSON.parse(op.getElementsByTagName('string')[0].childNodes[0].wholeText)
                }


              if (temp_json[0] &&  (!temp_json[0].errordata.hasError))  //get expected correct info no error
                {
                R = temp_json
                }
              else if (temp_json[0] || temp_json.genstring)
                {//either no error data or (errordata exists plus has error true, in either case there is a problem, 
                //errData = tg_obj.genstring
                //alert(temp_json.genstring)
                errData = temp_json[0] ? temp_json[0].errordata.errordetails : temp_json.genstring
                errCode = 'VBOP1-client'
                }
              }
            catch (e) 
              {
              errCode = 'VBOP2-client'
              errData = 'Error Name:' + e.name + ' and Message: ' + e.message
              }
            }
          else 
            {
            errCode = 'VBOP3-client'
            errData = op
            }
          }
        else //failed attempt after 5 tries
          {
          errCode = 'VBOP4-client'
          if (isIEnbeforeNine())
            {
            errData = op.documentElement.childNodes[0].nodeValue
            }
            else
            {
            errData = 'ERROR' + 'code: ' + op.parseError.errorCode + 'Parse Error line ' + op.parseError.line + ', character ' + op.parseError.linepos + ' reason:' + op.parseError.reason + ' src: ' + op.parseError.srcText
            }
          }

        if (R == null) 
          {
          var msg = errCode.length > 0 ? 'An Error has occured while getting the data: ' + errCode : 'No data was found!'
          alert(msg)
          if (errCode.length > 0)
            this.logError2Master(errCode,  encodeURIComponent(errData))
          }
          
        return R
        }// ValidateBlubOutput


    this.validateOutput = function (op, datatostore, sid, flename) 
      {
      var R = -1
      var errCode = ''
      var errData
      var noError = false
      var nodeTyp = 0

      //case ie < 9 will use parseError, others, will load the error in the xmldoc itself
      if (isIEnbeforeNine())
        {
        noError = (op.parseError && (op.parseError.errorCode == 0))
        nodeTyp = op.childNodes[0].nodeType
        }
      else
        {
        noError = (op.documentElement.nodeName=="string")
        nodeTyp = op.getElementsByTagName('string')[0].nodeType
        }


      if ( noError ) 
        {
          //alert(op.childNodes[0].nodeName)//string
          //alert(op.childNodes[0].nodeValue)//null
          //alert(op.childNodes[0].nodeType)//1
          //alert(op.childNodes[0].xml)//everything
          //alert(op.childNodes[0].childNodes[0].nodeValue)//{genstring}
         
          //got xml node from web service
          if (nodeTyp == 1) 
          {
          try 
            {
            if (isIEnbeforeNine())
              {
              //var tg_obj = JSON.parse(op.childNodes[0].childNodes[0].nodeValue)
              if(op.childNodes[0].childNodes[0].wholeText) //not there
                {
                var tg_obj  = JSON.parse(op.childNodes[0].childNodes[0].wholeText)
                }
              else if (op.childNodes[0].childNodes[0].xml)
                {
                var tg_obj  = JSON.parse(op.childNodes[0].childNodes[0].xml) //xml
                }
              else if (op.childNodes[0].childNodes[0].nodeValue)
                {
                var tg_obj  = JSON.parse(op.childNodes[0].childNodes[0].nodeValue )
                }

              }
            else  
              {
              var tg_obj = JSON.parse(op.getElementsByTagName('string')[0].childNodes[0].nodeValue)
              }

            if (isWholeNumbers(tg_obj.genstring)) 
              {
              R = parseInt(tg_obj.genstring)
              }
            else 
              {//found text not all numbers, 
              errData = tg_obj.genstring
              errCode = 'VOP1-client'
              }
            }
          catch (e) 
            {
            errCode = 'VOP2-client'
            errData = 'Error Name:' + e.name + ' and Message: ' + e.message
            }
          }
        else 
          {
          errCode = 'VOP3-client'
          errData = op
          }
        }
      else //failed attempt after 5 tries
        {
        errCode = 'VOP4-client'
        if (isIEnbeforeNine())
          {
          errData = op.documentElement.childNodes[0].nodeValue
          }
          else
          {
          errData = 'ERROR' + 'code: ' + op.parseError.errorCode + 'Parse Error line ' + op.parseError.line + ', character ' + op.parseError.linepos + ' reason:' + op.parseError.reason + ' src: ' + op.parseError.srcText
          }
        }

      if (R == -1)
        {
        //alert(errCode + '\n')
        this.logError2Master(errCode,  encodeURIComponent(errData))
        }

      return R
    } // validateOutput
  

    this.logError2Master = function (errcode, errdata) 
      {
      var _guid   = guid
      var _glname = glname
      var _gfname = gfname
      var _glang  = glang == '' ? 'profile' : glang
      var _gmod   = gmod == '' ? 'profile' : gmod

      var errArgs = []
      errArgs.push(['dbName',   'oda_master'])                                    //dbName   
      errArgs.push(['errDesc',  errcode])                                         //errDesc
      errArgs.push(['errURL',   encodeURIComponent(_guid+'_'+_glname+'_'+_gfname)])  //errURL
      errArgs.push(['errData',  encodeURIComponent(errdata)])                     //errData
      errArgs.push(['langDesc', _glang ])                                           //langDesc
      errArgs.push(['modDesc',  _gmod  ])                                            //modDesc

      this.tryPostForm('InsertODAError', errArgs)
      } // logError2Master
      

  } // webServiceClass
 

  function launchVideoOverlay2(usg, aType, oID, lang) 
    {
      lang = aType == 'ma_LC' ? '' : (lang == 'chinese' || lang == 'russian') ? 'korean' : lang

      if (w0) {
          while (w0.firstChild) {
              w0.removeChild(w0.firstChild)
          }
          pop_manager.close(w0)
      } else {
          this.pop_manager = new popup_class();   
      }

      w0 = pop_manager.open({ x: 50, y: 25, width: 640, height: 535, resize: !true })

      var myLang = lang && oID != 'instructions' ? ('_' + lang) : ''
      var myVideo = 'tutorial/' + aType + '_' + oID + myLang + '.flv'

      //RR: 01272013, 3:11pm, to response to 1/5 Reading help
      var hVideo = aType + '_' + oID.toLowerCase();
      
      w0.setTitle(usg ? usg : 'Feedback')
      xid('content_div').style.display = "none"

      //RR: 01272013 player for "help" video in .flv format with skin=help_controller.swf.
      var fo = new SWFObject("tutorial/help_controller.swf", "csSwf", "680", "535", "8", "#FFFFFF");
      
      //RR: 01272013, to change config file to be responsive to different types of help items.
      // for both Reading & Listening, only 1 of the cases as below is choosen:
      switch(hVideo) { //RR: to test defensive coding, add default.
          //RR: Reading as below.
          case "ma_qsa":
              fo.addVariable("csConfigFile", "data/ma_qsa_arabic.xml");
              break;
          case "ma_cmt":
              fo.addVariable("csConfigFile", "data/ma_cmt_arabic.xml");
              break;
          case "ma_hto": 
              fo.addVariable("csConfigFile", "data/ma_hto_arabic.xml");  
              break;
          case "ma_mct": 
              fo.addVariable("csConfigFile", "data/ma_mct_arabic.xml");  
              break;
          case "ma_cim":
              fo.addVariable("csConfigFile", "data/ma_cim_arabic.xml");
              break;
          //RR: Listening as below
          case "ma_LC_lsa":
              fo.addVariable("csConfigFile", "data/ma_lc_lsa.xml");
              break;
          case "ma_LC_amc2":
              fo.addVariable("csConfigFile", "data/ma_lc_amc2.xml");
              break;
          case "ma_LC_lcm":
              fo.addVariable("csConfigFile", "data/ma_lc_lcm.xml");
              break;
          case "ma_LC_lsa2":
              fo.addVariable("csConfigFile", "data/ma_lc_lsa2.xml");
              break;
          case "ma_LC_lsamod": //extra, same .flv as above
              fo.addVariable("csConfigFile", "data/ma_lc_lsa2.xml");
              break;
          case "ma_LC_tmc2":
              fo.addVariable("csConfigFile", "data/ma_lc_tmc2.xml");
              break;
          default:
              {// In case of unknown type, run an old russian .swf to clearly show, to correct/add it. defensive coding.
                  alert("Sorry, this is a new type of testlet item. Please call ODA team to add it, thanks.");
                  fo = new SWFObject("tutorial/Tutorial_controller.swf", "csSwf", "640", "480", "8", "#FFFFFF");
                  fo.addVariable("csConfigFile", "data/Tutorial_singlefile_config.xml");
              }
      //fo.addVariable("csConfigFile", hVideo);
      }
      fo.addVariable("csColor", "FFFFFF");
      fo.write("content_div");

      function showIt() {
          xid('content_div').style.display = "block"
          xid('content_div').style.zIndex = 102   //alert(w0.innerHTML)
      }
      window.setTimeout(showIt, 0)
  } //end of lanunchVideoOverlay2() for "Help"

    function launchVideoOverlay1(usg, aType, oID, lang) 
    {
      // alert("I am in launchVideoOverlay1 function definition"); //debug message1
      lang = aType == 'ma_LC' ? '' : (lang == 'chinese' || lang == 'russian') ? 'korean' : lang 
      
      if (w0) 
      {
          while (w0.firstChild)
              w0.removeChild(w0.firstChild)
          pop_manager.close(w0)
      }
      
      w0 = pop_manager.open({ x: 50, y: 25, width: 800, height: 535, resize: !true })
      
      var myLang = lang && oID != 'instructions' ? ('_' + lang) : '' 
      var myVideo = 'tutorial/' + aType + '_' + oID + myLang + '.flv'

      w0.setTitle(usg ? usg : 'Feedback')
      xid('content_div').style.display = "none"
      
      //RR: 01232013 added to play .swf video
      var fo = new SWFObject( "tutorial/Tutorial_controller.swf", "csSwf", "800", "535", "8", "#FFFFFF" );
      fo.addVariable( "csConfigFile", "data/Tutorial_config.xml"  ); 
      fo.addVariable( "csColor"     , "FFFFFF"           );
      fo.write("content_div"); 		  	  
      
      //IHTML(xid('content_div'), qontent)
      
      function showIt() {
          xid('content_div').style.display = "block"
          xid('content_div').style.zIndex = 102   
      }
      window.setTimeout(showIt, 0)
  } //end of lanunchVideoOverlay1() for universal tutorial
