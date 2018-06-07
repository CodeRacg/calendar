function App(){
  var map    = {},
      _week  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      _month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  var SetMap = function(container){
    map.container = container;
    map.form = container.find('form');
  }
  
  var SetHandler = function(){
    map.form.on('submit',FormSubmit);
  }
  
  /* Events Handler */
  var FormSubmit = function(ev){
    ev.preventDefault();
    
    
    
  }
  
  
  
  /* DOM Manipulation */
  var StartMonth = function(month, year){
    var txt = '';
    txt += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">';
    txt += '  <table id="'+month+'/'+year+'" class="month">';
    txt += '    <thead>';
    txt += '      <tr class="week">';
    $.each(_week,function(){
      txt += '      <th class="text-center" title="'+this+'">'+this.substr(0,1).toUpperCase()+'</th>';
    });        
    txt += '      </tr>';
    txt += '      <tr>';
    txt += '        <th colspan="7" class="text-center">'+_month[month]+' '+year+'</th>';
    txt += '      </tr>';
    txt += '    </thead>';
    txt += '    <tbody class="days">';
    return txt;
  }
  
  var Day = function(day){
    return '<td class="'+(day == undefined || day == null || day == 0 ? 'empty':'')+'">'+(day ? day:'')+'</td>';
  }
  
  
  /* Public Function */
  this.Init = function(container){
    SetMap(container);
    SetHandler();
    
    $("#result").append(StartMonth(5,2018));
    
  }
}

var app = new App();
app.Init($('#App'));