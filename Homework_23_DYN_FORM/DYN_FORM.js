"use strict"

function form(formName, mass) {
    var frm=document.forms[formName];
   
    for (let i=0; i<mass.length; i++ ) {
        if (mass[i]==='label') {
            let newTagElementLabel=document.createElement('label');
            let newTextElementLabel=document.createTextNode(mass[i].label);
            newTagElementLabel.appendChild(newTagElementBr);
            frm.appendChild(newTagElementLabel);
        }

        if (mass[i].kind==='submit') {
            var newTagElementButton=document.createElement('button');
            var newTextElementCaption=document.createTextNode(mass[i].caption);
            newTagElementButton.appendChild(newTextElementCaption);
            frm.appendChild(newTagElementButton);  
        }
        else if(mass[i].kind==='combo') {
           
            var newTagElementSelect=document.createElement('select');
            newTagElementSelect.appendChild(newTagElementLabel);
            for (let n=0; n<mass[i].variants.length; n++ ) {
                var newTagElementOption=document.createElement('option');
                newTagElementOption.setAttribute('value',mass[i].variants[n].value);
                var newTextElementOption=document.createTextNode(mass[i].variants[n].text);
                newTagElementOption.appendChild(newTextElementOption);
            }
              
        }
        else if(mass[i].kind==='memo') {
            newTagElementInput.setAttribute('type','checkbox');
            newTagElementInput.setAttribute('checked','true');
            }
        
        else {
        
        
        var newTagElementInput=document.createElement('input');
        newTagElementLabel.appendChild(newTagElementInput);
        var newTagElementBr=document.createElement('br');
        newTagElementLabel.appendChild(newTagElementBr);
        frm.appendChild(newTagElementLabel);}

        if (mass[i].kind==='longtext'||mass[i].kind==='shorttext')
        newTagElementInput.setAttribute('type','text')
        else if(mass[i].kind==='check') {
        newTagElementInput.setAttribute('type','checkbox');
        newTagElementInput.setAttribute('checked','true');
        }
        


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

form('form1', formDef1);

