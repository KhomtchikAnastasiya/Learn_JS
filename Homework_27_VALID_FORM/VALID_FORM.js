"use strict"

const formTag=document.forms.VALID_FORM;
formTag.setAttribute('novalidate', 'true');

/*пустые и начальные значения полей считается ошибочным.
*/

function errorMessage(text, error) {
    error=document.createElement('span');
    error.style.color='red';
    error.className ='error';
    error.innerHTML=text;
    return error;
}

formTag.addEventListener('submit', validateForm, false);

function validateForm (eo) {
    eo=eo||window.event;

    var errors=document.querySelectorAll('.error');

    for (var i = 0; i < errors.length; i++) {
        errors[i].remove() 
    }

    /*Вопрос: Почему если использую getElementsByClassName, то удаляются
    не все теги, а через один?
  
    var errors=document.getElementsByClassName('error');
      */

    var formElem=document.getElementsByClassName('formElem');

    const scrollH={};
    function scrollCheck(scrollH) {
            if ( 'scroll' in scrollH )
              return;
            else {
            error.scrollIntoView();
            error.focus;
            scrollH['scroll']=true;
            }
        }

    for (var i = 0; i < formElem.length; i++) {
        if (formElem[i].value=="") {
          var error=errorMessage('Поле не заполнено!', error);
          formElem[i].after(error);
          eo.preventDefault();
          scrollCheck(scrollH);
        }
    }

    var placingField=formTag.elements.placing;
    var placingValue=placingField.value;

    if (placingValue=="") {
        var error=errorMessage('Поле не заполнено!', error);
        var placingTag=document.querySelector('.placingTag');
        placingTag.append(error);
        placingField.scrollIntoView();
        eo.preventDefault();
    }

    var rubricField=formTag.elements.rubric;
    var rubricValue=rubricField.value;

    if (rubricValue=="1") {
        var error=rubricField.parentNode.querySelector('.error');
        if (error==null) {
        error=errorMessage('Поле в начальном значении! Проверьте еще раз :)', error);
        rubricField.parentNode.append(error);
        rubricField.scrollIntoView();
        eo.preventDefault();
        }
    }

    var commentField=formTag.elements.comment;
    var commentValue=commentField.checked;

    if (!commentValue) {
        var error=errorMessage('Необходимо разрешить отзывы', error);
        commentField.parentNode.append(error);
        commentField.scrollIntoView();
        eo.preventDefault();
        return;
    }
    
}


const devField=formTag.elements.dev;
devField.addEventListener('focusout',validateField,false);
devField.addEventListener('change',validateField,false);

const nameField=formTag.elements.name;
nameField.addEventListener('focusout',validateField,false);
nameField.addEventListener('change',validateField,false);

const urlField=formTag.elements.url;
urlField.addEventListener('focusout', validateField,false);
urlField.addEventListener('change', validateField,false);

const dateField=formTag.elements.date;
dateField.addEventListener('focusout',validateField,false);
dateField.addEventListener('change',validateField,false);

const visitField=formTag.elements.visit;
visitField.addEventListener('focusout',validateField,false);
visitField.addEventListener('change',validateField,false);

const emailField=formTag.elements.email;
emailField.addEventListener('focusout',validateField,false);
emailField.addEventListener('change',validateField,false);

const descriptionField=formTag.elements.description;
descriptionField.addEventListener('focusout',validateField,false);
descriptionField.addEventListener('change',validateField,false);

/*var placingField=formTag.elements.placing;
placing.addEventListener('change',validateField,false);

попробовала подписаться на событие для радиокнопок - выдает ошибку.
В чем может быть особенность? Не получается из-за того, что в placingField 
попадает псевдомассив кнопок? 
*/

function validateField(eo) {
    eo=eo||window.event;
    var field=eo.target;
    const fieldValue=field.value;
    
    var error=field.parentNode.querySelector('.error');
    if (error!=null) {
        error.remove();
    }

    if ( fieldValue =="") {
        var error=errorMessage('Поле не заполнено!', error);
        field.parentNode.append(error);
        field.focus();
        return;
    }
}

