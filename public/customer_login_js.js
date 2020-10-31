const patterns = {
    username:/^[a-z][a-z\d_]{5,}$/i,
    password: /^[a-z\d@-]{8,20}$/,
};

const inputs = document.querySelectorAll('input');
var checker = 0;
function validate(field,regex){
    if(regex.test(field.value)){
        field.className = 'valid';
    }
    else{
        field.className = 'invalid';
    }
    if(field.value.length==0) field.className = 'input';
}

inputs.forEach(input=>{
    input.addEventListener('keyup',e=>{
        if(e.target.attributes.name.value==='password'){
            checker = 1;
            if(checker === 1){
                const wifi = document.querySelector('.wifi');
                wifi.addEventListener('mousedown',()=>{
                    e.target.setAttribute('type','text');
                });
                wifi.addEventListener('mouseup',()=>{
                    e.target.setAttribute('type','password');
                });
                checker = 2;
            }
        }
        validate(e.target,patterns[e.target.attributes.name.value]);
    });
});