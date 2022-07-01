import { ChangeEvent, useState } from "react"
import Logo from "./assets/logo.svg"
import InputMask from "react-input-mask"

function App() {

  const [bill, setBill] = useState('0');
  const [buttonActive, setButtonActive] = useState('1')
  const [tipAmount, setTipAmount] = useState('5');
  const [customTipAmount, setCustomTipAmount] = useState('');
  const [people, setPeople] = useState('2');
  const [isWarningVisible, setIsWarningVisible] = useState<boolean>(false);

  function handleNewBillValue(event:ChangeEvent<HTMLInputElement>){
    setBill(event.target.value);
  }

  function handlePeopleAmount(event:ChangeEvent<HTMLInputElement>){
    if (event.target.value === '0' || event.target.value ==='') {
      setIsWarningVisible(true)
    }else{
      setIsWarningVisible(false)
    }
    setPeople(event.target.value);
  }

  function handleTipPercentage(n:string){
    
    const tip = parseFloat(n)
    
    setButtonActive(n)
    if (tip===1){
      setTipAmount('5')
    } else if (tip===2){
      setTipAmount('10')
    } else if (tip===3){
      setTipAmount('15')
    } else if (tip===4){
      setTipAmount('25')
    } else if (tip===5){
      setTipAmount('50')
    }    
  }

  function handleCustomTipAmount(event:ChangeEvent<HTMLInputElement>){
    if (event.target.value != '') {
      setTipAmount(event.target.value)
      setButtonActive('6')
    }
  }

  function handleSetToDefault(){
    setBill('0');
    setButtonActive('1')
    setTipAmount('5');
    setCustomTipAmount('');
    setPeople('2');
    setIsWarningVisible(false);
  }

    const billValue = parseFloat(bill)
    const tipAmountValue = parseFloat(tipAmount)
    const peopleCounter = parseFloat(people)


    const tipAmountResultPerPerson = Math.round(((billValue/100)*tipAmountValue)/peopleCounter)
    const totalPerPerson = Math.round(tipAmountResultPerPerson + (billValue / peopleCounter))

  return (
    <div className="wrapper">
      <header>
        <img src={Logo} />
      </header>
        <div className="holder">
          
          <div>
            <div className="billInputs">
              <label>Bill</label>
              <InputMask mask="999999" className="inputDefault" maskPlaceholder={null} value={bill} onChange={handleNewBillValue} />
            </div>

            <div className="tipAmount">
              <span>Select tip %</span>
              <div className="percentAmount">
                <button onClick={() => handleTipPercentage('1')} className={buttonActive == '1' ? "active": "" }>5%</button>
                <button onClick={() => handleTipPercentage('2')} className={buttonActive == '2' ? "active": "" }>10%</button>
                <button onClick={() => handleTipPercentage('3')} className={buttonActive == '3' ? "active": "" }>15%</button>
                <button onClick={() => handleTipPercentage('4')} className={buttonActive == '4' ? "active": "" }>25%</button>
                <button onClick={() => handleTipPercentage('5')} className={buttonActive == '5' ? "active": "" }>50%</button>
                <InputMask mask="99" maskPlaceholder={null} className="inputDefault" placeholder="Custom" onChange={handleCustomTipAmount} onFocus={handleCustomTipAmount} />
              </div>
            </div>

            <div className="people">
              <div>
                <label>Number of people</label>
                <span>{isWarningVisible ? "Can't be zero"  :""}</span>
              </div>
              <InputMask mask="99" maskPlaceholder={null} className="inputDefault" value={people} onChange={handlePeopleAmount} />
            </div>
          </div>

          <div className="results">
            <div className="resultPerPerson">
              <span>Tip Amount<br /><small>/ person</small></span>
              <span>${tipAmountResultPerPerson == (Infinity) ? "0.00" : tipAmountResultPerPerson}</span>
            </div>
            <div className="totalResult">
              <span>Total<br /><small>/ person</small></span>
              <span>${totalPerPerson == (Infinity) ? "0.00" : totalPerPerson}</span>
            </div>
            <button onClick={handleSetToDefault}>RESET</button>
          </div>

        </div>
    </div>
  )
}

export default App
