"use strict"

function form(formName, mass) {
    var frm=document.forms[formName];
   
    for (let i=0; i<mass.length; i++ ) {

        
      
        
        if (mass[i].kind==='submit') {
          var newTagElementButton=document.createElement('button');
          var newTextElementCaption=document.createTextNode(mass[i].caption);
          newTagElementButton.appendChild(newTextElementCaption);
          frm.appendChild(newTagElementButton);  
       }
        
       
       if (mass[i].label) {

          let newTagElementLabel=document.createElement('label');
          let newTextElementLabel=document.createTextNode(mass[i].label);
          newTagElementLabel.appendChild(newTextElementLabel);
          frm.appendChild(newTagElementLabel);
    
          if(mass[i].kind==='combo') {
           
            var newTagElementSelect=document.createElement('select');
            newTagElementSelect.setAttribute('name', mass[i].name);
            newTagElementLabel.appendChild(newTagElementSelect);
            for (let n=0; n<mass[i].variants.length; n++ ) {
                var newTagElementOption=document.createElement('option');
                newTagElementOption.setAttribute('value', mass[i].variants[n].value);
                var newTextElementOption=document.createTextNode(mass[i].variants[n].text);
                newTagElementOption.appendChild(newTextElementOption);
                newTagElementSelect.appendChild(newTagElementOption);
            }   
          }

          else if(mass[i].kind==='memo') {

            var newTagElementTextarea=document.createElement('textarea');
            newTagElementTextarea.setAttribute('name', mass[i].name);
            newTagElementLabel.appendChild(newTagElementTextarea);
           }
          
          else if(mass[i].kind==='radio') {

            for (let m=0; m<mass[i].variants.length; m++ ) {

            var newTagElementLabelInput=document.createElement('label');
            var newTextElementLabelInput=document.createTextNode(mass[i].variants[m].text);
            newTagElementLabelInput.appendChild(newTextElementLabelInput);
            newTagElementLabel.appendChild(newTagElementLabelInput);

            var newTagElementInput=document.createElement('input');
            newTagElementInput.setAttribute('name', mass[i].name);
            newTagElementInput.setAttribute('type','radio');
            newTagElementInput.setAttribute('value', mass[i].variants[m].value);
            
            newTagElementLabelInput.appendChild(newTagElementInput);
            }
          }
          
          else {          
          
          var newTagElementInput=document.createElement('input');
          newTagElementInput.setAttribute('name', mass[i].name);
          newTagElementLabel.appendChild(newTagElementInput);

            if (mass[i].kind==='longtext'||mass[i].kind==='shorttext'||mass[i].kind==='number')
            newTagElementInput.setAttribute('type','text')
            else if(mass[i].kind==='check') {
            newTagElementInput.setAttribute('type','checkbox');
            newTagElementInput.setAttribute('checked','true');
            }
          }
        }

        var newTagElementBr=document.createElement('br');
        frm.appendChild(newTagElementBr);


    }
    return frm;

  }

var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

form('Form1', formDef1);

form('form2', formDef2);


