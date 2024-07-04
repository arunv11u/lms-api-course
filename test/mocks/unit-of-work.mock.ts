
export const mockStart = jest.fn();
export const mockGetRepository = jest.fn();
export const mockComplete = jest.fn();
export const mockDispose = jest.fn();

const mockUnitOfWork = jest.fn(() => {
	return {
		getRepository: mockGetRepository,
		start: mockStart,
		complete: mockComplete,
		dispose: mockDispose
	};
});

export default mockUnitOfWork;
