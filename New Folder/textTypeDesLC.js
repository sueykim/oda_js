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

var deliveryTypes =
    [
    {LVL:'2', DS:'understand speech that is delivered more clearly than normal||understand speech rate that is slower than normal||understand speech with frequent repetitions or paraphrasing'},
    {LVL:'3', DS:'understand some normal rate speech'},
    {LVL:'5', DS:'understand speech delivered at a normal rate'},
    {LVL:'6', DS:'understand native speakers speaking at a normal rate||understand speech in the standard dialect'},
    {LVL:'8', DS:'understand without difficulty all forms of standard speech||understand conversations between educated native speakers, delivered at normal speed'}

    ]
var primDPs =
  [
  {UI:'510_00_02_1', PF:'understand utterances about basic areas of immediate need or on very familiar topics'},
  {UI:'520_00_02_1', PF:'understand simple questions and answers or simple statements||understand some main ideas'},
  {UI:'542_00_02_1', PF:'understand subjects in areas of immediate need or on very familiar topics||_TOPIC_'},
  {UI:'544_00_02_1', PF:'understand simple questions and answers and simple statements'},
  {UI:'541_00_02_1', PF:'understand simple utterances'},
  {UI:'510_00_03_1', PF:'understand all subjects relating to immediate needs'},
  {UI:'520_00_03_1', PF:'understand some familiar topics beyond immediate needs||understand some factual content'},
  {UI:'542_00_03_1', PF:'understand all vocabulary related survival needs||understand vocabulary related to some common concrete topics'},
  {UI:'544_00_03_1', PF:'understand more common time forms and most question forms||understand basic word order patterns'},
  {UI:'541_00_03_1', PF:'understand speech that is in the form of a series of short discrete utterances||understand some elements of cohesion (e.g., pronouns, verb  inflections)'},
  {UI:'510_00_05_1', PF:'understand speech about common topics, well-known current events and everyday descriptions and narrations'},
  {UI:'520_00_05_1', PF:'understand factual content||understand important factual details'},
  {UI:'542_00_05_1', PF:'understand everyday topics, common personal accounts, or well-known current events'},
  {UI:'544_00_05_1', PF:'understand narrations about current, past and future events||understand basic grammar relations within utterances'},
  {UI:'541_00_05_1', PF:'understand basic elements of cohesion (e.g., pronouns, verb inflections)'},
  {UI:'510_00_06_1', PF:'understand most common factual topics'},
  {UI:'520_00_06_1', PF:'understand some discussions on specialized topics||understand some implied meaning'},
  {UI:'542_00_06_1', PF:'understand general vocabulary with occasional limitations'},
  {UI:'544_00_06_1', PF:'understand some long and complex utterances'},
  {UI:'541_00_06_1', PF:'understand some complex relations between utterances: connections and references'},
  {UI:'510_00_08_1', PF:'understand the essentials of all speech on general topics and specialized areas'},
  {UI:'520_00_08_1', PF:'understand speech about ideas, arguments or opinions||understand implications'},
  {UI:'542_00_08_1', PF:'understand broad vocabulary, and rarely have to ask for paraphrasing or explanations||understand vocabulary related to a special professional field'},
  {UI:'544_00_08_1', PF:'understand utterances with complex structures'},
  {UI:'541_00_08_1', PF:'understand complex relations between utterances||understand general cultural shaping of ideas, such as the use of non-neutral language (e.g. He regrettably declined.)'}
  ]

function findLongDes( short )
  {
  var S = short.toLowerCase()
  for (var i=0,L=TextFuncTypes.length; i<L; i++)
    {
    var nm = TextFuncTypes[i].N.toLowerCase()
    if ( nm == S )
      return TextFuncTypes[i].V
    }
  }
function findDeliveryTypes(lvl)
  {
  var lvl = lvl
  var delDS = ''
  for (var i=0,L=deliveryTypes.length; i<L; i++)
    {
    var nm = deliveryTypes[i].LVL
    if ( nm == lvl )
      delDS = deliveryTypes[i].DS
    }
  return delDS  
  }

function fillgaps( clsName, n, lvl )
  {
  var cn = clsName.substr(1)
  var lvl = lvl < 10 ? '0' + lvl : lvl
  var uiName0 = uiName1 = uiDP0 = uiDP1 = x = ''
  var a0 = a1 = []
  if (cn == 'MAINT')
    {
    uiName0 = '510_00_' + lvl + '_1'
    uiName1 = '520_00_' + lvl + '_1'
    }
  else if (cn == 'VOCAB')
    uiName0 = '542_00_' + lvl + '_1'
  else if (cn == 'STRCT')
    uiName0 = '544_00_' + lvl + '_1'
  else if (cn == 'DISCS')
    uiName0 = '541_00_' + lvl + '_1'
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
      x += '<li> ' + a0[i] + '</li>'
    if (a1.length > 0)
      for (var i=0, L=a1.length; i<L; i++)
        x += '<li> ' + a1[i] + '</li>'
    x += '</ul>'
    }
  return x
  }
  
  function fillOL(lvlW, lvlC)
  {
  var x = ''
  var beyondL3 = 'You have demonstrated the ability to understand the highest level of texts that the ODA system offers. The current version of ODA does not assess beyond the ability to understand texts on general abstract topics. Therefore, the section on "what you NEED to do next" may contain little or no feedback.'
  var belowL1 =  'You have not demonstrated the ability to understand basic short utterances in the target language. The current version of ODA does not assess the ability to understand isolated words and phrases. Therefore, the section on "what you CAN do now" may contain little or no feedback.'
  if (lvlW == 8)
    x = '<font color="#336633">' + beyondL3 + '</font>'
  else if (lvlC = 2)
    x = '<font color="#880000">' + belowL1 + '</font>'
  return x
  }