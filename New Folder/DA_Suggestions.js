var IE     = window.ActiveXObject ? true : false
var links  = []
var tbls   = []
var pnums  = []
var pageN  = 0
var xmlDoc = null

String.prototype.L_Trim      = new Function( "return this.replace(/^\\s+/,'')"   )
String.prototype.R_Trim      = new Function( "return this.replace(/\\s+$/,'')"   )
String.prototype.Trim        = new Function( "return this.L_Trim().R_Trim()"     )
		
function prep()
		{
		function wait()
				{
				if(xmlDoc.childNodes.length > 0)
						{
						window.clearInterval( tt )
						init()
						}
				}
		var tt = setInterval(wait, 10)
		}

function load_XML( URX )
  {
  var XML_HTTP = null
  var complete = 4
  function load_start(PROC)
    {
    function F()
      {
      PROC()
      }
    setTimeout(F, 0)
    }
  function load_done()
    {
    function F()
      {
      prep()
      }
    if (true)
      var simulate_download_time = 0
    else
      var simulate_download_time = 1000
    setTimeout(F, simulate_download_time)
    }
  function AA()
    {
    function FA()
      {
      XML_HTTP.open( 'get', URX, true )
      XML_HTTP.send()
      }
    xmlDoc = new ActiveXObject( 'Microsoft.XMLDOM' )
    XML_HTTP = new ActiveXObject( 'Microsoft.XMLHTTP' )
    XML_HTTP.onreadystatechange = function()
      {
      if (XML_HTTP.readyState==complete)
        {
        xmlDoc.loadXML( XML_HTTP.responseText )
        load_done()
        }
      }
    load_start(FA)
    }
  function AB()
    {
    function FA()
      {
      if (XML_HTTP.overrideMimeType)
        XML_HTTP.overrideMimeType('text/xml')
      XML_HTTP.open('GET', URX, true)
      XML_HTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      XML_HTTP.send('')
      }
    XML_HTTP = new XMLHttpRequest()
    XML_HTTP.onreadystatechange = function()
      {
      if (XML_HTTP.readyState == complete)
        {
        xmlDoc = XML_HTTP.responseXML
        load_done()
        }
      }
    load_start(FA)
    }
  function AC()
    {
    function FA()
      {
      xmlDoc = document.implementation.createDocument( '', '', null )
      xmlDoc.async = true
      xmlDoc.load( URX )
      xmlDoc.onload = function()
        {
        load_done()
        }
      }
    load_start(FA)
    }
  if (window.ActiveXObject)
    AA()
  else if (window.XMLHttpRequest)
    AB()
  else if (document.implementation && document.implementation.createDocument)
    AC()
  else
    alert('XML not supported.')
  }

function xid( a )
  {
  return document.getElementById( a )
  }

function render( x )
  {
  var cn = x.childNodes
  for( var w=0, z=cn.length; w<z; w++ )
    if( cn[w].nodeType == 1 )
      render( cn[w] )
    else if( cn[w].nodeType == 3 )
      ts.push( cn[w].nodeValue )
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

function foundation_back_next_class( the_id )
  {
  var _this = this
  var e = xid(the_id)
  if (e)
    {
    var a = e.src+''
    if(a.substr(a.length - 7, a.length) != '_on.gif')
      var b = a.substr(0, a.length-4) + '_on.gif'
    else
      {
      var x = e.src
      a = x.substr(0, x.length - 7) + '.gif'
      var b = a.substr(0, a.length-4) + '_on.gif'
      }
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
		
function eXt( n )
  {
		var vtr = n.nodeName == "#text" ? n.nodeValue : n.firstChild ? n.firstChild.nodeValue : n.nodeValue	
		return vtr
		}

function extractData()                                  //gathering data
  {
  var lessons = xmlDoc.getElementsByTagName('lesson')
  var lessonNum = 0
  var trs = []
  for( var i=0, I=lessons.length; i<I; i++ )                    //making a tr group
    {
    var children = lessons[i].childNodes
    var new_TR = document.createElement( "tr" )
    for(var j=0; j<children.length; j++)                   //making a td group
      {
      var nodename = children[j].nodeName
      var new_TD = document.createElement( "td" )
      new_TD.setAttribute("class", nodename)
      if(nodename != "link" && children[j].nodeType == 1)   //seperating <td>s from the linked addresses
        {
        if(nodename == "id")                               //getting data
          {
          var textNode = document.createTextNode(i+1)
          new_TD.appendChild(textNode)
          new_TD.setAttribute("class", nodename)
          }
        else if(nodename == "onlineTitle")
          {
          var elementA = document.createElement( "a" )
          elementA.setAttribute("name", "links")
          var textNode = document.createTextNode( eXt( children[j].firstChild ) )
          elementA.appendChild(textNode)
          new_TD.appendChild(elementA)
          new_TD.setAttribute("class", nodename)
          }
        else if(nodename == "languageId")  // Arabic:2, Chinese:3, Korean:12, Russian:15
          {
          new_TD.setAttribute("class", nodename)
          if(children[j].firstChild.nodeValue == 2)
            {
            var textNode = document.createTextNode("Arabic")
            new_TD.appendChild(textNode)
            }
          else if(children[j].firstChild.nodeValue == 3)
            {
            var textNode = document.createTextNode("Chinese")
            new_TD.appendChild(textNode)
            }
          else if(children[j].firstChild.nodeValue == 12)
            {
            var textNode = document.createTextNode("Korean")
            new_TD.appendChild(textNode)
            }
          else
            {
            var textNode = document.createTextNode("Russian")
             new_TD.appendChild(textNode)
            }
          }
        else if(nodename == "levelId")
          {
          new_TD.setAttribute("class", nodename)
          var levels = ["0+", 1, "1+", "1+\/2", 2,"2+", "2+\/3", 3, "3+", "3+/4", 4]
          for(var n = 0; n<levels.length; n++)
            {
            if(children[j].firstChild.nodeValue == (n+1))
              {
              var textNode = document.createTextNode(levels[n])
              new_TD.appendChild(textNode)
              }
            }
          }
        else if(nodename == "modalityId")
          {
          new_TD.setAttribute("class", nodename)
          var modality = ["Reading", "Listening", "Speaking", "Writing", "Integrated Skills"]
          for(var n = 0; n<modality.length; n++)
            {
            if(children[j].firstChild.nodeValue == (n+1))
              {
              var textNode = document.createTextNode(modality[n])
              new_TD.appendChild(textNode)
              }
            }
          }
        else if(nodename == "topicId")
          {
          new_TD.setAttribute("class", nodename)
          var topics = ["Culture", "Economy", "Environment", "Geography", "Military", "Politics", "Science", "Security", "Society", "Technology"]
          for(var n = 0; n<topics.length; n++)
            {
            if(children[j].firstChild.nodeValue == (n+1))
              {
              var textNode = document.createTextNode(topics[n])
              new_TD.appendChild(textNode)
              }
            }
          }
        else if(nodename == "onlineDescription" || nodename == "subTopicId")
          {
          var textNode = document.createTextNode( eXt( children[j].firstChild ) )
          new_TD.appendChild(textNode) 
          new_TD.setAttribute("class", nodename)
										}
								else		
										continue		
        new_TR.appendChild(new_TD)                               //appending <td>s to a <tr>
        }
      else if(children[j].nodeType == 1)                         //gathering linked addresses
        links.push(children[j].firstChild.nodeValue)
      }
    trs.push(new_TR)                                           //gathering trs

				if((i>0 && i%10 == 9) || (i+1 == lessons.length))         //to make ten-tr tables
						{
						navigPages(i, trs)
						trs = []
						}
    }
  }

function navigPages(lessonNum, tenTrs)                      //making ten-row pages and page numbers
  {
  var r = lessonNum/10                                                         //page numbers
  var pNum = Math.round(r) > r ? Math.round(r) : Math.round(r) + 1
  var pBtn = document.createElement("div") //document.createElement("img")
  pBtn.innerHTML = pNum //src = "images\/navigation\/bt_" + pNum +".gif"
  pBtn.id= "pbtn"+ pNum
  pBtn.name = pNum
  pBtn.setAttribute("class", "pageNum")
  pnums.push(pBtn)

  headTr()                                                      // head row
  var tableId = "table" + pNum                                   //seperating tables
  var newTable = document.createElement("table")
  newTable.id = tableId
  newTable.setAttribute("class", "tbls")
  newTable.appendChild(headTR)
  if(tenTrs.length == 10)
    for(var p=0; p<tenTrs.length; p++)
      newTable.appendChild(tenTrs[p])
  else
    {
    for(var p=0; p<tenTrs.length; p++)
      newTable.appendChild(tenTrs[p])
    for(var q=0; q <(10 - tenTrs.length); q++)
      {
      var emptyTr = document.createElement("tr")
      newTable.appendChild(emptyTr)
      for(var x=0; x<7; x++)
        {
        var emptyTd = document.createElement("td")
        emptyTr.appendChild(emptyTd)
        emptyTd.innerHTML = "&nbsp;"
        }
      }
    }
  tbls.push(newTable)
  }

function headTr()
  {
  var hClass = ["id","onlineTitle", "onlineDescription", "languageId", "levelId", "modalityId", "topicId","subTopic"]
  var hTxt = ["No.", "Title", "Description", "Lang", "Level", "Mode", "Topic","Subtopic"]
  headTR = document.createElement("tr")
  for(var u=0; u<hTxt.length; u++)
    {
    var TH = document.createElement("th")
    TH.setAttribute("class",hClass[u])
    var txt = document.createTextNode(hTxt[u])
    TH.appendChild(txt)
    headTR.appendChild(TH)
    }
  }

function appendTbls()                                        //appending tables
  {
  for(var t=0; t<tbls.length; t++)
    xid( "innerBox" ).appendChild( tbls[t] )
  }

function pageButtons()                                          //all buttons in the same class "pageNum"
  {
  var bakk = document.createElement("span")//document.createElement("img")                      //back & next buttons
  var next = document.createElement("span")//document.createElement("img")
  bakk.innerHTML = "<<" //.src = "images\/navigation\/back.gif"
  next.innerHTML = ">>" //src = "images\/navigation\/next.gif"
  bakk.id = "back"
  next.id = "next"
  bakk.setAttribute("class", "pageNum")
  next.setAttribute("class", "pageNum")

  var pSpan = document.createElement("div")
  pSpan.id = "pageNumbers"
  pSpan.appendChild(bakk)
  for(var q=0;q < pnums.length; q++)                               //appending page buttons
    pSpan.appendChild( pnums[q] )
  pSpan.appendChild(next)
  xid( "innerBox" ).appendChild( pSpan )
  for(var r=0; r<tbls.length; r++)                                //first page shown when opened.
    if(r != 0)
      tbls[r].style.display = "none"
  }

function showPage(pageN)                                            //page button linked to each table
  {
  for(var r=0; r<tbls.length; r++)
    {
    tbls[r].style.display = "table"
    if(r != pageN-1)
      tbls[r].style.display = "none"
    back_next(pageN)
    }
  }

function back_next(pageN)
  {
		with (new foundation_back_next_class("back"))                      // back button activated
				if(pageN !=1)
						do_click = new Function(spf("showPage(~)",[pageN - 1]) )
		with (new foundation_back_next_class("next"))                      // next button activated
				if(pageN != tbls.length)
						do_click = new Function(spf("showPage(~)",[pageN + 1]) )
  }

function clicker()
  {
  for(var s=0;s < pnums.length; s++)                              //making page buttons
    with (new foundation_gif_btn_class( pnums[s].id ) )
      do_click = new Function( spf("showPage(~)",[s + 1]) )
  }

function linking()                                               //linking each title to the designated address
  {
  var linx = document.getElementsByName("links")
  for(var k=0; k<linx.length; k++)
    linx[k].href =links[k]
  }

function init()
  {
		extractData()
		appendTbls()
		pageButtons()
		linking()
		back_next( 1 )
		clicker()
  }
		
function CGI_o()
  {
		var _this = this
		function initz()
		  {
		  var cr = window.location.toString().split("?")[1]
				var props = cr.split("&")
				for( var w=0, z=props.length; w<z; w++ )
				  {
						var p = props[w].split("=")[0]
						var v = props[w].split("=")[1]
						eval( "_this." + p + "=\"" + v + "\"")
						}
				return this		
				}
		initz()
		}

window.onload = function()
  {
  var W = window
		W.ts = []
		W.lx = "http://it.lingnet.org/lessonxml.aspx"
		var O = new CGI_o()
  var U = lx + "?langId=" + O.langId + "&levelId=" + O.levelId + "&modId=" + O.modId + "&topic=" + O.topic
		
		/*var g_XX      = new XML_HTTP_class()
		g_XX.XML_HTTP_GET( U )
		var ss = g_XX.get_responseText()

		xid( "id_hidden" ).innerText = ss*/
		
		load_XML( U ) //"xml/lessonsB.xml" ) // loadFilexid( "id_hidden" ).innerHTML
  }