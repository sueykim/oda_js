var g_myTimer       = 0
var lang            = ''
var currentItemType = ''
var g_interlock     = false
var visited         = false
var lcm_alert       = false
var mod_alert       = false
var TA              = []
var setHistory      = []
var Debug           = !true

String.prototype.L_Trim      = new Function( "return this.replace(/^\\s+/,'')"   )
String.prototype.R_Trim      = new Function( "return this.replace(/\\s+$/,'')"   )
String.prototype.Trim        = new Function( "return this.L_Trim().R_Trim()"     )
String.prototype.commatose = function()
  {
  return this.replace(/%/mg," percent").replace(/[\r\n]/img,"").replace(/-([^\d])/g," $1").replace(/(\d),(\d)/g, "$1$2").replace(/(\w),([^\d\s])/g,"$1 $2").replace(/(\w),\s/g,"$1 ").replace(/(\w)\.([^\w]|$)/g,"$1 $2").replace(/["]/g,"").replace(/(\s)*&(\s)*/g,'$1and$2').replace(/\'/g,"\\'")
  //N=number; L=letter: "-" and a non-N -> (space + non-N); N,N -> NN; L,L -> L L; L,(space) -> L(space); L. -> L(space); any quote -> nothing
  }
String.prototype.cap = function( X )
  {
  var L = this.substr( X, 1 ).toUpperCase
  var R = this.substr( 1, this.length-1 ).toLowerCase
  return L + R
  }
 
function form_class()
  {
  var LL               = 0
  var currentPg        = 0
  var currentSet       = 0
  var itemCnt          = 0
  var setCnt           = 0
  var ZZ               = null
  var _this            = this
  var levelChk         = true
  var setPath          = ''
  var preliminaryCheck = []
  var id_btn_next      = xid('id_btn_next')

  function loadCheckArray()
    {
    var CC = true ? ZZ.length : 19 // "true : false" used to manually set number of pages for navigation
    for (i=0; i<CC; i++)
      preliminaryCheck[i] = false
    }

  this.startListener = function()
    {
    if(!g_interlock)
      {
      g_interlock = !g_interlock
      function goGreen()
        {
        window.clearInterval( g_myTimer )
        xid('id_btn_submit').src = "images/back_next/submit.gif"
        with (new foundation_gif_btn_class('id_btn_submit') )
          do_click = function()
            {
            var B = xid('id_btn_submit')
            B.src = "images/back_next/submit_disabled.gif"
            B.onmouseover = B.onmouseout = B.onclick = null
            g_FM.post_results_to_server()
            }
        }
      var y      = ZZ[ZZ.length-1].getElementsByTagName('INPUT')
      var yLen   = y.length
      var z      = []
      var myCntr = 0
      var NN     = 0
      for( var j=0; j<yLen; j++ )
        {
        var E = y[j]
        switch (E.type)
          {
          case 'checkbox':
          case 'radio':
            if (E.checked)
              NN++
            break;
          case 'text':
            if (E.value.Trim().length > 0)
              NN++
            break
          }
        }
      if( NN )
        goGreen()
      g_interlock = !g_interlock
      }
    }

  this.go_screen = function( NN )
      {
    var pcL = preliminaryCheck.length
    function pgNav(NN)
      {
      function goOrange(g_SN)
        {
        if(g_SN < pcL)
          {
          var pgCnt = xid( 'id_pgCnt' )
          if(setCnt == 12 || setCnt == 15 || setCnt == 18)
            {
            pgCnt.innerHTML = g_SN + "/" + setCnt
            var II = xid( 'id_pg_' + g_SN )
            II.src = setPath + "bt_" + g_SN + "_on.gif"
            II.style.cursor = ""
            II.onmouseover = II.onmouseout = II.onclick = null
            }
          }
        }

/*
    Add-on to manage users revisiting the instruction page. They will restart on the
    next item in the order. The item that they were on will be counted as completed.
*/

      preliminaryCheck[NN] = true
      itemCnt++

      if( visited && NN != 0 )
        g_SN++
      else if( NN == 0 && !visited )
        {
        visited = true
        g_SN++
        }
      else
        {
        if( g_SN != 0 )
          g_SN--
        preliminaryCheck[g_SN] = false
        }
      for (var i=0; i<pcL; i++)
        {
        if( i > 0 && preliminaryCheck[i] )
          xid('id_pg_' + i).src = spf( "~bt_~_over.gif", [setPath, i] )
        else
          {
          if( i == 0 )
            {
            xid('id_pg_' + i).src = spf( "~bt_~.gif", [setPath, i] )
            with (new foundation_gif_btn_class('id_pg_' + i) )
              do_click = new Function( spf("g_FM.go_screen(~)",[i]) )
            }
          else
            xid('id_pg_' + i).src = spf( "~bt_~.gif", [setPath, i] )
          }
        }
      currentPg = NN
      if(g_SN >= 0)
        {
        goOrange(NN)
        if(g_SN > 1)
          {
          xid('id_btn_chelp').style.visibility = 'visible'
          var curIT = (currentSet > 3 && currentItemType == 'LSA') ? 'lsamod' : currentItemType
          var ast = 'ma' + ( document.fm_track.skill.value == 'listening' ? '_LC' : '' )
          with (new foundation_gif_btn_class('id_btn_chelp') )
            do_click = function()
              {
              launchVideoOverlay( 'Help', ast, curIT, lang )
              }
          }
        }
      }
    if( g_myTimer != 0 && g_SN == ZZ.length)
      {
      window.clearInterval( g_myTimer )
      g_myTimer = 0
      xid('id_btn_submit').src = "images/back_next/submit.gif"
      with (new foundation_gif_btn_class('id_btn_submit') )
        do_click = function()
          {
          var B = xid('id_btn_submit')
          B.src = "images/back_next/submit_disabled.gif"
          B.onmouseover = B.onmouseout = B.onclick = null
          g_FM.post_results_to_server()
          }
      }
    if( NN >= 0 && NN < LL )
      {
      ZZ[currentPg].style.display = 'none'
      currentItemType = ZZ[NN].getAttribute( "itemType" ) ? ZZ[NN].getAttribute( "itemType" ) : 'instructions'  // Used for Video Tutorial piece
      pgNav(NN)
      ZZ[NN].style.display = 'block'

      if( document.fm_track.skill.value == 'reading' )
        {
        var GHs = classify( ZZ[NN], 'input', 'g_HL' )
        for( var W=0, z=GHs.length; W<z; W++ )
          {
          var fn = GHs[W].id
          var nn = currentItemType == 'HTO' ? "" : fn.split("_")[fn.split("_").length-1]
          with( new foundation_gif_btn_classA(GHs[W].id)  )
            do_click = new Function( spf("g_HL.putText('~','~')", [fn,nn]) )
          }
        }
      else
        {
        var marks= [ ['radio','css_rb_n'],['radio','css_rb2_n'],['radio','css_rb2'],['checkbox','css_ck_n'] ] //['textarea', 'css_ltrTxt_n'],['textarea', 'css_rtlTxt_n'],
        for(var W=0, z=marks.length; W<z; W++ )
          {
          var AY = classify( ZZ[NN], marks[W][0], marks[W][1] )
          var it = currentItemType == 'LSA' ? 'SA' : ( currentItemType == 'TMC' || currentItemType == 'LMC' ) ? 'RB' : currentItemType == 'LCI' ? 'CI' : 'XY'
          for(var H=0, J=AY.length; H<J; H++ )
              with( new foundation_gif_btn_classA(AY[H].id)  )
                  do_click = new Function( spf("markingBtn('~','~',~)", [AY[H].id,it,true]) )
          }

        var marx = ['css_btnAudChoice','css_btnAudChoice_rb']
        for(var g=0, h=marx.length; g<h; g++)
          {
          var ACs = classify( ZZ[NN], 'img', marx[g] )
          for( var W=0, z=ACs.length; W<z; W++ )
            {
            var ff  = ACs[W].getAttribute("file") // g == 0 ? : ACs[W].getAttribute("title")
            var ffA = ff.split("_")
            var ffB = ffA[0] + "_" + ffA[1]
            with( g == 0 ? new foundation_gif_btn_classA(ACs[W].id) : new foundation_gif_btn_class(ACs[W].id)  )
                do_click = new Function( spf("playAudBtn('~', '~')", [ff,ffB]) )
            }
          }

        var insx = ['css_instruction','css_instruction_pr']
        for(var g=0, h=insx.length; g<h; g++)
          {
          var INs = classify( ZZ[NN], 'img', insx[g] )
          for( var W=0, z=INs.length; W<z; W++ )
            {
            var fn = INs[W].id
            var ff = INs[W].getAttribute("file")
            var ft =  fn.split("_")[3] + "_" + fn.split("_")[4] //(currentItemType == 'LCM') ? fn.split("_")[2].replace(/mainAud/ig,"") + "_" + fn.split("_")[3] :
            with( new foundation_gif_btn_classA(INs[W].id)  )
              do_click = new Function( spf("inst_playAud('~','~','~')", [fn,ff,ft]) )
            }
          }

        var ARs = classify( ZZ[NN], 'img', 'css_pr_play_aud' )
        for( var W=0, z=ARs.length; W<z; W++ )
          {
          var it = currentItemType == 'LSA' ? 'SA' : ( currentItemType == 'TMC' || currentItemType == 'LMC' ) ? 'RB' : currentItemType == 'LCI' ? 'CI' : 'XY'
          var fn = ARs[W].id
          var ff = ARs[W].getAttribute("file")
          var qq = fn.substr(fn.length-1, 1)
          var qm = fn.substr(fn.length-3, 1)
          tf = qq == '0' ? true : false
          with( new foundation_gif_btn_classA(ARs[W].id)  )
              do_click = new Function( spf("PR_playAudCk('~','~',~,'~','~','~')", [fn,ff,tf,qm,qq,it]) )
          }

        var APs = classify( ZZ[NN], 'img', 'css_btnAudChoice_n' )
        for( var W=0, z=APs.length; W<z; W++ )
          {
          var ff  = APs[W].getAttribute("file")
          var ffA = ff.split("_")
          var ffB = ffA[0] + "_" + ffA[1]
          with( new foundation_gif_btn_classA(APs[W].id)  )
                  do_click = new Function( spf("PB_playAudCk('~', '~')", [ff,ffB]) )
          }

        if(currentItemType == 'LCM')
          {
          var trxs = classify( ZZ[NN], 'div', 'css_cm_text' )
          for( var W=0, z=trxs.length; W<z; W++ )
            {
            trxs[W].style.direction  = lang == 'arabic' ? "rtl" : "ltr"
            trxs[W].style.fontFamily = lang == 'arabic' ? "Arial" : "Verdana"
            trxs[W].style.textAlign  = lang == 'arabic' ? "right" : "left"
            }
          var tds = classify( ZZ[NN], 'td', 'css_lcm_c' )
          for( var W=0, z=tds.length; W<z; W++ )
            {
            tds[W].style.direction  = lang == 'arabic' ? "rtl" : "ltr"
            tds[W].style.textAlign = lang == "arabic" ? "right" : "left"
            }
          var CMs = classify( ZZ[NN], 'img', 'CM_playAud' )
          for( var W=0, z=CMs.length; W<z; W++ )
            with( new foundation_gif_btn_class(CMs[W].id)  )
              {
              var t_let = CMs[W].id.split('_')[2] + '_' + CMs[W].id.split('_')[3]
              do_click = new Function( spf("CM_playAudCk_Probe('~','~',~,~,'~')", [CMs[W].id, CMs[W].getAttribute("file"), W, CMs.length/2, t_let]) )
              }
                          
          var SLs = classify( ZZ[NN], 'input', 'css_ltrShw' )
          for( var W=0, z=SLs.length; W<z; W++ )
            with( new foundation_gif_btn_class(SLs[W].id)  )
              do_click = new Function( spf("showLtrs('~',~,~,'~')", [SLs[W].id, W, z, lang]) )

          var spanTFs = ['css_spanT','css_spanF']
          for(var g=0, h=spanTFs.length; g<h; g++)
            {
            var ACs = classify( ZZ[NN], 'div', spanTFs[g] )
            for( var W=0, z=ACs.length; W<z; W++ )
              xid(ACs.id).innerHTML = xid(ACs.id).innerHTML.cap( 0 )
            }

          if( lcm_alert == false )
            {
            var MT = "<div class=\"alert\"><p class=\"lcmAlert\"><img class=\"wrng\" src=\"images/wrng.png\" />In this item, provide the meaning of"+
														" the words or phrases in the context of the audio excerpts you hear. "+
            "The  words or phrases are presented in two forms: isolated and in context. The isolated audio recordings "+
            "are very short, and may sound distorted. Use them only as a guide for the word or phrase requiring the English meaning. "+
            "You should rely on the <b>in-context<\/b> audio recordings when deciding on your answer. "+
            "<\/p><p class=\"lcmAlert\">After you  listen to these two audio types, a transcript of the lexical item in context will be available to you "+
            "(the \"display\" button). Use this option ONLY if you cannot understand the words or phrases in the audio recordings. "+
            "<br \/><center><input type=\"button\" value=\"close this message\" class=\"otf\" onclick=\"lcm()\" \/> "+
            "<\/center><\/p><\/div>"

            xid('lcm_div').style.display = "block"
            xid('lcm_div').style.zIndex  = 1
            xid('lcm_div').style.top     = 5 + 'px'
            xid('lcm_div').style.left    = 5 + 'px'
            xid('lcm_div').innerHTML     = MT
            lcm_alert = true
            }
          }
        }
      if(itemCnt == pcL)
        g_myTimer = setInterval(g_FM.startListener, 1500)
      }
    } // end go_screen

  function resetPage( oEnd )
      {
    if( oEnd )
      {
      xid( "id_btn_close"  ).style.display = "block"
      xid( "id_btn_next"   ).style.display = "none"
      xid( "id_btn_submit" ).style.display = "none"
      xid( "id_extras"     ).style.display = "none"
      xid( "id_btnNav"     ).style.display = "none"
      xid( "id_pgCnt"      ).style.display = "none"
      with (new foundation_gif_btn_class('id_btn_close') )
        do_click = function()
          {
          finishTest = true
          parent.xid("menu").style.display = "block"
          parent.xid("linkplaceL").style.display = "block"
          parent.endTest()
          }
      }
    else
      {
      g_myTimer = 0
      var B = xid('id_btn_submit')
      B.src = "images/back_next/submit_disabled.gif"
      B.style.cursor = ""
      B.onmouseover = B.onmouseout = B.onclick = null
      }
    }

  this.load_form = function( N, Q )
    {
    xid( "id_preloader" ).style.display = "none"
    preliminaryCheck = []
    currentPg = 0
    itemCnt = 0
    currentSet = parseInt( Q )
    for( var i=0, sLen=g_F.length; i<sLen; i++ )
      g_F[i].style.display = 'none'
    g_F[N].style.display = 'block'
    ZZ = classify( g_F[N], 'div', 'css_screen' )
    setCnt = ZZ.length-1
    LL = ZZ.length
    setPath = 'images/navigation/'
    if(visited)
      {
      g_SN = 1
      preliminaryCheck[0] = true
      itemCnt++
      }
    else
      g_SN = 0

    function getPgBtns(inc)
      {
      var pgBtn = []
      var x = parseInt(LL-1)/3
      for (var i=1, k=0; i<LL; i++)
        {
        if( i > 0 )
          {
          if( (k % x) == 0 )
            if( k==0 )
              pgBtn.push( '<img src="images/navigation/start.gif" alt="" class="spc4_img" />' )
            else
              pgBtn.push( '<img src="images/navigation/separator.gif" alt="" class="sp11_img" />' )
          k++
          }
        pgBtn.push( spf( '<img id="id_pg_~" src="~bt_~.gif" class="page_img" />', [i, setPath, i] ) )
        }
      pgBtn.push( '<img src="images/navigation/end.gif" alt="" class="spc3_img" />' )
      pgBtn.push( '<img src="images/navigation/1px.gif" alt="" class="spc6_img" />' ) 
      pgBtn.push( spf( '<img id="id_pg_~" src="~bt_~.gif" class="page_img" />', [0, setPath, 0] ) )
      xid( "id_btnNav" ).innerHTML = pgBtn.join("")
      xid( "id_pgCnt"  ).innerHTML = "0/15"
      }
    getPgBtns(5)
    loadCheckArray()
    var GL = parseInt(g_F.length)-1
    resetPage( N == GL )
    
    if(document.fm_track.skill.value == "listening" && Q > 3 && mod_alert == false)
      {
      mod_alert = true
      launchVideoOverlay( 'Help', 'ma_LC', 'lsamod', '' )
      }
    this.go_screen( g_SN )
    }

  this.post_results_to_server = function()
    {
    var Z = []
    function getSetData( setNum, marker )
          {
      var a     = marker == true ? g_D[ setNum ].getElementsByTagName('form') : g_F[ setNum ].getElementsByTagName('form')
      var r_t_l = lang == "arabic" ? true : false
      Z.push( 'phase=' + (levelChk ? 0 : 1) )
      Z.push( 'Tlang=' + lang)
      Z.push( 'UID='   + document.fm_track.UID.value   )
      Z.push( 'fName=' + document.fm_track.fName.value )
      Z.push( 'lName=' + document.fm_track.lName.value )
      Z.push( 'cSet='  + currentSet )
      Z.push( 'skill=' + document.fm_track.skill.value )
      for (var i=0; i<a.length; i++)
        {
        var b = a[i].elements
        for (var j=0, M=b.length; j<M; j++)
          {
          var cntr = 0
          var c = b[j]
          var n = spf( '~=', [ c.name ] )
          if ( c.type == 'radio' )
            {
            if( Z[Z.length-1].indexOf(c.name) == -1 )
              {
              if(c.checked)
                Z.push( n + c.value )
              else
                Z.push( n )
              }
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
            Z.push( n + c.value.toLowerCase().commatose() )
          else if (c.type == 'hidden')
            Z.push( n + encodeURIComponent(c.value) )
          else if (c.type == 'checkbox')
            Z.push( n + encodeURIComponent(c.checked) )
          //else if(c.type != 'button')
            //alert('ERR = ' + c.type + '::' + c.id )//Z.push( ) + '::' + c.name ? c.name : 'no_name')  // testing for other elements //
          }
        }
      }

    var aspy = document.fm_track.skill.value == 'listening' ? 'JLC.asp' : 'JRC.asp'
    g_D[currentSet].innerHTML = g_F[0].innerHTML
    getSetData( 0, !levelChk )
    setHistory[setHistory.length-1].push( Z )
    g_XX.post_form( g_SERVER + aspy + '?(', Z.join('&') )
    var SR = g_XX.get_responseText()                       // Pass/fail for each set + the % of the correct answers

    if(!true)                                              // Used for testing Pass/Fail movement
      var a = prompt('Enter a percentage to add to your score')
    else
      var a = SR.split('::')[1]

    trax.append( currentSet, a )
    var TXR  = trax.retrieve()
    levelChk = TXR.pop()//[6]
    var UD   = TXR.pop()
    //alert('474 - current set: ' + currentSet +  '; Server Response: ' + SR + '; going to: ' + UD )
    //if(SR.indexOf('html') > -1)
      //document.write(SR)
    if(levelChk)
      this.adjustLevel( UD )
    else
      {
      var levelSet = (currentSet == 8 && UD == 3) ? 8 : parseInt(currentSet) != 0 ? parseInt(currentSet)-1 : parseInt(currentSet)
      var topSet = parseInt(currentSet)+1
      var cSet = (currentSet == 8 && UD == 3) ? 9 : currentSet
      var ARR = []
      ARR.push( 'phase=' + (levelChk ? 0 : 1) )
      ARR.push( 'Tlang=' + lang)
      ARR.push( 'UID='   + document.fm_track.UID.value   )
      ARR.push( 'fName=' + document.fm_track.fName.value )
      ARR.push( 'lName=' + document.fm_track.lName.value )
      ARR.push( 'cSet='  + cSet )
      ARR.push( 'skill=' + document.fm_track.skill.value )

      var toolow = ( levelSet == 0 && topSet== 1 )
      setHistory.sort()
      for( var i=0, j=setHistory.length; i<j; i++ ) //for( var i=toolow ? 1 : 0, j=setHistory.length; i<j; i++ )
        if( setHistory[i][1][5].split('=')[1] >= levelSet || setHistory[i][1][5].split('=')[1] == levelSet-1 )
          for( var k=7, l=setHistory[i][1].length; k<l; k++ )
            ARR.push( setHistory[i][1][k] )
      g_XX.post_form( g_SERVER + aspy, ARR.join('&') )  //Returns Diagnostic Profile for each Set //
      SR = g_XX.get_responseText()
      //alert('501: Server Response: ' + SR )
      if( SR == 1 )
        {
        g_FM.load_form( g_F.length-1, currentSet )
        var B = classify( g_F[g_F.length-1], 'a', 'btns' )
        B[0].onclick = function()
          {
          finishTest = true
          parent.xid("menu").style.display = "block"
          parent.xid("linkplaceL").style.display = "block"
          parent.endTest()
          }
        }
      }
    }// end post_results_to_server

  this.adjustLevel = function( inc )
    {
    currentSet = parseInt(currentSet) + parseInt(inc)
    loadSets( currentSet, null )
    }
  }//form_class

function initPg()
  {
  if( Debug )
    {
    document.fm_track.UID.value   = "1225"
    document.fm_track.fName.value = "gor"
    document.fm_track.lName.value = "mar"
    document.fm_track.skill.value = "reading"
    lang = 'arabic'
    myLevel = '9'
    }
  else
    {
    var CGI_i = new CGI_input_class()
    document.fm_track.UID.value   = CGI_i.UID
    document.fm_track.fName.value = CGI_i.fName
    document.fm_track.lName.value = CGI_i.lName
    document.fm_track.skill.value = CGI_i.Mod == 1 ? 'reading' : 'listening'
    lang = CGI_i.Tlang
    myLevel = parseInt( CGI_i.StrtLevel )
    }
  xid('head_logo').innerHTML = ( document.fm_track.skill.value == 'reading' ) ? "Reading Assessment " : "Listening Assessment "
  xid('id_btn_txts').style.display = xid('id_btn_txtm').style.display = xid('id_btn_txtl').style.display = (document.fm_track.skill.value == 'reading') ? "inline" : "none"

  function loadTest()
    {
    var w     = window
    var UID   = document.fm_track.UID.value
    var lName = document.fm_track.lName.value
    var skill = document.fm_track.skill.value
    var LC
    if( Debug )
      LC =  'ODA_TS_arabicLC_19.xml'
    else
      LC = g_SERVER +'ODA_MainAssess.aspx?Tlang=' + lang + '&UID=' + UID + '&lName=' + lName + '&skill=' + skill
    g_XX.XML_HTTP_GET( LC )
    function spin()
      {
      document.images["spinner"].style.backgroundColor = "transparent"
      var TO = setTimeout( spin, 100 )
      if( g_XX.get_responseText() )
        {
        var ss = extract_CDATA( g_XX.get_responseText() )
        loadSets( myLevel, ss )
        clearTimeout(TO)
        }
      }
    spin()
    }
  loadTest()
  with (new foundation_gif_btn_class('id_btn_next') ) // event handler for next button icon
    do_click = function()
      {
      g_FM.go_screen((g_SN))
      clearAllLC()
      }      
  with (new foundation_gif_btn_class('id_btn_tutorial') )// event handler for tutorial button icons
    do_click = function()
      {
      var tut = ( document.fm_track.skill.value == 'listening' ? 'LC_' : '' ) + 'tutorial'
      launchVideoOverlay( 'Tutorial', 'ma', tut )
      }
  with (new foundation_gif_btn_class('id_btn_txts') )// event handlers for font-size icons
    do_click = function()
      {
      doFontSize('s')
      }
  with (new foundation_gif_btn_class('id_btn_txtl') )
    do_click = function()
      {
      doFontSize('l')
      }
  }// end initPg()

function loadSets( ml, ss )
  {
  setHistory.push( [ml] )
  if(ss != null)
    {
    var ta = ss.split("<form")
    for(var i=1, j=ta.length; i<j; i++)
      TA[i-1] = "<form" + ta[i]
    }
  var mu = ( ml == 3 || ml == 2 ) ? 5 : ( ml == 5 || ml == 4 ) ? 7 : ( ml == 7 || ml == 6 ) ? 9 : ( ml == 1 || ml == 0 ) ? 2 :      8
  var md =        ml == 3         ? 1 :        ml == 5         ? 4 :        ml == 7         ? 6 :        ml == 9         ? 8 : ml == 1 ? 0 : 10
  var nxt = [TA[ml], TA[mu], TA[md]]
  xid('id_hidden').innerHTML = nxt.join("")
  var Formz = xid('id_hidden').getElementsByTagName('form')
  for(var i=0;i<Formz.length; i++ )
    g_F[i].innerHTML = '<form>' + Formz[i].innerHTML + '<\/form>'
  g_F[g_F.length-1].innerHTML = TA[TA.length-1]
  g_FM.load_form( 0, ml )                                         //load the initial FL content from server/file
  if(xid('id_btn_next').style.display != "block")
    xid('id_btn_next').style.display   = "block"    
  if(document.fm_track.skill.value == 'reading')
    {
    var tss = ['s','m','l']
    for(var gwb = 0, zz=tss.length; gwb<zz; gwb++)
      if( xid('id_btn_txt' + tss[gwb] ).src.indexOf('_on.gif') > -1 )
        doFontSize( tss[gwb] )
    }
  }

function tracer()
  {
  var LC  = true // levelChk ?
  var ST  = 0 
  var th  = {AA:null, BB:null, CC:null, DD:null, EE:null}
  var tg  = {AA:0, BB:0, CC:0, DD:0, EE:0}

  this.append = function( xx, yy )
    {
    var ZZ = xx < 2 ? 'AA' : xx > 1 && xx < 4 ? 'BB' : xx > 3 && xx < 6 ? 'CC' : xx > 5 && xx < 8 ? 'DD' : 'EE'
    var YY = eval('th.' + ZZ)
    var XX = eval('tg.' + ZZ)
    if(XX == 0)
      {
      YY = yy*1
      FS = true
      }
    else
      {
      YY = YY/2 + yy/2
      FS = false
      }
    XX += 1
    if(xx == 3 && YY <= 66)
      ST = -2  
    else if( ( xx%2 == 1 && xx != 3 && YY <= 66 ) || ( xx == 9 ) )
      ST = -1 
    else if( xx == 1 && YY > 66 )
      ST = 1  
    else if( ( ( xx%2 == 1 && xx < 9 && xx > 1 ) || ( xx == 0 && YY > 66 ) ) && YY > 66 )
      ST = 2 
    else if( ( xx == 0 || xx%2 == 0 ) && YY <= 66 )
      {
      ST = 0
      LC = false  
      }  
    else if( xx%2 == 0 && XX <= 8 && YY > 66 ) 
      {
      ST = 3
      if( xx == 8 ) 
        LC = false  
      }
    eval('th.' + ZZ + '=' + YY)
    eval('tg.' + ZZ + '=' + XX)
    }
  this.retrieve = function()
    {
    return [th.AA, th.BB, th.CC, th.DD, th.EE, ST, LC]
    } 
  }

function highlightText_class()
  {
  this.hilite = function( m )
    {
    m.className = m.className == 'css_a' ? 'css_b' :'css_a'
    }
  this.putText = function( theId, nn )
    {
    var tAry = xid( theId.replace(/id_bn_/,'id_dv_') ).getElementsByTagName('span') //'id_dv_' + 'id_dv_' +
    var theBnName = nn ? theId + '_' + nn : theId                                   //'id_bn_' + 'id_bn_' +
    var theTaName = theId.replace(/id_bn_/,'id_ta_') + ( nn ?  '_' + nn : '' )
    var x = ''
    if (xid( theBnName ).value == 'Paste')
      {
      for (var i=0; i<tAry.length; i++)
        if (tAry[i].className == 'css_b')
          x += tAry[i].innerHTML + ' '
      for (var i=0; i<tAry.length; i++)
        tAry[i].className = 'css_a'
      x = x.Trim()  
      }
    xid( theTaName ).value = x
    xid( theBnName ).value = xid( theTaName ).value == '' ? 'Paste' : 'Clear'
    }
  }

function print_class()
  {
  var w = null
  function xid(a)
    {
    return document.getElementById(a)
    }
  this.registerChild = function(the_win)
    {
    w = the_win
    }
  this.init = function()
    {
    var e = document.createElement('div')
    e.innerHTML = '<iframe src="PrShell.htm" style="position: absolute; right: 0px; top: -1000px; margin:0; padding:0; width:100%;"><\/iframe>'
    document.body.appendChild(e)
    }
  this.getPrintWindow = function()
    {
    return w
    }
  }//print_class

function lcm()
  {
  xid('lcm_div').style.display='none'
  }

function disableRC()
  {
  return false;
  }

function foundation_gif_btn_classA( the_id )
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
      if(this.src.indexOf("_off.") == -1)
        this.src= b
      }
    e.onmouseout = function()
      {
      if(this.src.indexOf("_off.") == -1)
        this.src= a
      }
    this.do_click = function()
      {
      }
    }
  }

window.onbeforeunload = function()
  {
  if(!finishTest)
	  return 'DO NOT click "OK" if you wish to continue this diagnostic assessment session. If you click "OK," you will not be able to return to this session.'
  this.src = ""
  }

window.onload = function()
  {
  var w      = window                             // pointer:  use "w" to facilitate creation of global variables
		w.finishTest = false
  w.g_F      = classify( document, 'div', 'css_form' )
  w.g_D      = classify( document, 'div', 'css_formed' )
  w.g_SERVER = Debug ? '' : myPath
  w.g_XX     = new XML_HTTP_class()               // pointer:  XMLHTTP object instance
  w.g_FM     = new form_class()                   // pointer:  FORM object instance
  w.g_HL     = new highlightText_class()          // pointer:  Text Highlighting and selecting instance
  w.g_SN     = 0                                  // integer:  current screen
  w.g_TN     = 0                                  // integer:  current test
  w.trax     = new tracer()
  document.oncontextmenu = new Function("return false")
  this.pop_manager   = new popup_class()
  this.print_manager = new print_class()
  this.print_manager.init()
  xid('id_btn_chelp').style.visibility = 'hidden'
  initPg()
  for(var W=0; W<17; W++)
    {
    var ii = new Image
    ii.src = (W < 16) ? "images/navigation/bt_" + W + ".gif" : "images/dps/wtr.png"
    }
  }
