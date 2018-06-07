function App(){
  var map    = {},
      _week  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      _month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  var SetMap = function(container){
    map.container = container;
    map.form = container.find('form');
    map.result = container.find('#result');
  }
  
  var SetHandler = function(){
    map.form.on('submit',FormSubmit);
  }
  
  /* Events Handler */
  var FormSubmit = function(ev){
    ev.preventDefault();
    
    var init_date = new Date(map.form.find('#date').val()), days = map.form.find('#days').val(), code = map.form.find('#code').val();
    
    // Validate the inputs
    if(init_date == 'Invalid Date'){
      alert('Start Date has a invalid format. Please chek the input and try again.');
      map.form.find('#date').focus();
      return;
    }
    if(days.trim().length == 0 || days < 1){
      alert('Number of days is invalid. Please chek the input and try again.');
      map.form.find('#days').focus();
      return;
    }
    if(code.trim().length == 0){
      alert('Country code is invalid. Please chek the input and try again.');
      map.form.find('#code').focus();
      return;
    }
        
    // Initialize all Date objects
    init_date.setDate(init_date.getDate() + 1);
    var last_date = new Date(init_date), iterate_date = new Date(init_date);
    last_date.setDate(last_date.getDate() + parseInt(days));
    
    var last = null, current = null, tbody = null;
        
    //Clear the result div
    map.result.empty();
    
    //Iterate the date
    while(iterate_date.getTime() !== last_date.getTime()){
      current = iterate_date.getMonth()+'_'+iterate_date.getFullYear();
      
      //Start new Month
      if(current != last){
        
        if(last != null){
          CompleteMonth(map.result.find('#'+last),8 - map.result.find('#'+last+' .days tr:last-of-type td').length);
        }        
        
        map.result.append(StartMonth(iterate_date.getMonth(),iterate_date.getFullYear()));        
        tbody = map.result.find('#'+current+' .days');
        
        tbody.append('<tr></tr>');
        
        //Complete the days of week before the start date
        for(var i=0; i<iterate_date.getDay();i++){
          tbody.find('tr:last-of-type').append(Day()); 
        }
        last = current;
      }
      
      //Render a new row when is a new week
      if(iterate_date.getDay() == 0){
        tbody.append('<tr></tr>');
      }
      
      tbody.find('tr:last-of-type').append(Day(iterate_date.getDate(),iterate_date.getDay())); 
      
      iterate_date.setDate(iterate_date.getDate() + 1);
    }
    
    if(last != null){
      CompleteMonth(map.result.find('#'+last),8 - map.result.find('#'+last+' .days tr:last-of-type td').length);
    }
  }
  
  
  
  
  
  /* DOM Manipulation */
  var StartMonth = function(month, year){
    var txt = '';
    txt += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">';
    txt += '  <table id="'+month+'_'+year+'" class="month">';
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
    txt += '    </tbody">';
    txt += '  </table">';
    txt += '</div">';
    return txt;
  }
  
  var Day = function(day,weekend){
    return '<td class="'+(weekend == 0 || weekend == 6 ? 'weekend':'weekdays')+' '+(day == undefined || day == null || day == 0 ? 'empty':'')+'">'+(day ? day:'')+'</td>';
  }
  
  var CompleteMonth = function(element, days){
    var txt = '';
    for(var j=0; j < days; j++) txt += Day();
    element.find('.days tr:last-of-type').append(txt);
  }
  
  /* Public Function */
  this.Init = function(container){
    SetMap(container);
    SetHandler();    
  }
}

var app = new App();
app.Init($('#App'));