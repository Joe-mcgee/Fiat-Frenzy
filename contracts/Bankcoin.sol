pragma solidity ^0.5.0;
import "./Helpers.sol";
import "./Safemath.sol";
contract Bankcoin {
	// contracts are bi-maps equiped with an index

	event InscribeLoan(
		address indexed _lender,
		uint256 indexed _id,
		address indexed  _debtor,
		uint256 _amount,
		uint256 _time
	);
	event SignLoan(
		address indexed _lender,
	  uint256	indexed _id,
		address indexed _debtor,
		uint256 _amount,
		uint256 _time
	);


	// depositing vs multisig loaning
	struct Account {
		uint256 _balance;
		uint256 _assets;
		uint256 _liabilities;
	}
	mapping (address => Account) _accounts;


	struct Loan {
		uint256 _principle;
		uint256 _time;
		bool _isApproved;
	}
	// _loans[lender][debtor]
	mapping (address => mapping (address => Loan[])) _loans;
	// _loanIndices[lender][sendor]
	// its an array to utilize .push for the index
	mapping (address => mapping (address => uint256[])) _loanIndices;
	uint256 public reserveRequirement;
	uint256 public totalSupply;

	constructor() public {
		// Ratios of fibonnaci numbers approximate phi - 1 which equals  1 / phi 
		// larger numbers produce better precision
		// -> question what would be optimal precision for this?
		reserveRequirement = Helpers.percent(17167680177565, 27777890035288, 9);
		// Outputs a whole number representing a proportion
		// 61833989

		// initial amount
		// Look to the wiki for information on actual production scenario
		Account memory account = Account(100, 0, 0);
		_accounts[msg.sender] = account;
	}

	// are these getters needed if public is added in the struct def?

	function balanceOf(address owner) public view returns (uint256 balance) {
		Account memory account = _accounts[owner];
		return account._balance;
	}

	function assetsOf(address owner) public view returns (uint256 assets) {
		Account memory account = _accounts[owner];
		return account._assets;
	}

	function liabilitiesOf(address owner) public view returns (uint256 liabilities) {
		Account memory account = _accounts[owner];
		return account._liabilities;
	}


	// glory to the openzep mint function
	function _mint(address reciever, uint256 amount) internal {
		require(reciever != address(0));

		_accounts[reciever]._balance += amount; 

	}


	function _transfer(address to, address from, uint256 amount) internal {	
		_accounts[from]._balance -= amount;
		_accounts[to]._balance += amount;
	}

	function transfer(address account, uint256 amount) public payable returns (bool success) {	
		uint256 lenderBalance = balanceOf(msg.sender);
		uint256 lenderAssets = assetsOf(msg.sender);
		// cannot transfer if staked against a loan
		// L / A <= 0.618 ,
		if (lenderBalance < amount) {
			return false;
		}

		if (lenderAssets != 0) {
			if (lenderBalance - amount < lenderAssets) {
				return false;
			}
		}
		_transfer(account, msg.sender, amount);



		// Condition
		// Assets / Liabilities cannot be higher than 0.618
		// if 0 Assets and/or 0 Liabilities


		return true;
	}

	function createLoan(address debtor, uint256 amount, uint256 timeDelta) public returns (bool) {
		uint256 lenderAssets = balanceOf(msg.sender);
		uint256 lenderLiabilities = liabilitiesOf(msg.sender) + amount;
		if(Helpers.percent(lenderLiabilities, lenderAssets, 9)  > reserveRequirement) {
			return false;
		}	
		Loan memory newLoan = Loan(amount, now + timeDelta, false);
		// add to chain
		_loans[msg.sender][debtor].push(newLoan);
		_loanIndices[msg.sender][debtor].push(_loans[msg.sender][debtor].length);

		emit InscribeLoan(
			msg.sender,
			_loanIndices[msg.sender][debtor].length,
		 	debtor,
			amount,
			now + timeDelta
			);
		return true;		
	}

	function signLoanByIndex(address lender, uint256 index) public returns (bool) {
		Loan memory loan = _loans[lender][msg.sender][index - 1];
		// yes the mint function is here
		_mint(msg.sender, loan._principle);

		_accounts[lender]._liabilities += loan._principle;
		_accounts[lender]._assets  += loan._principle;
		_loans[lender][msg.sender][index - 1]._isApproved = true;
		// SignLoan(Creditor, index, Lender)
		emit SignLoan(
			msg.sender,
		 	index,
		 	lender,
			loan._principle,
			loan._time
			);
		return true;
	}

	function getDebtIndex(address lender) public view returns (uint256) {
		return _loanIndices[lender][msg.sender].length;
	}

	function getDebtByIndex(address lender, uint256 index) public view returns (uint256, uint256, bool) {
		Loan memory loan = _loans[lender][msg.sender][index - 1];
		return (loan._principle, loan._time, loan._isApproved);

	}

	function getLoanIndex(address debtor) public view returns (uint256) {
		return _loanIndices[msg.sender][debtor].length;
	}

	function getLoanByIndex(address debtor, uint256 index) public view returns (uint256, uint256, bool) {
		Loan[] memory loans = _loans[msg.sender][debtor];
		return (loans[index - 1]._principle, loans[index - 1]._time, loans[index -1]._isApproved);
	}


	function repayLoanByIndex(address lender, uint256 index, uint256 amount) public payable returns (bool) {
		_loans[lender][msg.sender][index - 1]._principle -= amount;
		transfer(lender, amount);
		_accounts[lender]._liabilities -= 1;
		_accounts[msg.sender]._liabilities -= amount;
		return true;
	}
}




