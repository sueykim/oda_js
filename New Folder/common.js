var paths = ['http://oda.dliflc.edu/','http://oda2.lingnet.org/','http://localhost/oda3/','http://localhost/oda/','http://glossDev.lingnet.org/demo/','']
var myPath    = paths[1]

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
  do_init()
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
    return ax.responseText
    }
  this.XML_HTTP_GET = function( url )
    {
    ax.open( 'get', url, false )
    if (ns)
      ax.send(null)
    else
      ax.send()
    }
  this.post_form = function( url, sss )
    {
    ax.open( 'post', url, false )
    ax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
    ax.send( sss )
    }
  this.post_XML = function( url, sss )
    {
    ax.open( 'post', url, false )
    ax.setRequestHeader( 'Content-Type', 'text/xml' )
    ax.send( sss )
    }
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
        a[i] = a[i].split('=')
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
  var RTL  = '|persian|arabic|hebrew|'.indexOf('|'+lang.toLowerCase()+'|') >= 0
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
    t.content_div.style.overflow = 'auto'
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
    ws( pType ? ' width="320"' : ' width="187"' )
    ws( pType ? ' height="310"' : ' height="29"' )
    ws( ' quality="high"' )
    ws( ' bgcolor="#ffffff"' )
    ws( ' allowScriptAccess="sameDomain"' )
    ws( ' wmode="solid"' )
    ws( ' type="application/x-shockwave-flash"' )
    ws( ' pluginspage="http://www.macromedia.com/go/getflashplayer">' )
    ws( '<\/embed>' )
    }
  loadPlayer( 'flv_player.swf?theFile=' + FN + '&autoStart=false', true )//encodeURIComponent()
  return wr
  }

function launchVideoOverlay( usg, aType, oID, lang )
  {
  lang = aType == 'ma_LC' ? '' : (lang == 'chinese' || lang == 'russian') ? 'korean' : lang //alert( (aType == 'ma_LC') + '::' + aType + '::' + oID + '::' + lang )
  if( w0 )
    {
    while (w0.firstChild)
      w0.removeChild(w0.firstChild)
    pop_manager.close(w0)
    }
  w0 = pop_manager.open({x: 60, y: 120, width: 390, height: 315, resize: !true})
  var myLang = lang && oID != 'instructions' ? '_' + lang : ''
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
  }
