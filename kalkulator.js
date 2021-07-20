const liczby = document.querySelectorAll('.cyfra')
const operatory = document.querySelectorAll('.operator')
const rownosc = document.querySelector('.rowne')
const wynik1 = document.querySelector('.pierwsza_liczba')
const wynik2 = document.querySelector('.druga_liczba')
const del = document.querySelector('.usun')
const ac = document.querySelector('.wyczysc')



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
				document.getElementById('wynik').style.backgroundColor = 'lightcoral'
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
		const l1 = wynik1.innerText
		if (liczba2.toString() === '0' && l1.includes('÷') ) {
			return
		}
		
		oblicz()
	}
	operacja = operator
	liczba1 = liczba2
	liczba2 = ''
}


const wybierzlLiczbe = (cyfra) => {
	if (cyfra === '.') {
		if (liczba2.includes('.')) {
			return
		}
	}
	
	liczba2 = liczba2.toString() + cyfra.toString()

}

const usunLiczbe = () => {
	liczba2 = liczba2.toString().slice(0, -1)
}

const wyswietl = () => {
	const dlugosc = liczba2.length
	if (dlugosc > 11){
		return
	}

	wynik2.innerText = liczba2

	if (operacja != null) {
		wynik1.innerText = liczba1 + operacja  
	} else {
		wynik1.innerText = ''
	}
}

const wyczysc = () => {
	document.getElementById('wynik').style.backgroundColor = 'thistle'
	liczba1 = ''
	operacja = undefined
	liczba2 = ''
}

liczby.forEach((cyfra) => {
	cyfra.addEventListener('click', () =>{
		wybierzlLiczbe(cyfra.innerText)
		wyswietl()

	})
})

operatory.forEach((operator) => {
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
	usunLiczbe();
	wyswietl();
})

ac.addEventListener ('click', () => {
	wyczysc()
	wyswietl()
})