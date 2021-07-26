const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const rownosc = document.querySelector('.rowne')
const result1 = document.querySelector('.first_number')
const result2 = document.querySelector('.second_number')
const del = document.querySelector('.delete')
const ac = document.querySelector('.clean_all')



let liczba2 = ''
let operacja = undefined
let liczba1 = ''

const oblicz = () => {
	let dzialanie
	if (!liczba1 || !liczba2){
		return
	}

	const l2 = parseFloat(liczba2)
	const l1 = parseFloat(liczba1)

	if(isNaN(l1) || isNaN(l2)){
		return
	}

	switch (operacja) {
		case '+':
			dzialanie = l1 + l2
		break
		case '-':
			dzialanie = l1 - l2
		break
		case 'x':
			dzialanie = l1 * l2
		break
		case '÷':
			if (l2 === 0){
				document.getElementById('result').style.backgroundColor = 'lightcoral'
				liczba1 = ''
				operacja = undefined
				liczba2 = 'ERROR'
				return
			}
			dzialanie = l1 / l2
		break
		default:
		return

	}
	liczba2 = dzialanie
	operacja = undefined
	liczba1 = ''

}

const wybierzOperacje = (operator) => {
	if (liczba2 ==='') {
		return
	}
	if (liczba1 !== '') {
		const l1 = result1.innerText
		if (liczba2.toString() === '0' && l1.includes('÷') ) {
			return
		}
		
		oblicz()
	}
	operacja = operator
	liczba1 = liczba2
	liczba2 = ''
}


const wybierzlLiczbe = (number) => {
	if (number === '.') {
		if (liczba2.includes('.')) {
			return
		}
	}
	
	liczba2 = liczba2.toString() + number.toString()

}

const deleteLiczbe = () => {
	liczba2 = liczba2.toString().slice(0, -1)
}

const decimalPlaces = 9
	const factorOfTen = 9

const round = (liczba2, decimalPlaces) => {
		const factorOfTen = Math.pow(10, decimalPlaces)
		return Math.round(liczba2 * factorOfTen)/factorOfTen
}

const wyswietl = () => {
	const dlugosc = liczba2.length
	if (dlugosc > 11){
		return
	}

	if (liczba2 === "ERROR"){
		result2.innerText = liczba2;
		result1.innerText = '';
		return;
	}
	if (liczba2 != '') {
		result2.innerText = round(liczba2, decimalPlaces)
	} else {
		result2.innerText = ''
	}

	if (operacja != null) {
		result1.innerText = round(liczba1, decimalPlaces) + operacja  
	} else {
		result1.innerText = ''
	}

}

const clean_all = () => {
	document.getElementById('result').style.backgroundColor = 'thistle'
	liczba1 = ''
	operacja = undefined
	liczba2 = ''
}

numbers.forEach((number) => {
	number.addEventListener('click', () =>{
		wybierzlLiczbe(number.innerText)
		wyswietl()

	})
})

operators.forEach((operator) => {
	operator.addEventListener('click', () => {
		wybierzOperacje(operator.innerText);
		wyswietl()
	})
})

rownosc.addEventListener('click', () => {
	oblicz();
	wyswietl()
}
)

del.addEventListener ('click', () => {
	deleteLiczbe();
	wyswietl();
})

ac.addEventListener ('click', () => {
	clean_all()
	wyswietl()
})