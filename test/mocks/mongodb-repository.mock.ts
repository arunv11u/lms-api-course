
export const mockStartTransaction = jest.fn();
export const mockCommitTransaction = jest.fn();
export const mockAbortTransaction = jest.fn();


const mockMongoDBRepository = jest.fn(() => {
	return {
		startTransaction: mockStartTransaction,
		commitTransaction: mockCommitTransaction,
		abortTransaction: mockAbortTransaction
	};
});

export default mockMongoDBRepository;
