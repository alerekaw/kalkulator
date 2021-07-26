const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const result1 = document.querySelector('.first_number')
const result2 = document.querySelector('.second_number')
const del = document.querySelector('.delete')
const ac = document.querySelector('.clean_all')



let number2 = ''
let operation = undefined
let number1 = ''

const calculate = () => {
	let action
	if (!number1 || !number2){
		return
	}

	const n2 = parseFloat(number2)
	const n1 = parseFloat(number1)

	if(isNaN(n1) || isNaN(n2)){
		return
	}

	switch (operation) {
		case '+':
			action = n1 + n2
		break
		case '-':
			action = n1 - n2
		break
		case 'x':
			action = n1 * n2
		break
		case '÷':
			if (n2 === 0){
				document.getElementById('result').style.backgroundColor = 'lightcoral'
				number1 = ''
				operation = undefined
				number2 = 'ERROR'
				return
			}
			action = n1 / n2
		break
		default:
		return

	}
	number2 = action
	operation = undefined
	number1 = ''

}

const chooseTheOperation = (operator) => {
	if (number2 ==='') {
		return
	}
	if (number1 !== '') {
		const n1 = result1.innerText
		if (number2.toString() === '0' && n1.includes('÷') ) {
			return
		}
		
		calculate()
	}
	operation = operator
	number1 = number2
	number2 = ''
}


const chooseTheNumber = (number) => {
	if (number === '.') {
		if (number2.includes('.')) {
			return
		}
	}
	
	number2 = number2.toString() + number.toString()

}

const deleteTheNumber = () => {
	number2 = number2.toString().slice(0, -1)
}

const decimalPlaces = 9
const factorOfTen = 9

const round = (number2, decimalPlaces) => {
		const factorOfTen = Math.pow(10, decimalPlaces)
		return Math.round(number2 * factorOfTen)/factorOfTen
}

const display = () => {
	const length = number2.length
	if (length > 11){
		return
	}

	if (number2 === "ERROR"){
		result2.innerText = number2;
		result1.innerText = '';
		return;
	}
	if (number2 != '') {
		result2.innerText = round(number2, decimalPlaces)
	} else {
		result2.innerText = ''
	}

	if (operation != null) {
		result1.innerText = round(number1, decimalPlaces) + operation  
	} else {
		result1.innerText = ''
	}

}

const clean_all = () => {
	document.getElementById('result').style.backgroundColor = 'thistle'
	number1 = ''
	operation = undefined
	number2 = ''
}

numbers.forEach((number) => {
	number.addEventListener('click', () =>{
		chooseTheNumber(number.innerText)
		display()

	})
})

operators.forEach((operator) => {
	operator.addEventListener('click', () => {
		chooseTheOperation(operator.innerText);
		display()
	})
})

equal.addEventListener('click', () => {
	calculate();
	display()
}
)

del.addEventListener ('click', () => {
	deleteTheNumber();
	display();
})

ac.addEventListener ('click', () => {
	clean_all()
	display()
})