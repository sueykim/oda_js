 var TextFuncTypes =
   [
   {N:'Enumerate', V:'enumeration of items (i.e., a shopping list)', L:'1'},
   {N:'Collect Information', V:'collection of information (i.e., a passport application form)', L:'1'},
   {N:'Inform (Orientation)', V:'information about places and events (i.e., the location of a train station or travel times)', L:'2'},
   {N:'Announce', V:'announcement of social or public events (i.e., a wedding or a meeting)', L:'3'},
   {N:'Advertise', V:'advertisement of common products and services', L:'3'},
   {N:'Direct', V:'directions on how to get to places', L:'3'},
   {N:'Report-Events', V:'reporting of current events', L:'5'},
   {N:'Instruct', V:'instructions on how to accomplish common tasks (i.e., enroll a child in school)', L:'5'},
   {N:'Narrate', V:'narration or recounting of personal stories and regular occurrences', L:'5'},
   {N:'Describe', V:'description of people and places', L:'5'},
   {N:'Compare', V:'comparison of ideas or complex facts', L:'6'},
   {N:'Comment', V:'comment on ideas and events (i.e., a letter to the editor)', L:'6'},
   {N:'Analyze', V:'analysis of abstract ideas and complex facts', L:'8'},
   {N:'Advance opinion', V:'advancement and elaboration of an opinion about one particular issue', L:'9'},
   {N:'Counter opinion', V:'opposition to an idea or opinion expressed by another person or group', L:'9'},
   {N:'Hypothesize', V:'hypothesis on a past or future eventuality', L:'8'},
   {N:'Advise', V:'advice on social behaviors and courses of action', L:'9'},
   {N:'Explain', V:'explanation of how things and processes work (i.e., a new technological device)', L:'8'},
   {N:'Report-Studies', V:'reports of research studies and discoveries (i.e., a new medical discovery)', L:'5'},
   {N:'Report', V:'reporting of current events', L:'5'}
   ]

var TextFuncTypes2 =
  [
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

var primDPs =
  [
  {UI:'110_00_02_1', PF:'understand the general idea of highly recurring material||understand material of a predictable nature in established contexts'},
  {UI:'120_00_02_1', PF:'understand important pieces of information in highly common subject areas'},
  {UI:'142_00_02_1', PF:'understand vocabulary that relates to immediate needs||_TOPIC_'},
  {UI:'144_00_02_1', PF:'understand the simplest grammatical relations between words'},
  {UI:'141_00_02_1', PF:'understand the simplest relations between sentences'},
  {UI:'110_00_03_1', PF:'understand some of the simpler material on common factual subjects'},
  {UI:'120_00_03_1', PF:'understand important details of simple factual texts'},
  {UI:'142_00_03_1', PF:'understand some common concrete and factual vocabulary||_TOPIC_'},
  {UI:'144_00_03_1', PF:'understand some common grammatical relations within sentences'},
  {UI:'141_00_03_1', PF:'understand some common relations between sentences'},
  {UI:'110_00_05_1', PF:'understand the main ideas of familiar authentic factual texts'},
  {UI:'120_00_05_1', PF:'understand the major details of familiar authentic factual texts'},
  {UI:'142_00_05_1', PF:'understand common concrete and factual vocabulary||_TOPIC_'},
  {UI:'144_00_05_1', PF:'understand common grammatical relations within sentences'},
  {UI:'141_00_05_1', PF:'understand common relations between sentences||understand texts with several layers of information'},
  {UI:'110_00_06_1', PF:'understand the main ideas of unfamiliar factual texts||understand the overall point of view of the author'},
  {UI:'120_00_06_1', PF:'understand the major factual details of unfamiliar fact-based texts||understand the simple supporting arguments of a general discussion of ideas'},
  {UI:'142_00_06_1', PF:'understand some vocabulary having to do with unfamiliar subjects||understand some abstract vocabulary||_TOPIC_'},
  {UI:'144_00_06_1', PF:'understand some complex grammatical relationships within sentences'},
  {UI:'141_00_06_1', PF:'understand some complex relationships between sentences and paragraphs'},
  {UI:'110_00_08_1', PF:'understand the main point of an argument in an opinion text'},
  {UI:'120_00_08_1', PF:'understand the major supporting evidence of the main argument'},
  {UI:'142_00_08_1', PF:'understand general vocabulary dealing with unfamiliar subjects||understand general abstract vocabulary||_TOPIC_'},
  {UI:'144_00_08_1', PF:'understand complex grammatical relationships within sentences'},
  {UI:'141_00_08_1', PF:'understand complex relationships existing between sentences and paragraphs||understand the general cultural shaping of ideas through the use of idiomatic cohesive devices'}
  ]

var TopicDescriptors =
  [
  '',
  '',
  'the most immediate aspects of',
  'some of the concrete aspects of',
  '',
  'the common concrete aspects of',
  'some of the abstract aspects of',
  '',
  'most factual and general abstract aspects of'
  ]

function findTP(lvl)
  {
  var x = TopicDescriptors[lvl]
  if (lvl < 0)
    x = ''
  return x
  }

function findLongDes( short )
  {
  function FD( short)
    {
    var S = short.toLowerCase()
    for (var i=0,L=TextFuncTypes.length; i<L; i++)
      {
      var nm = TextFuncTypes[i].N.toLowerCase()
      if( S.indexOf(nm) == 0 ) //if ( nm == S )
        return TextFuncTypes[i].V + '::' + S.split('::')[1]
      }
    }
  var x = FD( short )
  if ( x == '' )
    x = 'out of boundary of this ODA test'
  return x

  }

function fillgaps( clsName, n, lvl )
  {
  var cn = clsName.substr(1)
  var lvl = lvl <10 ? '0' + lvl : lvl
  var uiName0 = uiName1 = uiDP0 = uiDP1 = x = ''
  var a0 = a1 = []
  if (cn == 'MAINT')
    {
    uiName0 = '110_00_' + lvl + '_1'
    uiName1 = '120_00_' + lvl + '_1'
    }
  else if (cn == 'VOCAB')
    uiName0 = '142_00_' + lvl + '_1'
  else if (cn == 'STRCT')
    uiName0 = '144_00_' + lvl + '_1'
  else if (cn == 'DISCS')
    uiName0 = '141_00_' + lvl + '_1'
  for (var i=0, L= primDPs.length; i<L; i++)
    {
    var zz = primDPs[i]
    if (zz.UI ==  uiName0 )
      uiDP0 = zz.PF.replace( /_TOPIC_/g, '' )
    else if (uiName1 != '' && zz.UI ==  uiName1)
      uiDP1 = zz.PF
    }
  a0 = uiDP0 != '' ? uiDP0.split('||') : a0
  a1 = uiDP1 != '' ? uiDP1.split('||') : a1
  if (a0.length > 0)
    {
    x += statements[n] + '<br /><ul>'
    for (var i=0, L=a0.length; i<L; i++)
      if (a0[i].length > 0)
        x += '<li> ' + a0[i] + '</li>'
    if (a1.length > 0)
      for (var i=0, L=a1.length; i<L; i++)
        if (a1[i].length > 0)
          x += '<li> ' + a1[i] + '</li>'
    x += '</ul>'
    }
  return x
  }

function findTT(clsName, n, lvl)
  {
  var lvlTT = TextFuncTypes2[lvl]
  var x = ''
  if (lvlTT != '')
    {
    x += statements[n] + '<br /><ul>'
    x += '<li> ' + lvlTT + '</li>'
    x += '</ul>'
    }
  return x
  }
  
function fillOL(lvlW, lvlC)
  {
  var x = ''
  var beyondL3 = 'You have demonstrated the ability to understand the highest level of texts that the ODA system offers. The current version of ODA does not assess beyond the ability to understand texts on general abstract topics. Therefore, the section on "what you NEED to do next" may contain little or no feedback.'
  var belowL1 =  'You have not demonstrated the ability to understand basic short sentences in the target language. The current version of ODA does not assess the ability to understand isolated words and phrases. Therefore, the section on "what you CAN do now" may contain little or no feedback.'
  if (lvlW == 8)
    x = '<font color="#336633">' + beyondL3 + '</font>'
  else if (lvlC = 2)
    x = '<font color="#880000">' + belowL1 + '</font>'
  return x
  }