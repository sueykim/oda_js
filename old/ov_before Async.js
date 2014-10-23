// vvv Temporary until all languages have the LC component vvv //

function enableLC(zz)
  {
  xid("sk_02").disabled = false //(zz.value == "korean"||zz.value == "arabic") || zz.value == "chinese"
  }
// ^^^ Temporary until all languages have the LC component ^^^ //
 function disableLC(zz)
  {
  xid("sk_01").checked = false
  xid("sk_02").checked = false
  xid("sk_01").disabled = false
  xid("sk_02").disabled = true //(zz.value == "russian") ? true : (zz.value == "korean"||zz.value == "arabic") || zz.value == "chinese"
  }
 function disableRC(zz)
  {
  xid("sk_01").checked = false
  xid("sk_02").checked = false
  xid("sk_01").disabled = true
  xid("sk_02").disabled = false
  }
 function enableBoth()
  {
  xid("sk_01").checked = false
  xid("sk_02").checked = false
  xid("sk_01").disabled = false
  xid("sk_02").disabled = false
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

// start of where function, return index of itm within ary
function where(ary, itm)
  {
    var ix = null
    for (var w = 0, z = ary.length; w < z; w++)
      if (itm == ary[w])
        ix = w
      return ix
  } // end of where function

function form_class()
  {
  var _this  = this
  var LL     = 0
  var lastPage = ''
  var ZZ     = null
  var E_form = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{3}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|co\.\w\w|\w\w))$/)
  
  //RR 06/13/2012 added lname_form pattern, $work
  //var lname_form = new RegExp(/^[A-Za-z0-9]*/); // any string starts with at least 1 letter, followed by 0 or more occurances of digits/letters at end. 
  var lname_form = new RegExp(/^[a-zA-Z0-9]+$/);

  //RR 06/15/2012, added this global variable to produce custom message when L_name doesn't conform to rule
  var last_Name;

  var xmls = []
  var menus = [xid('linkplace'), xid('linkplaceL')]
  var logged = new Function( "return document.storage.uid.value != '';" )
  this.pers_change = false
  this.ling_change = false
  this.testing     = false

  function CGI_response( s )
    {
    try
      {
      var a = s.split('&')
      for (var i in a)
        a[i] = a[i].split('=')
      for (var i in a)
        this[a[i][0]] = decodeURIComponent(a[i][1].replace(/\+/g,' '))  // decodeURIComponent() -- for unicode compliant: replace(/\+/g,' ') --for some old browsers
      return this
      }
    catch(e)
      {//document.write(s)  
      }
    }

  function verify( df )
    {
    var condition = false
    if(df == document.oda)
      {
      var P_pikd = df.pass_pick.value.replace(/['"“”‘’*=+]/g,"")
      var P_cfrd = df.pass_cfrm.value
      var passes = ( (P_pikd.length > 0)&&(P_cfrd == P_pikd) )
      }
    else
      var passes = true
    var L_name = df.last.value
    var F_name = df.frst.value
    var E_mail = df.mail.value
//----- This synchronizes the form elements so if I say, e.g., I took a course at DLI I cannot leave "No" radio checked ---//
    if ((!df.course[0].checked) && (!df.school.options[0].selected)||(df.other.value.length > 0))
      df.course[0].checked = true
    var RS = df.reading_score.value.length   > 0
    var LS = df.listening_score.value.length > 0
    var SS = df.speaking_score.value.length  > 0
    var discrpn = (RS||LS||SS||(!df.test_taken.options[0].selected)||(df.other_test.value.length > 0)||(!df.when.options[0].selected))
    if(discrpn)                                    // checked "no tests" but entered a score or a name or a date of one
      df.test[0].checked = true
//----- End of synchronization --- //
    //RR: added 06/15 to produce custom message. Assign a local var value to a global var.
    last_Name = false;
    last_Name = lname_form.test(L_name); // if L_name confirms to the pattern, true or false, a logical value. used in line 223.



    //RR: $work,this is the place 06/13/2012
  if ((L_name.length > 0)  // last_name must have non-zero length

       // RR 06/13/2012 added to test last name rule, which starts with letter, followed by letter/number at the end      
       && (lname_form.test(L_name))

       && (F_name.length > 0)   // first name must have non-zero length
       && (E_form.test(E_mail)) // email must conform to a pattern as E_Form 
       && (passes)
       ) 
      condition = true
    return condition
    }

  this.go_check = function( NN )
    {
    switch( NN )
      {
      case 'userProfile_00':
        g_FM.go_screen( 2 )
        break;
      case 'userRegister_00':
        g_FM.go_screen( 2 )
        break;
      case 'userProfile_01':
        g_FM.go_screen( 3 )
        break;
      case 'userProfile_02':
        g_FM.go_screen( 0 )
        break;
      case 'userProfile_03':
        g_FM.go_screen( 1 )
        break;
      case 'userProfile_add':
        g_FM.post_results_to_server( document.oda, 'new_user' )
        break;
      case 'userProfile_rnw':
        g_FM.post_results_to_server( document.register, 'new_data')
        break;
      case 'id_btn_getPasswd':
        if( E_form.test(document.oda.un.value) )
          {
          g_FM.post_results_to_server(document.oda,'lost_pswd')
          //xid('messagf').style.visibility = 'hidden'
          }
        else
          alert('Please enter your username before submitting your request.')
        break;
      case 'id_btn_login':
        if( E_form.test(document.oda.un.value)&&(document.oda.pw.value!= '') )
          g_FM.post_results_to_server(document.oda,'login')
        else
          alert('Either your username or password were entered incorrectly. Please try again.')
        break;
      case 'id_btn_snds8':
        //var CGI_r = new CGI_response( document.storage.usp.value )
        //g_XX.XML_HTTP_GET( g_SERVER + 'ODA_recoveryChk.asp?user=' + CGI_r.last + '_' + document.storage.uid.value )
        //if( g_XX.get_responseText().length < 5 )
          //{
          var tx = false
          var ty = false
          var instr = []
          for (var q=0, rL=document.start_oda.Tlang.length; q<rL; q++)
            if(document.start_oda.Tlang[q].checked)
              {
              tx = true
              instr.push(document.start_oda.Tlang[q].value)
              break;
              }
          for (var r=0, sL=document.start_oda.skill.length; r<sL; r++)
            if(document.start_oda.skill[r].checked)
              {
              ty = true
              instr.push(document.start_oda.skill[r].value)
              break;
              }
          if( tx && ty )
            g_FM.post_results_to_server(document.start_oda,instr)
          else
            alert("Please make sure that you have selected a language and a skill before proceeding.")
          break;
          //}
        //else
          //alert( "Your last diagnostic assessment session was unexpectedly interrupted.\nEfforts are being taken to recover your previous assessment session." )
      }
    }

  this.go_screen = function( NN )
    {
    var dN = document.forms[0].name
    var condition = false
    var response = ''
    if( ( NN == 1 )&&( dN == 'register' ) )
      {
      condition = verify(document.register)
      response = "Please verify that all the required information is entered correctly!"
      }
    else if( ( NN == 3 )&&( dN == 'oda' ) )
      {
      condition = verify(document.oda)
            if (last_Name) // if last_Name is true, which conforms to rule. This value is from line 116.
                response = "Please verify that you have entered all the required information correctly!";
            // RR: 06/15/2012, added to target field "Last Name" if it has error
            else response = "Please be noted: 'Last Name' only contains letters and numbers!";
      }
    else if ( (NN == 1)&&(dN == 'oda')&&(document.scen02 == -1))
      {
      condition = false
      response = "There are no accounts in our database with the User Name you entered.\nPlease check the spelling and try again!"
      }
    else
      condition = true

    if(condition)
      {
      for( var i=0, L=ZZ.length; i<L; i++ )   
        ZZ[i].style.display  = 'none'
      g_SN                   = NN
      ZZ[g_SN].style.display = 'block'
      }
    else
      alert(response)
    }
  
  this.pc = function()
    {
    this.pers_change = true  
    }
    
  this.lc = function()
    {
    this.ling_change = true  
    }

  this.load_form = function( f )
    {
    var url =  'data/' + ( xmls[f]  == 'logout' ? 'odahome.xml' : xmls[f] )
      xid("content").style.background = "url(images/bgs/oda_" + f + ".jpg)"
    g_XX.XML_HTTP_GET( url )
    var ss = extract_CDATA( g_XX.get_responseText() )
    var F = classify( document, 'div', 'css_form' )
    for (var df=0, fL=F.length; df<fL; df++)
      F[df].innerHTML = ''
    var a = F[0]
    a.innerHTML = ss
    ZZ = classify( a, 'div', 'css_screen' )
				
    function prep()
      {
      function wait()
        {
        if(ZZ.length > 0)
          {
          window.clearInterval( tt )
          carryOn()
          }
        }
      var tt = setInterval(wait, 10)
      }
    prep()

    function carryOn()
      {
      a.style.display = ZZ[0].style.display = 'block'
						var nwNm = xmls[f].split('.')[0]
      if(lastPage.length != 0)
        {
        var ln = lastPage.split('::')[0]
        var ls = lastPage.split('::')[1]
        var exNm = ls.split('.')[0]
        if( gid(visMenu, "img", exNm) )
          gid(visMenu, "img", exNm).src = gid(visMenu,"img", exNm).src.replace(/_over/,"")
        else
          xid(exNm).src = xid(exNm).src.replace(/_over/,"")
        }
      if( gid(visMenu, "img", nwNm) )
        gid(visMenu, "img", nwNm).src = gid(visMenu, "img", nwNm).src.replace(/(_on)?\.gif/,"_over.gif")
      else
        xid(nwNm).src = xid(nwNm).src.replace(/_over/,"")
      lastPage = f + '::' + xmls[f]

      if(      xmls[f] == 'sysreqs.xml' )
        sysTest()
      else if( xmls[f] == 'login.xml'   && logged() )
        g_FM.load_form( 2 )
      else if( xmls[f] == 'odahome.xml' && logged() )
        g_FM.prep_linx( 0 )
      else if( xmls[f] == 'rtrvoda.xml' && logged() )
        g_FM.post_results_to_server( document.storage,'dp' )
      else if( xmls[f] == 'logout' )
        {
        xid("logout").src = "images/navigation/logout.gif"
        initSys()
        }
      else if( xmls[f] == 'profile.xml' && logged() )
        {
        for(var h=0; h<4; h++)
          document.register.elements[h].onchange = function()
            {
            g_FM.pc()
            }
        for(var k=5; k<document.register.elements.length; k++)
          document.register.elements[k].onchange = function()
            {
            g_FM.lc()  
            }
        var CGI_r = new CGI_response( document.storage.usp.value )
        var d = document.register
        var dE = d.elements
        for (var m=0, DL = dE.length; m < DL; m++)
          {
          var n = dE[m].name
          if ( (dE[m].type != 'radio')&&(CGI_r[n] != undefined) )
            d[n].value = CGI_r[n]
          else if (dE[m].type == 'radio')
            for(var y=0, L=d[n].length; y<L; y++)
              if( d[n][y].value == CGI_r[n] )
                d[n][y].checked = true
          }
        }
      var lxi = classify( a, 'img', 'css_form_button' )
      for(var i=0, L = lxi.length; i<L; i++)
        with( new foundation_gif_btn_classB( lxi[i].id, null ) )
          do_click = new Function( spf("g_FM.go_check('~')", [lxi[i].id]) )
      }
    }

  this.prep_linx = function( P )
    {
    xmls.length = 0
    window.visMenu = !logged() ? menus[0] : menus[1]
    for(var i=0, j= menus.length; i<j; i++)
      menus[i].style.display = 'none'
        xid("content").style.overflowY = !g_FM.testing ? 'auto'  : 'hidden'

    for(var W=0; W<17; W++)
      {
      if(W == 0)
        xid("imager").innerHTML = ""
      if(W < 16)
        var ii = "<img src=\"images/navigation/bt_" + W + ".gif\" \/>"
      else
        var ii = "<img src=\"images/dps/wtr.png\").gif\" \/>"
      xid("imager").innerHTML += ii
      }

    visMenu.style.display          = !g_FM.testing ? 'block' : 'none'
    xid( "menu" ).style.display    = !g_FM.testing ? 'block' : 'none'
    LX = classify( visMenu, 'img', 'css_btn' )
    for(var f = 0; f < LX.length; f++)
      {
      xmls.push( (LX[f].id == 'logout') ? 'logout' : LX[f].id + '.xml' )
      LX[f].src = LX[f].src.replace(/_over/,"").replace(/_on/,"")
      with ( new foundation_gif_btn_classB( LX[f].id, visMenu ) )
        do_click = new Function( spf("g_FM.load_form('~')", [f]) )
      }
    if( logged() && P == 0)
				  {
      gid(visMenu, "img", "odahome").src = gid(visMenu, "img", "odahome").src.replace(/(_on)?\.gif/,"_over.gif")
						xid("unlogged").style.display = "none"
						}
    }

  this.post_results_to_server = function( x, instr )
    {
    var b = x.elements
    var M = b.length;
    var Z = []
    var selex = []
    function getURLString(cmnd)
      {
      Z.push( 'sendingForm=' + cmnd )
      switch(cmnd)
        {
        case 3:
          Z.push( 'UID=' + document.storage.uid.value )
          selex.push(5)
          break;
        case 4:
          Z.push( 'UID=' + document.storage.uid.value )
          for(var w=5; w<M; w++)
            selex.push(w)
          break;
        case 5:
          Z.push( 'UID=' + document.storage.uid.value )
          for(var w=0; w<6; w++)
            selex.push(w)
          break;
        case 6:
          Z.push( 'UID=' + document.storage.uid.value )
          for(var w=0; w<M; w++)
            selex.push(w)
          break;
        case 8:
          var p = 'directories=0, location=0, menubar=0, resizable=0, scrollbars=0, status=0, toolbar=0, dependent=0, width=766, height=511'
          window.open("DA_LearningPlan.html" + CGI_o.get(), '_blank', p)
          //Z.push( 'UID=' + document.storage.uid.value )
          //for(var w=0; w<M; w++)
            //selex.push(w)
          break;
        default:
          for(var w=0; w<M; w++)
            selex.push(w)
          break;
        }

      for (var j=0; j<M; j++)
        {
        if( isIn( j, selex ) )
          {
          var c = b[j]
          if (c.type == 'radio' && c.checked)
            Z.push( c.name + '=' + c.value )
          else if (c.type == 'text')
            Z.push( c.name + '=' + c.value )
          else if (c.type == 'hidden')
            Z.push( c.name + '=' + c.value )
          else if (c.type == 'password')
            Z.push( c.name + '=' + c.value.replace(/['"“”‘’*=+]/g,"") )
          else if (c.type == 'select-one')
            Z.push( c.name + '=' + c.value )
          }
        }		
      return Z.join('&')
      }

    var scen_00 = ( x == document.oda )      && ( instr == 'login' )                      // Login
    var scen_01 = ( x == document.oda )      && ( instr == 'new_user' )                   // New User Registration
    var scen_02 = ( x == document.oda )      && ( instr == 'lost_pswd' )                  // Lost Password
    var scen_03 = ( x == document.register ) && ( instr.indexOf('getURLString(3)') > -1 ) // Language Option Change
    var scen_06 = ( x == document.register ) && ( instr == 'new_data' )                   // Update Personal and Language Info -- Contains both #4 and #5, too
    var scen_07 = ( x == document.start_oda )                                             // Move to the test
    var scen_08 = ( x == document.storage )  && ( instr=='dp' )                           // Request Diagnostic Profiles
    //var scen_09 = ( x == document.storage )  && ( instr=='lp' )                         // Request learning plan

    var responseStr = ''
    var scen        = ''

    if( scen_00 )
      {
      scen = 'scen_00'
      g_XX.post_form( g_SERVER + g_login, getURLString(0) )
      responseStr = g_XX.get_responseText().replace(/true/ig,'1').replace(/false/ig,'0')
      if ( responseStr )
        {
        document.oda.un.value = document.oda.pw.value = ''
        document.storage.usp.value = responseStr
        var CGI_r = new CGI_response( responseStr )
        if( CGI_r.UID )
          {
          document.storage.uid.value = CGI_r.UID
          g_FM.prep_linx()
          g_FM.load_form( 2 )
          }
        else
          {
          if(responseStr.indexOf("html") > -1)
            document.write( responseStr )
          else
            alert( "Either your password or username was entered incorrectly.\nPlease try again." )             //Got response, but no UID - error
          }
        }
      else                                                                                         //Got no response - error
        alert( "A connection with the server could not be established. Please try again." )               //Got no response - error
      }
    else if( scen_01 )
      {
      scen = 'scen_01'
      var bbb =  getURLString(1)
      g_XX.post_form( g_SERVER + g_login, bbb )
      responseStr = g_XX.get_responseText() //-- Turn this on to allow direct login with no email correspondence beforehand. ----
      if(responseStr == '99')
        alert('A user with this email already exists. Please use an alternate email address.\nIf you are a registered user, please log in using your personal login information.')
      else
        {
        g_FM.go_screen(4)
        g_FM.prep_linx()
        }
      }
    else if( scen_02 )
      {
      scen = 'scen_02'
      var bbb =  getURLString(2)
      g_XX.post_form( g_SERVER + g_login, bbb )
      responseStr = g_XX.get_responseText()
      //alert(responseStr)
      if (responseStr.indexOf('99')>-1)
        {
        document.scen02 = -1
        }
      document.storage.uid.value = responseStr  = document.oda.un.value = document.oda.pw.value = ''
      g_FM.go_screen( 1 )
      g_FM.prep_linx()
      }
    else if( scen_03 )
      {
      scen = 'scen_03'
      g_XX.post_form( g_SERVER + g_login, getURLString(3) )
      responseStr = g_XX.get_responseText()
      }
    else if ( scen_06 )
      {
      scen = 'scen_06'
      if ( ( g_FM.ling_change )&&( !g_FM.pers_change ) )
        var the_str = getURLString(4)
      else if( ( !g_FM.ling_change )&&( g_FM.pers_change ) )
        var the_str = getURLString(5)
      else
        var the_str = getURLString(6)
      g_XX.post_form( g_SERVER + g_login, the_str )
      responseStr = g_XX.get_responseText().replace(/true/ig,'1').replace(/false/ig,'0')
      //alert(responseStr)
      if (responseStr)
        {
        document.storage.usp.value = responseStr
        var CGI_r = new CGI_response( document.storage.usp.value )
        var d = document.register
        var dE = d.elements, DL = dE.length
        for (var m=0; m < DL; m++)
          {
          var n = dE[m].name
          if ( (dE[m].type != 'radio')&&(CGI_r[n] != undefined) )
            d[n].value = CGI_r[n]
          else if (dE[m].type == 'radio')
            for(var y=0, L=d[n].length; y<L; y++)
              if( d[n][y].value == CGI_r[n] )
                d[n][y].checked = true
          }
        alert( "Your profile has been updated." )
        }
      }
    else if( scen_07 )
      {
      scen = 'scen_07'
      var CGI_r = new CGI_response( document.storage.usp.value )
      var CGI_o = new CGI_output_class()
      CGI_o.store( 'UID',   document.storage.uid.value )
      CGI_o.store( 'lName', CGI_r.last )
      CGI_o.store( 'mName', CGI_r.midd )
      CGI_o.store( 'fName', CGI_r.frst )
      CGI_o.store( 'Tlang', instr[0] )
      CGI_o.store( 'Mod',   instr[1] )
      CGI_o.store('StrtLevel', 3)               //sets starting level for Main at 1+
      var sid = createSessionId([instr[0], instr[1], document.storage.uid.value, CGI_r.last, CGI_r.frst])
      if (sid > -1)
        {
        CGI_o.store('sessionId', sid)
        xid("hd").style.backgroundImage = (instr[1] == '2') ? "url(images/header_listening.jpg)" : "url(images/header_reading.jpg)"
        var fms = classify(document, 'div', 'css_form')
        for (var q = 0, r = fms.length; q < r; q++)
          fms[q].style.display = 'none'
        g_FM.testing = true
        g_FM.prep_linx()
        xid("t_frame").style.display = "block"
        xid("t_frame").src = "DA_Main.html" + CGI_o.get()
        }

      }
    else if( scen_08 )
      {
      function cap( lcs )
        {
        //lcs = 'nkorean' == lcs ? 'korean \/ North Korean' : lcs
          return getLangName(lcs)//lcs.substr(0,1).toUpperCase() + lcs.substr(1, lcs.length-1)
        }
      scen = 'scen_08'
      var CGI_r = new CGI_response( document.storage.usp.value )
      //var CGI_o = new CGI_output_class(true)
      //CGI_o.store( 'uid', document.storage.uid.value )
      //CGI_o.store( 'lName', CGI_r.last )
      //CGI_o.store( 'fName', CGI_r.frst )
      //CGI_o.store( 'Mod',   CGI_r.Mod )
      //var DPR_file = 'retrieveDP.aspx'
      //g_XX.post_form( g_SERVER + DPR_file, CGI_o.get() )

      //responseStr = g_XX.get_responseText()
      //alert(responseStr)
      

      //FILL IN THE USER ID AND NAME IN THE GOLOBAL VAR IN COMMON USED IN logError2Master
      guid = document.storage.uid.value
      glname= CGI_r.last
      gfname = CGI_r.frst


      var args = []
      //alert(document.storage.uid.value)
      args.push(['userId', document.storage.uid.value])
      var output = g_WS.tryPostForm('GetProfilesByUserId', args)
      var data =  g_WS.ValidateBlubOutput(output)
      var RS = []
      var curLang = ''
      if (data)
        {
        for(var x=0,xL=data.length;x<xL;x++)
          {
          if (data[x].prflng != curLang)
            {
            curLang = data[x].prflng
            RS.push('{lang:"'+data[x].prflng+'"}')
            }
            //alert(data[x].prfmod.toLowerCase().Trim() == 'reading' ? 'rc' : 'lc')
          var databasename = SITENUMBER+data[x].prfdbnm.toLowerCase()+'_'+(data[x].prfmod.toLowerCase().Trim() == 'reading' ? 'rc' : 'lc')
          RS.push('{h:"'+myPath+'DA_profile.html?ID='+data[x].prfid+'&DB='+databasename +'", t:"'+data[x].prfdate.split(' ')[0]+' - '+data[x].prfmod+"\"}")
          }
        //alert(RS.join('|'))
        }

      //{lang:~arabic~}|{h:~http://oda2.lingnet.org/DA_profile.html?XML=e_9839_arabic_DPRC_3_19_2013_1363709232726^e_9839~, t:~3/19/2013 - reading~}|


      //var RS = responseStr.replace(/~/g,"\"").split("|")
      var SR = ["<table class=\"profiles\" >"]
      for( var q=0, r=RS.length; q<r; q++ )
        {
        SR.push( "<tr id=\"row_" + q + "\">" )
        if( RS[q].indexOf("{") > -1 )
          {
          eval( "var E = " + RS[q] )
          SR.push( (E.lang) ? "<th><h3>" +cap(E.lang)+ "<\/h3><\/th><th><\/th>" : "<td><p><a href=\"" +E.h+ "\" target=\"_blank\">" +E.t+ "<\/a><\/p><\/td><td><\/td>" )
          }
								else
								  {
										SR.push( "<td><\/td><td><\/td>" )
										}
        SR.push( "<\/tr>" )
        }
      SR.push( "<\/table>" )
      xid("receiver").innerHTML = SR.join("")
      }
    else if( scen_09 )
      {
      scen = 'scen_09'
      var CGI_r = new CGI_response( document.storage.usp.value )
      //alert('Retrieving the learning plan for ' + CGI_r.frst + ' ' + CGI_r.last + ' - protocol under construction.')
      var CGI_o = new CGI_output_class()
      CGI_o.store('UID', document.storage.uid.value )
      CGI_o.store( 'lName', CGI_r.last )
      CGI_o.store( 'fName', CGI_r.frst )
      //var LPR_file = 'retrieveLP.aspx'
      //g_XX.post_form( g_SERVER + LPR_file, CGI_o.get() )
      }
  /*
    if(responseStr == '')
      responseStr = 'No response in this scenario.'
    //alert( scen + ':\n'+ responseStr)
  */
    }
  }//form_class_MG

function foundation_gif_btn_classB( the_id, loc )
  {
  var _this = this
  var o = !loc ? xid(the_id) : gid( loc, "img", the_id )
  if(o)
    {
    var a = o.src+''
    var b = a.indexOf('_over') == -1 ? a.substr(0, a.length-4) + '_on.gif' : a.replace(/_over/ig,"_on")
    if (document.images)
      if(a.indexOf('_over') == -1)
        new Image().src = b
      else
        new Image().src = a
    o.onclick = function()
      {
      if(o.src.indexOf('_over') == -1)
        _this.do_click()
      }
    o.onmouseover = function()
      { 
      if(o.src.indexOf('_over') == -1)
        this.src = b
      }
    o.onmouseout = function()
      {
      if(o.src.indexOf('_over') == -1)
        this.src= a
      }
    this.do_click = function()
      {
      }
    }
  }

function doMsg( z )
  {
  if(z == 0)
    {
    xid('message').style.display = 'none'
    //xid('messagf').style.display = 'block'
    }
  else
    {
    xid('message').style.display = 'block'
    //xid('messagf').style.display = 'none'
    }
  if(z == 2)
    xid('tbl_form').style.display = 'none'
  }

function axept( c )
  {
  if( xid( c ) )
    {
    xid( c ).onclick()
    //xid( c ).id += "done"
    }
  }

function detectEvent(e)
  {
  var ev = window.event || e
  if(ev.keyCode == 13 && ev.type == 'keyup')
    {
    var ZZ = classify( document, 'div', 'css_screen' )
    var Bs = classify( ZZ[g_SN], 'div',  'wr_10_10' )
    for(var w=0, q=Bs.length; w<q; w++)
      if( Bs[w].id && (Bs[w].id.indexOf("axept") > -1) )
        eval( Bs[w].id )
    }
  return true;
  }

  //RR: 11232012. click behavior of new Tutorial button.
  function do_click1() { 

      if (xid('id_popup_wrapper')) {
          remove("id_popup_wrapper");
      }

      this.pop_manager = new popup_class();
      launchVideoOverlay1('Tutorial', 'ma', 'tutorial')
  }

  function do_mouseover1() {
      xid('odaTutorial1').src = "images/oda_tutorial_over.gif";
  }

  function do_mouseout1() {
      xid('odaTutorial1').src = "images/tutorial.gif";
  }

  function remove(id) {
      return (elem = document.getElementById(id)).parentNode.removeChild(elem);
  }
function initSys()
  {
  document.storage.uid.value = ''
  document['onkeydown'] = document['onkeyup'] = detectEvent
  var w = window                              // pointer:  use "w" to facilitate creation of global variables
  w.g_XX = new XML_HTTP_class()               // pointer:  XMLHTTP object instance
  w.g_FM = new form_class()                   // pointer:  FORM object instance
  w.g_SN = 0                                  // integer:  current screen
  w.g_TN = 0                                  // integer:  current test
  w.g_login = 'chkUser.aspx'
  w.g_WS = new webServiceClass() 
  if( Debug )
    w.g_SERVER = ''
  else
    w.g_SERVER = Debug ? '' : myPath
  w.LX = null

  //start =>
  //used for display lang name and other functions: format 
  //IMPORTANT: orignal / enhancement lang
  w.langsDisplayNames = ['Korean / North Korean']
  w.langsShortNames   = ['nkorean']
  w.getLangName = function (l)
    {
    l = isIn(l, langsShortNames) ? langsDisplayNames[where(langsShortNames, l)] : (l.substr(0, 1).toUpperCase() + l.substr(1))
    return l
    }

  //end mixed langs change =>

  g_FM.prep_linx()
  g_FM.load_form( 0 )
  xid("t_frame").src           = ""
  xid("t_frame").style.display = "none"
  }

function endTest(p)
  {
  g_FM.testing = false
  g_FM.prep_linx()
  xid("t_frame").src           = ""
  xid("t_frame").style.display = "none"
  xid("hd").style.backgroundImage = "url(images/header.jpg)"
  //g_FM.load_form( 5 )
  g_FM.load_form( p )

  }
  
function goReg()
  {
  g_FM.load_form( 2 )
  }

window.onbeforeunload = function()
  {
	if(g_FM.testing)
	  return 'DO NOT click "OK" if you wish to continue this diagnostic assessment session. If you click "OK," you will not be able to return to this session.'
  xid("t_frame").src = ""
  }

var Debug = !true

window.onload = function()
  {
  initSys()
  }
