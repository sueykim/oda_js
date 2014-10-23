var IE     = window.ActiveXObject ? true : false

function xpose( o )
  {
  var R = []
  for( var p in o )
    R.push( p + "=" + eval( "o." + p ) )
//  alert( R.sort().join("\t\t") )
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


//---------------OQ only ----------------------------------------------//

function rep( F )
  { 

  var D = new Date();
  var dateTime = t_stamp(D)
  var W = window;
  var Z = F == "oq" ? [ ['OUId', W.uid], ['timeString', D], ['dateTime', dateTime] ] : []
  var b = document.forms[ F ].elements
  //alert('b.length=' + b.length)
  for (var j=0, M=b.length; j<M; j++)
    {
    var c = b[j]
    var n = spf( '~', [ c.name ] )
    if ( c.type == 'select-one' )
      {
      Z.push( [n, c[c.selectedIndex].value] )
      }

    else if ( c.type == 'radio' )
      {
      if( Z.length > 0 && Z[Z.length-1][0].indexOf(c.name) == -1 )
        Z.push( c.checked ? [n, c.value] : [n, ''] )
      else
        if(c.checked)
          Z[Z.length-1] = [n, c.value]
      }
/*    else if ( c.type == 'checkbox' )
      {
      if( Z[Z.length-1][0].indexOf(c.name) == -1 )
        Z.push( [n, "[" )
      if(c.checked)
        Z[Z.length-1] += c.checked + "]"
      Z[Z.length-1] = Z[Z.length-1].split('=')[0] + "=[" + Z[Z.length-1].split('=')[1].replace(/[\[\]]/g,",").replace(/^,(.*),$/,"$1") + "]"
      Z[Z.length-1] = Z[Z.length-1].replace(/\[,/,"[").replace(/,\]/,"]").replace(/,+/g,",")
      if( Z[Z.length-1].indexOf('[]') > -1 )
        Z.pop()
      }
*/
    else if ( (c.type == 'text') || (c.type == 'textarea') )
      Z.push( [n, encodeURIComponent( c.value )] )
    }
  //alert (Z[3][1])
  for (var i=4, zLen=Z.length; i<zLen; i++)
    {
    if (  Z[i][1] == '')
      {
      if (i == zLen-1)
        Z[i][1] = 'no input'
      else
        Z[i][1] = 0
      }
    }
  //alert(Z)
  if (Z[3][1] == -1)
    alert('Please select the language you took for the ODA.')
  else
    g_WS.postForm('insertSurveyItemUserWpl', Z, oqOnSuccess, onfail, [])



 // X.post_form( SRV + "?cmd=store&", Z.join("&") )

}

function oqOnSuccess(responseText, args) 
{
    var output = responseText
    var item_id = -1
    if (null != output) {
        item_id = g_WS.validateOutput(output)
        if (item_id == -1) {
            alert("Couldn't insert your feedback to the database. Please try again later")
        }
        else {
            alert("Your feedback is appreciated. Thank you!") ;
            self.close();
        }
    }
}// oqOnSuccess

function t_stamp(D)
  {
  var d = new Date()
  var m = d.getMonth() + 1
  var dd = d.getDate()

  var datetime = new String(d.getFullYear() + '\/' + m + '\/' + dd + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds())
  return datetime
  }

function getIdNtLang()
  {
//  alert('hi')
  var getVars = [];
  var W = window;
  function getVariables()
    {
    function filterText(s)
      {
      s = s.replace( /%20/g, ' ' )
      s = s.replace( /&nbsp;/g, ' ' )
      s = s.replace( /%22/g, '"' )
      return s
      }

    var x = ( window.location.href.indexOf( "?" ) + 1 ) ? window.location.href.substr( window.location.href.indexOf( "?" ) + 1 ) : "";
    var tempBin = x.split( "&" );
    for( var i=0, len=tempBin.length; i<len; i++ )
      {
      var tempBin2 = tempBin[i].split( "=" );
      getVars[getVars.length] = [ tempBin2[0], document.all ? unescape( tempBin2[1] ) : filterText(tempBin2[1]) ]
      }
    }

  getVariables()
  W.uid = getVars[0][1] != '' ? getVars[0][1] : W.uid
  var tlang = getVars[1][1] != '' ? getVars[1][1] : W.tlang
//  alert(tlang)
  if (tlang != '')
    get_selected( 'id_sl_lang', tlang)
  }
function get_selected(d, s)
  {
  var sl = s
  var dl = xid(d)
  if (sl != '' && dl)
    for(var i=0; i<dl.options.length; i++)
      if (dl.options[i].value.toLowerCase() == sl.toLowerCase() )
        dl.selectedIndex = i
  }
function initOQ()
  {
//  alert('hi from initOQ')
  getIdNtLang()
  xfe( "oq", "submit" ).onclick = function()
    {
//    this.disabled = true
    rep( "oq" )
    }
  }

//---------------end OQ only ----------------------------------------------//


function checkYes()
  {
  var ans = xid("id_sa1").value;
  if (ans == 1 )
    {
    xid('id_tbl_q2').classList.add('shown')
    xid('id_tr_q3_0').classList.add('bg-grey')
    xid('id_tr_q3_1').classList.add('bg-grey')
    }
  else
    {
    xid('id_tbl_q2').classList.remove('shown')
    xid('id_tbl_q2').classList.add('hidden')
    xid('id_tr_q3_0').classList.remove('bg-grey')
    xid('id_tr_q3_1').classList.remove('bg-grey')
    }
  }
  
  
  function initJQAjaxSettings()
  {
  $.ajaxSetup(
    {
    //async : true  //default
    //cache : false //we use our own
    //timeout: 1 //activate for time out error
    })
  $( document ).ajaxStart(function() 
    {
    s('Sending request...')
    })
  $( document ).ajaxStop(function() 
    {
    //s('ajax stopped ...')
    })
  $( document ).ajaxComplete(function( event,request, settings ) 
    {
    //s('ajax complteted ... ')//<br>Event'+ event +'<br> request:'+request+'<br> settigns:'+settings.toString() )
    })
  $( document ).ajaxError(function( event, jqxhr, settings, exception ) 
    {
    //s('ajax error ... <br> event:'+ event + '<br> settings:' + settings.url + '<br> exception:'+ exception)
    //s('\n jqxhr:<br> Status: ' + jqxhr.status + '<br> statustext: ' + jqxhr.statusText + '<br> text: ' + jqxhr.responseText + '<br> xml: ' + jqxhr.responseXML   )
    //alert('inside ajax onError')
    if ($.tries < 3)
      {
      //s($.tries + ':trying in 2 second...<br>')
      countDown(3)
      timout = setTimeout(tryAgain, 4*1000)
      }
    else if ($.tries >= 3 && $.tries < 5 )
      {
      //s($.tries + ':trying in 5 second...<br>')
      countDown(5)
      timout = setTimeout(tryAgain, 6*1000)
      }
    else if ($.tries >= 5 && $.tries < 10)
      {
      //s($.tries + ':trying in 7 second...<br>')
      countDown(7)
      timout = setTimeout(tryAgain, 8*1000)
      }
    else if ($.tries >= 10)
      {
      s('')
      $.jqxhr = ''
      $.tries = 1
      s('done trying...')
      $.lcl_failF(event, jqxhr, settings, exception)
      }
    $.tries++
    })

  $( document ).ajaxSuccess(function( event, xhr, settings ) 
    {     
    //alert('inside ajax onsuccess\nmethod:'+$.method +'\nArgs:'+$.lcl_passedArgs+'\nurl='+$.lcl_url+'\ntries='+$.tries)
    s('')
    $.jqxhr = ''
    $.tries = 1
    ax = xhr
    $.lcl_successF(ax.responseText, $.lcl_passedArgs)
    //alert(typeof xhr)
    //ax = xhr
    //atsuccess()
    //s('ajax success: '+ xhr.responseText)
    })
  $( document ).ajaxSend(function( event, request, settings ) 
    {
    //s('Sending Request ...')
    })


  window.tryAgain = function()
    {
    if ('get' == $.method )
      {
      execute_GET($.lcl_url, $.lcl_successF, $.lcl_failF, $.lcl_passedArgs)
      }
    else if ('post' == $.method )
      {
      execute_POST($.lcl_url, $.lcl_postData, $.lcl_successF, $.lcl_failF, $.lcl_passedArgs)
      }
    }
  }// initJQAjaxSettings
//----------------added by Sue ---------------------------------------------//
window.onload = function()
  {
  var SEL = document.forms[0].elements
  for( var w=0, z=SEL.length; w<z; w++ )
  if ( SEL[w].type == 'select-one' )
    SEL[w].selectedIndex = 0
  var DBG = !true
  var W = window
  W.g_WS = new webServiceClass()
  W.g_XX = new XML_HTTP_class()
  W.uid = "000"
  W.tlang = ""
  if( document.location.toString().indexOf( "oq2.html" ) > -1 )
    {
    W.uid = DBG ? "123" : uid
    initOQ()
    }

  initJQAjaxSettings()
  }
