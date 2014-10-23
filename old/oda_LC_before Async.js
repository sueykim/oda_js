var gv_server = true
var clip_A_1  = false
var clip_A_2  = false
var clip_B_1  = false
var clip_B_2  = false

function loadAud( FN, B )
  {
  document.body.style.cursor = "wait"
  var wr = ''
  function ws()
    {
    for (var i=0, L=arguments.length; i<L; i++)
      wr += arguments[i]
    }
  function loadPlayer( A )
    {
    ws( '<embed ' )
    ws( ' src="', A, '"' )
    ws( ' width="185"')		//1"' changed 05-19-11 show player and allow play multiple times
    ws( ' height="26"')	 	//1"' changed 05-19-11 
    ws( ' quality="high"' )
    ws( ' bgcolor="#d4d4d4"' )
    ws( ' allowScriptAccess="sameDomain"' )
    ws( ' wmode="Transparent"')	//opaque"' changed 05-19-11 
    ws( ' type="application/x-shockwave-flash"' )
    ws( ' pluginspage="http://www.macromedia.com/go/getflashplayer">' )
    ws( '<\/embed>' )
    }
  var BTF = B ? 'true' : 'false'
  loadPlayer( 'swf/audioPlayerSmall.swf?testVar=' + encodeURIComponent(FN) + '&autoStart=' + BTF + '&streamAudio=false&playSegment=false&inPoint=0&outPoint=0' )
  document.body.style.cursor = "default"
  return wr
  }

function audClick(zid)
  {
  if(     clip_A_1 == true && clip_A_2 == false && clip_B_1 == false && clip_B_2 == false)
    xid( 'id_hid' + zid ).value = 1
  else if(clip_A_1 == true && clip_A_2 == true  && clip_B_1 == false && clip_B_2 == false)
    xid( 'id_hid' + zid ).value = 2
  else if(clip_A_1 == true && clip_A_2 == true  && clip_B_1 == true  && clip_B_2 == false)
    xid( 'id_hid' + zid ).value = 3
  else if(clip_A_1 == true && clip_A_2 == true  && clip_B_1 == true  && clip_B_2 == true )
    xid( 'id_hid' + zid ).value = 4
  else if(clip_A_1 == true && clip_A_2 == false && clip_B_1 == true  && clip_B_2 == false)
    xid( 'id_hid' + zid ).value = 5
  else if(clip_A_1 == true && clip_A_2 == false && clip_B_1 == true  && clip_B_2 == true )
    xid( 'id_hid' + zid ).value = 6
  else
    xid( 'id_hid' + zid ).value = 0
  }

function transferAns( oriID, modID, typx )
  {
  var orgInputs = xid( oriID ).getElementsByTagName( 'input' )
  var modInputs = xid( modID ).getElementsByTagName( 'input' )
  for (var i=0, L = orgInputs.length; i<L; i++)
    {
    if(orgInputs[i].checked)
      modInputs[i].checked = true
    else
      modInputs[i].value = orgInputs[i].value
    orgInputs[i].disabled = true
    }
  }

var modUsed = false

function activateModBtn( m_id, typx )
  {
  var myId     = m_id.substring(9)
  var oriAudId = 'id_oriAud' + myId
  var modAudId = 'id_modAud' + myId
  var zz = confirm( "Listen to this modified version only if you cannot understand the authentic one." )

  var myConf = ( modUsed == false ) ? zz : true
  if(myConf == false)
    return
  else
    {
    modUsed = true
    if( xid( 'id_audbtn' + myId + '_0' + '_1' ) )
      {
	/* //changed 05-19-11 show player and allow play multiple times
      xid( 'id_spanT' + myId + '_0' + '_1' ).style.color = '#cccccc'
      xid( 'id_audbtn' + myId + '_0' + '_1' ).src = xid( 'id_audbtn' + myId + '_0' + '_1' ).src.replace(/btnPlay\.gif/,"btnPlay_off.gif")
      with( new foundation_gif_btn_classA( 'id_audbtn' + myId + '_0' + '_1' ) )
        do_click = new Function( "return" )
	*/
      }

    var mQL = classify( xid(modAudId), "div", "css_QuestionBoxLC" ).concat( classify( xid(modAudId), "div", "css_QuestionBoxLC2" ) )
    for( var w=0, z=mQL.length; w<z; w++ )
      mQL[w].style.top   = 85  + "px"
    xid(modAudId).style.display = "inline"
    xid(modAudId).style.zIndex =  2

    var oQL = classify( xid(oriAudId), "div", "css_QuestionBoxLC" ).concat( classify( xid(oriAudId), "div", "css_QuestionBoxLC2" ) )
    for( var w=0, z=oQL.length; w<z; w++ )
      oQL[w].style.top   = 85  + "px"
    xid(oriAudId).style.display = "inline"
    xid(oriAudId).style.width   = 385 + "px"
    xid(oriAudId).style.zIndex  =  1           // this
    xid(m_id).style.display     = "none"

    xid( 'id_spanT' + myId + '_1' + '_0' ).style.display = 'inline'

    if(clip_A_1 == true && clip_A_2 == true && clip_B_1 == false && clip_B_2 == false)
      xid( 'id_spanT' + myId + '_0' + '_1' ).style.display = 'inline'   //none
    else if (clip_A_1 == true && clip_A_2 == false && clip_B_1 == false && clip_B_2 == false)
      xid( 'id_spanT' + myId + '_0' + '_1' ).style.display = 'inline'   //none
    else
      xid( 'id_spanT' + myId + '_0' + '_1' ).style.display = 'none'

    function disableAuthPass()
      {
      xid(oriAudId).style.color = "#cccccc" 
      var a = xid(oriAudId).getElementsByTagName('div')
      var b = xid(modAudId).getElementsByTagName('div')
      var c = xid(oriAudId).getElementsByTagName('img')
      var d = xid(oriAudId).getElementsByTagName('input')  //added
      if(typx != 'CI')
        {
        for(var i=0; i <a.length; i++)
          if(a[i].className == "css_questItem" || a[i].className=="css_QuestionBoxLC")
            a[i].disabled = true
        for (var i=0; i<c.length; i++)
          if(c[i].className == "css_btnAudChoice" || c[i].className == "css_btnAudChoice_rb")
            {
            c[i].src=c[i].src.replace(/btnPlay\.gif/,"btnPlay_off.gif")
            with( new foundation_gif_btn_classA(c[i].id)  )
              do_click = new Function( "return" )
            c[i].style.cursor = ""
            }
        if(typx == 'SA')
          {
          var myOrgAudID = xid( oriAudId )
          var myModAudID = xid( modAudId )
          var orgInputs = myOrgAudID.getElementsByTagName( 'textarea' )
          var orgImages = myOrgAudID.getElementsByTagName( 'img' )
          var modImages = myModAudID.getElementsByTagName( 'img' )
          var modInputs = myModAudID.getElementsByTagName( 'textarea' )

          for (var i=0, L = orgInputs.length; i<L; i++)
            {
            modInputs[i].rows = orgInputs[i].rows = 2
            modInputs[i].value =  orgInputs[i].value
            orgInputs[i].disabled = true
            }
          for (var i=0, L = orgImages.length; i<L; i++)
            {
		/* //added 05-19-11 show player and allow play multiple times
            orgImages[i].src=orgImages[i].src.replace(/btnPlay\.gif/,"btnPlay_off.gif")
            with( new foundation_gif_btn_classA(orgImages[i].id)  )
              do_click = new Function( "return" )
		*/
            }
          for( var W=0, Z=modImages.length; W<Z; W++ )
            {
            var fn = modImages[W].id
            var ff = modImages[W].getAttribute("file")
            var ft =  fn.split("_")[3] + "_" + fn.split("_")[4]
            with( new foundation_gif_btn_classA(modImages[W].id)  )
                do_click = new Function( spf("inst_playAud('~','~','~')", [fn,ff,ft]) )
            }
          }
        else
          for(var i = 0; i <a.length; i++ )
            if(a[i].className == "css_questItem")
              a[i].disabled = true
        }
      }
    disableAuthPass()
    }
  transferAns( oriAudId, modAudId, typx )
  }

function markingBtn(z, typ, drct)
  {
  var zLen  = z.length
  var actModBtnId = drct ? z.substring(6, (zLen-4)) : z.substring(6, (zLen-2))
  actModBtnId = drct ? 'id_actbtn_' + actModBtnId : 'id_act' + actModBtnId
  if (!xid(actModBtnId))
    {
    var aLen = actModBtnId.length
    actModBtnId  = actModBtnId.substr(0, aLen-2)
    }
  if (xid(actModBtnId))
    xid(actModBtnId).disabled = false
  if(typ)
     with( new foundation_gif_btn_class(actModBtnId)  )
        do_click = new Function( spf("activateModBtn('~','~')", [actModBtnId,typ]) )
  }

var endId = ''

function PR_playAudCk(myId, audname, FS, n, m, it)
  {
  var slf  = xid(myId)
   //changed  05-19-11 show player and allow play multiple times
  //slf.src = slf.src.replace(/btnPlay(?:_on)\.gif$/,'btnPlay_off.gif')
  //slf.disabled = true
  //slf.onclick = null
  //slf.mouseover = slf.mouseout = null
  //slf.style.cursor = ''
  var LOF  = audname.split("_")
  var LOFN = LOF[0] + "_" + LOF[1]
  var FL = gv_server ? 'media/' + LOFN + '/' + audname : 'Media/' + audname
  IHTML(xid( 'id_audioPlayer' ), loadAud( FL, true))
  var myLen = myId.length
  var commonId = myId.substring(9,(myLen-1))
  var shortId  = myId.substring(9,(myLen-4))
  var beginId = shortId
  if(beginId != endId)
    {
    clip_A_1 = false
    clip_A_2 = false
    clip_B_1 = false
    clip_B_2 = false
    }

  if(n==0 && m==0)
    {
    var myRb = document.getElementsByTagName('input')
    var myTx = document.getElementsByTagName('textarea')
    for (var i=0, L=myRb.length; i<L; i++)
      if (myRb[i].type == 'radio'||myRb[i].type == 'checkbox'||myRb[i].type == 'text')
        myRb[i].disabled = false
    for (var i=0, L=myTx.length; i<L; i++)
      myTx[i].disabled   = false
    clip_A_1 = true ////-- changed to play as many times as the user wants
    }
  if(n==0 && m==1)
    clip_A_2 = true
  if(n==1 && m==0)
    clip_B_1 = true
  if(n==1 && m==1)
    clip_B_2 = true

  endId = shortId
  audClick(shortId)

if (FS)
    {
    if(n == 0)
      {
      xid( 'id_spanT' + commonId + '0' ).style.display = 'none'
      xid( 'id_spanT' + commonId + '1' ).style.display = 'inline'
      }
     else
      {
      xid( 'id_spanT' + shortId + '_1' + '_0' ).style.display = 'inline'
	//changed 05-19-11 show player and allow play multiple times
      //xid( 'id_spanT' + shortId + '_1' + '_0' ).style.color = '#cccccc'
      }
    }
  //changed 05-19-11 show player and allow play multiple times
  //else
    //xid( 'id_spanT' + commonId + '1' ).style.color = '#cccccc'
  markingBtn(myId, it, false)
  }

function PB_playAudCk(audname, LOFN)
  {
  var FL = gv_server ? 'media/' + LOFN + '/' + audname : 'Media/' + audname
  IHTML( xid( 'id_audioPlayer' ), loadAud(FL, true) )
  var myRb = document.getElementsByTagName('input')
  if(myRb)
    for (var i=0, L=myRb.length; i<L; i++)
      if (myRb[i].type == 'radio'||myRb[i].type == 'checkbox'||myRb[i].type == 'text')
        myRb[i].disabled = false
  else
    void('')
 }

function playAudBtn(audname, LOFN)
  {
  var ih_str2 = gv_server ? 'media/' + LOFN + '/' + audname : 'Media/' + audname
  IHTML(xid( 'id_audioPlayer' ), loadAud(ih_str2, true))
  }

function inst_playAud(slf, audname, LOFN)
  {
  var ih_str3 = gv_server ? 'media/' + LOFN + '/' + audname : 'Media/' + audname
  IHTML(xid( 'id_audioPlayer' ), loadAud(ih_str3, true))
  }
  
//=================== for LCM =====================================

var oAudPlay = false
var iAudPlay = false

function CM_playAudCk_Probe(id, fn, n, m, LOFN)
  {
  var myLen    = id.length
  var commonId = id.substring(9, (myLen-2))
  var shortId  = id.substring(9, (myLen-4))
  var myNum    = id.substr(myLen-1)
  var beginId  = commonId

  if(beginId != endId)
    {
    oAudPlay = false
    iAudPlay = false
    }

  if(myNum == 0)
    oAudPlay = true
  if(myNum == 2)
    iAudPlay = true

  endId = beginId

  if(oAudPlay && iAudPlay)
    xid('id_script_btn' + commonId + '_' + 0).disabled = false
  var ih_str = gv_server ? 'media/' + LOFN + '/' + fn : 'Media/' + fn
  IHTML(xid( 'id_audioPlayer' ), loadAud(ih_str, true))

  for (var i=0; i<m; i++)
    if ( i != n )
      xid('id_script' + shortId + '_' + i + '_0' ).style.display = "none"
  }

var myLook = false
var termId = ''
var idArry = ['null']

function showLtrs(id, n, m, L)
  {
  var myLen    = id.length                       //1) add m here, and   getOne (n, m), getOne(i, qLen) 2) for (i=0; i<m; i++) {if (i != n) else} added
  var shortId  = id.substring( 13, (myLen-3) )      //myLen-2
  var commonId = shortId + n + '_0'
  var startId  = commonId
  var scptId   = 'id_script' + shortId + n + '_0'
  var ansId1   = 'id_ans'    + shortId + n + '_0'
  var ansId2   = 'id_ans'    + shortId + n + '_1'

  if(startId != termId)
    {
    myLook = false
    clip_B_2 = false
    }

  for (var i=0; i<idArry.length; i++)
    if(idArry[i] == commonId)
      myLook = true

  if(!myLook)
     idArry.push(commonId)
  if(myLook == false)
    {
    var my_conf = confirm('Use the transcript only if you cannot understand the words or phrases in the audio.')
    if(my_conf)
      {
      for (var i=0; i<m; i++)
        {
          var rtl = isIn(L, rtlLangs)
        //alert(rtl)
        xid('id_script' + shortId + i + '_0').style.fontFamily = rtl ? "Arial" : "Verdana" //L == 'arabic' ? "Arial" : "Verdana"
        xid('id_script' + shortId + i + '_0').style.textAlign = rtl ? "right" : "left" //L == 'arabic' ? "right" : "left"
        xid('id_script' + shortId + i + '_0').style.direction = rtl ? "rtl" : "ltr" //L == 'arabic' ? "rtl" : "ltr"
        xid('id_script' + shortId + i + '_0' ).style.display = (i == n) ? "inline" : "none"
        }
      xid(id).style.display     = "none"
      xid(ansId1).style.display = "none"
      xid(ansId2).style.display = "inline"
      xid(ansId2).value         = xid(ansId1).value
      xid( 'id_hid' + commonId ).checked = true
      }
    else
      void('')
    }
  else
    {
    for (i=0; i<m; i++)
      xid('id_script' + shortId + i + '_0' ).style.display = ( i == n ) ? "inline" : "none"
    xid(id).style.display     = "none"
    xid(ansId1).style.display = "none"
    xid(ansId2).style.display = "inline"  
    xid(ansId2).value         = xid(ansId1).value
    xid( 'id_hid' + commonId ).checked = true
    }
  termId = startId
  }

function clearAllLC()
  {
  IHTML(xid( 'id_audioPlayer' ), '')
  clip_A_1 = false
  clip_A_2 = false
  clip_B_1 = false
  clip_B_2 = false
  oAudPlay = false
  iAudPlay = false
  myLook   = false
  endId    = ''
  termId   = ''
  idArry   = ['null']
  }