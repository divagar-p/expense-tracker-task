import React from "react";
import Field from "../component/Field";
import MainPage from "../component/MainPage";

interface StateInterface {

    balanceValue: number;

    storageValue: number;

    transactions: any;

    error: boolean;

    storageValueError: boolean;
}

class ExpenseTracker extends React.Component<{}, StateInterface> {
    constructor(props: {}) {

        super(props);

        this.state = {

            balanceValue: 0,

            storageValue: 0,

            transactions: [],

            error: false,

            storageValueError : false,
        }
    }

    componentDidMount() {

        let _balance = localStorage.getItem("storageValue")

        let _trans = localStorage.getItem("transactions")

        if (_balance && _trans) {

            this.setState({

                storageValue: Number(_balance),
                transactions: JSON.parse(_trans)
            })
        }



    }

    handleChange = (e: any) => {

        const { value } = e.target;

        this.setState({
            balanceValue: value
        })
    }

    balanceAdd = () => {

        const { balanceValue, storageValue, transactions } = this.state;

        if (balanceValue > 0) {

            let _add = Number(storageValue) + Number(balanceValue)

            let _history = [...transactions]

            let file = {

                history: new Date().toISOString() + " - " + Number(balanceValue) + " - Add"
            }

            _history.push(file)

            localStorage.setItem("storageValue", _add.toString())

            localStorage.setItem("transactions", JSON.stringify(_history))

            this.setState({

                storageValue: _add,
                transactions: _history,
                error: false,
                storageValueError: false
            })
        }
        else {
            this.setState({ error: true, storageValueError: false })
        }

    }

    balanceRemove = (event: any) => {
        event.preventDefault()

        const { balanceValue, storageValue, transactions } = this.state;

        if (balanceValue > 0) {
            let _subtract = Number(storageValue) - Number(balanceValue)

            if (_subtract >= 0) {

                let _history = [...transactions]

                let file = {

                    history: new Date().toISOString() + " - " + Number(balanceValue) + " - Remove "
                }

                _history.push(file)

                localStorage.setItem("storageValue", _subtract.toString())

                localStorage.setItem("transactions", JSON.stringify(_history))

                this.setState({

                    storageValue: _subtract,
                    transactions: _history,
                    error: false,
                    storageValueError: false
                })
            }
            else if (storageValue === 0) {

                alert(`Please add the value `)
                this.setState({storageValueError: true})

            }
            else {
                alert(`Please enter the value below ${storageValue} `)
                this.setState({storageValueError: true})

            }
        }
        else {
            this.setState({ error: true })
        }


    }

    render() {
        const { balanceValue, storageValue, transactions, error,storageValueError } = this.state;
        return (
            <MainPage header={{ title: "Expense Tracker" }}>
                <div className='container'>

                    <div className="card bg-light shadow-sm text-center mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Balance: {storageValue}</h5>
                            <Field
                                balanceValue={balanceValue}
                                storageValue={storageValue}
                                error={error}
                                storageValueError={storageValueError}
                                handleChange={(e) => this.handleChange(e)}
                                balanceAdd={() => this.balanceAdd()}
                                balanceRemove={(event) => this.balanceRemove(event)} />
                        </div>
                    </div>

                    <div className="card bg-light shadow-sm mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Transactions:</h5>
                            {transactions.length !== 0 ?
                                <>
                                    {transactions.map((tr: any, index: number) =>
                                        <p className="card-text" key={index + 1}>{tr.history}</p>
                                    )}
                                </> :
                                <p className="card-text" >Currently no transaction available</p>
                            }
                        </div>
                    </div>

                </div>
            </MainPage>
        );
    }
}

export default ExpenseTracker;
