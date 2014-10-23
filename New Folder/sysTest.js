var BrowserDetect =
  {
  init: function ()
    { 
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
  searchString: function (data)
    {
    for (var i=0, j=data.length; i<j; i++)
      {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity || data[i].vendor;
      if (dataString) 
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      else if (dataProp)
        return data[i].identity;
      }
    },
  searchVersion: function (dataString)
    {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) 
          return; 
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
  dataBrowser: 
    [
      {string: navigator.vendor, subString: "Google Inc.", identity: "Chrome"},
      {string: navigator.vendor, subString: "iCab",        identity: "iCab"},
      {string: navigator.vendor, subString: "Apple",       identity: "Safari"},
      {string: navigator.vendor, subString: "KDE",         identity: "Konqueror"},
      {string: navigator.userAgent, subString: "Firefox",  identity: "Firefox"},
      {string: navigator.userAgent, subString: "Netscape", identity: "Netscape"},         // for newer Netscapes (6+)
      {string: navigator.userAgent, subString: "MSIE",     identity: "Explorer", versionSearch: "MSIE"},
      {string: navigator.userAgent, subString: "Gecko",    identity: "Mozilla",  versionSearch: "rv"},
      {string: navigator.userAgent, subString: "Mozilla",  identity: "Netscape", versionSearch: "Mozilla"},// for older Netscapes (4-)
      {prop:   window.opera,        identity: "Opera"}
    ],
  dataOS : 
    [
      {string: navigator.platform, subString: "Win",   identity: "Windows"},
      {string: navigator.platform, subString: "Mac",   identity: "Mac"},
      {string: navigator.platform, subString: "Linux", identity: "Linux"}
    ]
  }

function sysTest()
  {
  var sysImg = ['OS','BR','VE','FL','PF']
  window.minPlayer = 6 //assign the minimal version of Flash we accept //
  BrowserDetect.init()
  var OS = BrowserDetect.OS
  var BR = BrowserDetect.browser
  var VE = BrowserDetect.version
  var FL = checkFlash(OS, BR, VE)
  var PF = true
  var winIEpass = ( (OS == 'Windows')&&(BR == 'Explorer')&&(VE >= 5) ) //? true : false;
  var Mozi_pass = ( ( (BR == 'Firefox')&&(VE >= 1.5) ) || ( (BR == 'Netscape')&&(VE >= 7) ) ) //? true : false;
  var Safa_pass = ( (BR == 'Safari')&&(VE >= 3) ) //? true : false;
  var Chrm_pass = ( (OS == 'Windows')&&(BR == 'Chrome') )

  function OSf()
    {
    var rtrn = []
    if(OS == 'Windows')
      {
      rtrn[0] = 'win.gif'
      rtrn[1] = 'You are using a recent version of Windows.'
      }
    else if(OS == 'Mac')
      {
      rtrn[0] = 'mac.gif'
      rtrn[1] = 'You are using a recent version of Mac OSX.'
      }
    else
      {
      PF = false
      rtrn[0] = 'nay.gif'
      rtrn[1] = '<b>You are not using an operating system that ODA has been tested on!</b>'
      }
    return rtrn
    }
  function BRf()
    {
    var rtrn = []
    if(BR == 'Explorer')
      {
      rtrn[0] = 'ie.gif'
      rtrn[1] = 'Your browser is Internet Explorer...'
      }
    else if(BR == 'Firefox')
      {
      rtrn[0] = 'ff.gif'
      rtrn[1] = 'Your browser is Firefox...'
      }
    else if(BR == 'Netscape')
      {
      rtrn[0] = 'nn.gif'
      rtrn[1] = 'Your browser is Netscape Navigator...'
      }
    else if(BR == 'Safari')
      {
      rtrn[0] = 'sf.gif'
      rtrn[1] = 'Your browser is Safari...'
      }
    else if(BR == 'Chrome')
      {
      rtrn[0] = 'ch.gif'
      rtrn[1] = 'Your browser is Chrome...'
      }
        else    
      {
      PF = false
      rtrn[0] = 'nay.gif'
      rtrn[1] = '<b>ODA has not been tested on your browser!</b>'
      }
    return rtrn
    }
  function VEf()
    {
    var rtrn = []
    if( (winIEpass)||(Mozi_pass)||(Chrm_pass)||(Safa_pass) )
      {
      rtrn[0] = 'yay.gif'
      rtrn[1] = '... in a version recent enough to run ODA.'
      }
    else
      {
      PF = false
      rtrn[0] = 'nay.gif'
      rtrn[1] = '... <b>but it seems to be too old for ODA - please update your browser!</b>'
      }
    return rtrn
    }
  function PFf()
    {
    var rtrn = []
    if(PF)
      {
      rtrn[0] = 'yay.gif'
      rtrn[1] = 'Your system meets all the requirements to run ODA!'
      }
    else
      {
      rtrn[0] = 'nay.gif'
      rtrn[1] = '<b>Your system does not meet seem to all the requirements to run ODA.<br/>'
                'You should adjust your settings and perform any upgrades before taking the test.</b>'
      }
    return rtrn
    }
  function FLf()
    {
    var rtrn  = []
    if(checkFlash(OS, BR, VE))
      {
      rtrn[0] = 'yay.gif'
      rtrn[1] = 'You have Flash player installed, the version is recent enough to run ODA.'
      }
    else
      {
      rtrn[0] = 'nay.gif'
      rtrn[1] = '<b>You do not have a recent (or any) version of Flash player - get it <a href=\"http://www.adobe.com/products/flashplayer/\" target=\"_blank\">here<\/a></b>'
      }
    return rtrn
    }
  var screenset = []
  var sh = (screen.height>=600) ? ['good',true]:[screen.height + ' <b>but should be at least 600 pixels</b>',false]
  screenset.push(sh[1])
  var sw = (screen.width>=800)  ? ['good',true]:[screen.width  + ' <b>but should be at least 800 pixels</b>',false]
  screenset.push(sw[1])
  var sd = (screen.colorDepth>=16) ? ['good.',true]:[screen.colorDepth + ' <b>but should be at least 16.</b>',false]
  screenset.push(sd[1])
  var strg = 'Your screen height is '+sh[0]+', your screen width is '+sw[0]+', and your color depth is '+sd[0]
  
  if( document.images['SS'] )
    {
    if (screenset.join('').indexOf('false')>-1)
      {
      document.images['SS'].src = "images/sysreqs/nay.gif"
      PF = false
      }
    else
      document.images['SS'].src = "images/sysreqs/yay.gif"
    }

  xid('tt').innerHTML = strg
  for(var i=0, sL = sysImg.length; i<sL; i++)
    {
    document.images[sysImg[i]].src = "images/sysreqs/" + eval( sysImg[i] + 'f()')[0]
    xid('t'+sysImg[i]).innerHTML = eval( sysImg[i] + 'f()')[1]
    }
  }

function checkFlash(OS, BR, VE)
  {
  var winIEpass = ( (OS == 'Windows')  && (BR == 'Explorer') && (VE >= 5) )                    // ? true : false;
  var Mozi_pass = ( ( (BR == 'Firefox')&& (VE >= 2) ) || ( (BR == 'Netscape')&&(VE >= 7) ) )   // ? true : false;
  var Chrm_pass = ( (OS == 'Windows')  && (BR == 'Chrome') )
  if(winIEpass)
    {
    Flash_checkForPlugIn = function()
      {
      var flashinstalled = 0;
      var flashversion   = 0;
      for(var i=15; i>0; i--)
        {
        try
          {
          var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
          flashversion = i;
          break;
          }
         catch(e)
           {
           }
         }
      if (flashversion > 0)
        {
        flashinstalled = 2
        return flashversion
        }
      else
        {
        flashinstalled = 1
        return flashinstalled
        }
      }
    }
  else
    {
    Flash_checkForPlugIn = function ()
      {
      var flashinstalled = 0;
      var flashversion   = 0;
      if (navigator.plugins && navigator.plugins.length)
        {
        x = navigator.plugins["Shockwave Flash"];
        if (x)
          {
          flashinstalled = 2;
          if (x.description)
            flashversion = x.description.match(/\d+\./)[0].replace(/\./,"")      //x.description.charAt(x.description.indexOf('.')-1)
          }
        else
          flashinstalled = 1;
        if (navigator.plugins["Shockwave Flash 2.0"])
          {
          flashinstalled = 2;
          flashversion   = 2;
          }
        }
      else if (navigator.mimeTypes && navigator.mimeTypes.length)
        {
        x = navigator.mimeTypes['application/x-shockwave-flash'];
        flashinstalled = (x && x.enabledPlugin) ? 2 : 1
        }
      return (flashinstalled == 2) ? flashversion : flashinstalled
      }
    }
  return (Flash_checkForPlugIn() < minPlayer) ? false : true
  }
    
function expose( obj )
  {
  var facts = []
  for( var mm in obj )
      facts.push( mm + ' : ' + eval( 'navigator.' + mm ) )
  alert( facts.join('\n\n') )
  }