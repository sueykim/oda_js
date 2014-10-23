

function isIn( a, x )
  {
  var yn = false
  for(var i=0, n=a.length; i<n; i++)
    if(x == a[i])
      {
      yn = true
      break
      }
  return yn
  }

function where( ary, itm )
  {
  var ix = null
  for( var w=0, z=ary.length; w<z; w++ )
    if( itm == ary[w] )
      ix = w
  return ix
  }

var TextFuncTypes2 = [
                     '',
                     '',
                     'transmit straightforward and brief information such as the announcement of social events (e.g. , a wedding)',
                     'provide/present basic information about events, people and places (e.g., a notice of a public meeting)',
                     '',
                     'relate detailed reports, stories or descriptions of people and places',
                     'elaborate and comment on ideas and events (e.g., a letter to the editor)',
                     '',
                     'argue ideas or points of view on topics of broad interest (e.g., editorials)'
                     ]

var statements     = [
                     'You can read texts that:<br \/>',
                 'You can do the following:<br \/>',
                 'You need to read texts that include:<br \/>',
                 'You need to do the following more:<br \/>',
                 'within the following topic(s):<br \/>'
                 ]

//=>
//used for display lang name and other functions: format 
//IMPORTANT: orignal / enhancement lang
var mixedLngsNames = ['Korean / North Korean']
var mxdtsts = ['mkorean']
var tltlang = ['nkr']
var mixed = false   //mixed testsets
var lcde   = ''     //language code

function re_classify( s, t, i )
  {
  var ar = []
  var rei = new RegExp( i )
  var els = s.getElementsByTagName( t )
  for(var w=0, z=els.length; w<z; w++)
    if( rei.test( els[w].id ) )
      ar.push( els[w].id )
  return ar   
  }

function rec_classify( s, t, i )
  {
  var ar = []
  var rei = new RegExp( i )
  var els = s.getElementsByTagName( t )
  for(var w=0, z=els.length; w<z; w++)
    if(  rei.test( els[w].className )  )
      ar.push( els[w] )
  return ar
  }

function findQ( TI )
  {
  var QI
  var TB = TI.parentNode
  var CL = TB.getElementsByTagName( TI.tagName )
  for( var q=0, r=CL.length; q<r; q++ )
    if( CL[q] == TI )
      QI = q
  return QI
  }

function fillOL(lvlW, lvlC)
  {
  var beyondL3 = 'You have demonstrated the ability to understand the highest level of texts that the ODA system offers. '+
    'The current version of ODA does not assess beyond the ability to understand texts on general abstract topics. Therefore, '+
    'the section on "what you NEED to do next" may contain little or no feedback.'
  var belowL1 =  'You have not demonstrated the ability to understand basic short sentences in the target language. The '+
    'current version of ODA does not assess the ability to understand isolated words and phrases. Therefore, the section '+
    'on "what you CAN do now" may contain little or no feedback.'
  if (lvlW == 8)
    {
    var x = '<p class="bnd3">' + beyondL3 + '</p>'
    xid( 'goal' ).style.display = "none"
    }
  else if (lvlC == 2)
    var x = '<p class="blw1">' + belowL1 + '</p>'
  xid( 'id_outerLimit' ).style.display = "block"
  xid( 'id_outerLimit' ).innerHTML = x
  } // fillOL

function findTT(clsName, n, lvl)
  {
  var lvlTT = TextFuncTypes2[lvl]
  var x = ''
  if (lvlTT != '')
    x += statements[n] + '<ul><li><table class=\"itbl\"><tr><td class=\"txt\">' + lvlTT + '<\/td><td class=\"scr\"><\/td><\/tr><\/table><\/li><\/ul><br \/>'
  return x
  }

function interp( N, L )
  {
  return ( N==-1 && L=='W' ) ? 'below 1' : ( N==-1 && L=='C' ) ? 'beyond 3' : ( N==2 ) ? '1' : (N <= 4 && N > 2) ? '1+' : (N < 6 && N > 4) ? '2' : (N < 8 && N >= 6) ? '2+' : (N >= 8 && L == "W") ? '3 or higher' : '3'
  }

function get_xml_fill_content_class()
  {
  var lang, stName, uid, lvlW, lvlC = ''
  function skr( S )
    {
    var sk = S.indexOf('::') > -1 ? true : false
    var A = sk ? S.split('::') : [S,""]
    return A
    }
  function loadXml()
    {
    function localOnSuccess(responseText, args)
      {
      var output = responseText
      var data =  g_WS.ValidateBlubOutput(output)

      if (data)
        {
        //alert(''+data[0].prfdate+'^00^'+data[0].prfcdata)
        var ss = ''+data[0].prfdate+'^00^'+data[0].prfcdata
        }

      //g_XX.XML_HTTP_GET( g_SERVER + 'panel/profiler/sp_grab.asp?DB='+g_dbName+'&ID='+g_prfID )
      //var ss = g_XX.get_responseText().replace(/\'/ig, '\'')
      //theXML = 'Ackley_5932_korean_DPLC_1_20_2010_1263566408660'
      //alert(ss)

      xid('id_hidden').innerHTML =  ss.split('^00^')[1]
      eval( "W.Z =" + classify( document, "div", "USDTA" )[0].innerHTML )

      //g_lang = W.Z.lang
      //g_mode = W.Z.mode
      g_date = ss.split('^00^')[0].split(' ')[0]
    
      if ( isIn(mxdtsts, g_lang) )
        {
        lcde = tltlang[where(mxdtsts, g_lang)]
        mixed = true
        }

      after_loadXml()
      }//end localOnSuccess
    var args = []
    args.push(['dbName', g_dbName])
    args.push(['profileId', g_prfID])
    //var output = g_WS.tryPostForm('GetProfileDataById', args)
    g_WS.postForm('GetProfileDataById', args, localOnSuccess, onfail, [])

    } // loadXml
  function findLvls()
    {
    var tbs = document.getElementsByTagName("table")
    function git( X )
      {
      var Y
      for( var i=0, j=tbs.length; i<j; i++ )
        if(tbs[i].id == X )
          Y = i-1
      return Y
      }

    if( xid('id_hidden') )
      {
      lvlW = Z ? Z.lvlW : xid("lvlW").innerHTML                       //working level
      lvlC = Z ? Z.lvlC : xid("lvlC").innerHTML                       //ceiling level
      if (lvlW == -1 || lvlC == -1)
        fillOL(lvlW, lvlC)
      var PT = git( "W_OnOff" )
      xid( "W_OnOff" ).style.display = lvlW >= 3 ? "block"  : "none"
      tbs[PT].style.borderBottom     = lvlW >= 3 ? "0px"  : "1px solid #dddddd"

      PT = git( "C_OnOff" )
      xid( "C_OnOff" ).style.display = lvlC >= 3 ? "block"  : "none"
      tbs[PT].style.borderBottom     = lvlC >= 3 ? "0px"  : "1px solid #dddddd"

      xid("WL").innerHTML = xid("WLb").innerHTML = interp( lvlW, 'W' )
      xid("TL").innerHTML = xid("TLb").innerHTML = interp( lvlC, 'C' )
      W.lvlW = lvlW
      W.lvlC = lvlC
      }
    }// findLvls
  function findEachDP( clsName, n , lvl )
    {
    function isNum(t)
      {
      var R = false
      var ARR = "0123456789"
      for (var i = 0,iL=ARR.length;i<iL;i++)
        if (t == ARR.substr(i,1))
          R = true

      return R
      }
    var a  = classify( xid('id_hidden'), 'div', clsName )[0]
    var ZZ
    var x  = ""
    var arr = []
    if( classify( document, "div", clsName ).length > 0 )
        eval( "ZZ =" + classify( document, "div", clsName )[0].innerHTML )
    if ( lvl != -1 )
      {
      if( clsName == 'CHELP' && !a )
        {
        x = ""
        xid( 'id_chelp' ).style.display = 'none'
        }
      else if( clsName == 'WHELP' && !a )
        {
        x = ""
        xid( 'id_whelp' ).style.display = 'none'
        if( xid( 'lc_opt2'  ) )
          xid( 'lc_opt2'  ).style.display = 'none'
        }
      else
        {
        for(var pr in ZZ)
          arr.push( pr + ' : ' + eval("ZZ."+pr) )
        x = arr.join("<br \/>")
        }
      }
    else
      x = findTT(clsName, n, lvl )

    var X = 0
    var M
    var ful_ID = 'id_' + clsName + X
    var ttl_ID = 'id_' + clsName.substr(0, clsName.length-1) + X
    var rsl_ID = 'id_' + clsName.substr(0, clsName.length-2)
    var otr = xid( ful_ID ).parentNode
    if( ZZ )
      xid( ttl_ID ).innerHTML = ZZ.header
    var bdh = ""
    var BDH = ["VOCAB:Subject Area","STRCT:Structural Feature","DISCS:Discourse Feature"]
    for(var f=0, g=BDH.length; f<g; f++)
      if(clsName.indexOf(BDH[f].split(":")[0]) > -1)
        bdh = "<h5>" + BDH[f].split(":")[1] + " Breakdown<\/h5>"

    for( var rpi in ZZ )
      {
      if( rpi.indexOf("rprt") > -1 )
        {
        //~Botros added for the 2 digits numbers
          if ( rpi.length > 5 )
            var nrO = rpi.charAt(rpi.length-2)
          else
            var nrO = rpi.charAt(rpi.length-1)

        M       = parseInt( nrO ) - 1
        var N   = parseInt( nrO ) + 1
        var min_ID = 'id_' + clsName.substr(0, clsName.length-3) + nrO

        var ntr = otr.cloneNode(true)
        ntr.setAttribute( "id", otr.id.replace(/\d$/, nrO) )
        
        ntr.getElementsByTagName("td")[0].setAttribute( "id", ful_ID.substr(0, ful_ID.length-1) + nrO )
        ntr.getElementsByTagName("td")[0].innerHTML = ""

        ntr.getElementsByTagName("td")[1].setAttribute( "id", ful_ID.substr(0, ful_ID.length-3) + nrO )
        ntr.getElementsByTagName("td")[1].innerHTML = ""

        //case mixed testlets, another cell for sub score
        //change ==>
        if (mixed)
          {      
          //ntr.insertCell(ntr.getElementsByTagName("td").length)
          ntr.getElementsByTagName("td")[2].setAttribute( "id", ful_ID.substr(0, ful_ID.length-3) + 'e' + nrO )
          ntr.getElementsByTagName("td")[2].innerHTML = ""
          }

         //var zz = findQ( xid( ful_ID.replace(/\d$/, parseInt( rpi.charAt(rpi.length-1) ) - 1 ) ).parentNode )

        //~Botros added for the 2 digits numbers
        if ( rpi.length > 5 )
          var zz = findQ( xid( ful_ID.replace(/\d$/, parseInt( rpi.charAt(rpi.length-2), 10 ) - 1 ) ).parentNode )
        else
          var zz = findQ( xid( ful_ID.replace(/\d$/, parseInt( rpi.charAt(rpi.length-1), 10 ) - 1 ) ).parentNode )


        if( otr.parentNode.getElementsByTagName("tr")[zz+1] )
          otr.parentNode.insertBefore(ntr, otr.parentNode.getElementsByTagName("tr")[zz+1])
        else
          otr.parentNode.appendChild(ntr)

        //insert description into td
        if( eval("ZZ." + rpi) != "" )
          xid( ful_ID.substr(0, ful_ID.length-1) + M ).innerHTML = '<div class="' + eval('ZZ.clas'+nrO) + '">' + eval("ZZ." + rpi).replace(/\*/g,"<\/div><div class=\"dtt\">") + "</div><br/>"

        //if( eval( "ZZ.vxdt" + nrO ) != "" )
        //  xid( rsl_ID + M ).innerHTML = eval( "ZZ.vxdt" + nrO ) + "<br/>"

        /*
        if( eval( "ZZ.vxdt" + nrO ) != "" )
          if ( eval( "ZZ.vxdt" + nrO ).length < 4 )
            xid( rsl_ID + M ).innerHTML = eval( "ZZ.vxdt" + nrO ) + "<br/>"
          else
            {
            var tmp = eval( "ZZ.vxdt" + nrO )
            tmp = tmp.substr( tmp.length - 3 )
            xid( rsl_ID + M ).innerHTML = tmp + "<br/>"
            }
        */


        if( eval( "ZZ.vxdt" + nrO ) != "" )
          {
          if ( eval( "ZZ.vxdt" + nrO ).length < 6 )
            {
            xid( rsl_ID + M ).innerHTML = eval( "ZZ.vxdt" + nrO ) + "<br/>"
            }
          else //case string with extra unneeded stuff
            {
            var tmp    = eval( "ZZ.vxdt" + nrO )
            var vxdtL  = tmp.length
            var sIndex = tmp.lastIndexOf('\/')

            if ( (vxdtL - (sIndex+1)) == 2 )//case 0/10 or 10/10
              {
              if ( isNum( tmp.substr(sIndex-2,1) ) )
                tmp = tmp.substr( tmp.length - 5 )
              else
                tmp = tmp.substr( tmp.length - 4 )
              }
            else //case 0/4
              tmp = tmp.substr( tmp.length - 3 )

            xid( rsl_ID + M ).innerHTML = tmp + "<br/>"
            }
          }

          //=>change
          //fill extra testlets breakdown
          if (mixed)
            {
            if( ( eval( "ZZ.vxdte" + nrO )) && (eval( "ZZ.vxdte" + nrO ) != "") )
              {
              if ( eval( "ZZ.vxdte" + nrO ).length < 6 )
                {
                xid( rsl_ID + 'e' + M ).innerHTML = eval( "ZZ.vxdte" + nrO ) + "<br/>"
                }
              else //case string with extra unneeded stuff
                {
                var tmp    = eval( "ZZ.vxdte" + nrO )
                var vxdtL  = tmp.length
                var sIndex = tmp.lastIndexOf('\/')

                if ( (vxdtL - (sIndex+1)) == 2 )//case 0/10 or 10/10
                  {
                  if ( isNum( tmp.substr(sIndex-2,1) ) )
                    tmp = tmp.substr( tmp.length - 5 )
                  else
                    tmp = tmp.substr( tmp.length - 4 )
                  }
                else //case 0/4
                  tmp = tmp.substr( tmp.length - 3 )

                xid( rsl_ID + 'e' + M ).innerHTML = tmp + "<br/>"
                }
              }
                else {
                    if (eval("ZZ.vxdt" + nrO).length > 0) {
                      if ( xid(rsl_ID + 'e' + M) != null)
                         {
                            xid(rsl_ID + 'e' + M).innerHTML = "--<br/>"
                         }
                   }
                }
            }

        if( eval( "ZZ.vxdt" + nrO + "b" ) && eval( "ZZ.vxdt" + nrO + "b" ) != "" )
          xid( rsl_ID + M + "b" ).innerHTML = eval( "ZZ.vxdt" + nrO + "b") + "<br/>"

        if( (clsName.indexOf("MAIN")==-1 && clsName.indexOf("SUPP")==-1) && eval("ZZ.clas" + nrO)=="dtb" && eval("ZZ.clas" + N)=="dtt" )  //&&
          {
				     	var xtr = otr.cloneNode(true)
          xtr.setAttribute( "id", otr.id.replace(/\d$/, nrO + "sub") )
          xtr.getElementsByTagName("td")[0].setAttribute( "id", ful_ID.substr(0, ful_ID.length-1) + nrO + "sub" )
          xtr.getElementsByTagName("td")[0].innerHTML = bdh

          xtr.getElementsByTagName("td")[1].setAttribute( "id", ful_ID.substr(0, ful_ID.length-3) + nrO + "sub" )
          xtr.getElementsByTagName("td")[1].innerHTML = ""

          //case mixed testlets, another cell for sub score
          //change ==>
          if (mixed)
            {
            //xtr.insertCell(xtr.getElementsByTagName("td").length)
            xtr.getElementsByTagName("td")[2].setAttribute( "id", ful_ID.substr(0, ful_ID.length-3) + 'e' + nrO + "sub" )
            xtr.getElementsByTagName("td")[2].innerHTML = ""
            }


          otr.parentNode.insertBefore(xtr,otr.parentNode.getElementsByTagName("tr")[zz+1])
          xid( ful_ID.substr(0, ful_ID.length-1) + M ).innerHTML = '<div class="' + eval('ZZ.clas'+nrO) + '">' + eval("ZZ." + rpi).replace(/\*/g,"<\/div><div class=\"dtt\">") + "</div><br/>"
          }
        }
      }
    if( clsName != "CHELP" && clsName != "CLHLP" && clsName != "WHELP" && clsName != "WLHLP" )
      {
      xid( rsl_ID + '0' ).innerHTML = "<h3>" + ZZ.skr + "</h3>"
      //change ==>
      if (mixed)
        {
        var pp = xid( rsl_ID + '0' ).parentNode.getElementsByTagName("td")[2].innerHTML = "<h3>" + ZZ.skre + "</h3>"
        }
      }
    }// findEachDP

  function findIndvInfo()
    {
    function capLang(l) 
      {
        //l = 'nkorean' == l ? 'korean \/ North Korean' : l
        l = isIn(mxdtsts, l) ? mixedLngsNames[where(mxdtsts, l)] : l
        return l.substr(0,1).toUpperCase() + l.substr(1)
      }
    var p = xid('id_hidden')
    var Divz = p.getElementsByTagName( 'div' )
    var info = Divz[0].innerHTML

    document.images["head"].src = g_mode == "LC" ? "images/dps/head_lc.png" : "images/dps/head_rc.png"
    xid("mode").innerHTML =       g_mode == "LC" ? "Listening Assessment" : "Reading Assessment"


    var a = info.split( '||' )
    xid('id_lang').innerHTML   = capLang(W.Z.lang)//W.Z.lang.substr(0,1).toUpperCase() + W.Z.lang.substr(1)
    xid('id_stname').innerHTML = W.Z.name //a[2]
    //var b   = theXML.indexOf('DP')
    //var c   = theXML.lastIndexOf('_')
    //var in1 = theXML.substring(b+2, c)
    //in1     = in1.substr(3).replace( /_/g , '/' )
    xid('id_date').innerHTML = g_date
    }// findIndvInfo
  function collapseDiv(lvlW, lvlC)
    {
    var outSt = '&nbsp;&nbsp;&nbsp;&nbsp;As noted above, no data is available for this section.<br /><br />'
    if (lvlW == -1)
      {
      xid( 'id_can' ).innerHTML = outSt
      xid( 'indWC' ).style.display = "none"
      xid( 'indWL' ).style.display = "none"
      }
    else if (lvlC == -1)
      {
      xid( 'id_need').innerHTML = outSt
      xid( 'indCC' ).style.display = "none"
      xid( 'indCL' ).style.display = "none"
      }
    }  // collapseDiv

  function zapRows()
    {
    var tbls = rec_classify( document, "table", "hnd(_f)*" )
    for(var q=0, r=tbls.length; q<r; q++)
      {
      var refs = []
      var trs = tbls[q].getElementsByTagName( "tr" )
      for(var s=0, t=trs.length; s<t; s++)
        {
        var mty = false
        var tds = trs[s].getElementsByTagName( "td" )
        for(var u=0, v=tds.length; u<v; u++)
          {
          if( tds[u].innerHTML.Trim() != "" )
            {
             mty = true
              break
            }
          }
        if(!mty)
          refs.push( trs[s] )
        }
      for( var z=refs.length-1; z>-1; z-- )
        tbls[q].getElementsByTagName("tbody")[0].removeChild( refs[z] )
      var trs = tbls[q].getElementsByTagName( "tr" )
      var tds = trs[trs.length-1].getElementsByTagName("td")
      if( tds[0].innerHTML.indexOf("<h5>") > -1 )
        tbls[q].getElementsByTagName("tbody")[0].removeChild( trs[trs.length-1] )
      }
    }// zapRows

  function percentify()
    {
    var curLL  = ""
    var dest   = []
    var indiWC = []
    var indiWL = []
    var indiCC = []
    var indiCL = []
    var toScanNS = ["WMAI", "WSUP", "WVOC", "WSTR", "WDIS", "CMAI", "CSUP", "CVOC", "CSTR", "CDIS"]
    var toScan   = []
    for(var gw=0, z=toScanNS.length; gw<z; gw++)
      {
      var divs = re_classify( document, 'td' , "id_"+ toScanNS[gw] + "\\d+$" )
      for( var gwb=0, zz=divs.length; gwb<zz; gwb++ )
        if( !divs[gwb].match(/VOC0$/) )
          toScan.push( divs[gwb] )
      }

    for(var gw=0, z=toScan.length; gw<z; gw++)
      {
      var clsName = toScan[gw]
      var LL = clsName.substr(3,1).toUpperCase() + ( ( clsName.indexOf("MAI") > -1 || clsName.indexOf("SUP") > -1 ) ? 'C' : 'L' )

      if( curLL != "" && curLL != LL )
        {
        indicate( curLL, dest[0], dest[1] )
        curLL = LL
        }
      else if(curLL == "")
        curLL = LL
      var X = 0
      var Y = 0
      if( xid( clsName ) )
        {
        var x = xid( clsName ).innerHTML
        if( clsName.indexOf("VOCAB") > -1 )
          {
          if( x.match(/\d+\s*\/\s*\d+/g) )
            {
            var tots = x.match(/\d+\s*\/\s*\d+/g)
            var nums = tots[tots.length-1]
            x = x.replace(tots[tots.length-1],"<br\/><br\/>Total:<br\/>" + nums)
            X = nums.split( "\/" )[0]
            Y = nums.split( "\/" )[1]
            }
          }
        else
          {
          var tots = x.match(/\d+\s*\/\s*\d+/g)
          if(tots)
            {
            var nums = tots[tots.length-1]
            X = nums.split( "\/" )[0]
            Y = nums.split( "\/" )[1]
            }
          }
        }
      dest = eval( "indi" + curLL )
      if( dest.length == 0 )
        dest.push( X, Y )
      else
        {
        dest[0] = parseInt(dest[0]) + parseInt(X)
        dest[1] = parseInt(dest[1]) + parseInt(Y)
        }
      if( gw == z-1 )
        indicate( curLL, dest[0], dest[1] )
      }
    } // percentify

  function wrLink()
    {

    var langs = ["arabic:2","chinese:3","dari:5", "french:6","korean:12","pashto:13",  "farsi:14", "russian:15","spanish:17","portuguese:20", "urdu:21" , "tagalog:30", "iraqi:33" , "levantine:35", "nkorean:42", "balochi:44", "somali:45"]
    var skils = ["RC:1","LC:2"]
    var arys  = [langs,skils]
    var ary   = [g_lang,g_mode]
    var code  = ["",""]

    for( var i=0,j=arys.length; i<j; i++ )
      for( var w=0, z=arys[i].length; w<z; w++ )
        if(arys[i][w].split(":")[0] == ary[i])
          code[i] = arys[i][w].split(":")[1]

    var topix = ["culture:1","economy:2","environment:3","geography:4","military:5","politics:6","science:7","security:8","society:9","technology:10"]
    var A = eval( xid( "topix" ).innerHTML )

    var R = g_SUGGEST + "?langId=" + code[0] + "&levelId=" + lvlC + "&modId=" + code[1] + "&topic="
    var Ls = []

    for( var w=0, z=A.length; w<z; w++ )
      {
      var T = A[w].split(":")[0].toLowerCase()
      var S = A[w].split(":")[1].toLowerCase()
      for( var i=0, j=topix.length; i<j; i++ )
        if( T == topix[i].split(":")[0] )
          {
          var D = topix[i].split(":")[1]
          if( !isIn( Ls, D ) )
            Ls.push( D )
          }
        }


    if( lvlW >= -1 && lvlC < 9 )
      {
      xid( "sug" ).style.display = "inline"
      xid( "sug" ).onclick = function()
        {
        window.location.href = R + Ls.join(",")
        }
      }
    }

  //change ==>
  //adds cell into header, runs only if mixed langs
  function make_three_cols()
    {
    if (mixed)
      {
      var tbs = classify(document, 'table', 'hnd')
      for (var x=0,xL=tbs.length;x<xL;x++)
        {
        var tbl = tbs[x]
        if (tbl.id == "")
          {
          tbl.rows[0].insertCell(tbl.rows[0].cells.length)

          //change classes
          //tbl.rows[0].cells[0].setAttribute( "class", "hedr_a_e" )
          //tbl.rows[0].cells[1].setAttribute( "class", "hedr_b_e" )
          //tbl.rows[0].cells[2].setAttribute( "class", "hedr_ee" )
          tbl.rows[0].cells[0].className = 'hedr_a_e'
          tbl.rows[0].cells[1].className = 'hedr_b_e'
          tbl.rows[0].cells[2].className = 'hedr_ee'
          //NKR column header
          var headerLang =  mixedLngsNames[where(mxdtsts, g_lang)].split('/')
          tbl.rows[0].cells[tbl.rows[0].cells.length - 1].innerHTML = '<b>' + headerLang[1].Trim() + ' Only<\/b>' + ' <br \/>Correct \/ Total'
          //tbl.rows[0].cells[tbl.rows[0].cells.length-1].setAttribute( "class", "hedr_ee" )
          //add "All" to second column 
          tbl.rows[0].cells[tbl.rows[0].cells.length - 2].innerHTML = '<b>All ' + headerLang[0].Trim() + '</b><br \/><br \/>' + tbl.rows[0].cells[tbl.rows[0].cells.length - 2].innerHTML

          //==>debug del
          //tbl.rows[0].cells[0].setAttribute( "style", "border: 1px solid black" )
          //tbl.rows[0].cells[1].setAttribute( "style", "border: 1px solid red" )
          //tbl.rows[0].cells[2].setAttribute( "style", "border: 1px solid blue" )
          }
        }
        
      //add third cell to rows 0 in all working
      var tds = classify(document, 'td', 'hedr_b')
      for (var x=0,xL=tds.length;x<xL;x++)
        {
        var TR = tds[x].parentNode
        if (TR.cells.length < 3)
          {
          TR.insertCell(TR.cells.length)
          if ('hedr_a' == TR.cells[0].className  )
            {
            TR.cells[0].className = "hedr_a_e"
            }
          else if ('hedr_b' == TR.cells[1].className)
            {
            TR.cells[1].className = "hedr_b_e"
            }

          TR.cells[2].className = "hedr_ee"

          //==>test del
          //TR.cells[0].setAttribute( "style", "border: 1px solid black" )
          //TR.cells[1].setAttribute( "style", "border: 1px solid red" )
          //TR.cells[2].setAttribute( "style", "border: 1px solid blue" )
          }
        }

      //add third cell to rows 0 in all ceiling
      var tds = classify(document, 'td', 'css_intro')
      for (var x=0,xL=tds.length;x<xL;x++)
        {
        var TR = tds[x].parentNode
        if (TR.cells.length < 3)
          {
          TR.insertCell(TR.cells.length)
          TR.cells [TR.cells.length-1].innerHTML = ''
          //TR.cells[TR.cells.length-1].setAttribute( "class", "hedr_be" )

          //==>test del
          //TR.cells[0].setAttribute( "style", "border: 1px solid black" )
          //TR.cells[1].setAttribute( "style", "border: 1px solid red" )
          //TR.cells[2].setAttribute( "style", "border: 1px solid blue" )
          }
        }
      }
    }// add_hnd
    
  //for debugging async 
  //alert('hold')
  //start get_xml_fill_content_class actions
  loadXml()

  function after_loadXml()
    {
    findLvls()

    //change for NKR==>
    make_three_cols()

    findEachDP(  'WMAINI', 1, lvlW )
    findEachDP(  'WVOCAB', 1, lvlW )
    findEachDP(  'WSUPPI', 4, lvlW )
    findEachDP(  'WSTRCT', 1, lvlW )
    findEachDP(  'WDISCS', 1, lvlW )
    findEachDP(  'CMAINI', 3, lvlC )
    findEachDP(  'CSUPPI', 4, lvlC )
    findEachDP(  'CVOCAB', 3, lvlC )
    findEachDP(  'CSTRCT', 3, lvlC )
    findEachDP(  'CDISCS', 3, lvlC )

    if( 'LC' == g_mode )//(xid("mode").innerHTML == "Listening Assessment")
      {
      xid( "section_3" ).style.display  = "block"
      if( lvlW > -1)
        xid( "section_1B" ).style.display = "block"
      findEachDP(  'CHELP',  0, lvlC )
      findEachDP(  'CLHLP',  0, lvlC )
      findEachDP(  'WHELP',  0, lvlW )
      findEachDP(  'WLHLP',  0, lvlW )
      }
    findIndvInfo()
    collapseDiv(lvlW, lvlC)
    zapRows()
    percentify()
    //begin change=>
    //modified to check if there is actual topix or not
    //problem with lvlc=-1 its innerHTML=[""] length=4, no need to prepare material link
    //old: if ( xid("topix") )
    //~Botros
    if ( xid("topix").innerHTML.length > 4  )
      wrLink()
    }
  }// get_xml_fill_content_class

function initPg()
  {
    var CGI_i = new CGI_input_class()
    g_prfID  = CGI_i.ID
    g_dbName = CGI_i.DB
    g_lang   = g_dbName.split('_')[1]
    g_mode   = g_dbName.split('_')[2] == 'rc' ? 'RC' : 'LC'
    //var dStuff = CGI_i.XML.split("^")
    //theXML = dStuff[0]
    //theFile = "records\\" + dStuff[1] + "\\profiles\\" + theXML       //    "users\\" + dStuff[1] + "\\profiles\\" + theXML

  //var rex = new RegExp("DPLC|LCDP")
  //g_mode = rex.test(theFile) ? "listening" : "reading"
  //document.images["head"].src = rex.test(theFile) ? "images/dps/head_lc.png" : "images/dps/head_rc.png"
  //xid("mode").innerHTML =       rex.test(theFile) ? "Listening Assessment" : "Reading Assessment"
  }

function indicate( Wh, X, Y )
  {
  var num = (Y == 0) ? 0 : Math.round( X*10000/Y )/100
  xid( Wh + "rslt" ).innerHTML = num + "%"

  var comp = ( ( navigator.userAgent.indexOf("MSIE 6") > -1 ) && ( lvlW > -1 && lvlC > -1 ) ) ? [-4,10] : ( ( navigator.userAgent.indexOf("MSIE 6") > -1 ) && ( lvlW == -1 || lvlC == -1 ) ) ? [8,10] : [4,9]
  xid( "arrw" + Wh ).style.left = ( navigator.userAgent.indexOf("MSIE 6") > -1 ) ? ( num*2.4 + comp[0] ) + 'px' : ( num*2.4 - comp[0] ) + 'px'
  xid( Wh + "rslt" ).style.left = ( navigator.userAgent.indexOf("MSIE 6") > -1 ) ? ( num*2.4 + comp[1] ) + 'px' : ( num*2.4 - comp[1] ) + 'px'
  }

Debug = !true

var W  = null 


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

window.onload = function()
  {
  W = window
  W.g_mode    = ""
  W.g_lang    = ""
  W.g_date    = ""
  W.g_XX      = new XML_HTTP_class()
  W.xmlDoc    = null
  W.g_prfID     = 0
  W.g_dbName    = ''
  W.g_SERVER  = Debug ? '' : myPath
  W.g_SUGGEST = Debug ? 'DA_Suggestions.html' : "http://www.dliflc.edu/appmanager/DA_Suggestions.html"//"http://it.lingnet.org/DA_Suggestions.html"
  W.g_WS      = new webServiceClass()
  initJQAjaxSettings()
  var I = ["WC","CC","WL","CL"]
  initPg()
  W.g_YY = new get_xml_fill_content_class()
  var pbs = classify( document, 'img', 'css_btn_print' )
  for( var w=0, z=pbs.length; w<z; w++ )
    with (new foundation_gif_btn_class( pbs[w].id ) )
      do_click = new Function( "print()" )
  }