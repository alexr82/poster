export class Form {
    constructor(form, controls){
    this.form = form
    this.controls = controls
    }

    value() {
        const value = {}

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })

        return value
    }

    clear(){
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ""
        })
    }

    isValid() {
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]

            let isValid = true
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid
            })

            if(!isValid){
                setError(this.form[control])
            } else {
                clearControl(this.form[control])
            }

            isFormValid = isFormValid && isValid
        })
        
        return isFormValid
    }
}

function setError($control){
    clearControl($control)

    const error = '<p class="validation-error">Error</p>'
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearControl($control){
    $control.classList.remove('invalid')

    if($control.nextSibling){
        if($control.parentNode) {
            $control.parentNode.removeChild($control.nextSibling);
          }
    }

}