let operand_l=undefined
let operand_r=undefined
let operator=undefined
let overwrite = true
let new_value_entered = false

const display = document.querySelector('.display')
const clear = document.querySelector('.clear')
const keypad = document.querySelector('.keypad')

function inputOperator(o) {
	overwrite = true
	if (operand_l == undefined) {
		operand_l = +display.textContent
		operator = o
		new_value_entered = false
		console.log("situation 1")
		return
	}

	if (operand_l != undefined && !new_value_entered) {
		operator = o
		console.log("situation 2")
		return
	}

	if (operand_l != undefined){
		compute()
		operator = o
		operand_r = undefined
		new_value_entered = false
		console.log("situation 3")
		return
	}
}

function decimal() {
	if (overwrite) {
		display.textContent = '0.'
		overwrite = false
		new_value_entered = true
		return
	}

	if (!display.textContent.includes('.')) {
		display.textContent += '.'
		new_value_entered = true
		return
	}
}

function compute() {
	overwrite = true
	if (operator == undefined || operand_l == undefined) return

	operand_r = +display.textContent
	let out
	switch (operator) {
		case '+':
			out = operand_l + operand_r
			break
		
		case '-':
			out = operand_l - operand_r
			break

		case '×':
			out = operand_l * operand_r
			break

		case '÷':
			out = operand_l / operand_r
			break
	}
	
	if (out <= 9999999) {
		operand_r = undefined
		operand_l = undefined
		if(!Number.isInteger(out)) {
			let l = Math.floor(out).toString().length
			out = +out.toFixed(6-l)
		}
		display.textContent = out
		operand_l = out
	}
	else {
		operand_r = undefined
		operand_l = undefined
		display.textContent = 'ERROR'
	}
}

function inputNumber(num) {
	new_value_entered = true
	if (overwrite) {
		display.textContent = num
		overwrite = false
	}
	else {
		if (display.textContent.length >= 7) return 
		display.textContent += num
	}
}


clear.addEventListener('click', ()=> {
	display.textContent = '0'
	operand_l=undefined
	operand_r=undefined
	operator=undefined
	overwrite = true
	new_value_entered = false
})

keypad.addEventListener('click', (event)=> {
	
	if (event.target.className != '') return
	
	let key = event.target.textContent
	if (isNaN(+key)) {
		//implies / * - + = . key
		switch(key) {
			case '.':
				decimal()
				return
			case '=':
				compute()
				return
			default:
				inputOperator(key)
				return
		}
	}

	inputNumber(key)
})