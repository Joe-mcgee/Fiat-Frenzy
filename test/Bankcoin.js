const Bankcoin =artifacts.require("Bankcoin");

contract("Bankcoin", async (accounts) => {
	let instance;
	beforeEach("setup contract for Each Test", async () => {
		instance = await Bankcoin.deployed();
	})

	it("should provide a a whole number that can represenet to 1/phi", async () => {
		let reserveRequirement = await instance.reserveRequirement.call()
		console.log(reserveRequirement.toString())
		assert.equal("618033989", reserveRequirement.toString())
	})

	it("should deploy with a creator with a balanceOf 100", async () => {
		let assets = await instance.balanceOf.call(accounts[0]);
		assert.equal(100, assets)
	})

	it("should deploy with a creators assets of 0", async () => {
		let assets = await instance.assetsOf.call(accounts[0]);
		assert.equal(0, assets);
	})

	it("should deploy with a creators liabilities of 0", async () => {
		let assets = await instance.liabilitiesOf.call(accounts[0]);
		assert.equal(0, assets);
	})


	it("create loan should create a loan", async () => {
		let createLoan = await instance.createLoan.call(accounts[1], 50);
		assert.equal(createLoan, true);
	})



	it("create loan should fail if reserve ratio is exceeded", async () => {
		let createLoan = await instance.createLoan.call(accounts[1], 80);
		assert.equal(createLoan, false);
	})


	it("should allow a bankcoin to be transfered from acct 1 -> 2", async () => {
		let transfer = await instance.transfer.call(accounts[1], 10);
		assert.equal(transfer, true)
	})

	// An external of keeping of lendor and debtor address want to be separated from the chain, but for now lets bake it in

	it("Can Retrieve a Loan index", async () => {
		let balance = instance.balanceOf.call(accounts[0]);

		let createLoan = await instance.createLoan.sendTransaction(accounts[1], 50);
		let index = await instance.getLoanIndex.call(accounts[1]);
		assert.equal(index, 1);
	})

	it("create loan emits the inscribe loan event", async () => {
		let pastEvents = await instance.getPastEvents()
		assert.notEqual(pastEvents.length, 0)
	})

	it("a debtor can query the logs and retrive a loan inscribed to them", async () => {
		let pastEvents = await instance.getPastEvents();
		let inscriptions = pastEvents.map((event) => {
			let Result = event.args
			console.log(Result)
			if (Result._debtor = accounts[1]) {
				return Result
			}
		})
		let testResult = {
			_lender: accounts[0],
			_id: 1,
		}
		console.log(inscriptions)
		assert.deepEqual(
			[
				{
					_lender: inscriptions[0]._lender,
					 _id: inscriptions[0]._id.length,
				},
			],
				[testResult]
		)
	})

	

	it("A Loan index can return a tuple of a loan", async () => { 
		let index = await instance.getLoanIndex.call(accounts[1])
		console.log(index.toNumber())
		let loan = await instance.getLoanByIndex.call(accounts[1], 1)
		// Result { '0': <BN: 32>, '1': <BN: 5c7c65e5>, '2': false }
		assert.equal(loan['0'].toNumber(), 50)
	})

	it("can retrieve a debt index", async () => {
		let index = await instance.getDebtIndex.call(accounts[0], {
			from: accounts[1]
		})
		assert.equal(index, 1)
	})

	it("can get a debt from an index", async () => {	
		let index = await instance.getDebtIndex.call(accounts[0], {
			from: accounts[1]
		})
		let debt = await instance.getDebtByIndex.call(accounts[0], index,  {
			from: accounts[1]
		});
		//
		assert.equal(debt['0'].toNumber(), 50);

	})

	it("Can Sign a loan", async () => {		
		let index = await instance.getDebtIndex.call(accounts[0], {
			from: accounts[1]
		})
		let sign = await instance.signLoanByIndex.call(accounts[0], index, {
			from: accounts[1]
		})
		console.log(sign)
		assert.equal(sign, true)
	})

	it("ones balance cannot creep below their assets", async () => {
		let index = await instance.getDebtIndex.call(accounts[0], {
			from: accounts[1]
		})

		let sign = await instance.signLoanByIndex.sendTransaction(accounts[0], index, {
			from: accounts[1]
		})

		let transfer = await instance.transfer.call(accounts[2], 51);
		console.log(transfer)
		assert.equal(transfer, false)

	})

	it("Repay loan by Index should repay a loan", async () => {
		let index = await instance.getDebtIndex.call(accounts[0], {
			from: accounts[1]
		})
		let sign = await instance.signLoanByIndex.sendTransaction(accounts[0], index, {
			from: accounts[1]
		})

		let payback = await instance.repayLoanByIndex.call(accounts[0], index, 50, {
			from: accounts[1]
		})
		assert.equal(true, payback);
	})
})
