var IE     = window.ActiveXObject ? true : false

function xpose( o )
  {
  var R = []
  for( var p in o )
    R.push( p + "=" + eval( "o." + p ) )
  alert( R.sort().join("\t\t") )
  }

String.prototype.L_Trim      = new Function( "return this.replace(/^\\s+/,'')"   )
String.prototype.R_Trim      = new Function( "return this.replace(/\\s+$/,'')"   )
String.prototype.Trim        = new Function( "return this.L_Trim().R_Trim()"     )

function spf( s, t )
  {
  var n=0
  function F()
    {
    return t[n++]
    }
  return s.replace(/~/g, F)
  }

function xid( a )
  {
  return document.getElementById( a ) 
  }
    
function xfe( FF, a )
  {
  return eval( "document.forms[\"" + FF + "\"]." + a )  
  }

function xcl( whr, wht, cls )
  {
  var R = []  
  var A = whr.getElementsByTagName( wht )
  for( var w=0, z=A.length; w<z; w++ )
    for( var x=0, y=cls.length; x<y; x++ )
      if( A[w].className == cls[x] || A[w].getAttribute( "class" ) == cls[x] )
        R.push( A[w] )
  return R
  }

function Xcl( whr, wht, cls )
  {
  var R = []  
  var A = whr.getElementsByTagName( wht )
  for( var w=0, z=A.length; w<z; w++ )
    for( var x=0, y=cls.length; x<y; x++ )  
      if( A[w].className.indexOf( cls[x] ) > -1 )//|| A[w].getAttribute( "class" ).indexOf( cls[x] ) > -1 )
        R.push( A[w] )
  return R
  }
    
function isIn( x, y )
  {
  var yn = false
  var n = y.length
  for(var i=0; i<n; i++)
    if(x == y[i])
      {
      yn = true
      break
      }
  return yn
  }

function XHC()
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
  }//end XHC

//---------------OQ only ----------------------------------------------//

function rep( F )
  {
  var Z = F == "oq" ? [ "UID="+ uid, "TimeStamp=" + TS ] : []
  var b = document.forms[ F ].elements
  for (var j=0, M=b.length; j<M; j++)
    {
    var cntr = 0
    var c = b[j]
    var n = spf( '~=', [ c.name ] )
    if ( c.type == 'select-one' )
      {
      Z.push( n + c[c.selectedIndex].value )
      }
    if ( c.type == 'radio' )
      {
      if( Z.length > 0 && Z[Z.length-1].indexOf(c.name) == -1 )
        Z.push( c.checked ? n + c.value : n )
      else
        if(c.checked)
          Z[Z.length-1] = n + c.value
      }
    else if ( c.type == 'checkbox' )
      {
      if( Z[Z.length-1].indexOf(c.name) == -1 )
        Z.push( n + "[" )
      if(c.checked)
        Z[Z.length-1] += c.checked + "]"
      Z[Z.length-1] = Z[Z.length-1].split('=')[0] + "=[" + Z[Z.length-1].split('=')[1].replace(/[\[\]]/g,",").replace(/^,(.*),$/,"$1") + "]"
      Z[Z.length-1] = Z[Z.length-1].replace(/\[,/,"[").replace(/,\]/,"]").replace(/,+/g,",")
      if( Z[Z.length-1].indexOf('[]') > -1 )
        Z.pop()
      }
    else if ( (c.type == 'text') || (c.type == 'textarea') )
      Z.push( n + encodeURIComponent( c.value ) )
    } 
  X.post_form( SRV + "?cmd=store&", Z.join("&") )

  }

function t_stamp()
  {
  var D = new Date()
  var rt = [D.getDate(), D.getMonth(), D.getFullYear(), D.getHours(), D.getMinutes(), uid]
  return rt.join(".")
  }

function initOQ()
    {
    xfe( "oq", "skil" ).onchange = function()
      {
			window.focus()
      var OS = xid( "mode" ).innerHTML.split(",")[0] + ", "
      var AE = ["rc","lc"]
      var O = xcl( document, "tr", AE )
      for( var w=0, z=O.length; w<z; w++ )
        O[w].style.display = "none"
      var TOTS = this.options[this.selectedIndex]
      var CL = TOTS.value == "re" ? ["rc"] : TOTS.value == "li" ? ["lc"] : TOTS.value == "bo" ? ["rc","lc"] : []
      if( CL.length > 0 )
        {
        xid( "mode" ).innerHTML = OS + ( TOTS.value == "re" ? "Reading" : TOTS.value == "li" ? "Listening" : "Reading and Listening" )
        var T = xcl( document, "tr", CL )
        for( var w=0, z=T.length; w<z; w++ )
          T[w].style.display = IE ? "inline" : "table-row"
        }
      else
        xid( "mode" ).innerHTML = OS
      }
  xfe( "oq", "sa1" ).onchange = xfe( "oq", "sa3" ).onchange = xfe( "oq", "sa5" ).onchange = function()
    {
		window.focus()
    var CL = this.name.substr(2,1) == "1" ? ["q2"] : this.name.substr(2,1) == "3" ? ["q4"] : ["q6"]
    var T = xcl( document, "tr", CL )
    for( var w=0, z=T.length; w<z; w++ )
      T[w].style.visibility = this.options[this.selectedIndex].value == "1" ? "visible" : "hidden"
    }
  xfe( "oq", "submit" ).onclick = function()
    {
    this.disabled = true
    rep( "oq" )
    }
  }

//---------------end OQ only ----------------------------------------------//

//---------------FBView only ----------------------------------------------//

function calc()
  {
  var Rs = []
  var rs = xid( "rzlts" ).getElementsByTagName( "tr" )
  for( var q=0, r=rs.length; q<r; q++ )
    if( rs[q].style.display != "none" )
      Rs.push( rs[q] )
  var Cs = Rs[Rs.length-1].getElementsByTagName( "td" )

  for( var w=3, z=Cs.length; w<z; w++ )
    {
    var Vs = []
    var T  = 0
    for( var q=1, r=Rs.length-1; q<r; q++ )
      {
      var TDs = Rs[q].getElementsByTagName( "td" )
      if( TDs[w].innerHTML )
        {
        Vs.push( parseInt( TDs[w].innerHTML ) )
        T += Vs[Vs.length-1]
        }
      }
    Cs[w].innerHTML = Math.round( ( T/Vs.length )*100 )/100
    }
  }

var d_cod = ["UID:user ID",
             "TimeStamp: Time Stamp",
             "lang: Language",
             "skil: Skill",
             "sa1:Section A, Question 1",
             "sa2:Section A, Question 2",
             "sa3:Section A, Question 3",
             "sa4:Section A, Question 4",
             "sa5:Section A, Question 5",
             "sa6:Section A, Question 6",
             "sbr1:Section B-Reading, Question 1",
             "sbr2:Section B-Reading, Question 2",
             "sbr3:Section B-Reading, Question 3",
             "sbr4:Section B-Reading, Question 4",
             "sbr5:Section B-Reading, Question 5",
             "sbr6:Section B-Reading, Question 6",
             "sbl1:Section B-Listening, Question 1",
             "sbl2:Section B-Listening, Question 2",
             "sbl3:Section B-Listening, Question 3",
             "sbl4:Section B-Listening, Question 4",
             "sbl5:Section B-Listening, Question 5",
             "sbl6:Section B-Listening, Question 6",
             "sbl7:Section B-Listening, Question 7",
             "sbl8:Section B-Listening, Question 8",
             "sc1:Section C, Question 1",
             "sc2:Section C, Question 2",
             "sc3:Section C, Question 3",
             "sd1:Section D, Question 1",
             "sd2:Section D, Question 2",
             "sd3:Section D, Question 3"]

function pop( M, l, t )
  {
  if( arguments.length > 0 ) 
    {
    var L = l
    var T = t
    xid( "pop" ).style.display = "block"
    xid( "pop" ).style.top     = ( t - 30 ) + "px"
    xid( "pop" ).style.left    = ( l - 49 < 0  ? l : l - 49 ) + "px"
    xid( "pop" ).innerHTML = M
    }
  else
    xid( "pop" ).style.display = "none"
  }

function findPos(obj)
  {
  var curleft = curtop = 0;
  if (obj.offsetParent)
    {
    do
      {
    	curleft += obj.offsetLeft;
    	curtop += obj.offsetTop;
    	}
    while (obj = obj.offsetParent);
    }
  return [curleft,curtop];
  }

function th_act()
  {
  var ths = xid( "rzlts" ).getElementsByTagName( "th" )
  for( var q=0, r=ths.length; q<r; q++ )
    {
    ths[q].onmouseover = function()
      {
      var P = findPos( this )
      pop( this.getAttribute( "msg" ), P[0], P[1] )
      }
    ths[q].onmouseout = function()
      {
      pop()
      }
    }
  }

function tabelize( R )
  {
  var c   = ["<tr id=\"blah\">"]
  var T   = ["<table id=\"rzlts\" class=\"rzlts\" border=\"1\">",c]
  var TTR = []
  var cc  = ["<tr id=\"blah\">"]                                       // table for comments only
  var cT  = ["<table id=\"cmnts\" class=\"cmnts\" border=\"1\">",cc]   // table for comments only
  var cTR = []                                                         // table for comments only
  var rc = R.split( "*~*" )
  for( var w=1, z=rc.length; w<z; w++ )
    {
    var rl = rc[w].split("&")
    T.push( "<tr id=\"blah" + w + "\">" )
    cT.push( "<tr id=\"cmnt" + w + "\">")                              // table for comments only
    if( w == z-1 )
      {
      TTR.push( "<tr>" )
      cTR.push( "<tr>" )                                               // table for comments only
      }
		var AL = w == z - 1 ? rl.length : rl.length-1
    for( var q=0, r=AL; q<r; q++ )
      {
      var n = rl[q].split( ":" )[0]
      
      if( n == "sd3" || n == "UID" )
        {
        if( !isIn( "<th class=\"c" + n + "\">" + n + "<\/th>", cc ) )
          cc.push( "<th class=\"c" + n + "\">" + n + "<\/th>" )
        var v = rl[q].split( ":" )[1] == "null" ? "" : "<p class=\"cmt\">" + rl[q].split( ":" )[1] + "<\/p>"
        cT.push( "<td class=\"c" + n + "\">" + decodeURIComponent( v ) + "<\/td>" )
        }
      else if( n != "sd3" )
        {
        var A = ""
        for( var a=0, b=d_cod.length; a<b; a++ )
          if( n == d_cod[a].split(":")[0] )
            A = "msg=\"" + d_cod[a].split(":")[1] + "\""
        if( !isIn( "<th " + A + " class=\"" + n + "\">" + n + "<\/th>", c ) )
          c.push( "<th " + A + " class=\"" + n + "\">" + n + "<\/th>" )
        var v = rl[q].split( ":" )[1] == "null" ? "" : rl[q].split( ":" )[1] == "y" ? "1" :  rl[q].split( ":" )[1] == "n" ? "0" : rl[q].split( ":" )[1]
        T.push( "<td class=\"" + n + "\">" + decodeURIComponent( v ) + "<\/td>" )
        if( w == z-1 )
          TTR.push( "<td id=\"tot_" + n + "\" class=\"" + n + "\"><\/td>" )
        }
      }
    T.push( "<\/tr>" )
    cT.push( "<\/tr>" )
    if( w == z-1 )
      {
      TTR.push( "<\/tr>" )
      cTR.push( "<\/tr>" )
      }
    }
  c.push( "<\/tr>" )
  cc.push( "<\/tr>" )
  T[1] = c.join("")
  cT[1] = cc.join("")
  T.push( TTR.join("") )
  cT.push( cTR.join("") )
  T.push("<\/table>")
  cT.push("<\/table>")
  xid( "tgt" ).innerHTML = T.join("\n")
  xid( "cmt" ).innerHTML = cT.join("\n")
  th_act()
  calc()
		//document.write( rc.join("\n\n") )
  }
    
function initFB()
  {
  xfe( "fbv", "rtrv" ).onclick  = function()
    {
    var L =  xfe( "fbv","lang" ).options[xfe( "fbv","lang" ).selectedIndex].value ? "lang=" + xfe( "fbv","lang" ).options[xfe( "fbv","lang" ).selectedIndex].value : ""
    var S =  xfe( "fbv","skil" ).options[xfe( "fbv","skil" ).selectedIndex].value ? "skil=" + xfe( "fbv","skil" ).options[xfe( "fbv","skil" ).selectedIndex].value : ""
    var Z = [L, S]
    X.post_form( SRV + "?cmd=pull&", Z.join("&") )
    var XR = X.get_response()
    var T = tabelize( XR )
    }

	xfe("fbv","mnthF").onchange = xfe("fbv","yearF").onchange = xfe("fbv","mnthT").onchange =
	xfe("fbv","yearT").onchange = xfe( "fbv","lang" ).onchange = xfe( "fbv","skil" ).onchange = function()
		{
		window.focus()
		}

  xfe( "fbv", "stcm" ).onclick = function()
    {
    if( xid( "cmt" ).style.display != "block" )
      {
      xid( "cmt" ).style.display =  "block"
      xid( "tgt" ).style.display =  "none"
      }
    else
      {
      xid( "cmt" ).style.display =  "none"
      xid( "tgt" ).style.display =  "block"
      }
    this.value = xid( "cmt" ).style.display != "block" ? "Show Comments" : "Show Statistics"
    }

  xfe( "fbv", "nrrw" ).onclick = function()
    {
    var Mfr = xfe("fbv","mnthF").options[xfe("fbv","mnthF").selectedIndex].value != "null" ? xfe("fbv","mnthF").options[xfe("fbv","mnthF").selectedIndex].value : false
    var Yfr = xfe("fbv","yearF").options[xfe("fbv","yearF").selectedIndex].value != "null" ? xfe("fbv","yearF").options[xfe("fbv","yearF").selectedIndex].value : false
    var Mto = xfe("fbv","mnthT").options[xfe("fbv","mnthT").selectedIndex].value != "null" ? xfe("fbv","mnthT").options[xfe("fbv","mnthT").selectedIndex].value : false
    var Yto = xfe("fbv","yearT").options[xfe("fbv","yearT").selectedIndex].value != "null" ? xfe("fbv","yearT").options[xfe("fbv","yearT").selectedIndex].value : false
    if( !Mfr || !Yfr )
      alert( "You should select at least the starting month and year." )
    else
      {
      var F = []

      if( Yto && Yfr && ( Yto > Yfr ) )  // both years selected, "to" > "from"
        {
        F[0] = Mfr ? Mfr : 0
        F[1] = Yfr
        F[2] = Mto ? Mto : 11
        F[3] = Yto
        }
      else                               // "from" year selected but "to" year isn't, or is lower or equal than "from"
        {
        F[0] = Mfr ? Mfr : 0
        F[1] = Yfr
        }
      var TRS = xid( "rzlts" ).getElementsByTagName( "tr" )
      for( var w=1, z=TRS.length-1; w<z; w++ )
        {
        var TSs = ( TRS[w].getElementsByTagName( "td" )[1] ) ? TRS[w].getElementsByTagName( "td" )[1].innerHTML : ""
        var TS  = TSs.split(".")
        if( F.length == 2 )
          {
          if( ( TS[2] == F[1] && TS[1] >= F[0] ) || TS[2] > F[1] )
            TRS[w].style.display = IE ? "block" : "table-row"
          else
            TRS[w].style.display = "none"
          }
        }
      }
    calc()
    }

  var SHs = xcl( document, "input", ["sh"] )
  for( var w=0, z=SHs.length; w<z; w++ )
    {
    xfe( "fbv", SHs[w].name ).onclick  = function()
      {
						var TV =	this.value.split( " " )
      if( xid("rzlts") )
        {
        var THs = Xcl( xid("rzlts"), "th", [this.name.substring(2,this.name.length)] )
        var TDs = Xcl( xid("rzlts"), "td", [this.name.substring(2,this.name.length)] )
        TDs = TDs.concat( THs )
        for( var g=0, h=TDs.length; g<h; g++ )
          TDs[g].style.display = TDs[g].style.display == "none" ? ( IE ? "inline" : "table-cell" ) : "none"
								 TV[0] = TDs[1].style.display == "none" ?		"Show" : "Hide"
									this.value = TV.join( " " )
        }
      }
    }
  }

//---------------end FBView only ----------------------------------------------//

window.onload = function()
  {
  var SEL = document.forms[0].elements
  for( var w=0, z=SEL.length; w<z; w++ )
  if ( SEL[w].type == 'select-one' )
    SEL[w].selectedIndex = 0
  var DBG = !true
  var W = window
  W.X   = new XHC()
  W.SRV = DBG ? "http://localhost/oda/oq.asp" : "http://oda2.lingnet.org/oq.asp"
  if( document.location.toString().indexOf( "oq.html" ) > -1 )
    {
    W.uid = DBG ? "123" : "uid"
    W.TS = t_stamp()
    initOQ()

    }
  else
    {
    W.uid = null
    W.TS  = null
    initFB()
    }
  }
